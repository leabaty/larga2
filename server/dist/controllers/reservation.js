"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveReservation = exports.sendRecap = exports.sendRequest = void 0;
// email sending
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
// date management
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
// types & models
const reservation_1 = __importDefault(require("../models/reservation"));
/**When getting a reservation :
 * Database : Date gets 11h added to counteract browser TZ + is stored
 * RequestEmail :  Date gets 11h added to counteract browser TZ + is sent
 * RecapEmail :  Date gets 11h added to counteract browser TZ, more info is fetched about the reservation date, and it's sent
 *
 * DailyEmail :  More info is fetched about the reservation date, and it's sent automatically each 24h
 * */
const senderEmail = process.env.GMAIL_USER || 'sorties.larga2@gmail.com';
//get the ID of the last saved item id with the same lastname for managing confirmations
const getReservationId = (lastName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservations = yield reservation_1.default.find({ lastName });
        const lastReservation = reservations.length > 0 ? reservations[reservations.length - 1] : null;
        const reservationId = lastReservation ? lastReservation._id : null;
        return reservationId;
    }
    catch (error) {
        console.error('Error getting reservation id:', error);
    }
});
// gets the selectedDate and constructs a new object by filtering on the same date reservations.
const getDateInfo = (date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startOfDayDate = (0, date_fns_1.startOfDay)(date);
        const reservations = yield reservation_1.default.find();
        const filteredReservations = reservations.filter((reservation) => {
            const reservationStartOfDay = (0, date_fns_1.startOfDay)(reservation.selectedDate);
            // TODO understand why the f*ck startOfDayDate is the old, not corrected date vs reservationStartOfDay
            return (0, date_fns_1.isSameDay)(reservationStartOfDay, startOfDayDate);
        });
        const paxCounter = filteredReservations.reduce((sum, reservation) => sum + reservation.counter, 0);
        const dateRecap = {
            date,
            paxInfo: filteredReservations,
            reservationCounter: filteredReservations.length,
            paxCounter: paxCounter,
        };
        return dateRecap;
    }
    catch (error) {
        console.error('Error getting recap data:', error);
    }
});
//TODO : The date gets sent by MUI Date Picker as a local timezone, but the server stores it as a UTC Timezone.
// for ex. Date picker shows 2024-01-01 00:00, the date picker will send it with the timezone (+1 Paris time) and the server interprets it as UTC 2023-12-31 23:00.
// When sending it back to the datepicker it is not converted back to a local TZ, and only the days are compared. So 2024-01-01 is compared with 2023-12-31 and it's false.
// parse date into a Date object and add 11 hours in order to counteract the browser timezone
const counteractBrowserTZ = (date) => {
    const correctedDate = new Date(date);
    if (!isNaN(correctedDate.getTime())) {
        correctedDate.setHours(correctedDate.getHours() + 11);
        return correctedDate;
    }
    else {
        console.error('Invalid date format:', date);
        return null;
    }
};
const sendDateRecap = (date, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dateInfo = yield getDateInfo(date);
        const formattedDate = (0, date_fns_1.format)(date, 'EEEE d MMMM yyyy', { locale: locale_1.fr });
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });
        var options = {
            viewEngine: {
                extname: '.hbs',
                layoutsDir: 'views/email/',
                defaultLayout: 'dateRecap',
                partialsDir: 'views/email/',
            },
            viewPath: 'views/email',
            extName: '.hbs',
        };
        transporter.use('compile', (0, nodemailer_express_handlebars_1.default)(options));
        let mailOptions;
        if (dateInfo) {
            // if there are reservations, use the templates
            mailOptions = {
                from: senderEmail,
                to: senderEmail,
                subject: 'Ta sortie de demain',
                template: 'dateRecap',
                context: {
                    date: formattedDate,
                    recap: dateInfo.paxInfo || [],
                    recapPaxCounter: dateInfo.paxCounter || 0,
                    recapReservationCounter: dateInfo.reservationCounter || 0,
                },
            };
        }
        else {
            // otherwise, send an informative email about no reservations
            mailOptions = {
                from: senderEmail,
                to: senderEmail,
                subject: 'Pas de réservations pour demain !',
                template: 'dateRecapEmpty',
                context: {
                    date: formattedDate,
                },
            };
        }
        yield transporter.sendMail(mailOptions);
        res.status(200).send('Recap sent successfully');
    }
    catch (err) {
        console.error('Error occurred in sendRecap: ' + err);
        res.status(500).send('Internal Server Error');
    }
});
const sendEmail = (req, res, template, subject, from, to) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { firstName, lastName, email, phone, counter, additionalPax, selectedDate } = req.body;
        // correct timezone
        const correctedDate = counteractBrowserTZ(selectedDate);
        // get additional info about the booked date, in case there are other bookings
        if (correctedDate === null) {
            console.error('Invalid correctedDate:', correctedDate);
            res.status(400).send('Invalid date');
            return;
        }
        const dateInfo = yield getDateInfo(correctedDate);
        // Deep copy the data to eliminate prototype chain issues
        let sanitizedRecapData;
        if (dateInfo) {
            sanitizedRecapData = JSON.parse(JSON.stringify(dateInfo.paxInfo));
        }
        else {
            console.error('dateInfo is undefined');
        }
        // get the ID for managing the reservation for the recap email (confirm/refuse)
        // uses the last saved reservation with that name
        const reservationId = (_a = (yield getReservationId(lastName))) !== null && _a !== void 0 ? _a : 'error-reservation';
        // make some data human-readable
        const formattedDate = (0, date_fns_1.format)(correctedDate, 'EEEE d MMMM yyyy', { locale: locale_1.fr });
        const formattedAddPax = additionalPax.map((pax) => `${pax.firstName} ${pax.lastName}`).join(', ');
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });
        var options = {
            viewEngine: {
                extname: '.hbs',
                layoutsDir: 'views/email/',
                defaultLayout: template,
                partialsDir: 'views/email/',
            },
            viewPath: 'views/email',
            extName: '.hbs',
        };
        transporter.use('compile', (0, nodemailer_express_handlebars_1.default)(options));
        let mailOptions;
        if (dateInfo) {
            // if there are reservations, use the templates
            mailOptions = {
                from,
                to,
                subject,
                template,
                context: {
                    firstName,
                    lastName,
                    email,
                    phone,
                    addPax: formattedAddPax,
                    counter,
                    date: formattedDate,
                    recap: sanitizedRecapData || [],
                    recapPaxCounter: dateInfo.paxCounter || 0,
                    recapReservationCounter: dateInfo.reservationCounter || 0,
                    reservationId,
                },
            };
            console.log('MAILOPTIONS');
            console.log(JSON.stringify(mailOptions));
        }
        else {
            // otherwise, send an informative email about no reservations
            mailOptions = {
                from,
                to,
                subject: 'Pas de réservations pour demain !',
                template: 'dailyRecapNoReservations',
                context: {
                    date: formattedDate,
                },
            };
        }
        yield transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    }
    catch (err) {
        console.error('Error occurred in sendEmail: ' + err);
        res.status(500).send('Internal Server Error');
    }
});
const sendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield sendEmail(req, res, 'reservationRequest', 'Votre demande de sortie Larga II', senderEmail, req.body.email);
});
exports.sendRequest = sendRequest;
const sendRecap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield sendEmail(req, res, 'reservationRecap', 'Nouvelle demande de sortie', senderEmail, senderEmail);
});
exports.sendRecap = sendRecap;
const saveReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, phone, additionalPax, counter, selectedDate } = req.body;
        const correctedDate = counteractBrowserTZ(selectedDate);
        const reservation = new reservation_1.default({
            firstName,
            lastName,
            email,
            phone,
            counter,
            selectedDate: correctedDate,
            requestDate: new Date(),
        });
        const additionalPaxArray = additionalPax.map((pax) => ({
            firstName: pax.firstName,
            lastName: pax.lastName,
        }));
        reservation.additionalPax = additionalPaxArray;
        yield reservation.save();
        res.status(201).json({ message: 'Reservation created successfully' });
    }
    catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.saveReservation = saveReservation;
// // sending the daily recap email
// export const sendDailyRecap = async () => {
//   try {
//     // Get the current date
//     const currentDate = new Date();
//     // Determine the next day based on the current day
//     let nextDay;
//     switch (currentDate.getUTCDay()) {
//       case 0: // Sunday
//         nextDay = addDays(currentDate, 1); // Monday
//         break;
//       case 1: // Monday
//         nextDay = addDays(currentDate, 1); // Tuesday
//         break;
//       case 2: // Tuesday
//         nextDay = addDays(currentDate, 2); // Wednesday
//         break;
//       case 3: // Wednesday
//         nextDay = addDays(currentDate, 1); // Thursday
//         break;
//       case 4: // Thursday
//         nextDay = addDays(currentDate, 3); // Sunday (for the next week)
//         break;
//       default:
//         // For other days, do not send the recap
//         return;
//     }
//     // Set the time to 09:00 UTC for the next day
//     nextDay.setUTCHours(9, 0, 0, 0);
//     // Get additional information about the precise date
//     getDateInfo(nextDay);
//     // Construct a fake request object with the required data for the daily recap email
//     const fakeReq = {
//       body: {
//         // Add any required data for the daily recap email
//         // For example, you may want to pass a subject, template, and other data specific to the daily recap email
//       },
//     };
//     // Call the function to send the daily recap email
//     await sendEmail(fakeReq, {}, 'dailyRecap', 'Daily Recap Subject');
//   } catch (err) {
//     console.error('Error occurred in sendDailyRecap: ' + err);
//   }
// };
// // Schedule the function to run every day at 09:00 UTC
// schedule.scheduleJob('0 9 * * *', sendDailyRecap);

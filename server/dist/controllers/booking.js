"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDailyRecap = exports.sendRecap = exports.sendRequest = void 0;
// email sending
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const path_1 = __importDefault(require("path"));
// date management
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
// types & models
const booking_1 = __importDefault(require("../models/booking"));
// misc
const data_1 = require("../data");
//gets the ID of the last saved item id with the same lastname for managing confirmations
const getBookingId = async (lastName) => {
    try {
        const bookings = await booking_1.default.find({ lastName });
        const lastBooking = bookings.length > 0 ? bookings[bookings.length - 1] : null;
        const bookingId = lastBooking ? lastBooking._id : null;
        return bookingId;
    }
    catch (error) {
        console.error('Error getting booking id:', error);
    }
};
// gets the selectedDate and constructs a new object by filtering on the same date bookings.
const getDateInfo = async (date) => {
    try {
        const startOfDayDate = (0, date_fns_1.startOfDay)(date);
        const bookings = await booking_1.default.find();
        const filteredBookings = bookings.filter((booking) => {
            const bookingStartOfDay = (0, date_fns_1.startOfDay)(booking.selectedDate);
            // TODO startOfDayDate is the old, not corrected date vs bookingStartOfDay
            return (0, date_fns_1.isSameDay)(bookingStartOfDay, startOfDayDate);
        });
        const paxCounter = filteredBookings.reduce((sum, booking) => sum + booking.counter, 0);
        const dateRecap = {
            date,
            paxInfo: filteredBookings,
            bookingCounter: filteredBookings.length,
            paxCounter: paxCounter,
        };
        return dateRecap;
    }
    catch (error) {
        console.error('Error getting recap data:', error);
    }
};
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
const sendDateRecap = async (date) => {
    try {
        const dateInfo = await getDateInfo(date);
        // sanitize in order to make it readable by nodemailer + to eliminate prototype chain issues
        let sanitizedRecapData;
        if (dateInfo) {
            sanitizedRecapData = JSON.parse(JSON.stringify(dateInfo.paxInfo));
        }
        else {
            console.error('dateInfo is undefined');
        }
        const formattedDate = (0, date_fns_1.format)(date, 'EEEE d MMMM yyyy', { locale: locale_1.fr });
        let formattedEmails;
        if (dateInfo) {
            const emails = dateInfo.paxInfo.map((pax) => pax.email);
            formattedEmails = emails.join(',');
        }
        else {
            console.error('dateInfo is undefined');
            formattedEmails = '';
        }
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });
        const dateRecapTemplate = dateInfo && dateInfo.paxCounter > 0 ? 'dateRecap' : 'dateRecapEmpty';
        const viewsPath = path_1.default.join(process.cwd(), 'views', 'email');
        const options = {
            viewEngine: {
                extname: '.hbs',
                layoutsDir: viewsPath,
                defaultLayout: dateRecapTemplate,
                partialsDir: viewsPath,
            },
            viewPath: viewsPath,
            extName: '.hbs',
        };
        transporter.use('compile', (0, nodemailer_express_handlebars_1.default)(options));
        let mailOptions;
        if (dateInfo && dateInfo.paxCounter > 0) {
            // if there are bookings, use the templates
            mailOptions = {
                from: data_1.senderEmail,
                to: data_1.senderEmail,
                subject: `Ta sortie de demain (${formattedDate})`,
                template: 'dateRecap',
                context: {
                    date: formattedDate,
                    recap: sanitizedRecapData || [],
                    recapPaxCounter: dateInfo.paxCounter || 0,
                    recapBookingCounter: dateInfo.bookingCounter || 0,
                    emails: formattedEmails,
                },
            };
        }
        else {
            // otherwise, send an informative email about no bookings
            mailOptions = {
                from: data_1.senderEmail,
                to: data_1.senderEmail,
                subject: ` Pas de réservations pour demain (${formattedDate})`,
                template: 'dateRecapEmpty',
                context: {
                    date: formattedDate,
                },
            };
        }
        await transporter.sendMail(mailOptions);
    }
    catch (err) {
        console.error('Error occurred in sendRecap: ' + err);
    }
};
const sendEmail = async (req, res, template, subject, from, to) => {
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
        const dateInfo = await getDateInfo(correctedDate);
        // sanitize in order to make it readable by nodemailer + to eliminate prototype chain issues
        let sanitizedRecapData;
        if (dateInfo) {
            sanitizedRecapData = JSON.parse(JSON.stringify(dateInfo.paxInfo));
        }
        else {
            console.error('dateInfo is undefined');
        }
        // get the ID for managing the booking for the recap email (confirm/refuse)
        // uses the last saved booking with that name
        const bookingId = (await getBookingId(lastName)) ?? 'error-booking';
        // make some data human-readable for emails
        const formattedDate = (0, date_fns_1.format)(correctedDate, 'EEEE d MMMM yyyy', { locale: locale_1.fr });
        const formattedAddPax = additionalPax
            .map((pax) => `${pax.firstName} ${pax.lastName}`)
            .join(', ');
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });
        const viewsPath = path_1.default.join(process.cwd(), 'views', 'email');
        const options = {
            viewEngine: {
                extname: '.hbs',
                layoutsDir: viewsPath,
                defaultLayout: template,
                partialsDir: viewsPath,
            },
            viewPath: viewsPath,
            extName: '.hbs',
        };
        transporter.use('compile', (0, nodemailer_express_handlebars_1.default)(options));
        let mailOptions = {
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
                recapPaxCounter: dateInfo?.paxCounter || 0,
                recapBookingCounter: dateInfo?.bookingCounter || 0,
                bookingId,
            },
        };
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    }
    catch (err) {
        console.error('Error occurred in sendEmail: ' + err);
        res.status(500).send('Internal Server Error');
    }
};
const sendRequest = async (req, res) => {
    await sendEmail(req, res, 'bookingRequest', 'Votre demande de sortie voile', data_1.senderEmail, req.body.email);
};
exports.sendRequest = sendRequest;
const sendRecap = async (req, res) => {
    try {
        await saveBooking(req);
        await sendEmail(req, res, 'bookingRecap', `Nouvelle demande : ${req.body.firstName} ${req.body.lastName}`, data_1.senderEmail, data_1.senderEmail);
    }
    catch (error) {
        console.error('Error in sendRecap:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.sendRecap = sendRecap;
const saveBooking = async (req) => {
    try {
        const { firstName, lastName, email, phone, additionalPax, counter, selectedDate } = req.body;
        const correctedDate = counteractBrowserTZ(selectedDate);
        const booking = new booking_1.default({
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
        booking.additionalPax = additionalPaxArray;
        await booking.save();
    }
    catch (error) {
        console.error('Error creating booking:', error);
    }
};
// sending the daily recap email
const sendDailyRecap = async () => {
    try {
        const currentDate = new Date();
        let nextDay;
        switch (currentDate.getUTCDay()) {
            case 0: // Sunday
                nextDay = (0, date_fns_1.addDays)(currentDate, 1); // Monday
                break;
            case 1: // Monday
                nextDay = (0, date_fns_1.addDays)(currentDate, 1); // Tuesday
                break;
            case 2: // Tuesday
                nextDay = (0, date_fns_1.addDays)(currentDate, 2); // Wednesday
                break;
            case 3: // Wednesday
                nextDay = (0, date_fns_1.addDays)(currentDate, 1); // Thursday
                break;
            case 4: // Thursday
                nextDay = (0, date_fns_1.addDays)(currentDate, 1); // Friday
                break;
            default:
                // For other days, do not send the recap
                return;
        }
        nextDay.setUTCHours(9, 0, 0, 0);
        await sendDateRecap(nextDay);
    }
    catch (err) {
        console.error('Error occurred in sendDailyRecap: ' + err);
    }
};
exports.sendDailyRecap = sendDailyRecap;
node_schedule_1.default.scheduleJob('0 1 * * 0,1,3,4', exports.sendDailyRecap);

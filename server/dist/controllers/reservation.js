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
exports.sendRequest = exports.saveReservation = void 0;
const reservation_1 = __importDefault(require("../models/reservation"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const saveReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, phone, additionalPax, counter, selectedDate } = req.body;
        const reservation = new reservation_1.default({
            firstName,
            lastName,
            email,
            phone,
            counter,
            selectedDate,
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
const sendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, phone, additionalPax, counter, selectedDate } = req.body;
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });
        var options = {
            viewEngine: {
                extname: '.hbs', // handlebars extension
                layoutsDir: 'views/email/', // location of handlebars templates
                defaultLayout: 'reservationRequest', // name of main template
                partialsDir: 'views/email/', // location of your subtemplates aka. header, footer etc
            },
            viewPath: 'views/email',
            extName: '.hbs',
        };
        transporter.use('compile', (0, nodemailer_express_handlebars_1.default)(options));
        let mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Votre demande de sortie Larga II ',
            template: 'reservationRequest',
            context: {
                firstName,
                lastName,
                email,
                phone,
                additionalPax,
                counter,
                selectedDate,
            },
        };
        console.log(mailOptions);
        yield transporter.sendMail(mailOptions);
    }
    catch (err) {
        console.log('Error occured: ' + err);
    }
});
exports.sendRequest = sendRequest;

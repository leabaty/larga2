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
exports.sendCancellation = exports.sendConfirmation = exports.deleteById = exports.getBooking = exports.getById = void 0;
const data_1 = require("../data");
// email sending
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
// date management
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
// types & models
const booking_1 = __importDefault(require("../models/booking"));
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield booking_1.default.findById(id);
        return booking;
    }
    catch (error) {
        console.error('Error getting booking by id:', error);
        throw error;
    }
});
exports.getById = getById;
const getBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const booking = yield (0, exports.getById)(id);
        if (!booking) {
            res.status(404).send('Booking not found');
            return;
        }
        res.json(booking);
    }
    catch (err) {
        console.error('Error occurred in handleGet: ' + err);
        res.status(500).send('Internal Server Error');
    }
});
exports.getBooking = getBooking;
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield booking_1.default.deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            console.log('Booking deleted successfully');
        }
        else {
            console.error('Booking not found');
        }
    }
    catch (error) {
        console.error('Error deleting booking by id:', error);
        throw error;
    }
});
exports.deleteById = deleteById;
const sendEmail = (req, res, template, subject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield (0, exports.getById)(req.params.id);
        if (!booking) {
            res.status(404).send('Booking not found');
            return;
        }
        const { firstName, lastName, email, phone, selectedDate, additionalPax, counter } = booking;
        // make some data human-readable
        const formattedDate = (0, date_fns_1.format)(selectedDate, 'EEEE d MMMM yyyy', { locale: locale_1.fr });
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
        let mailOptions = {
            from: data_1.senderEmail,
            to: booking.email,
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
            },
        };
        yield transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    }
    catch (err) {
        console.error('Error occurred in sendEmail: ' + err);
        res.status(500).send('Internal Server Error, see console');
    }
});
const sendConfirmation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield sendEmail(req, res, 'answerConfirmation', 'Sortie voile confirmée !');
});
exports.sendConfirmation = sendConfirmation;
const sendCancellation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield sendEmail(req, res, 'answerCancellation', 'Sortie voile non disponible');
    yield (0, exports.deleteById)(req.params.id);
});
exports.sendCancellation = sendCancellation;

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
exports.sendCancellation = exports.sendConfirmation = exports.deleteById = exports.getById = void 0;
const data_1 = require("../data");
// email sending
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
// date management
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
// types & models
const reservation_1 = __importDefault(require("../models/reservation"));
// getInformation (from the id)
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservation = yield reservation_1.default.findById(id);
        return reservation;
    }
    catch (error) {
        console.error('Error getting reservation by id:', error);
        throw error; // Optionally rethrow the error to propagate it up the call stack
    }
});
exports.getById = getById;
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield reservation_1.default.deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            console.log('Reservation deleted successfully');
        }
        else {
            console.error('Reservation not found');
        }
    }
    catch (error) {
        console.error('Error deleting reservation by id:', error);
        throw error; // Optionally rethrow the error to propagate it up the call stack
    }
});
exports.deleteById = deleteById;
const sendConfirmation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield sendEmail(req, res, 'answerConfirmation', 'Sortie voile confirmée !');
});
exports.sendConfirmation = sendConfirmation;
const sendCancellation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield sendEmail(req, res, 'answerCancellation', 'Sortie voile non disponible');
});
exports.sendCancellation = sendCancellation;
const sendEmail = (req, res, template, subject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservation = yield (0, exports.getById)(req.body.id);
        if (!reservation) {
            console.error('Reservation not found');
            res.status(404).send('Reservation not found');
            return;
        }
        const { firstName, lastName, email, phone, selectedDate, additionalPax, counter } = reservation;
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
            to: reservation.email,
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
        res.status(500).send('Internal Server Error');
    }
});

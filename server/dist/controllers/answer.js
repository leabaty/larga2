"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCancellation = exports.sendConfirmation = exports.deleteById = exports.getBooking = exports.getById = void 0;
const data_1 = require("../data");
// date management
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
// email sending
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const path_1 = __importDefault(require("path"));
// types & models
const booking_1 = __importDefault(require("../models/booking"));
const getById = async (id) => {
    try {
        const booking = await booking_1.default.findById(id);
        return booking;
    }
    catch (error) {
        console.error('Error getting booking by id:', error);
        throw error;
    }
};
exports.getById = getById;
const getBooking = async (req, res) => {
    try {
        const id = req.params.id;
        const booking = await (0, exports.getById)(id);
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
};
exports.getBooking = getBooking;
const deleteById = async (id) => {
    try {
        const result = await booking_1.default.deleteOne({ _id: id });
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
};
exports.deleteById = deleteById;
const sendEmail = async (req, res, template, subject) => {
    try {
        const booking = await (0, exports.getById)(req.params.id);
        if (!booking) {
            res.status(404).send('Booking not found');
            return;
        }
        const { firstName, lastName, email, phone, selectedDate, additionalPax, counter } = booking;
        // make some data human-readable
        const formattedDate = (0, date_fns_1.format)(selectedDate, 'EEEE d MMMM yyyy', { locale: locale_1.fr });
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
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    }
    catch (err) {
        console.error('Error occurred in sendEmail: ' + err);
        res.status(500).send('Internal Server Error, see console');
    }
};
const sendConfirmation = async (req, res) => {
    await sendEmail(req, res, 'answerConfirmation', 'Votre sortie voile est confirmée !');
};
exports.sendConfirmation = sendConfirmation;
const sendCancellation = async (req, res) => {
    await sendEmail(req, res, 'answerCancellation', 'Sortie voile non disponible');
    await (0, exports.deleteById)(req.params.id);
};
exports.sendCancellation = sendCancellation;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactRecap = exports.saveContact = void 0;
const contact_1 = __importDefault(require("../models/contact"));
// email sending
const data_1 = require("../data");
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const path_1 = __importDefault(require("path"));
const saveContact = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, message } = req.body;
        const contact = new contact_1.default({
            firstName,
            lastName,
            email,
            phone,
            message,
            requestDate: new Date(),
        });
        await contact.save();
        res.status(201).json({ message: 'Contact created successfully' });
    }
    catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.saveContact = saveContact;
const sendContactRecap = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, message } = req.body;
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
                defaultLayout: 'contactRecap',
                partialsDir: viewsPath,
            },
            viewPath: viewsPath,
            extName: '.hbs',
        };
        transporter.use('compile', (0, nodemailer_express_handlebars_1.default)(options));
        const mailOptions = {
            from: data_1.senderEmail,
            to: data_1.senderEmail,
            subject: 'Tu as reçu un nouveau message !',
            template: 'contactRecap',
            context: {
                firstName,
                lastName,
                email,
                phone,
                message,
            },
        };
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    }
    catch (err) {
        console.error('Error occurred in sendContactAnswer: ' + err);
        res.status(500).send('Internal Server Error, see console');
    }
};
exports.sendContactRecap = sendContactRecap;

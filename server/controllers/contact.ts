import { Request, Response } from 'express';
import Contact from '../models/contact';

// email sending
import { senderEmail } from '../data';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

export const saveContact = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    const contact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      message,
      requestDate: new Date(),
    });

    await contact.save();

    res.status(201).json({ message: 'Contact created successfully' });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const sendContactRecap = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const options = {
      viewEngine: {
        extname: '.hbs',
        layoutsDir: 'views/email/',
        defaultLayout: 'contactRecap',
        partialsDir: 'views/email/',
      },
      viewPath: 'views/email',
      extName: '.hbs',
    };

    transporter.use('compile', hbs(options));

    const mailOptions = {
      from: senderEmail,
      to: senderEmail,
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
  } catch (err) {
    console.error('Error occurred in sendContactAnswer: ' + err);
    res.status(500).send('Internal Server Error, see console');
  }
};

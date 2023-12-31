import { Request, Response } from 'express';
import Reservation from '../models/reservation';

import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

export const saveReservation = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, additionalPax, counter, selectedDate } = req.body;

    const reservation = new Reservation({
      firstName,
      lastName,
      email,
      phone,
      counter,
      selectedDate,
      requestDate: new Date(),
    });

    const additionalPaxArray = additionalPax.map((pax: any) => ({
      firstName: pax.firstName,
      lastName: pax.lastName,
    }));

    reservation.additionalPax = additionalPaxArray;

    await reservation.save();

    res.status(201).json({ message: 'Reservation created successfully' });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const sendRequest = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, additionalPax, counter, selectedDate } = req.body;

    const transporter = nodemailer.createTransport({
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

    transporter.use('compile', hbs(options));

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

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log('Error occured: ' + err);
  }
};

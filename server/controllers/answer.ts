import { Request, Response } from 'express';

import { senderEmail } from '../data';

// email sending
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

// date management
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// types & models
import ReservationModel from '../models/reservation';
import { AdditionalPax, Reservation } from '../types/reservation';

// getInformation (from the id)
export const getById = async (id: string) => {
  try {
    const reservation: Reservation | null = await ReservationModel.findById(id);

    return reservation;
  } catch (error) {
    console.error('Error getting reservation by id:', error);
    throw error; // Optionally rethrow the error to propagate it up the call stack
  }
};

export const deleteById = async (id: string) => {
  try {
    const result = await ReservationModel.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      console.log('Reservation deleted successfully');
    } else {
      console.error('Reservation not found');
    }
  } catch (error) {
    console.error('Error deleting reservation by id:', error);
    throw error; // Optionally rethrow the error to propagate it up the call stack
  }
};

export const sendConfirmation = async (req: Request, res: Response) => {
  await sendEmail(req, res, 'answerConfirmation', 'Sortie voile confirmée !');
};

export const sendCancellation = async (req: Request, res: Response) => {
  await sendEmail(req, res, 'answerCancellation', 'Sortie voile non disponible');
};

const sendEmail = async (req: Request, res: Response, template: string, subject: string) => {
  try {
    const reservation = await getById(req.body.id);

    if (!reservation) {
      console.error('Reservation not found');
      res.status(404).send('Reservation not found');
      return;
    }

    const { firstName, lastName, email, phone, selectedDate, additionalPax, counter } = reservation;

    // make some data human-readable
    const formattedDate = format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr });
    const formattedAddPax = additionalPax.map((pax: AdditionalPax) => `${pax.firstName} ${pax.lastName}`).join(', ');

    const transporter = nodemailer.createTransport({
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

    transporter.use('compile', hbs(options));

    let mailOptions = {
      from: senderEmail,
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

    await transporter.sendMail(mailOptions);

    res.status(200).send('Email sent successfully');
  } catch (err) {
    console.error('Error occurred in sendEmail: ' + err);
    res.status(500).send('Internal Server Error');
  }
};

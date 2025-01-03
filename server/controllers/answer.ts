import { Request, Response } from 'express';
import { senderEmail } from '../data';

// date management
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// email sending
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

// types & models
import BookingModel from '../models/booking';
import { AdditionalPax, Booking } from '../types/booking';

export const getById = async (id: string) => {
  try {
    const booking: Booking | null = await BookingModel.findById(id);

    return booking;
  } catch (error) {
    console.error('Error getting booking by id:', error);
    throw error;
  }
};

export const getBooking = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const booking = await getById(id);

    if (!booking) {
      res.status(404).send('Booking not found');
      return;
    }

    res.json(booking);
  } catch (err) {
    console.error('Error occurred in handleGet: ' + err);
    res.status(500).send('Internal Server Error');
  }
};

export const deleteById = async (id: string) => {
  try {
    const result = await BookingModel.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      console.log('Booking deleted successfully');
    } else {
      console.error('Booking not found');
    }
  } catch (error) {
    console.error('Error deleting booking by id:', error);
    throw error;
  }
};

const sendEmail = async (req: Request, res: Response, template: string, subject: string) => {
  try {
    const booking = await getById(req.params.id);

    if (!booking) {
      res.status(404).send('Booking not found');
      return;
    }

    const { firstName, lastName, email, phone, selectedDate, additionalPax, counter } = booking;

    // make some data human-readable
    const formattedDate = format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr });
    const formattedAddPax = additionalPax
      .map((pax: AdditionalPax) => `${pax.firstName} ${pax.lastName}`)
      .join(', ');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const viewsPath = path.join(process.cwd(), 'views', 'email');

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

    transporter.use('compile', hbs(options));

    let mailOptions = {
      from: senderEmail,
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
  } catch (err) {
    console.error('Error occurred in sendEmail: ' + err);
    res.status(500).send('Internal Server Error, see console');
  }
};

export const sendConfirmation = async (req: Request, res: Response) => {
  await sendEmail(req, res, 'answerConfirmation', 'Votre sortie voile est confirmée !');
};

export const sendCancellation = async (req: Request, res: Response) => {
  await sendEmail(req, res, 'answerCancellation', 'Sortie voile non disponible');
  await deleteById(req.params.id);
};

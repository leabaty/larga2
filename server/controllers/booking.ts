import { Request, Response } from 'express';

// email sending
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import schedule from 'node-schedule';

// date management
import { format, startOfDay, isSameDay, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

// types & models
import BookingModel from '../models/booking';
import { AdditionalPax, DateRecap, MailOptions, Booking } from '../types/booking';

// misc
import { senderEmail } from '../data';

//gets the ID of the last saved item id with the same lastname for managing confirmations
const getBookingId = async (lastName: string) => {
  try {
    const bookings: Booking[] = await BookingModel.find({ lastName });
    const lastBooking = bookings.length > 0 ? bookings[bookings.length - 1] : null;
    const bookingId = lastBooking ? lastBooking._id : null;

    return bookingId;
  } catch (error) {
    console.error('Error getting booking id:', error);
  }
};

// gets the selectedDate and constructs a new object by filtering on the same date bookings.
const getDateInfo = async (date: Date) => {
  try {
    const startOfDayDate = startOfDay(date);

    const bookings: Booking[] = await BookingModel.find();

    const filteredBookings = bookings.filter((booking) => {
      const bookingStartOfDay = startOfDay(booking.selectedDate);

      // TODO startOfDayDate is the old, not corrected date vs bookingStartOfDay
      return isSameDay(bookingStartOfDay, startOfDayDate);
    });

    const paxCounter = filteredBookings.reduce((sum, booking) => sum + booking.counter, 0);

    const dateRecap: DateRecap = {
      date,
      paxInfo: filteredBookings,
      bookingCounter: filteredBookings.length,
      paxCounter: paxCounter,
    };
    return dateRecap;
  } catch (error) {
    console.error('Error getting recap data:', error);
  }
};

//TODO : The date gets sent by MUI Date Picker as a local timezone, but the server stores it as a UTC Timezone.
// for ex. Date picker shows 2024-01-01 00:00, the date picker will send it with the timezone (+1 Paris time) and the server interprets it as UTC 2023-12-31 23:00.
// When sending it back to the datepicker it is not converted back to a local TZ, and only the days are compared. So 2024-01-01 is compared with 2023-12-31 and it's false.

// parse date into a Date object and add 11 hours in order to counteract the browser timezone
const counteractBrowserTZ = (date: Date) => {
  const correctedDate = new Date(date);
  if (!isNaN(correctedDate.getTime())) {
    correctedDate.setHours(correctedDate.getHours() + 11);

    return correctedDate;
  } else {
    console.error('Invalid date format:', date);
    return null;
  }
};

const sendDateRecap = async (date: Date) => {
  try {
    const dateInfo = await getDateInfo(date);
    // sanitize in order to make it readable by nodemailer + to eliminate prototype chain issues
    let sanitizedRecapData;
    if (dateInfo) {
      sanitizedRecapData = JSON.parse(JSON.stringify(dateInfo.paxInfo));
    } else {
      console.error('dateInfo is undefined');
    }

    const formattedDate = format(date, 'EEEE d MMMM yyyy', { locale: fr });

    let formattedEmails;

    if (dateInfo) {
      const emails = dateInfo.paxInfo.map((pax) => pax.email);
      formattedEmails = emails.join(',');
    } else {
      console.error('dateInfo is undefined');
      formattedEmails = '';
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const dateRecapTemplate = dateInfo && dateInfo.paxCounter > 0 ? 'dateRecap' : 'dateRecapEmpty';

    var options = {
      viewEngine: {
        extname: '.hbs',
        layoutsDir: 'views/email/',
        defaultLayout: dateRecapTemplate,
        partialsDir: 'views/email/',
      },
      viewPath: 'views/email',
      extName: '.hbs',
    };

    transporter.use('compile', hbs(options));

    let mailOptions: MailOptions;
    if (dateInfo && dateInfo.paxCounter > 0) {
      // if there are bookings, use the templates
      mailOptions = {
        from: senderEmail,
        to: senderEmail,
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
    } else {
      // otherwise, send an informative email about no bookings
      mailOptions = {
        from: senderEmail,
        to: senderEmail,
        subject: ` Pas de réservations pour demain (${formattedDate})`,
        template: 'dateRecapEmpty',
        context: {
          date: formattedDate,
        },
      };
    }

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('Error occurred in sendRecap: ' + err);
  }
};

const sendEmail = async (req: Request, res: Response, template: string, subject: string, from: string, to: string) => {
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
    } else {
      console.error('dateInfo is undefined');
    }

    // get the ID for managing the booking for the recap email (confirm/refuse)
    // uses the last saved booking with that name
    const bookingId = (await getBookingId(lastName)) ?? 'error-booking';

    // make some data human-readable for emails
    const formattedDate = format(correctedDate, 'EEEE d MMMM yyyy', { locale: fr });
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
  } catch (err) {
    console.error('Error occurred in sendEmail: ' + err);
    res.status(500).send('Internal Server Error');
  }
};

export const sendRequest = async (req: Request, res: Response) => {
  await sendEmail(req, res, 'bookingRequest', 'Votre demande de sortie voile', senderEmail, req.body.email);
};

export const sendRecap = async (req: Request, res: Response) => {
  await saveBooking(req, res);
  await sendEmail(req, res, 'bookingRecap', `Nouvelle demande : ${req.body.firstName} ${req.body.lastName}`, senderEmail, senderEmail);
};

const saveBooking = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, additionalPax, counter, selectedDate } = req.body;

    const correctedDate = counteractBrowserTZ(selectedDate);

    const booking = new BookingModel({
      firstName,
      lastName,
      email,
      phone,
      counter,
      selectedDate: correctedDate,
      requestDate: new Date(),
    });

    const additionalPaxArray = additionalPax.map((pax: any) => ({
      firstName: pax.firstName,
      lastName: pax.lastName,
    }));

    booking.additionalPax = additionalPaxArray;

    await booking.save();

    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// sending the daily recap email
export const sendDailyRecap = async () => {
  try {
    const currentDate = new Date();

    let nextDay;
    switch (currentDate.getUTCDay()) {
      case 0: // Sunday
        nextDay = addDays(currentDate, 1); // Monday
        break;
      case 1: // Monday
        nextDay = addDays(currentDate, 1); // Tuesday
        break;
      case 2: // Tuesday
        nextDay = addDays(currentDate, 2); // Wednesday
        break;
      case 3: // Wednesday
        nextDay = addDays(currentDate, 1); // Thursday
        break;
      case 4: // Thursday
        nextDay = addDays(currentDate, 1); // Friday
        break;
      default:
        // For other days, do not send the recap
        return;
    }

    nextDay.setUTCHours(9, 0, 0, 0);

    await sendDateRecap(nextDay);
  } catch (err) {
    console.error('Error occurred in sendDailyRecap: ' + err);
  }
};

schedule.scheduleJob('0 1 * * 0,1,3,4', sendDailyRecap);

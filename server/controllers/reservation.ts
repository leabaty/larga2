import { Request, Response } from 'express';

// email sending
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import schedule from 'node-schedule';

// date management
import { format, startOfDay, isSameDay, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

// types & models
import ReservationModel from '../models/reservation';
import { AdditionalPax, DateRecap, FormattedData, MailOptions, Reservation } from '../types/reservation';

/**When getting a reservation :
 * Database : Date gets 11h added to counteract browser TZ + is stored
 * RequestEmail :  Date gets 11h added to counteract browser TZ + is sent
 * RecapEmail :  Date gets 11h added to counteract browser TZ, more info is fetched about the reservation date, and it's sent
 *
 * DailyEmail :  More info is fetched about the reservation date, and it's sent automatically each 24h
 * */

const senderEmail = process.env.GMAIL_USER || 'sorties.larga2@gmail.com';

// gets the selectedDate and constructs a new object by filtering on the same date reservations.
export const getDateInfo = async (date: Date) => {
  try {
    const startOfDayDate = startOfDay(date);

    const reservations: Reservation[] = await ReservationModel.find();

    const filteredReservations = reservations.filter((reservation) => {
      const reservationStartOfDay = startOfDay(reservation.selectedDate);

      // TODO understand why the f*ck startOfDayDate is the old, not corrected date vs reservationStartOfDay
      return isSameDay(reservationStartOfDay, startOfDayDate);
    });

    const paxCounter = filteredReservations.reduce((sum, reservation) => sum + reservation.counter, 0);

    const dateRecap: DateRecap = {
      date,
      paxInfo: filteredReservations,
      reservationCounter: filteredReservations.length,
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

// put data into a "readable" format for human emails
const formatData = (additionalPax: AdditionalPax[], correctedDate: Date | null): FormattedData => {
  if (correctedDate === null) {
    console.error('Invalid correctedDate:', correctedDate);
    throw new Error('Invalid correctedDate');
  }

  try {
    const formattedDate = format(correctedDate, 'EEEE d MMMM yyyy', { locale: fr });
    const formattedAddPax = additionalPax.map((pax: AdditionalPax) => `${pax.firstName} ${pax.lastName}`).join(', ');

    return { formattedAddPax, formattedDate };
  } catch (err) {
    console.error('Error occurred in formatData: ' + err);
    throw err;
  }
};

const sendEmail = async (req: Request, res: Response, template: string, subject: string, from: string, to: string) => {
  try {
    const { firstName, lastName, email, phone, counter, additionalPax, selectedDate } = req.body;

    // correct timezone
    const correctedDate = counteractBrowserTZ(selectedDate);

    // get additional information about a precise date
    if (correctedDate === null) {
      console.error('Invalid correctedDate:', correctedDate);
      res.status(400).send('Invalid date');
      return;
    }
    const dateInfo = await getDateInfo(correctedDate);

    // make data "human-readable"
    const { formattedAddPax, formattedDate } = formatData(additionalPax, correctedDate);

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

    let mailOptions: MailOptions;
    if (dateInfo) {
      // if there are reservations, use the templates
      mailOptions = {
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
          recap: dateInfo.paxInfo || [],
          recapPaxCounter: dateInfo.paxCounter || 0,
          recapReservationCounter: dateInfo.reservationCounter || 0,
        },
      };
    } else {
      // otherwise, send an informative email about no reservations
      mailOptions = {
        from,
        to,
        subject: 'Pas de réservations pour demain !',
        template: 'dailyRecapNoReservations',
        context: {
          date: formattedDate,
        },
      };
    }

    await transporter.sendMail(mailOptions);

    res.status(200).send('Email sent successfully');
  } catch (err) {
    console.error('Error occurred in sendEmail: ' + err);
    res.status(500).send('Internal Server Error');
  }
};

export const sendRequest = async (req: Request, res: Response) => {
  await sendEmail(req, res, 'reservationRequest', 'Votre demande de sortie Larga II', senderEmail, req.body.email);
};

export const sendRecap = async (req: Request, res: Response) => {
  await sendEmail(req, res, 'reservationRecap', 'Nouvelle demande de sortie', senderEmail, senderEmail);
};

export const saveReservation = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, additionalPax, counter, selectedDate } = req.body;

    const correctedDate = counteractBrowserTZ(selectedDate);

    const reservation = new ReservationModel({
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

    reservation.additionalPax = additionalPaxArray;

    await reservation.save();

    res.status(201).json({ message: 'Reservation created successfully' });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// // sending the daily recap email
// export const sendDailyRecap = async () => {
//   try {
//     // Get the current date
//     const currentDate = new Date();

//     // Determine the next day based on the current day
//     let nextDay;
//     switch (currentDate.getUTCDay()) {
//       case 0: // Sunday
//         nextDay = addDays(currentDate, 1); // Monday
//         break;
//       case 1: // Monday
//         nextDay = addDays(currentDate, 1); // Tuesday
//         break;
//       case 2: // Tuesday
//         nextDay = addDays(currentDate, 2); // Wednesday
//         break;
//       case 3: // Wednesday
//         nextDay = addDays(currentDate, 1); // Thursday
//         break;
//       case 4: // Thursday
//         nextDay = addDays(currentDate, 3); // Sunday (for the next week)
//         break;
//       default:
//         // For other days, do not send the recap
//         return;
//     }

//     // Set the time to 09:00 UTC for the next day
//     nextDay.setUTCHours(9, 0, 0, 0);

//     // Get additional information about the precise date
//     getDateInfo(nextDay);

//     // Construct a fake request object with the required data for the daily recap email
//     const fakeReq = {
//       body: {
//         // Add any required data for the daily recap email
//         // For example, you may want to pass a subject, template, and other data specific to the daily recap email
//       },
//     };

//     // Call the function to send the daily recap email
//     await sendEmail(fakeReq, {}, 'dailyRecap', 'Daily Recap Subject');
//   } catch (err) {
//     console.error('Error occurred in sendDailyRecap: ' + err);
//   }
// };

// // Schedule the function to run every day at 09:00 UTC
// schedule.scheduleJob('0 9 * * *', sendDailyRecap);

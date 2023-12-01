import { Request, Response } from 'express';
import Reservation from '../models/reservation'; // adjust the path based on your project structure

export const saveReservation = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, additionalPax, counter, selectedDate } = req.body;

    // Assuming you want to save the main reservation and additional pax separately
    const reservation = new Reservation({
      firstName,
      lastName,
      email,
      phone,
      counter,
      selectedDate,
      requestDate: new Date(), // Set the current date as the requestDate
    });

    // Assuming additionalPax is an array of objects with firstName and lastName
    const additionalPaxArray = additionalPax.map((pax: any) => ({
      firstName: pax.firstName,
      lastName: pax.lastName,
    }));

    // Assign the additionalPax array to the reservation
    reservation.additionalPax = additionalPaxArray;

    // Save the reservation to MongoDB
    await reservation.save();

    res.status(201).json({ message: 'Reservation created successfully' });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

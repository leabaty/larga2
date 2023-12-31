import { Request, Response } from 'express';
import Contact from '../models/contact';

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

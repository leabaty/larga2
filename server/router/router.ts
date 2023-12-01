import express from 'express';

// controllers
import { getCalendarData } from '../controllers/calendar';
import { saveReservation } from '../controllers/reservation';
import { saveContact } from '../controllers/contact';

const router = express.Router();

router.get('/calendar', getCalendarData);

router.post('/reservation/create', saveReservation);
// router.post('/reservation/send', sendReservation);

router.post('/contact/create', saveContact);
// router.post('/contact/email', sendContact);

export default router;

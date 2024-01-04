import express from 'express';

// controllers
import { getCalendarData } from '../controllers/calendar';
import { saveReservation, sendRequest, sendRecap } from '../controllers/reservation';
import { saveContact } from '../controllers/contact';
import { sendCancellation, sendConfirmation } from '../controllers/answer';

const router = express.Router();

router.get('/calendar', getCalendarData);

router.post('/reservation/create', saveReservation);
router.post('/reservation/email-request', sendRequest);
router.post('/reservation/email-recap', sendRecap);

router.post('/answer/confirm', sendConfirmation);
router.post('/answer/cancel', sendCancellation);

router.post('/contact/create', saveContact);
// router.post('/contact/email', sendContact);

export default router;

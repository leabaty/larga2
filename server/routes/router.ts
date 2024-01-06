import express from 'express';

// controllers
import { getCalendarData } from '../controllers/calendar';
import { sendRequest, sendRecap } from '../controllers/booking';
import { saveContact, sendContactRecap } from '../controllers/contact';
import { getBooking, sendCancellation, sendConfirmation } from '../controllers/answer';

const router = express.Router();

router.get('/calendar', getCalendarData);

router.post('/booking/request', sendRequest);
router.post('/booking/recap', sendRecap);
// the booking is saved in the DB just before the recap is sent

router.post('/answer/confirm/:id', sendConfirmation);
router.post('/answer/cancel/:id', sendCancellation);
// TODO for the moment the get Booking is in answer controller but it may be interesting to move it to the booking controller if the app grows
router.get('/answer/get/:id', getBooking);

router.post('/contact/create', saveContact);
router.post('/contact/recap', sendContactRecap);

export default router;

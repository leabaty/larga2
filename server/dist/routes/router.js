"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// controllers
const calendar_1 = require("../controllers/calendar");
const booking_1 = require("../controllers/booking");
const contact_1 = require("../controllers/contact");
const answer_1 = require("../controllers/answer");
const router = express_1.default.Router();
router.get('/calendar', calendar_1.getCalendarData);
router.post('/booking/create', booking_1.saveBooking);
router.post('/booking/email-request', booking_1.sendRequest);
router.post('/booking/email-recap', booking_1.sendRecap);
router.post('/answer/confirm/:id', answer_1.sendConfirmation);
router.post('/answer/cancel/:id', answer_1.sendCancellation);
// TODO for the moment the get Booking is in answer controller but it may be interesting to move it to the booking controller if the app grows
router.get('/answer/get/:id', answer_1.getBooking);
router.post('/contact/create', contact_1.saveContact);
router.post('/contact/recap', contact_1.sendContactRecap);
exports.default = router;

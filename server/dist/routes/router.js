"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// controllers
const calendar_1 = require("../controllers/calendar");
const reservation_1 = require("../controllers/reservation");
const contact_1 = require("../controllers/contact");
const router = express_1.default.Router();
router.get('/calendar', calendar_1.getCalendarData);
router.post('/reservation/create', reservation_1.saveReservation);
router.post('/reservation/email', reservation_1.sendRequest);
router.post('/contact/create', contact_1.saveContact);
// router.post('/contact/email', sendContact);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalendarData = void 0;
// mongo
const booking_1 = __importDefault(require("../models/booking"));
// data
const data_1 = require("../data");
/** getCalendarData constructs and sends a whole year worth of dates and their information
 to the front in order to show unavailable dates in the calendar, and their paxCounter.*/
const getCalendarData = async (req, res) => {
    const maxPax = 4; // boat is 6 pax max, 1 skipper + 1 (always) free spot
    try {
        const bookings = await booking_1.default.find();
        // paxCounter : go through the booking dates and add up the counter sums
        const dateMap = new Map();
        bookings.forEach((booking) => {
            const dateKey = booking.selectedDate.toISOString().split('T')[0];
            const currentSum = dateMap.get(dateKey) || 0;
            dateMap.set(dateKey, currentSum + booking.counter);
        });
        const currentDate = new Date();
        const lastDate = new Date(currentDate);
        lastDate.setFullYear(currentDate.getFullYear() + 1);
        const calendarItems = [];
        // go through each day between currentDate and lastDate, and add the paxCounter and the enabled/disabled
        for (let date = new Date(currentDate); date <= lastDate; date.setDate(date.getDate() + 1)) {
            const currentDate = new Date(date); // Create a new Date object for each day
            const dateKey = currentDate.toISOString().split('T')[0];
            const paxCounter = dateMap.get(dateKey) || 0;
            const enabled = paxCounter < maxPax;
            const calendarItem = { date: currentDate, paxCounter, enabled };
            calendarItems.push(calendarItem);
        }
        // exclude wednesdays, saturdays, and sundays
        const fixedDateObjects = excludeDays(currentDate, lastDate);
        updateCalendarItems(fixedDateObjects, calendarItems);
        // exclude selected periods of time (which are set from the data file)
        const additionalDateObjects = excludePeriods(data_1.excludedPeriods);
        updateCalendarItems(additionalDateObjects, calendarItems);
        // exclude today and the next day
        const exclude48hDateObjects = exclude48h();
        updateCalendarItems(exclude48hDateObjects, calendarItems);
        res.status(200).json(calendarItems);
    }
    catch (error) {
        console.error('Error getting calendar data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getCalendarData = getCalendarData;
// private functions
// exclude given days : Wednesdays, Saturdays, Sundays
const excludeDays = (startDate, endDate) => {
    const days = [3, 6, 0];
    const excludedDays = [];
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const dayOfWeek = date.getDay();
        const currentDate = new Date(date);
        if (days.includes(dayOfWeek)) {
            const calendarItem = { date: currentDate, paxCounter: 6, enabled: false };
            excludedDays.push(calendarItem);
        }
    }
    return excludedDays;
};
// exclude periods from a given data file containing an array of dates
const excludePeriods = (days) => {
    const dateObjects = [];
    days.forEach((dayString) => {
        const [day, month, year] = dayString.split('.').map(Number);
        // months in JavaScript are 0-indexed, so subtract 1 from the month
        const date = new Date(year, month - 1, day);
        const calendarItem = { date, paxCounter: 0, enabled: false };
        dateObjects.push(calendarItem);
    });
    return dateObjects;
};
// exclude today and the next day
const exclude48h = () => {
    const currentDate = new Date();
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    const dateObjects = [
        { date: currentDate, paxCounter: 6, enabled: false },
        { date: nextDate, paxCounter: 6, enabled: false },
    ];
    return dateObjects;
};
// replace calendar items with excluded items
const updateCalendarItems = (dateObjects, calendarItems) => {
    dateObjects.forEach((dateObject) => {
        const existingIndex = calendarItems.findIndex((item) => item.date.getTime() === dateObject.date.getTime());
        if (existingIndex !== -1) {
            calendarItems[existingIndex] = dateObject;
        }
        else {
            calendarItems.push(dateObject);
        }
    });
};

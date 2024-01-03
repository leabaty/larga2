import { Request, Response } from 'express';

// mongo
import ReservationModel from '../models/reservation';

// types
import { CalendarItem, Calendar } from '../types/calendar';
import { Reservation } from '../types/reservation';

// data
import { excludedPeriods } from '../data/excludedPeriods';

/** getCalendarData constructs and sends a whole year worth of dates and their information
 to the front in order to show unavailable dates in the calendar, and their paxCounter.*/

export const getCalendarData = async (req: Request, res: Response) => {
  const maxPax = 4; // boat is 6 pax max, 1 skipper + 1 (always) free spot

  try {
    const reservations: Reservation[] = await ReservationModel.find();

    // paxCounter : go through the reservation dates and add up the counter sums
    const dateMap = new Map<string, number>();
    reservations.forEach((reservation) => {
      const dateKey = reservation.selectedDate.toISOString().split('T')[0];
      const currentSum = dateMap.get(dateKey) || 0;
      dateMap.set(dateKey, currentSum + reservation.counter);
    });

    const currentDate = new Date();
    const lastDate = new Date(currentDate);
    lastDate.setFullYear(currentDate.getFullYear() + 1);

    const calendarItems: Calendar = [];

    // go through each day between currentDate and lastDate, and add the paxCounter and the enabled/disabled
    for (let date = new Date(currentDate); date <= lastDate; date.setDate(date.getDate() + 1)) {
      const currentDate = new Date(date); // Create a new Date object for each day
      const dateKey = currentDate.toISOString().split('T')[0];
      const paxCounter = dateMap.get(dateKey) || 0;
      const enabled = paxCounter < maxPax;
      const calendarItem: CalendarItem = { date: currentDate, paxCounter, enabled };
      calendarItems.push(calendarItem);
    }

    // exclude wednesdays, saturdays, and sundays
    const fixedDateObjects = excludeDays(currentDate, lastDate);
    updateCalendarItems(fixedDateObjects, calendarItems);

    // exclude selected periods of time (which are set from the data file)
    const additionalDateObjects = excludePeriods(excludedPeriods);
    updateCalendarItems(additionalDateObjects, calendarItems);

    res.status(200).json(calendarItems);
  } catch (error) {
    console.error('Error getting calendar data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// private functions

// exclude given days : Wednesdays, Saturdays, Sundays
const excludeDays = (startDate: Date, endDate: Date): Calendar => {
  const days: number[] = [3, 6, 0];
  const excludedDays: Calendar = [];

  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const dayOfWeek = date.getDay();
    const currentDate = new Date(date); // Create a new Date object

    if (days.includes(dayOfWeek)) {
      const calendarItem: CalendarItem = { date: currentDate, paxCounter: 6, enabled: false };
      excludedDays.push(calendarItem);
    }
  }

  return excludedDays;
};

// exclude periods from a given data file containing an array of dates
const excludePeriods = (days: string[]): Calendar => {
  const dateObjects: Calendar = [];

  days.forEach((dayString) => {
    const [day, month, year] = dayString.split('.').map(Number);
    // months in JavaScript are 0-indexed, so subtract 1 from the month
    const date = new Date(year, month - 1, day);
    const calendarItem: CalendarItem = { date, paxCounter: 0, enabled: false };
    dateObjects.push(calendarItem);
  });

  return dateObjects;
};

// replace calendar items with excluded items
const updateCalendarItems = (dateObjects: Calendar, calendarItems: Calendar) => {
  dateObjects.forEach((dateObject) => {
    const existingIndex = calendarItems.findIndex((item) => item.date.getTime() === dateObject.date.getTime());
    if (existingIndex !== -1) {
      calendarItems[existingIndex] = dateObject;
    } else {
      calendarItems.push(dateObject);
    }
  });
};

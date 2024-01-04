import { MainPax } from '.';

export interface Reservation extends MainPax {
  _id?: string;
  additionalPax: AdditionalPax[];
  counter: number;
  selectedDate: Date;
  requestDate: Date;
}
export interface AdditionalPax {
  firstName: string;
  lastName: string;
}

export interface DateRecap {
  date: Date;
  paxInfo: Reservation[];
  reservationCounter: number;
  paxCounter: number;
}

export interface MailOptions {
  from: string | undefined;
  to: any;
  subject: string;
  template: string;
  context: {
    firstName?: any;
    lastName?: any;
    email?: any;
    phone?: any;
    addPax?: string;
    counter?: any;
    date: string;
    recap?: Reservation[];
    recapPaxCounter?: number;
    recapReservationCounter?: number;
    reservationId?: string;
    emails?: string;
  };
}

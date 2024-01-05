import { MainPax } from '.';

export interface Booking extends MainPax {
  additionalPax: AdditionalPax[];
  counter: number;
  selectedDate: Date;
  requestDate: Date;
}
export interface AdditionalPax {
  firstName: string;
  lastName: string;
}

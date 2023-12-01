import { Reservation } from './reservation';

export interface RecapView {
  sailDate: Date;
  pax: Reservation[];
}

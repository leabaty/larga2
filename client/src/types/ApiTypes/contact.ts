import { MainPax } from '.';

export interface Contact extends MainPax {
  message: string;
  requestDate: Date;
}

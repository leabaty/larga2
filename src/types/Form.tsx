export interface Pax {
  firstName: string;
  lastName: string;
}

export interface ErrorMessages {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedDate: string;
  additionalPax: string;
  [key: string]: string;
}

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  additionalPax: Pax[];
  counter: number;
  selectedDate: Date | null;
}

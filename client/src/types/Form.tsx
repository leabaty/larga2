export interface Pax {
  firstName: string;
  lastName: string;
}

export interface ReservationErrorMessages extends ErrorMessages {
  selectedDate: string;
  additionalPax: string;
  [key: string]: string;
}

export interface ReservationFormValues extends FormValues {
  additionalPax: Pax[];
  counter: number;
  selectedDate: Date | null;
}

export interface ContactErrorMessages extends ErrorMessages {
  message: string;
}

export interface ContactFormValues extends FormValues {
  message: string;
}

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ErrorMessages {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  [key: string]: string;
}

export interface FormPax {
  firstName: string;
  lastName: string;
}

export interface FormBookingErrorMessages extends FormErrorMessages {
  selectedDate: string;
  additionalPax: string;
  [key: string]: string;
}

export interface FormBookingValues extends FormValues {
  additionalPax: FormPax[];
  counter: number;
  selectedDate: Date | null;
}

export interface FormContactErrorMessages extends FormErrorMessages {
  message: string;
}

export interface FormContactValues extends FormValues {
  message: string;
}

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface FormErrorMessages {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  [key: string]: string;
}

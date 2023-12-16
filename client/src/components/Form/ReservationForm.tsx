import { FormReservationErrorMessages, FormReservationValues, FormPax } from 'FormTypes';
import React, { useEffect, useState } from 'react';
import { InputField } from './formComponents/FormInputs';
import { DateField } from './formComponents/FormDateField';
import { AdditionalPaxFields } from './formComponents/FormAdditionalPax';
import '../../styles/Form.scss';
import { content } from '../../contents/Form';
import usePost from '../../utils/usePost';
import { Calendar } from 'ApiTypes/calendar';

export default function ReservationForm() {
  const [formValues, setFormValues] = useState<FormReservationValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    additionalPax: [] as FormPax[],
    counter: 1,
    selectedDate: null as Date | null,
  });

  const [errors, setErrors] = useState<FormReservationErrorMessages>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectedDate: '',
    additionalPax: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const [calendarItems, setCalendarItems] = useState<Calendar>([]);
  const [availablePax, setavailablePax] = useState<number | null>(null);

  const { firstName, lastName, email, phone, additionalPax, counter, selectedDate } = formValues;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+|00)?[0-9]{2,}([0-9]{9})$/; // +33 or 00 or 0, at least 10 digits
    return phoneRegex.test(phone);
  };

  const validateAdditionalPax = () => {
    return additionalPax.every((pax) => pax.firstName && pax.lastName);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormValues((prevValues) => ({ ...prevValues, selectedDate: date }));
    setErrors((prevErrors) => ({ ...prevErrors, selectedDate: '' }));
  };

  const handleAddPax = () => {
    if (firstName && lastName) {
      setFormValues((prevValues) => ({
        ...prevValues,
        additionalPax: [...prevValues.additionalPax, { firstName: '', lastName: '' }],
        counter: prevValues.counter + 1,
      }));
    }
  };

  const handleRemovePax = () => {
    if (additionalPax.length > 0) {
      setFormValues((prevValues) => ({
        ...prevValues,
        additionalPax: [...prevValues.additionalPax.slice(0, -1)],
        counter: prevValues.counter - 1,
      }));
    }
  };

  const handleAdditionalPaxChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      const updatedAdditionalPax = [...prevValues.additionalPax];
      updatedAdditionalPax[index] = { ...updatedAdditionalPax[index], [name]: value };
      return { ...prevValues, additionalPax: updatedAdditionalPax };
    });
    setErrors((prevErrors) => ({ ...prevErrors, additionalPax: '' }));
  };

  const postData = usePost('/reservation/create', formValues);

  const handleSubmit = async () => {
    const newErrors: FormReservationErrorMessages = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      selectedDate: '',
      additionalPax: '',
    };

    if (!firstName) {
      newErrors.firstName = content.error.mandatory;
    }

    if (!lastName) {
      newErrors.lastName = content.error.mandatory;
    }

    if (!email || !validateEmail(email)) {
      newErrors.email = content.error.email;
    }

    if (!phone || !validatePhone(phone)) {
      newErrors.phone = content.error.phone;
    }

    if (!selectedDate) {
      newErrors.selectedDate = content.error.mandatory;
    }

    if (!validateAdditionalPax()) {
      newErrors.additionalPax = content.error.addpax;
    }

    if (Object.values(newErrors).every((error) => !error)) {
      try {
        await postData();
        console.log('Reservation submitted successfully!');
        setSubmitted(true);
      } catch (error) {
        console.error('Reservation failed to submit:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/calendar`);
        const data = await response.json();

        setCalendarItems(data);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      }
    };
    fetchCalendarData();
  }, []);

  useEffect(() => {
    const updateAvailablePax = () => {
      const selectedDateItems = calendarItems.filter((item) => item.date === selectedDate);
      const availablePlaces = selectedDateItems.reduce((sum, item) => sum + (item.enabled ? item.paxCounter : 0), 0);
      setavailablePax(availablePlaces);
    };

    updateAvailablePax();
  }, [selectedDate, calendarItems]);

  return (
    <div className='form'>
      <h2>{content.reservationTitle}</h2>

      {!submitted ? (
        <>
          <InputField
            name='firstName'
            placeholder={content.field.firstname}
            value={firstName}
            error={errors.firstName}
            onChange={handleInputChange}
          />
          <InputField name='lastName' placeholder={content.field.lastname} value={lastName} error={errors.lastName} onChange={handleInputChange} />
          <InputField name='email' placeholder={content.field.email} type='email' value={email} error={errors.email} onChange={handleInputChange} />
          <InputField name='phone' placeholder={content.field.phone} type='tel' value={phone} error={errors.phone} onChange={handleInputChange} />
          <div className='form-block'></div>

          <DateField selectedDate={selectedDate} onChange={handleDateChange} error={errors.selectedDate} calendarItems={calendarItems} />
          <p className='form-text'>
            {content.available} : {availablePax !== null ? availablePax : 'Loading...'}
          </p>

          <AdditionalPaxFields
            additionalPax={additionalPax}
            counter={counter}
            onAddPax={handleAddPax}
            onRemovePax={handleRemovePax}
            onAdditionalPaxChange={handleAdditionalPaxChange}
            additionalPaxError={errors.additionalPax}
            mainPassenger={{ firstName: firstName, lastName: lastName }}
          />

          <button className='form-btn-submit' onClick={handleSubmit}>
            {content.submitReservation}
          </button>
        </>
      ) : (
        <div className='submit-message'>
          <p>{content.submittedReservation}</p>
        </div>
      )}
    </div>
  );
}

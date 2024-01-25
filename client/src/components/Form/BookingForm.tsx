import { FormBookingErrorMessages, FormBookingValues, FormPax } from 'FormTypes';
import React, { useEffect, useState } from 'react';
import { InputField } from './formComponents/FormInputs';
import { DateField } from './formComponents/FormDateField';
import { AdditionalPaxFields } from './formComponents/FormAdditionalPax';
import '../../styles/Form.scss';
import { content } from '../../contents/Form';
import { Calendar } from 'ApiTypes/calendar';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { usePost } from '../../utils/usePost';
import { CircularProgress } from '@mui/material';

export default function BookingForm() {
  const maxBoatPax = 4;
  const [formValues, setFormValues] = useState<FormBookingValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    additionalPax: [] as FormPax[],
    counter: 1,
    selectedDate: null as Date | null,
  });

  const [errors, setErrors] = useState<FormBookingErrorMessages>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectedDate: '',
    additionalPax: '',
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [calendarItems, setCalendarItems] = useState<Calendar>([]);
  const [availablePax, setavailablePax] = useState<number | null>(null);
  const [showAddPax, setShowAddPax] = useState(false);

  const { firstName, lastName, email, phone, additionalPax, counter, selectedDate } = formValues;

  const areDatesEqual = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+|0)[0-9]{7,}$/; // Should be only numbers, should begin with 0 or +
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

  const handleAgreeTermsChange = () => {
    setAgreeTerms(!agreeTerms);
  };

  const handleSubmit = async () => {
    const newErrors: FormBookingErrorMessages = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      selectedDate: '',
      additionalPax: '',
      agreeTerms: '',
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

    if (!agreeTerms) {
      newErrors.agreeTerms = content.error.terms;
    }

    // Display an error if the checkbox is not checked
    if (!agreeTerms) {
      newErrors.terms = content.error.terms;
    }

    // Check if the selected date is disabled
    const selectedDateItem =
      selectedDate &&
      calendarItems.find((item) => {
        const calendarDate = new Date(item.date);
        return areDatesEqual(calendarDate, selectedDate);
      });

    if (selectedDateItem && !selectedDateItem.enabled) {
      newErrors.selectedDate = content.error.disabledDate;
    }

    if (Object.values(newErrors).every((error) => !error)) {
      try {
        await saveSendBooking();
        setSubmitted(true);
      } catch (error) {
        console.error('Booking failed to submit:', error);
        setErrors({
          ...newErrors,
          formSubmission: content.error.submit,
        });
      }
    } else {
      setErrors(newErrors);
    }
  };

  const sendRequest = usePost('/booking/request', formValues, setLoading); // to the passenger
  const sendRecap = usePost('/booking/recap', formValues, setLoading); // to the captain + storage

  const saveSendBooking = async () => {
    try {
      setLoading(true);
      await sendRequest();
      await sendRecap();
      setLoading(false);
      setSubmitted(true);
    } catch (error) {
      console.error('Bookingform Failed to submit:', error);
      setLoading(false);
      setErrors({
        ...errors,
        formSubmission: content.error.submit,
      });
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
        setCalendarItems([]);
      }
    };
    fetchCalendarData();
  }, []);

  useEffect(() => {
    const areDatesEqual = (date1: Date, date2: Date) => {
      return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
    };

    const updateAvailablePax = () => {
      // determine if the selected date has a counterpart in the database
      if (selectedDate) {
        const selectedDateItem = calendarItems.find((item) => {
          const calendarDate = new Date(item.date);
          return areDatesEqual(calendarDate, selectedDate);
        });

        if (selectedDateItem) {
          const availableSpots = selectedDateItem.enabled ? maxBoatPax - selectedDateItem.paxCounter : 0;
          setavailablePax(availableSpots);

          // determine if there are enough spots to show the additional pax feature
          setShowAddPax(availableSpots > 0 && availableSpots > counter);
        } else {
          console.error(`No item found for the selected date: ${selectedDate}`);
          setavailablePax(0);
          setShowAddPax(false);
        }
      } else {
        console.error('No selected date yet');
        setavailablePax(0);
        setShowAddPax(false);
      }
    };

    updateAvailablePax();
  }, [selectedDate, calendarItems, counter]);

  return (
    <div className='form'>
      <h2>{content.bookingTitle}</h2>

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

          {calendarItems.length === 0 ? (
            <p className='form-text'>⚠️ {content.error.calendar}</p>
          ) : (
            <>
              {' '}
              <DateField selectedDate={selectedDate} onChange={handleDateChange} error={errors.selectedDate} calendarItems={calendarItems} />
              <p className='form-text'>
                {content.available} : {availablePax !== null ? availablePax : 'Loading...'}
              </p>
            </>
          )}

          <AdditionalPaxFields
            additionalPax={additionalPax}
            counter={counter}
            onAddPax={handleAddPax}
            onRemovePax={handleRemovePax}
            onAdditionalPaxChange={handleAdditionalPaxChange}
            additionalPaxError={errors.additionalPax}
            mainPassenger={{ firstName: firstName, lastName: lastName }}
            showAddPax={showAddPax}
          />

          <FormControlLabel
            control={<Checkbox id='agreeTermsCheckbox' checked={agreeTerms} onChange={handleAgreeTermsChange} style={{ color: 'white' }} />}
            label={content.terms}
            className='form-text'
          />
          {errors.terms && <p>⚠️ {errors.terms}</p>}

          <button className='btn form-btn-submit' onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress sx={{ color: '#fff' }} /> : content.submitBooking}
          </button>

          {errors.formSubmission && <p> ⚠️ {errors.formSubmission}</p>}
        </>
      ) : (
        <div className='submit-message'>
          <p>{content.submittedBooking}</p>
        </div>
      )}
    </div>
  );
}

import { ReservationErrorMessages, ReservationFormValues, Pax } from 'Form';
import React, { useState } from 'react';
import { InputField } from './FormInputs';
import { DateField } from './FormDateField';
import { AdditionalPaxFields } from './FormAdditionalPax';
import '../../styles/Form.scss';
import { content } from '../../contents/Form';

export default function ReservationForm() {
  const [formValues, setFormValues] = useState<ReservationFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    additionalPax: [] as Pax[],
    counter: 1,
    selectedDate: null as Date | null,
  });

  const [errors, setErrors] = useState<ReservationErrorMessages>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectedDate: '',
    additionalPax: '',
  });

  const { firstName, lastName, email, phone, additionalPax, counter, selectedDate } = formValues;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
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

  const handleSubmit = () => {
    const newErrors: ReservationErrorMessages = {
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
      // Handle form submission logic here
      console.log('Form submitted!', formValues);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className='form'>
      <h2>{content.reservationTitle}</h2>
      <InputField
        name='firstName'
        placeholder={content.field.firstname}
        value={firstName}
        error={errors.firstName}
        onChange={handleInputChange}
      />
      <InputField
        name='lastName'
        placeholder={content.field.lastname}
        value={lastName}
        error={errors.lastName}
        onChange={handleInputChange}
      />
      <InputField
        name='email'
        placeholder={content.field.email}
        type='email'
        value={email}
        error={errors.email}
        onChange={handleInputChange}
      />
      <InputField
        name='phone'
        placeholder={content.field.phone}
        type='tel'
        value={phone}
        error={errors.phone}
        onChange={handleInputChange}
      />
      <div className='form-block'></div>
      <DateField
        selectedDate={selectedDate}
        onChange={handleDateChange}
        error={errors.selectedDate}
      />

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
        {content.submit}
      </button>
    </div>
  );
}

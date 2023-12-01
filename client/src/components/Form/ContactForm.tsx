import { ContactErrorMessages, ContactFormValues } from 'Form';
import React, { useState } from 'react';
import { InputField } from './formComponents/FormInputs';
import '../../styles/Form.scss';
import { content } from '../../contents/Form';
import { TextAreaField } from './formComponents/FormTextArea';

export default function ContactForm() {
  const [formValues, setFormValues] = useState<ContactFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<ContactErrorMessages>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const { firstName, lastName, email, phone, message } = formValues;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = () => {
    const newErrors: ContactErrorMessages = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
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

    if (!message) {
      newErrors.message = content.error.mandatory;
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
      <h2>{content.contactTitle}</h2>
      <InputField name='firstName' placeholder={content.field.firstname} value={firstName} error={errors.firstName} onChange={handleInputChange} />
      <InputField name='lastName' placeholder={content.field.lastname} value={lastName} error={errors.lastName} onChange={handleInputChange} />
      <InputField name='email' placeholder={content.field.email} type='email' value={email} error={errors.email} onChange={handleInputChange} />
      <InputField name='phone' placeholder={content.field.phone} type='tel' value={phone} error={errors.phone} onChange={handleInputChange} />

      <TextAreaField
        name='message'
        placeholder={content.field.message}
        // type='message'
        value={message}
        error={errors.message}
        onChange={handleInputChange}
      />

      <button className='form-btn-submit' onClick={handleSubmit}>
        {content.submit}
      </button>
    </div>
  );
}

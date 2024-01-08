import { FormContactErrorMessages, FormContactValues } from 'FormTypes';
import React, { useState } from 'react';
import { InputField } from './formComponents/FormInputs';
import '../../styles/Form.scss';
import { content } from '../../contents/Form';
import { TextAreaField } from './formComponents/FormTextArea';
import { usePost } from '../../utils/usePost';

export default function ContactForm() {
  const [formValues, setFormValues] = useState<FormContactValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormContactErrorMessages>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const { firstName, lastName, email, phone, message } = formValues;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+|0)[0-9]{7,}$/; // Should be only numbers, should begin with 0 or +
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  // save data in DB + send email recaps
  const saveData = usePost('/contact/create', formValues);
  const sendRecap = usePost('/contact/recap', formValues);

  const saveSendContact = async () => {
    try {
      await saveData();
      await sendRecap();
    } catch (error) {
      console.error('Contactform Failed to submit:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    const newErrors: FormContactErrorMessages = {
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
      try {
        await saveSendContact();
        setSubmitted(true);
      } catch (error) {
        console.error('Contactform Failed to submit:', error);
        setErrors({
          ...newErrors,
          formSubmission: 'There was something wrong with submitting the form. Please try again later or contact us.',
        });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className='form'>
      <h2>{content.contactTitle}</h2>

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

          <TextAreaField
            name='message'
            placeholder={content.field.message}
            // type='message'
            value={message}
            error={errors.message}
            onChange={handleInputChange}
          />

          <button className='btn form-btn-submit' onClick={handleSubmit}>
            {content.submitContact}
          </button>
          {errors.formSubmission && <p> ⚠️ {errors.formSubmission}</p>}
        </>
      ) : (
        <div className='submit-message'>
          <p>{content.submittedContact}</p>
        </div>
      )}
    </div>
  );
}

import React from 'react';

import '../styles/Contact.scss';

import { content } from '../contents/Contact';

import ContactForm from '../components/Form/ContactForm';

export default function Contact() {
  return (
    <div className='page'>
      <p className='contact-section'>{content.messageInfo}</p>

      <ContactForm />
    </div>
  );
}

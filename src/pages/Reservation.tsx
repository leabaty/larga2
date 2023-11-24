import React from 'react';

import { content } from '../contents/Reservation';

import Form from '../components/Form/Form';

export default function Reservation() {
  return (
    <div className='page'>
      <h1>{content.title}</h1>
      <Form />
    </div>
  );
}

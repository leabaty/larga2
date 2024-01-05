import React from 'react';

import '../styles/Booking.scss';

import { content } from '../contents/Booking';

import BookingForm from '../components/Form/BookingForm';
import { CheckListLogo } from '../contents/images/bookingLogos';

export default function Booking() {
  const logoColor = '#3bafa3';
  const checkListLogoColor = '#fdfeee';
  return (
    <div className='page'>
      <h1>{content.title}</h1>
      <div className='res-tiles'>
        {content.tiles.map((item, index) => (
          <div key={index}>
            <div className='res-img'>
              {React.createElement(item.img, {
                color: logoColor,
                size: '30',
              })}
            </div>

            <p className='res-text'>{item.name}</p>
          </div>
        ))}
      </div>
      <BookingForm />

      <div className='res-checklist'>
        <h2>{content.checkListTitle}</h2>
        {content.checkList.map((item, index) => (
          <div key={index} className='res-checklist-item'>
            <CheckListLogo color={checkListLogoColor} size='20' />
            <p className='res-checklist-txt'>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';

import '../styles/Reservation.scss';

import { content } from '../contents/Reservation';

import ReservationForm from '../components/Form/ReservationForm';
import { CheckListLogo } from '../contents/images/reservationLogos';

export default function Reservation() {
  const logoColor = '#3bafa3';
  const checkListLogoColor = '#fdfeee';
  return (
    <div className='page'>
      <h1>{content.title}</h1>
      <div className='res-tiles'>
        {content.tiles.map((item, index) => (
          <>
            <div key={index}>
              <div className='res-img'>
                {React.createElement(item.img, {
                  color: logoColor,
                  size: '30',
                })}
              </div>

              <p className='res-text'>{item.name}</p>
            </div>
          </>
        ))}
      </div>
      <ReservationForm />

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

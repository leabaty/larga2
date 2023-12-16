import React from 'react';

import '../styles/Reservation.scss';

import { content } from '../contents/Reservation';

import ReservationForm from '../components/Form/ReservationForm';
import { CheckListLogo } from '../contents/images/reservationLogos';

export default function Reservation() {
  const logoColor = '#fff';
  return (
    <div className='page'>
      <h1>{content.title}</h1>
      <div className='res-tiles'>
        {content.tiles.map((item, index) => (
          <>
            <div className='res-tile-header' key={index}>
              <div className='res-img'>
                {React.createElement(item.img, {
                  color: logoColor,
                  size: '30',
                })}
              </div>
              <div className='res-tile'>
                <p className='res-text'>{item.name}</p>{' '}
              </div>
            </div>
          </>
        ))}
      </div>
      <ReservationForm />

      <div className='res-checklist'>
        <h2>{content.checkListTitle}</h2>
        {content.checkList.map((item, index) => (
          <div key={index} className='res-checklist-item'>
            <CheckListLogo color='#001f36' size='20' />
            <p className='res-checklist-txt'>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

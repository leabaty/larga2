import React from 'react';
import '../styles/Answer.scss';
import { AdditionalPax, Booking } from 'ApiTypes/booking';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const BookingRecap: React.FC<{
  booking: Booking;
}> = ({ booking }) => {
  // Destructure values from the booking object
  const { selectedDate, firstName, lastName, phone, email, additionalPax, counter } = booking;

  const selectedDateObject = new Date(selectedDate);
  const formattedDate = format(selectedDateObject, 'EEEE d MMMM yyyy', { locale: fr });

  const formattedAddPax = additionalPax.map((pax: AdditionalPax) => `${pax.firstName} ${pax.lastName}`).join(', ');

  return (
    <div>
      <ul className='bkg-list'>
        <li className='bkg-item'>📅 {formattedDate}</li>
        <li className='bkg-item'>
          👤 {firstName} {lastName}
        </li>
        <li className='bkg-item'>📞 {phone}</li>
        <li className='bkg-item'>✉️ {email}</li>

        {!additionalPax && (
          <li className='bkg-item'>
            👥 {counter} participants, dont {formattedAddPax}
          </li>
        )}
      </ul>
    </div>
  );
};

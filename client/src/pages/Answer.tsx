import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Answer.scss';
import { content } from '../contents/Answer';
import useAnswer from '../utils/useAnswer';
import { Booking } from 'ApiTypes/booking';
import useBooking from '../utils/useBooking';
import { BookingRecap } from '../components/BookingRecap';

export default function Answer() {
  const { id: bookingId } = useParams<{ id?: string }>();
  const [submitted, setSubmitted] = useState(false);
  const [bookingUndefined, setBookingUndefined] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<Booking>();

  const answerAPI = useAnswer();
  const bookingAPI = useBooking();

  const handleConfirm = async () => {
    try {
      if (!bookingId) {
        setBookingUndefined(true);
        return;
      }
      await answerAPI.sendPostRequest('/answer/confirm', bookingId);
      setSubmitted(true);
    } catch (error) {
      console.error('Confirmation failed:', error);
    }
  };

  const handleCancel = async () => {
    try {
      if (!bookingId) {
        setBookingUndefined(true);
        return;
      }

      await answerAPI.sendPostRequest('/answer/cancel', bookingId);
      setSubmitted(true);
    } catch (error) {
      console.error('Cancellation failed:', error);
    }
  };

  // check if booking is undefined or has no results, or get the booking info
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!bookingId) {
          setBookingUndefined(true);
          return undefined;
        }

        const response = await bookingAPI.sendGetRequest('/answer/get', bookingId);
        setBookingDetails(response);

        if (!response) {
          setBookingUndefined(true);
          return undefined;
        }

        return bookingDetails;
      } catch (error) {
        console.error('Error fetching data:', error);
        setBookingUndefined(true);
        return undefined;
      }
    };

    fetchData();
  }, [bookingId]);

  return (
    <div className='page'>
      <h1>{content.title}</h1>

      {bookingUndefined ? (
        <div className='answer'>
          <p className='answer-txt'>{content.undefinedMessage}</p>
        </div>
      ) : !submitted ? (
        <div className='answer'>
          <p className='answer-txt'>{content.info}</p>

          <p className='answer-warning'>{content.warning}</p>

          <p className='answer-undertitle'>{content.recap}</p>

          {bookingDetails && <BookingRecap booking={bookingDetails} />}

          <button className='btn answer-btn answer-btn-confirm' onClick={handleConfirm}>
            {content.confirm}
          </button>
          <button className='btn answer-btn answer-btn-cancel' onClick={handleCancel}>
            {content.cancel}
          </button>
        </div>
      ) : (
        <div className='answer'>
          <p>{content.exit}</p>
        </div>
      )}
    </div>
  );
}

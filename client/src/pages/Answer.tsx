import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Answer.scss';
import { content } from '../contents/Answer';
import useAnswer from '../utils/useAnswer';

export default function Answer() {
  const { id: reservationId } = useParams(); // Use useParams to get the reservationId from the URL
  const [submitted, setSubmitted] = useState(false);

  const confirm = useAnswer('/answer/confirm', reservationId || '');
  const cancel = useAnswer('/answer/cancel', reservationId || '');

  const handleConfirm = async () => {
    // Now, you can use the reservationId in your logic
    try {
      await confirm();
      console.log('Confirmed successfully!');
      setSubmitted(true);
    } catch (error) {
      console.error('Confirmation failed:', error);
    }
  };

  const handleCancel = async () => {
    // Now, you can use the reservationId in your logic
    try {
      await cancel();
      console.log('Cancelled successfully!');
      setSubmitted(true);
    } catch (error) {
      console.error('Cancellation failed:', error);
    }
  };

  useEffect(() => {
    // You can also use the reservationId in any other logic or API calls needed on component mount
    console.log('Current Reservation ID:', reservationId);
  }, [reservationId]);

  return (
    <div className='page'>
      <h1>{content.title}</h1>

      {!submitted ? (
        <>
          <p className='answer-text'>{content.info}</p>

          <p className='answer-warning'>{content.warning}</p>

          <p className='answer-text'>{content.recap}</p>

          <div className='answer-btns'>
            <button className='answer-btn' onClick={handleConfirm}>
              {content.confirm}
            </button>
            <button className='answer-btn' onClick={handleCancel}>
              {content.cancel}
            </button>
          </div>
        </>
      ) : (
        <div className='answer-text'>
          <p>{content.exit}</p>
        </div>
      )}
    </div>
  );
}

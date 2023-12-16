import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../styles/Form.scss';
import { Calendar } from 'ApiTypes/calendar';

const getDisabledDates = (calendarItems: Calendar): Date[] => {
  const disabledDates = calendarItems.filter((item) => !item.enabled);
  const disabledDateValues = disabledDates.map((item) => item.date);

  return disabledDateValues;
};

export const DateField: React.FC<{
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  error: string | undefined;
  calendarItems: Calendar;
}> = ({ selectedDate, onChange, error, calendarItems }) => {
  const disabledDates = getDisabledDates(calendarItems);

  return (
    <div className='form-block'>
      <label>
        Date:
        <DatePicker
          className='form-date'
          selected={selectedDate}
          onChange={onChange}
          dateFormat='dd/MM/yyyy'
          minDate={new Date()}
          excludeDates={disabledDates}
          required
        />
      </label>
      {error && <p>⚠️ {error}</p>}
    </div>
  );
};

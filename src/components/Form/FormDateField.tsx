import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/Form.scss';

export const DateField: React.FC<{
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  error: string | undefined;
}> = ({ selectedDate, onChange, error }) => (
  <div className='form-block'>
    <label>
      Date :
      <DatePicker
        className='form-date'
        selected={selectedDate}
        onChange={onChange}
        dateFormat='dd/MM/yyyy'
        minDate={new Date()}
        excludeDates={[] /* Pass the array of disabled dates here */}
        required
      />
    </label>
    {error && <p>{error}</p>}
  </div>
);

import React from 'react';
import '../../../styles/Form.scss';

// types
import { Calendar } from 'ApiTypes/calendar';

// Mui
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import fr from 'date-fns/locale/fr';
import { TextField } from '@mui/material';

// styling

const getDisabledDates = (calendarItems: Calendar): Date[] => {
  const disabledDates = calendarItems.filter((item) => !item.enabled);
  const disabledDateValues = disabledDates.map((item) => new Date(item.date));

  return disabledDateValues;
};

export const DateField: React.FC<{
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  error: string | undefined;
  calendarItems: Calendar;
}> = ({ selectedDate, onChange, error, calendarItems }) => {
  const disabledDates = getDisabledDates(calendarItems);

  const color = '#fdfeee';

  return (
    <div className='form-block'>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
        <DatePicker
          label='Date'
          timezone='system'
          value={selectedDate}
          onChange={onChange}
          minDate={new Date()}
          shouldDisableDate={(date) => disabledDates.some((disabledDate) => date.toDateString() === disabledDate.toDateString())}
          sx={{
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { border: `1px solid ${color}`, borderRadius: '15px' },
            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { border: `1px solid ${color}`, borderRadius: '15px' },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: `1px solid ${color}`, borderRadius: '15px' },
            '& .Mui-focused': { color: '#fdfeee' },
            input: { color },
            label: { color },
            svg: { color },
          }}
        />
      </LocalizationProvider>

      {error && <p>⚠️ {error}</p>}
    </div>
  );
};

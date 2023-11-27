import { ContactFormValues } from 'Form';
import React from 'react';
import '../../styles/Form.scss';

export const TextAreaField: React.FC<{
  name: keyof ContactFormValues;
  placeholder: string;
  required?: boolean;
  value: string | undefined;
  error: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ name, placeholder, required = true, value, error, onChange }) => (
  <div>
    <label>
      <textarea
        className='form-input'
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      {error && <p>{error}</p>}
    </label>
  </div>
);

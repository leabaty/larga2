import { FormValues } from 'FormTypes';
import React from 'react';
import '../../../styles/Form.scss';

export const InputField: React.FC<{
  name: keyof FormValues;
  placeholder: string;
  type?: string;
  required?: boolean;
  value: string | undefined;
  error: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ name, placeholder, type = 'text', required = true, value, error, onChange }) => (
  <div>
    <label>
      <input className='form-input' type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required={required} />
      {error && <p>⚠️ {error}</p>}
    </label>
  </div>
);

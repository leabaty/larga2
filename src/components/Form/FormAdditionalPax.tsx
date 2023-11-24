import { Pax } from 'Form';
import React from 'react';
import '../../styles/Form.scss';

import { FaCirclePlus, FaCircleMinus, FaPerson } from 'react-icons/fa6';

import { content } from '../../contents/Form';

export const AdditionalPaxFields: React.FC<{
  additionalPax: Pax[];
  counter: number;
  onAddPax: () => void;
  onRemovePax: () => void;
  onAdditionalPaxChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  additionalPaxError: string | undefined;
  mainPassenger: { firstName: string; lastName: string };
}> = ({
  additionalPax,
  counter,
  onAddPax,
  onRemovePax,
  onAdditionalPaxChange,
  additionalPaxError,
  mainPassenger,
}) => (
  <div className='form-block'>
    <p>{`${counter} ${content.field.addpax}`}</p>

    {mainPassenger.firstName && mainPassenger.lastName && (
      <div className='form-inputs'>
        <button className='form-btn-pax' onClick={onAddPax}>
          <FaCirclePlus /> <FaPerson />
        </button>
        {additionalPax.length > 0 && (
          <button className='form-btn-pax' onClick={onRemovePax}>
            <FaCircleMinus /> <FaPerson />
          </button>
        )}
      </div>
    )}
    {additionalPax.map((pax, index) => (
      <div className='form-inputs' key={index}>
        <p className='form-addpax'>{index + 1}</p>

        <input
          className='form-input'
          type='text'
          name='firstName'
          placeholder={content.field.firstname}
          value={pax.firstName}
          onChange={(e) => onAdditionalPaxChange(index, e)}
          required={index < counter}
        />

        <input
          className='form-input'
          type='text'
          name='lastName'
          placeholder={content.field.lastname}
          value={pax.lastName}
          onChange={(e) => onAdditionalPaxChange(index, e)}
          required={index < counter}
        />
      </div>
    ))}

    {additionalPaxError && <p>{additionalPaxError}</p>}
  </div>
);

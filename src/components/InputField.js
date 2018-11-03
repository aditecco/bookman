
/******************
  InputField
*******************/

// js
import React from 'react';

// components

// assets

// styles

function InputField(props) {
  const {
    className,
    inputLabel,
    onChange,
    placeholder
  } = props;

  return (
    <>
      <label htmlFor={className}>
        {inputLabel}
      </label>

      <input
        type="text"
        className={className}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
}

export default InputField;

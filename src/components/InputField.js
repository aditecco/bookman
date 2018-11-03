
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
    placeholder,
    value
  } = props;

  return (
    <>
      <label htmlFor={className}>
        {inputLabel}
      </label>

      <input
        className={className}
        onChange={onChange}
        placeholder={placeholder}
        type="text"
        value={value}
      />
    </>
  );
}

export default InputField;

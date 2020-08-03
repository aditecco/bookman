/******************
  InputField
*******************/

// js
import React from "react";

// components

// assets

// styles

function InputField(props) {
  const { className, label, onChange, placeholder, value, children } = props;

  const root = "InputField";

  return (
    <div className={`${root}`}>
      <label htmlFor={className}>{label}</label>

      <input
        className={className}
        onChange={onChange}
        placeholder={placeholder}
        type="text"
        value={value}
      />

      {children}
    </div>
  );
}

export default InputField;

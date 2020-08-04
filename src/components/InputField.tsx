/******************
  InputField
*******************/

// js
import React, { ReactNode, useState } from "react";

// components

// assets

// styles

interface IOwnProps {
  className?: string;
  label?: string;
  onChange?: (key: string) => void;
  placeholder?: string;
  children?: ReactNode;
}

function InputField({
  className,
  label,
  onChange,
  placeholder,
  children,
}: IOwnProps) {
  const root = "InputField";

  const [value, setValue] = useState("");

  function handleChange(e) {
    const { value } = e.currentTarget;

    if (onChange) {
      onChange(value);
    }

    setValue(value);
  }

  return (
    <div className={`${root}`}>
      <label htmlFor={className}>{label}</label>

      <input
        className={className}
        onChange={handleChange}
        placeholder={placeholder}
        type="text"
        value={value}
      />

      {children}
    </div>
  );
}

export default InputField;

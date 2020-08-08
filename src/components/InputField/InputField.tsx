/******************
  InputField
*******************/

// js
import React, { ReactNode, useState, ChangeEvent } from "react";

// components

// assets

// styles

interface IOwnProps {
  children?: ReactNode;
  className?: string;
  label?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
}

function InputField({
  className,
  label,
  onChange,
  placeholder,
  children,
  value,
}: IOwnProps) {
  const root = "InputField";

  return (
    <div className={`${root}`}>
      <label htmlFor={className}>{label}</label>

      <input
        className={className}
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={e => onChange(e)}
      />

      {children}
    </div>
  );
}

export default InputField;

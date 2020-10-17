/******************
  InputField
*******************/

// js
import React, { ReactNode, useState, ChangeEvent } from "react";

// components

// assets

// styles

type TAdditionalInputProps = JSX.IntrinsicElements["input"];
interface IOwnProps {
  children?: ReactNode;
  className?: string;
  label?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
}

type EnrichedOwnProps = IOwnProps & TAdditionalInputProps;

function InputField({
  className,
  label,
  onChange,
  placeholder,
  children,
  value,
  ...additionalInputProps
}: EnrichedOwnProps) {
  const root = "InputField";

  return (
    <div className={`${root}`}>
      <label htmlFor={className}>{label}</label>

      <input
        {...additionalInputProps}
        className={className}
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={e => onChange(e)}
      />

      {children && <div className="InputFieldChildren">{children}</div>}
    </div>
  );
}

export default InputField;

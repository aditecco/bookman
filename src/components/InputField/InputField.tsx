/******************
 InputField
 *******************/

// js
import React, { ChangeEvent, ReactNode } from "react";

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
        type="text"
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e)}
        {...additionalInputProps}
      />

      {children && <div className="InputFieldChildren">{children}</div>}
    </div>
  );
}

export default InputField;

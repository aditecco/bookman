/* ---------------------------------
SearchWidget
--------------------------------- */

import React from "react";
import InputField from "../InputField";
import BaseButton from "../BaseButton";

export default function SearchWidget({
  className,
  closeIcon,
  onChange,
  onSearchReset,
  placeholder,
}) {
  return (
    <div className="SearchWidget">
      <InputField
        className={className}
        placeholder={placeholder}
        onChange={onChange}
      >
        <BaseButton
          className="searchInputClearButton button--naked"
          onClick={onSearchReset}
        >
          <i className="material-icons">{closeIcon}</i>
        </BaseButton>
      </InputField>
    </div>
  );
}

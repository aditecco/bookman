/* ---------------------------------
SearchWidget
--------------------------------- */

import React, { ChangeEvent } from "react";
import InputField from "../InputField/InputField";
import BaseButton from "../BaseButton/BaseButton";

export default function SearchWidget({ closeIcon, onSearchReset, ...props }) {
  return (
    <div className="SearchWidget">
      {/* TODO */}
      <InputField
        {...(props as {
          value: string;
          onChange: (event: ChangeEvent<HTMLInputElement>) => void;
        })}
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

/* ---------------------------------
SearchWidget
--------------------------------- */

import React from "react";
import InputField from "../InputField";
import BaseButton from "../BaseButton";

export default function SearchWidget({ closeIcon, onSearchReset, ...props }) {
  return (
    <div className="SearchWidget">
      {/* TODO */}
      <InputField {...(props as { value: string })}>
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

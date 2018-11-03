
/******************
  BaseButton
*******************/

// js
import React from 'react';

// components

// assets

// styles


function BaseButton(props) {
  const {
    className,
    handleSubmit,
    label
  } = props;

  return (
    <a
      className={className}
      href='#'
      onClick={handleSubmit}
    >
      {label}
    </a>
  );
}

export default BaseButton;

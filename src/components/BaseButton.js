
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
    onClick,
    label
  } = props;

  return (
    <a
      className={className}
      href='#'
      onClick={onClick}
    >
      {label}
    </a>
  );
}

export default BaseButton;

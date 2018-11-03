
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
    onKeyDown,
    label
  } = props;

  return (
    <a
      className={className}
      href='#'
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {label}
    </a>
  );
}

export default BaseButton;

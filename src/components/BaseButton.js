
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

  const root = 'BaseButton';

  return (
    <a
      className={`${root} ${className}`}
      href='#'
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {label}
    </a>
  );
}

export default BaseButton;

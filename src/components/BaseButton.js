
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
    label,
    href,
  } = props;

  const root = 'BaseButton';

  return (
    <a
      className={`${root} ${className}`}
      href={href}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {label}
    </a>
  );
}

export default BaseButton;

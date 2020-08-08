
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
    style,
    children,
  } = props;

  const root = 'BaseButton';

  return (
    <a
      className={`${root} ${className}`}
      href={href}
      onClick={onClick}
      onKeyDown={onKeyDown}
      style={style}
    >
      {label}
      {children}
    </a>
  );
}

export default BaseButton;

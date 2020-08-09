/******************
  BaseButton
*******************/

// js
import React, { ReactElement, ReactEventHandler, ReactChildren } from "react";

// components

// assets

// styles

interface IOwnProps {
  // TODO improve
  className?: string | "button--naked" | "button--outline";
  onClick: ReactEventHandler;
  onKeyDown?: ReactEventHandler;
  label?: string;
  href?: string;
  style?;
  children?;
}

function BaseButton({
  className,
  onClick,
  onKeyDown,
  label,
  href,
  style,
  children,
}: IOwnProps): ReactElement {
  const root = "BaseButton";

  return (
    // TODO convert to <button>
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

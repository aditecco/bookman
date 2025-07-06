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
  onClick?: ReactEventHandler;
  onKeyDown?: ReactEventHandler;
  label?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  style?;
  children?;
}

function BaseButton({
  className,
  onClick,
  onKeyDown,
  label,
  href,
  type = "button",
  style,
  children,
}: IOwnProps): ReactElement {
  const root = "BaseButton";

  // Use button for form submissions, anchor for navigation
  if (type === "submit" || !href) {
    return (
      <button
        className={`${root} ${className}`}
        onClick={onClick}
        onKeyDown={onKeyDown}
        type={type}
        style={style}
      >
        {label}
        {children}
      </button>
    );
  }

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

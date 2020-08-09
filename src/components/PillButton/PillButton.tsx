/******************
  PillButton
*******************/

import React, { ReactElement, ReactEventHandler } from "react";
const root = "PillButton";

interface IOwnProps {
  label: string;
  href?: string;
  onClick?: ReactEventHandler;
}

function PillButton({ label, href, onClick }: IOwnProps): ReactElement {
  return (
    <a className={root} href={href} onClick={onClick}>
      {label}
    </a>
  );
}

export default PillButton;

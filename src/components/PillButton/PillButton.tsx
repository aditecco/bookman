/* ---------------------------------
PillButton
--------------------------------- */

import React, { ReactElement, ReactEventHandler } from "react";
import { ITag } from "../../types/bookman";
const root = "PillButton";

type TPropsFromTag = Partial<ITag>;

interface IOwnProps extends TPropsFromTag {
  _key?: string;
  label: string;
  href?: string;
  onClick?: ReactEventHandler;
  eventClass?: string;
}

function PillButton({
  label,
  href,
  onClick,
  eventClass,
}: IOwnProps): ReactElement {
  return (
    <a className={`${root} ${eventClass || ""}`} href={href} onClick={onClick}>
      {label}
    </a>
  );
}

export default PillButton;

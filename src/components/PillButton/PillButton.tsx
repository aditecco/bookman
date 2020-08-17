/* ---------------------------------
PillButton
--------------------------------- */

import React, {
  ReactElement,
  ReactEventHandler,
  Children,
  ReactChildren,
  ReactNode,
} from "react";
import { ITag } from "../../types/bookman";
const root = "PillButton";

type TPropsFromTag = Partial<ITag>;

interface IOwnProps extends TPropsFromTag {
  _key?: string;
  label: string;
  href?: string;
  onClick?: ReactEventHandler;
  eventClass?: string;
  children?: ReactNode;
}

function PillButton({
  label,
  href,
  onClick,
  eventClass,
  children,
}: IOwnProps): ReactElement {
  return (
    <a className={`${root} ${eventClass || ""}`} href={href} onClick={onClick}>
      {label}
      {children}
    </a>
  );
}

export default PillButton;

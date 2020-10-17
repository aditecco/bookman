/* ---------------------------------
PillButton
--------------------------------- */

import React, {
  CSSProperties,
  ReactElement,
  ReactEventHandler,
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
  style?: CSSProperties;
}

function PillButton({
  label,
  href,
  onClick,
  eventClass,
  children,
  style,
}: IOwnProps): ReactElement {
  return (
    <a
      className={`${root} ${eventClass || ""}`}
      href={href}
      onClick={onClick}
      style={style}
    >
      {label}
      {children}
    </a>
  );
}

export default PillButton;

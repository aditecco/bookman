/* ---------------------------------
InfoMessage
--------------------------------- */

import React, { ReactElement } from "react";
import MaterialIcon from "../MaterialIcon/MaterialIcon";

interface IOwnProps {
  icon: string;
  body: string;
  type?: "info" | "warning" | "error";
}

export default function InfoMessage({
  type = "info",
  icon,
  body,
}: IOwnProps): ReactElement {
  return (
    <div className={"InfoMessage InfoMessage--" + type}>
      <p className="InfoMessageContent">
        <MaterialIcon icon={icon} />
        {body}
      </p>
    </div>
  );
}

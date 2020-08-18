/* ---------------------------------
InfoMessage
--------------------------------- */

import React, { ReactElement } from "react";
import MaterialIcon from "../MaterialIcon/MaterialIcon";

export enum InfoMessageTypes {
  info = "info",
  warning = "warning",
  error = "error",
}

interface IOwnProps {
  body: string;
  type?: InfoMessageTypes;
}

export default function InfoMessage({
  type = InfoMessageTypes.info,
  body,
}: IOwnProps): ReactElement {
  function UI(type: string, icon: string, body: string) {
    return (
      <div className={"InfoMessage InfoMessage--" + type}>
        <p className="InfoMessageContent">
          <MaterialIcon icon={icon} />
          {body}
        </p>
      </div>
    );
  }

  switch (type) {
    case InfoMessageTypes.warning: {
      return UI(InfoMessageTypes.warning, "warning", body);
    }

    case InfoMessageTypes.error: {
      return UI(InfoMessageTypes.error, "error", body);
    }

    case InfoMessageTypes.info:
    default: {
      return UI(InfoMessageTypes.info, "info_outline", body);
    }
  }
}

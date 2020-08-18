/* ---------------------------------
InfoMessage
--------------------------------- */

import React, { ReactElement } from "react";
import MaterialIcon from "../MaterialIcon/MaterialIcon";

interface IOwnProps {
  icon: string;
  body: string;
}

export default function InfoMessage({ icon, body }: IOwnProps): ReactElement {
  return (
    <div className="InfoMessage">
      <p className="InfoMessageContent">
        <MaterialIcon icon={icon} />
        {body}
      </p>
    </div>
  );
}

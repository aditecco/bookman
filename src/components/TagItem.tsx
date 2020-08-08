/******************
  TagItem
*******************/

import React, { ReactElement, ReactEventHandler } from "react";

interface IOwnProps {
  name: string;
  count?: string;
  onClick?: ReactEventHandler;
}

function TagItem({ name, count, onClick }: IOwnProps): ReactElement {
  const root = "TagItem";

  return (
    <a href="#" className={root} onClick={onClick}>
      <span className={root + "Name"}>{name}</span>

      {count && <span className={root + "Count"}>{count}</span>}
    </a>
  );
}

export default TagItem;

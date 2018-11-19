
/******************
  TagItem
*******************/

// js
import React from 'react';


function TagItem(props) {
  const {
    name,
    count,
    onClick
  } = props;

  const root = 'TagItem';

  return (
    <a
      href="#"
      className={root}
      onClick={onClick}
    >
      <span className={root + "Name"}>
        {name}
      </span>

      <span className={root + "Count"}>
        {
          count !== null || undefined ?
          ` (${count})`
          :
          null
        }
      </span>
    </a>
  );
}

export default TagItem;

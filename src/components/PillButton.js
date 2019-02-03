
/******************
  PillButton
*******************/

import React from 'react';
const root = 'PillButton';


function PillButton(props) {
    const {
      label,
      href,
      onClick
    } = props;

    return (
        <a
          className={root}
          href={href}
          onClick={onClick}
        >
          {label}
        </a>
    );
}

export default PillButton;

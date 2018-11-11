
/******************
  PillButton
*******************/

import React from 'react';
const id = 'PillButton';


function PillButton(props) {
    const {
        label,
        href,
        onClick
    } = props;

    return (
        <a
            className={id}
            href={href}
            onClick={onClick}
        >
          {label}
        </a>
    );
}

export default PillButton;

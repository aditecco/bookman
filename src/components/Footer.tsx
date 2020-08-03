/******************
  Footer
*******************/

import React from "react";

function Footer(props) {
  const root = "Footer";

  return (
    <footer className={root}>
      <div className={`wrapper ${root}Wrapper`}>
        <small className={root + "Info"}>{props.footerInfo}</small>
      </div>

      {props.children}
    </footer>
  );
}

export default Footer;

/******************
  Footer
*******************/

import React from "react";

function Footer({ footerInfo, children }) {
  const root = "Footer";

  return (
    <footer className={root}>
      <div className={`wrapper ${root}Wrapper`}>
        <small className={root + "Info"}>{footerInfo}</small>
      </div>

      {children}
    </footer>
  );
}

export default Footer;

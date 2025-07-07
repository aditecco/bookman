/******************
 Footer
 *******************/

import React, { ReactElement, ReactNode } from "react";

function Footer({
  footerInfo = `BookMan
  ${process.env.NEXT_PUBLIC_APP_VERSION} ${
    process.env.BUILD_ID && process.env.BUILD_ID.substring(0, 4)
  }`,
  children,
}: {
  footerInfo?: string;
  children?: ReactNode;
}): ReactElement {
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

/* ---------------------------------
Navbar
--------------------------------- */

import React from "react";
import MaterialIcon from "../MaterialIcon/MaterialIcon";
import { Link } from "react-router-dom";

function Navbar(props) {
  const root = "Navbar";

  return (
    <header className={root}>
      <div className={`wrapper ${root}Wrapper`}>
        <Link to="/">
          <div className={root + "LogoContainer"}>
            <MaterialIcon icon="link" className={root + "Logo"} />
            <h1 className={root + "LogoType"}>bookman</h1>
          </div>
        </Link>

        <nav className={root + "Menu"}>{props.children}</nav>
      </div>
    </header>
  );
}

export default Navbar;

/******************
	Navbar
*******************/

import React from "react";
import PillButton from "../PillButton/PillButton";
import MaterialIcon from "../MaterialIcon/MaterialIcon";

function Navbar(props) {
  const root = "Navbar";
  const { debug } = props;

  return (
    <header className={root}>
      <div className={`wrapper ${root}Wrapper`}>
        <div className={root + "LogoContainer"} onClick={props.onLogoClick}>
          <MaterialIcon icon="link" className={root + "Logo"} />
          <h1 className={root + "LogoType"}>BookMan</h1>
        </div>

        <nav className={root + "MainNav"}>
          {debug && (
            <PillButton
              href="#"
              label="Reset"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
                console.clear();
                console.info("App reset.");
              }}
            />
          )}

          {props.children}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

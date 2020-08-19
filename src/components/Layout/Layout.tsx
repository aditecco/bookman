/* ---------------------------------
Layout
--------------------------------- */

import React, { ReactElement, ReactNode } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import MaterialIcon from "../MaterialIcon/MaterialIcon";

interface OwnProps {
  children?: ReactNode;
  root: string;
  hasNav?: boolean;
  hasFooter?: boolean;
}

export default function Layout({
  children,
  root,
  hasNav = true,
  hasFooter = true,
}: OwnProps): ReactElement {
  return (
    <div className={"Layout" + " " + root}>
      {hasNav && (
        <Navbar>
          <Link className="menuButton" to="/profile">
            <MaterialIcon icon="account_circle" />
          </Link>

          <Link className="menuButton" to="/settings">
            <MaterialIcon icon="settings" />
          </Link>
        </Navbar>
      )}

      <main className={root + "Content"}>{children}</main>

      {hasFooter && <Footer />}
    </div>
  );
}

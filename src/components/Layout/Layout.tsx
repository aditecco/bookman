/* ---------------------------------
Layout
--------------------------------- */

import React, { ReactElement, ReactNode, useContext } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import MaterialIcon from "../MaterialIcon/MaterialIcon";
import { SettingsContext } from "../../routes";

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
  const admin_mode = useContext(SettingsContext)?.[0]?.["admin_mode"] ?? false;

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

          {admin_mode && (
            <Link className="menuButton" to="/admin">
              <MaterialIcon icon="dashboard" />
            </Link>
          )}
        </Navbar>
      )}

      <main className={root + "Content"}>{children}</main>

      {hasFooter && <Footer />}
    </div>
  );
}

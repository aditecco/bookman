/* ---------------------------------
Layout
--------------------------------- */

import React, { ReactElement, ReactNode } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import MaterialIcon from "../MaterialIcon/MaterialIcon";
import Link from "next/link";
import classNames from "classnames";

interface OwnProps {
  children?: ReactNode;
  root?: LayoutTypes;
  hasNav?: boolean;
  hasFooter?: boolean;
}

type LayoutTypes =
  | "Settings"
  | "Profile"
  | "Home"
  | "Admin"
  | "BlankPage"
  | "Authentication";

export default function Layout({
  children,
  root,
  hasNav = true,
  hasFooter = true,
}: OwnProps): ReactElement {
  // const admin_mode = useContext(SettingsContext)?.[0]?.["admin_mode"] ?? false;

  return (
    <div className={classNames("Layout", root)}>
      {hasNav && (
        <Navbar>
          <Link className="menuButton" href="/profile">
            <MaterialIcon icon="account_circle" />
          </Link>

          <Link className="menuButton" href="/settings">
            <MaterialIcon icon="settings" />
          </Link>

          {0 && (
            <Link className="menuButton" href="/admin">
              <MaterialIcon icon="dashboard" />
            </Link>
          )}
        </Navbar>
      )}

      <main className={classNames("Content", root)}>{children}</main>

      {hasFooter && <Footer />}
    </div>
  );
}

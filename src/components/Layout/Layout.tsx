/* ---------------------------------
Layout
--------------------------------- */

import React, { ReactFragment, ReactElement } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
// import Navbar from "../Navbar/Navbar";
// import AppHeader from "../AppHeader/AppHeader";
// import AppFooter from "../AppFooter/AppFooter";

interface OwnProps {
  children?: ReactElement | any; // TODO
  root: string;
  selected?: number | undefined;
  hasNav?: boolean;
  hasHeader?: boolean;
  hasFooter?: boolean;
}

export default function Layout({
  children,
  root: rootClass,
  selected,
  hasNav = true,
  hasHeader = true,
  hasFooter = false,
}: OwnProps): ReactElement {
  return (
    <div className={"Layout" + " " + rootClass}>
      <Navbar />

      <main className={rootClass + "Content"}>{children}</main>

      <Footer />
    </div>
  );
}

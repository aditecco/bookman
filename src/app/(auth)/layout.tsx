/* ---------------------------------
Layout
--------------------------------- */

import React, { PropsWithChildren } from "react";
import LayoutComponent from "../../components/Layout/Layout";

type OwnProps = {};

export default function Layout({
  children,
}: PropsWithChildren<OwnProps>): React.JSX.Element {
  return (
    <LayoutComponent root={"Authentication"} hasNav={false}>
      {children}
    </LayoutComponent>
  );
}

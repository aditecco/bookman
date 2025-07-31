/* ---------------------------------
Layout
--------------------------------- */

import React, { PropsWithChildren } from "react";
import LayoutComponent from "../../components/Layout/Layout";
import AuthGuard from "../../components/AuthGuard";

type OwnProps = {};

export default function Layout({
  children,
}: PropsWithChildren<OwnProps>): React.JSX.Element {
  return (
    <AuthGuard requireAuth={false}>
      <LayoutComponent root={"Authentication"} hasNav={false}>
        {children}
      </LayoutComponent>
    </AuthGuard>
  );
}

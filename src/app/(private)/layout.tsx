"use client";

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
    <AuthGuard>
      <LayoutComponent root="Home" hasNav>
        {children}
      </LayoutComponent>
    </AuthGuard>
  );
}

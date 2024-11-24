"use client";

/* ---------------------------------
Layout
--------------------------------- */

import React, { PropsWithChildren } from "react";
import store from "../../store/store";
import { Provider } from "react-redux";
import LayoutComponent from "../../components/Layout/Layout";

type OwnProps = {};

export default function Layout({
  children,
}: PropsWithChildren<OwnProps>): React.JSX.Element {
  return (
    <Provider store={store}>
      <LayoutComponent root="Home" hasNav>
        {children}
      </LayoutComponent>
    </Provider>
  );
}

"use client";

/* ---------------------------------
Page
--------------------------------- */

import React, { PropsWithChildren } from "react";
import AuthForm from "../../../components/AuthForm/AuthForm";

type OwnProps = {};

export default function Page({}: PropsWithChildren<OwnProps>): React.JSX.Element {
  return (
    <>
      <AuthForm intent={"login"} actionHandler={() => {}} />
    </>
  );
}

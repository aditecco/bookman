/* ---------------------------------
Page
--------------------------------- */

import React, { PropsWithChildren } from "react";
import { ClientOnly } from "./client";

type OwnProps = {};

export default function Page({}: PropsWithChildren<OwnProps>): React.JSX.Element {
  return <ClientOnly />;
}

export function generateStaticParams() {
  return [{ slug: [""] }];
}

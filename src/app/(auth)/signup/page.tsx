/* ---------------------------------
Page
--------------------------------- */

import React, { PropsWithChildren } from "react";
import Link from "next/link";

type OwnProps = {};

export default function Page({}: PropsWithChildren<OwnProps>): React.JSX.Element {
  return (
    <div>
      yo
      <Link href={"/home"}>Home</Link>
    </div>
  );
}

/* ---------------------------------
Page
--------------------------------- */

import React from "react";
import Link from "next/link";

type OwnProps = {};

export default function Page(): React.JSX.Element {
  return (
    <div>
      yo
      <Link href={"/bookmarks"}>Home</Link>
    </div>
  );
}

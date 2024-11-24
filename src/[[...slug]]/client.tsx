"use client";

import dynamic from "next/dynamic";

const Home = dynamic(() => import("../app/(private)/home/page"), {
  ssr: false,
});

export function ClientOnly() {
  return <Home />;
}

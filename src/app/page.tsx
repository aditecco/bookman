/* ---------------------------------
Page
--------------------------------- */

import { redirect } from "next/navigation";

export default function Page() {
  // Redirect to login page
  redirect("/login");
}

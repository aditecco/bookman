import { redirect } from "next/navigation";

export default function Page() {
  // Redirect to bookmarks - AuthGuard will handle protection
  redirect("/bookmarks");
}

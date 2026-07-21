import { useEffect } from "preact/hooks";
import { authClient } from "@/client/auth.ts";

// if authenticated redirect
export default function LastVisitRedirect() {
  const session = authClient.useSession();
  useEffect(() => {
    const url = session
      ? localStorage.getItem("last_visited_url") ?? "/lists"
      : "/signup";
    location.assign(url);
  }, [session]);
  return null;
}

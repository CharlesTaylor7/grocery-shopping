import { useEffect } from "preact/hooks";
import { authClient } from "@/client/neon.ts";
import { redirectToLast } from "@/client/redirect.ts";

// if authenticated redirect
export default function LastVisitRedirect() {
  const session = authClient.useSession();
  useEffect(() => {
    if (session.data) redirectToLast();
  }, [session]);
  return null;
}

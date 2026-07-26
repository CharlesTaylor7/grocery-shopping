import { useEffect } from "react";
import { authClient } from "@/client/neon.ts";
import { lastVisitedUrl } from "@/client/redirect.ts";
import { useNavigate } from "react-router";

// if authenticated redirect
export default function LastVisitRedirect() {
  const session = authClient.useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (session.data) navigate(lastVisitedUrl());
  });
  return null;
}

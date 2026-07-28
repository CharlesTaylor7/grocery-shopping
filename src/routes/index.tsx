import { authClient } from "@/client/neon";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { lastVisitedUrl } from "@/client/redirect";


export default function Index() {
  const session = authClient.useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (session.isPending) return;
    if (session.data) navigate(lastVisitedUrl());
    else navigate("/auth/login");
  }, [navigate, session]);

  if (session.isPending) return "Logging in...";
  return "Redirecting...";
}

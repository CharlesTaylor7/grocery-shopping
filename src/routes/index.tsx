import { authClient } from "@/client/neon";
import { useEffect } from "react";
import { lastVisitedUrl } from "@/client/redirect";
import useNavigate from "@/useNavigate";


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

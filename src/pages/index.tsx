import { authClient } from "@/auth.ts";
import { useEffect } from "react";
import { lastVisitedUrl } from "@/redirect";
import {useNavigate} from "wouter";


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

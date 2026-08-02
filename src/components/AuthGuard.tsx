import { authClient } from "@/auth";
import { type ReactNode, useEffect } from "react";
import { AUTH_GUARD } from "@/config";
import { useNavigate } from "@tanstack/react-router";

export default function AuthGuard(props: { children: ReactNode }) {
  const session = authClient.useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (AUTH_GUARD && !session.isPending && !session.data) {
      navigate({ to: "/auth/login" });
    }
  }, [navigate, session]);
  if (!AUTH_GUARD || session.data) return props.children;
  if (session.isPending) return "Logging in...";
  return "Redirecting...";
}

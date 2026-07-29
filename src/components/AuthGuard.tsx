import { useEffect, } from "react";
import { Outlet } from "react-router";
import { authClient } from "@/client/neon";
import { useNavigate } from "react-router";
import { AUTH_GUARD } from "@/client/config";

export default function AuthGuard() {
  const session = authClient.useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (AUTH_GUARD && !session.isPending && !session.data) {
      navigate("/auth/login");
    }
  }, [navigate, session]);
  if (!AUTH_GUARD || session.data) return <Outlet />
  if (session.isPending) return "Logging in...";
  return "Redirecting...";
}

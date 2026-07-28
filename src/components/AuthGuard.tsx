import { useEffect, } from "react";
import { Outlet } from "react-router";
import { authClient } from "@/client/neon";
import { useNavigate } from "react-router";

export default function AuthGuard() {
  const session = authClient.useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (!session.isPending && !session.data) {
      navigate("/auth/login");
    }
  }, [navigate, session]);
  if (session.isPending) return "Logging in...";
  if (!session.data) return "Redirecting...";
  return <Outlet />
}

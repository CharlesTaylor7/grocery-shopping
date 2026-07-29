import { useEffect, type ReactNode, } from "react";
import { authClient } from "@/client/neon";
import { AUTH_GUARD } from "@/client/config";
import useNavigate from "@/useNavigate";

export default function AuthGuard(props: { children: ReactNode }) {
  const session = authClient.useSession();
  const navigate = useNavigate()
  useEffect(() => {
    if (AUTH_GUARD && !session.isPending && !session.data) {
      navigate("/auth/login");
    }
  }, [navigate, session]);
  if (!AUTH_GUARD || session.data) return props.children;
  if (session.isPending) return "Logging in...";
  return "Redirecting...";
}

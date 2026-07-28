// greets signed in user
// allows signout
// prompts for signup or login

import { authClient } from "@/client/neon.ts";
import { Link, useLocation, useNavigate } from "react-router";

export default function LoginPrompt() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const session = authClient.useSession();
  function logout() {
    authClient.signOut();
    navigate("/auth/login");
  }

  if (session.data) {
    return (
      <div className="flex gap-2">
        <div>Hello {session.data.user.name}!</div>

        <button type="button" onClick={logout} className="underline">
          Log out
        </button>
      </div>
    );
  } else if (session.isPending || path.startsWith("/auth") || path.endsWith("/")) {
    return null;
  } else {
    return (
      <div className="flex flex-row gap-3">
        <Link to="/auth/login" className="underline">
          Log in
        </Link>
        <Link to="/auth/signup" className="underline">
          Sign up
        </Link>
      </div>
    );
  }
}

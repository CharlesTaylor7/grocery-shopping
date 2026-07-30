// greets signed in user
// allows signout
// prompts for signup or login
import { authClient } from "@/client/auth";
import { Link, useLocation } from "wouter";

export default function LoginPrompt() {
  const [location, navigate] = useLocation();
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
  } else if (session.isPending || location.startsWith("/auth") || location.endsWith("/")) {
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

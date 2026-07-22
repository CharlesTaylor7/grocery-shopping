// greets signed in user
// allows signout
// prompts for signup or login

import { authClient } from "@/client/neon.ts";

interface Props {
  url: string;
}

export default function LoginPrompt(props: Props) {
  const path = location ? location.pathname : new URL(props.url).pathname;
  const session = authClient.useSession();
  function logout() {
    authClient.signOut();
    location.assign("/auth/login");
  }

  if (session.data) {
    return (
      <div class="flex gap-2">
        <div>
          Hello {session.data.user.name}!
        </div>

        <button type="button" onClick={logout} className="underline">
          Log out
        </button>
      </div>
    );
  } else if (
    session.isPending ||
    path.startsWith("/auth") || path.endsWith("/")
  ) {
    return null;
  } else {
    return (
      <div class="flex gap-2">
        <a href="/auth/login" class="underline">Log in</a>
        <span>or</span>
        <a href="/auth/signup" class="underline">Sign up</a>
      </div>
    );
  }
}

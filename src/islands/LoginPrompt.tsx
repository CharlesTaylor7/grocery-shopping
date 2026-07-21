// greets signed in user
// allows signout
// prompts for signup or login

import { useSignal, useSignalEffect } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { authClient } from "@/client/auth.ts";

interface Props {
  url: string;
}

export default function LoginPrompt(props: Props) {
  const session = authClient.useSession();
  function logout() {
    authClient.signOut();
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
  } else if (props.url.endsWith("signup")) {
    return null;
  } else {
    return (
      <div class="flex gap-2">
        <a href="/login" class="underline">Log in</a>
        <span>or</span>
        <a href="/signup" class="underline">Sign up</a>
      </div>
    );
  }
}

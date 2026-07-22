import { authClient } from "@/client/neon.ts";
import { ReactNode } from "preact/compat";

interface Props {
  children: ReactNode;
}

export default function LoginSpinner(props: Props) {
  const session = authClient.useSession();
  if (session.isPending) return "Logging you in";
  return <>{props.children}</>;
}

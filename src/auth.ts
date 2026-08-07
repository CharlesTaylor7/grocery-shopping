import { NEON_AUTH_URL } from "@/config";
import { createAuthClient } from "@neondatabase/auth";

export const authClient = createAuthClient(
  NEON_AUTH_URL,
  {
    allowAnonymous: true,
  },
);

import { createClient } from "@neondatabase/neon-js";

import { type NeonPostgrestClient } from "@neondatabase/postgrest-js";
import { BetterAuthReactAdapter } from "@neondatabase/neon-js/auth/react/adapters";
import { type ReactBetterAuthClient } from "@neondatabase/neon-js/auth";
import { VITE_NEON_AUTH_URL, VITE_NEON_DATA_URL } from "@/client/config.ts";

const neonClient = createClient(
  {
    auth: {
      url: VITE_NEON_AUTH_URL,
      adapter: BetterAuthReactAdapter({}),
    },
    dataApi: {
      url: VITE_NEON_DATA_URL,
    },
  },
);

export type NeonAuthClient = ReactBetterAuthClient;
export type NeonDataClient = NeonPostgrestClient;
export const authClient: NeonAuthClient = neonClient.auth;
export const dataClient: NeonDataClient = neonClient;

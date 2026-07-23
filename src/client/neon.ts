import { createClient } from "@neondatabase/neon-js";

import { type NeonPostgrestClient } from "@neondatabase/postgrest-js";
import { BetterAuthReactAdapter } from "@neondatabase/neon-js/auth/react/adapters";
import { ReactBetterAuthClient } from "@neondatabase/neon-js/auth";

const neonClient = createClient(
  {
    auth: {
      url: import.meta.env.VITE_NEON_AUTH_URL,
      adapter: BetterAuthReactAdapter({}),
    },
    dataApi: {
      url: import.meta.env.VITE_NEON_DATA_URL,
    },
  },
);

export type NeonAuthClient = ReactBetterAuthClient;
export type NeonDataClient = NeonPostgrestClient;
export const authClient: NeonAuthClient = neonClient.auth;
export const dataClient: NeonDataClient = neonClient;

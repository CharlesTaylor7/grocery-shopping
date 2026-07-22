import { createClient } from "@neondatabase/neon-js";
import { BetterAuthReactAdapter } from "@neondatabase/neon-js/auth/react/adapters";

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

export const authClient = neonClient.auth;
export const dataClient = neonClient;
export type NeonClient = typeof neonClient;

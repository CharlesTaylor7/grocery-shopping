import { createClient } from "@neondatabase/neon-js";

import { type NeonPostgrestClient } from "@neondatabase/postgrest-js";
import { BetterAuthReactAdapter } from "@neondatabase/neon-js/auth/react/adapters";
import { type ReactBetterAuthClient } from "@neondatabase/neon-js/auth";
import { VITE_NEON_AUTH_URL, VITE_NEON_DATA_URL } from "@/client/config.ts";
import { atom } from "jotai";

const neonClient = createClient({
  auth: {
    url: VITE_NEON_AUTH_URL,
    adapter: BetterAuthReactAdapter({}),
  },
  dataApi: {
    url: VITE_NEON_DATA_URL,
  },
});

export type NeonAuthClient = ReactBetterAuthClient;
export type NeonDataClient = NeonPostgrestClient;
export const authClient: NeonAuthClient = neonClient.auth;
export const dataClient: NeonDataClient = neonClient;
async function authHeaders(): Promise<Headers> {
  const token = await authClient.token();
  if (!token.data) throw new Error("not logged in");

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token.data.token}`);
  return headers;
}

// https://docs.postgrest.org/en/v14/references/api/tables_views.html
export class DataClient {
  constructor(private headers: Headers) { }

  static new() {
    return authHeaders().then(headers => new DataClient(headers));
  }

  async get<T = any>(table: string, query: Record<string, string>): Promise<T[]> {
    const queryString = new URLSearchParams(query);
    const url = `${VITE_NEON_DATA_URL}/${table}?${queryString}`
    console.log(url)
    const response = await fetch(url,
      {
        method: "GET",
        headers: this.headers
      });
    const json = await response.json();
    return json;
  }

  async patch() {
    return fetch(VITE_NEON_DATA_URL,
      {
        method: "PATCH",
        headers: this.headers
      })
  }
  async delete() {
    return fetch(VITE_NEON_DATA_URL, { method: "DELETE", })
  }
}

export const dataClientAtom = atom(DataClient.new());

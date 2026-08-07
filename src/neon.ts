import { NEON_DATA_URL } from "@/config.ts";
import { atom } from "jotai";
// import { authClient } from "@/auth";

// async function authHeader(): Promise<string> {
//   const token = await authClient.getJWT();
//   if (!token) throw new Error("not logged in");
//
//   return `Bearer ${token}`;
// }

// TODO: use this so we can catch specific codes
interface PostgrestResult {
  error?: { code: string; message: string };
  data?: unknown;
}

// https://docs.postgrest.org/en/v14/references/api/tables_views.html
export class DataClient {
  constructor(public authHeader?: string) { }

  static async new(): Promise<DataClient> {
    return new DataClient();
    //return authHeader().then((header) => new DataClient(header));
  }
  private headers(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (this.authHeader) {
      headers["Authorization"] = this.authHeader;
    }
    return headers;
  }

  async get<T = any>(
    table: string,
    query: Record<string, string>,
  ): Promise<T[]> {
    const queryString = new URLSearchParams(query);
    const url = `${NEON_DATA_URL}/${table}?${queryString}`;
    const response = await fetch(url, {
      method: "GET",
      headers: this.headers(),
    });
    const json = await response.json();
    if (json.message && json.message.includes("JWT token has expired")) {
      console.error("expired");
      this.authHeader = undefined;
      sessionStorage.removeItem("jwt");
      return this.get(table, query);
    }
    return json;
  }

  async patch(table: string, query: Record<string, string>, data: object) {
    const queryString = new URLSearchParams(query);
    const url = `${NEON_DATA_URL}/${table}?${queryString}`;
    await fetch(url, {
      method: "PATCH",
      headers: this.headers(),
      body: JSON.stringify(data),
    });
  }

  async post(table: string, data: object) {
    const url = `${NEON_DATA_URL}/${table}`;
    await fetch(url, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(data),
    });
  }

  async delete(table: string, query: Record<string, string>) {
    const queryString = new URLSearchParams(query);
    const url = `${NEON_DATA_URL}/${table}?${queryString}`;
    await fetch(url, {
      method: "DELETE",
      headers: this.headers(),
    });
  }
}

export const dataClientAtom = atom(DataClient.new());

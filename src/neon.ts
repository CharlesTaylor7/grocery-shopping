import { NEON_DATA_URL } from "@/config.ts";
import { atom } from "jotai";
import { authClient } from "./auth";



// https://docs.postgrest.org/en/v14/references/api/tables_views.html
export class DataClient {
  constructor(public token?: string) { }
  static async new(): Promise<DataClient> {
    // const session = await authClient.getSession();
    // if (session.data.session) {
    //   return new DataClient(session.data?.session.token);
    // }
    const token = await authClient.getAnonymousToken();
    return new DataClient(token.data!.token);
  }
  private headers(): HeadersInit {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.token}`,
    }
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

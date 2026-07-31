
import { NEON_DATA_URL } from "@/config.ts";
import { atom } from "jotai";
import { authClient } from "@/auth";



async function authHeader(): Promise<string> {
  const token = await authClient.getJWT();
  if (!token) throw new Error("not logged in");

  return `Bearer ${token}`;
}

// TODO: use this so we can catch specific codes
interface PostgrestResult {
  error?: { code: string, message: string };
  data?: unknown;
}


// https://docs.postgrest.org/en/v14/references/api/tables_views.html
export class DataClient {

  constructor(public authHeader: string) { }

  static new() {
    return authHeader().then(header => new DataClient(header));
  }

  async get<T = any>(table: string, query: Record<string, string>): Promise<T[]> {
    const queryString = new URLSearchParams(query);
    const url = `${NEON_DATA_URL}/${table}?${queryString}`
    const response = await fetch(url,
      {
        method: "GET",
        headers: {
          "Authorization": this.authHeader,
        }
      });
    const json = await response.json();
    return json;
  }

  async patch(table: string, query: Record<string, string>, data: object) {
    const queryString = new URLSearchParams(query);
    const url = `${NEON_DATA_URL}/${table}?${queryString}`
    await fetch(url,
      {
        method: "PATCH",
        headers: {
          "Authorization": this.authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
  }

  async post(table: string, data: object) {
    const url = `${NEON_DATA_URL}/${table}`
    await fetch(url,
      {
        method: "POST",
        headers: {
          "Authorization": this.authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
  }

  async delete(table: string, query: Record<string, string>) {
    const queryString = new URLSearchParams(query);
    const url = `${NEON_DATA_URL}/${table}?${queryString}`
    await fetch(url,
      {
        method: "DELETE",
        headers: {
          "Authorization": this.authHeader,
        },
      })
  }
}

export const dataClientAtom = atom(DataClient.new());

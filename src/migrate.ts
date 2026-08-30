import { createAuthClient } from "@neondatabase/auth";

// TODO: delete old db schema at "groceries"
export const VERSION = 1;
export const SCHEMA = "grocery-v2";

export interface Store {
  id: number;
  name: string;
}

export interface StoreItem {
  id: number;
  description: string;
  order: number;
  store_id: number;
  last_got_at: Date | null;
}

export type TableName = "stores" | "trips" | "trip_items" | "store_items";

export function migrate(
  event: IDBVersionChangeEvent,
  db: IDBDatabase,
  tx: IDBTransaction,
  neon: NeonDataExport
): void {
  if (event.oldVersion < 1) {

    // Store
    const stores = db.createObjectStore("stores" satisfies TableName,
      { keyPath: 'id', autoIncrement: true })

    stores.createIndex("name", "name")

    // StoreItem
    const store_items = db.createObjectStore("store_items" satisfies TableName,
      { keyPath: 'id', autoIncrement: true })

    store_items.createIndex("store_id", "store_id")

    for (const store of neon.stores) {
      stores.add(store);
    }
    for (const item of neon.items) {

      store_items.add(item);
    }
  }
}

export interface NeonDataExport {
  stores: Store[],
  items: StoreItem[]
}
export async function exportNeonData(): Promise<NeonDataExport> {
  const authClient = createAuthClient(
    NEON_AUTH_URL,
    {
      allowAnonymous: true,
    },
  );
  const token = await authClient.getAnonymousToken();
  const dataClient = new DataClient(token.data!.token);
  const queryResult = await dataClient.get("stores",
    {
      "select":
        "name,items:store_items(description, got, order, last_got_at)",
    }
  );
  let store_id = 1;
  let item_id = 1;
  const stores: Store[] = [];
  const items: StoreItem[] = [];
  for (const store of queryResult) {
    if (!store.name) continue;
    for (const item of store.items) {
      if (!item.description) continue;
      items.push({
        id: item_id++,
        store_id,
        description: item.description,
        order: item.order,
        last_got_at: importDate(item.last_got_at),
      });
    }
    stores.push({ id: store_id++, name: store.name });
  }
  return { stores, items }
}
function importDate(str: string | null): Date | null {
  if (!str) return null
  const date = new Date(str);
  return date;
}

const NEON_AUTH_URL: string =
  "https://ep-red-morning-awzkc1lp.neonauth.c-12.us-east-1.aws.neon.tech/neondb/auth";
const NEON_DATA_URL: string =
  "https://ep-red-morning-awzkc1lp.apirest.c-12.us-east-1.aws.neon.tech/neondb/rest/v1";



// https://docs.postgrest.org/en/v14/references/api/tables_views.html
export class DataClient {
  constructor(public token?: string) { }

  private headers(): HeadersInit {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.token}`,
    };
  }

  async get<T = any>(
    table: string,
    query: Record<string, string>,
    signal?: AbortSignal,
  ): Promise<T[]> {
    const queryString = new URLSearchParams(query);
    const url = `${NEON_DATA_URL}/${table}?${queryString}`;
    const response = await fetch(url, {
      method: "GET",
      headers: this.headers(),
      signal: signal,
    });
    const json = await response.json();
    return json;
  }
}

// future
interface Trip {
  id: string;
  shopping_date: Date;
  description: string;
}
interface TripItem {
  id: string;
  description: string;
  got: boolean;
  order: number;
  trip_id: string;
  store_id: string;
}

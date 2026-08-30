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

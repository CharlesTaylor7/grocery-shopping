export const VERSION = 1;
export const SCHEMA = "grocery-v2";

export interface Store {
  id: number;
  name: string;
}

export interface StoreItem {
  id: number;
  description: string;
  got: boolean;
  order: number;
  last_got_at?: Date;
  store_id: number;
}

export type TableName = "stores" | "trips" | "trip_items" | "store_items";

export function migrate(
  event: IDBVersionChangeEvent,
  db: IDBDatabase,
  _tx: IDBTransaction,
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

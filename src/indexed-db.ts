import { DB_NAME, migrate, VERSION } from "@/migrate.ts";

export type StoreName = "actions";

type ReadonlyObjectStore = Omit<
  IDBObjectStore,
  "add" | "delete" | "put" | "deleteIndex"
>;

export function readTransaction(
  db: IDBDatabase,
  store: StoreName,
): ReadonlyObjectStore {
  return db.transaction(store, "readonly").objectStore(store);
}

export function writeTransaction(
  db: IDBDatabase,
  store: StoreName,
): IDBObjectStore {
  return db.transaction(store, "readwrite").objectStore(store);
}

export function openIndexedDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, VERSION);
    request.onerror = (event) => {
      reject(event);
    };
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onupgradeneeded = (event) => {
      migrate(event);
    };
  });
}

export function promisify<T = unknown>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = reject;
  });
}

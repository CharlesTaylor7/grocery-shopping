import { SCHEMA, migrate, VERSION, TableName } from "@/migrate.ts";


type ReadonlyObjectStore = Omit<
  IDBObjectStore,
  "add" | "delete" | "put" | "deleteIndex"
>;

export function readTransaction(
  db: IDBDatabase,
  store: TableName,
): ReadonlyObjectStore {
  return db.transaction(store, "readonly").objectStore(store);
}

export function writeTransaction(
  db: IDBDatabase,
  store: TableName,
): IDBObjectStore {
  return db.transaction(store, "readwrite").objectStore(store);
}

export function openIndexedDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(SCHEMA, VERSION);
    request.onerror = () => {
      reject(request.error);
    };
    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => {
        db.close();
      };
      resolve(db);
    };
    request.onupgradeneeded = (event) => {
      migrate(event, request.result, request.transaction!);
    };
  });
}

export function promisify<T = unknown>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

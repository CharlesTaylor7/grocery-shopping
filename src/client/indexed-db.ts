import { migrate, VERSION } from "@/client/migrate.ts";

export function openIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("groceries", VERSION);
    request.onerror = (event) => {
      reject(event);
    };
    request.onsuccess = (event) => {
      resolve((event.target! as any).result);
    };
    request.onupgradeneeded = (event) => {
      const db = migrate(event);
      resolve(db);
    };
  });
}

export function promisify<T = unknown>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = reject;
  });
}


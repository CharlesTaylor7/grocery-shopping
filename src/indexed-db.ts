import { migrate, DB_NAME, VERSION } from "@/migrate.ts";

export function openIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, VERSION);
    request.onerror = (event) => {
      reject(event);
    };
    request.onsuccess = (event) => {
      resolve((event.target! as any).result);
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

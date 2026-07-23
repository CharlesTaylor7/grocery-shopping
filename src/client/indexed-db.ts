import { migrate, VERSION } from "@/client/migrate.ts";

export function openIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("groceries", VERSION);
    request.onerror = (event) => {
      console.error(event);
      reject();
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

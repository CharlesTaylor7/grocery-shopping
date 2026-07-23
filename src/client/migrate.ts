export const VERSION = 3;

export function migrate(
  event: IDBVersionChangeEvent,
): IDBDatabase {
  const db: IDBDatabase = (event.target as any).result;
  if (event.oldVersion < 1) {
    db.createObjectStore("actions", {
      keyPath: "uuid",
    });
  }

  if (event.oldVersion < 2) {
    db.createObjectStore("stores", { keyPath: "id" });
  }

  if (event.oldVersion < 3) {
    db.deleteObjectStore("actions");
    db.createObjectStore("actions", {
      keyPath: "idb_key",
      autoIncrement: true,
    });
  }
  return db;
}

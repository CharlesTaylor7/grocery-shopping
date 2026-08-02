export const VERSION = 7;
export const DB_NAME = "groceries";

export function migrate(event: IDBVersionChangeEvent): IDBDatabase {
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

  if (event.oldVersion < 4) {
    db.deleteObjectStore("actions");
    db.createObjectStore("actions", { keyPath: "idb_key", autoIncrement: true })
      .createIndex(
        "actions_entity_id",
        ["entity", "id"],
      );
  }

  if (event.oldVersion < 5) {
    db.deleteObjectStore("actions");
    db.createObjectStore("actions", { keyPath: "idb_key", autoIncrement: true })
      .createIndex(
        "actions_entity_id",
        ["entity.id"],
      );
  }

  if (event.oldVersion < 6) {
    db.deleteObjectStore("actions");
    db.createObjectStore("actions", { keyPath: "idb_key", autoIncrement: true })
      .createIndex(
        "actions_entity_id",
        "entity.id",
      );
  }

  if (event.oldVersion < 7) {
    db.deleteObjectStore("actions");
    const actions = db.createObjectStore("actions", {
      keyPath: "idb_key",
      autoIncrement: true,
    });
    actions
      .createIndex(
        "actions_entity_id",
        "entity.id",
      );
    actions
      .createIndex(
        "actions_entity_store_id",
        "entity.store_id",
      );
  }
  // unreleased
  if (event.oldVersion < 8) {
    // not used
    db.deleteObjectStore("stores");
  }

  return db;
}

import { createModel, signal } from "@preact/signals";
import { createContext } from "preact";

import { useContext } from "preact/hooks";
import { Action, HasId } from "@/shared/types.ts";
import { dataClient } from "@/client/neon.ts";
import type { NeonDataClient } from "@/client/neon.ts";
import * as UUID from "uuid";
import { openIndexedDB } from "@/client/indexed-db.ts";

export interface SyncApi {
  // send an action
  // it writes the item to indexed db
  // a background worker checks when we are online and sends pending events to the server
  send<T extends HasId>(action: Action<T>): void;
}

interface SyncOptions {
  // skip indexed db, and do an api call
  useIndexedDB: boolean;
}

// debug means it just does an immediate fetch
export const SyncModel = createModel<SyncApi, [SyncOptions]>(function (opts) {
  const dbSignal = signal<IDBDatabase | null>(null);
  if (opts.useIndexedDB) {
    openIndexedDB().then((db) => void (dbSignal.value = db));
  }

  return ({
    send<T extends HasId>(action: Action<T>) {
      if (action.op === "new") {
        // do this immediately and only once so any replays of this action are idempotent
        action.id = UUID.v4();
      }

      if (dbSignal.value) {
        dbSignal.value.transaction("actions", "readwrite")
          .objectStore(
            "actions",
          ).put(
            action,
          );
      } else {
        pushToPostgrest(dataClient, action);
      }
    },
  });
});

export const SyncContext = createContext<SyncApi>(
  new SyncModel({ useIndexedDB: false }),
);

export function useSyncModel(): SyncApi {
  const model = useContext(SyncContext);
  if (!model) throw new Error("can't useSyncModel without providing context !");
  return model;
}

export function pushToPostgrest(
  client: NeonDataClient,
  action: Action,
): Promise<unknown> {
  let query: Promise<unknown>;
  delete action.idb_key;
  delete action.uuid;
  switch (action.op) {
    case "new": {
      const { op: _, table, ...data } = action;
      query = client.from(table).insert(data) as any;
      break;
    }

    case "edit": {
      const { op: _, table, id, ...data } = action;
      query = client.from(table).update(data).eq("id", id) as any;
      break;
    }

    case "delete": {
      const { table, id } = action;
      query = client.from(table).delete().eq("id", id) as any;
      break;
    }
    default:
      return Promise.resolve(null);
  }
  // query's are lazy, transform to an eager promise to begin execution.
  // This is so we can run the query in a non async context in a "fire-and-forget" fashion.
  return query.then((x) => x).catch((e) => {
    // unique constraint violation. just ignore it and move on
    if (e.error.code === "23505") {
      return Promise.resolve(e);
    } else {
      return Promise.reject(e);
    }
  });
}

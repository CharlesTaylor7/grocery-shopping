import { createModel, signal } from "@preact/signals";
import { createContext } from "preact";

import { useContext } from "preact/hooks";
import { Action, HasId } from "@/shared/types.ts";
import { dataClient } from "@/client/neon.ts";
import type { NeonDataClient } from "@/client/neon.ts";
import * as UUID from "uuid";
import migrate, { VERSION } from "@/client/migrate.ts";
import { openIndexedDB } from "@/client/indexed-db.ts";

export interface SyncApi {
  // send an action
  // it writes the item to indexed db
  // a background worker checks when we are online and sends pending events to the server
  send<T extends HasId>(action: Action<T>): void;

  // apply callback to every new action coming from the server
  subscribe(handler: (action: Action) => void): void;
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
      if (!("uuid" in action)) {
        (action as any).uuid = UUID.v4();
      }
      if (action.op === "new") {
        // do this immediately and only once so any replays of this action are idempotent
        action.id = UUID.v4();
      }

      if (dbSignal.value) {
        const request = dbSignal.value.transaction("actions", "readwrite")
          .objectStore(
            "actions",
          ).put(
            action,
          );

        console.log("put");
        request.onsuccess = (event) => {
          console.log(event);
        };
      } else {
        postAction(dataClient, action).then((v) => {
          console.log(v);
        }).catch((e) => {
          console.error(e);
        });
      }
    },
    // todo:
    subscribe() {
      //
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

export function postAction(
  client: NeonDataClient,
  action: Action,
): Promise<unknown> {
  switch (action.op) {
    case "new": {
      const { op: _, table, ...data } = action;
      return (client.from(table).insert(data) as any);
    }

    case "edit": {
      const { op: _, table, id, ...data } = action;
      return (client.from(table).update(data).eq("id", id) as any);
    }

    case "delete": {
      const { table, id } = action;
      return (client.from(table).delete().eq("id", id) as any);
    }
    default:
      return Promise.resolve(null);
  }
}

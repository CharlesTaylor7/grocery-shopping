import { useContext, createContext } from "react";
import type { Action, Op, TableName } from "@/shared/types.ts";
import { dataClient } from "@/client/neon.ts";
import * as UUID from "uuid";
import { openIndexedDB } from "@/client/indexed-db.ts";
import { pushToPostgrest } from "@/client/sync.ts";

export interface SyncApi {
  // send an action
  // it writes the item to indexed db
  // a background worker checks when we are online and sends pending events to the server
  send<TOp extends Op, TName extends TableName>(action: Action<TOp, TName>): void;
}

interface SyncOptions {
  // skip indexed db, and do an api call
  useIndexedDB: boolean;
}

// debug means it just does an immediate fetch
export class SyncModel implements SyncApi {
  private db?: IDBDatabase;

  constructor(readonly opts: SyncOptions) {
    if (opts.useIndexedDB) {
      openIndexedDB().then((db) => void (this.db = db));
    }
  }

  send<TOp extends Op, TName extends TableName>(action: Action<TOp, TName>): void {
    if (action.op === "new") {
      // do this immediately and only once so any replays of this action are idempotent
      action.entity.id = UUID.v4();
    }

    if (this.db) {
      this.db.transaction("actions", "readwrite").objectStore("actions").put(action);
    } else {
      pushToPostgrest(dataClient, action);
    }
  }
}

export const SyncContext = createContext<SyncApi>(new SyncModel({ useIndexedDB: false }));

export function useSyncModel(): SyncApi {
  const model = useContext(SyncContext);
  if (!model) throw new Error("can't useSyncModel without providing context !");
  return model;
}

import type { Action, Op, TableName } from "@/shared/types.ts";
import { dataClient } from "@/client/neon.ts";
import { promisify, openIndexedDB } from "@/client/indexed-db.ts";
import { pushToPostgrest } from "@/client/sync.ts";
import { atom } from 'jotai';


export interface SyncApi {
  // send an action
  // it writes the item to indexed db
  // a background worker checks when we are online and sends pending events to the server
  send<TName extends TableName = TableName, TOp extends Op = Op>(action: Action<TName, TOp>): void;
}

interface SyncOptions {
  // skip indexed db, and do an api call
  useIndexedDB: boolean;
}

// debug means it just does an immediate fetch
export class SyncModel implements SyncApi {

  constructor(private db?: IDBDatabase) {
  }

  static async new(opts: SyncOptions): Promise<SyncModel> {
    if (opts.useIndexedDB) {
      const db = await openIndexedDB()
      return new SyncModel(db);
    }
    return new SyncModel();
  }

  send<TOp extends Op, TName extends TableName>(action: Action<TName, TOp>): Promise<unknown> {
    if (this.db) {
      return promisify(this.db.transaction("actions", "readwrite").objectStore("actions").put(action));
    } else {
      return pushToPostgrest(dataClient, action);
    }
  }
}


export const syncAtom = atom(SyncModel.new({ useIndexedDB: false }));


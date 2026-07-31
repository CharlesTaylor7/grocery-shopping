import type { Action, Op, TableName } from "@/types";
import { DataClient } from "@/neon.ts";
import { promisify, openIndexedDB } from "@/indexed-db.ts";
import { pushToPostgrest } from "@/sync.ts";
import { atom } from 'jotai';

interface SyncOptions {
  // skip indexed db, and do an api call
  useIndexedDB: boolean;
}

// debug means it just does an immediate fetch
export class SyncModel {

  constructor(private db?: IDBDatabase, private client?: DataClient) {
  }

  static async new(opts: SyncOptions): Promise<SyncModel> {
    if (opts.useIndexedDB) {
      const db = await openIndexedDB()
      return new SyncModel(db);
    }
    else {
      const client = await DataClient.new()
      return new SyncModel(undefined, client);
    }
  }

  async send<TOp extends Op, TName extends TableName>(action: Action<TName, TOp>): Promise<unknown> {
    if (this.db) {
      return await promisify(this.db.transaction("actions", "readwrite").objectStore("actions").put(action));
    } else if (this.client) {
      return await pushToPostgrest(this.client, action);
    }
    return
  }
}


export const syncAtom = atom(SyncModel.new({ useIndexedDB: false }));


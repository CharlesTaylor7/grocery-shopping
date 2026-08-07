import type { Action, Op, TableName } from "@/types";
import { DataClient } from "@/neon.ts";
import { openIndexedDb, promisify, writeTransaction } from "@/indexed-db.ts";
import { pushToPostgrest } from "@/sync.ts";
import { atom } from "jotai";
import { SyncMode } from "./config";

export class SyncModel {
  constructor(private db?: IDBDatabase, private client?: DataClient) {
  }

  static async new(mode: SyncMode) {
    if (mode === 'immediate') {
      return new SyncModel(undefined, await DataClient.new());
    }
    else {
      return new SyncModel(await openIndexedDb());
    }
  }
  async send<TOp extends Op, TName extends TableName>(
    action: Action<TName, TOp>,
  ): Promise<unknown> {
    console.log("Send", action, this.db, this.client);
    if (this.db) {
      return await promisify(
        writeTransaction(this.db, "actions").put(action)
      );
    } else if (this.client) {
      return await pushToPostgrest(this.client, action);
    }
    console.warn("dropping", action);
    return;
  }
}

export const syncAtom = atom(new SyncModel());

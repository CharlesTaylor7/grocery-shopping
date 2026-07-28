import { type NeonDataClient } from "@/client/neon.ts";
import { type Action } from "@/shared/types.ts";

type Log = (...args: unknown[]) => void;

interface Args {
  db: IDBDatabase;
  client: NeonDataClient;
  log: Log;
}

export function syncNextAction({ db, client, log }: Args): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("actions", "readonly");
    const request = tx.objectStore("actions").openCursor();

    request.onsuccess = async (event: any) => {
      const cursor: IDBCursorWithValue | null = event.target.result;

      if (!cursor) return;

      const { primaryKey, value } = cursor;

      try {
        await pushToPostgrest(client, value);
        log("success", value);
      } catch (e) {
        log("error", e);
        reject(e);
      }
      const deleteTx = db.transaction("actions", "readwrite");

      deleteTx.objectStore("actions").delete(primaryKey);
      resolve(null);
    };
  });
}

interface PostgrestResult {
  error?: { code: string };
  data?: unknown;
}
export function pushToPostgrest(client: NeonDataClient, action: Action): Promise<unknown> {
  let query: Promise<PostgrestResult>;
  switch (action.op) {
    case "new": {
      const { table, entity } = action;
      query = client.from(table).insert(entity) as any;
      break;
    }

    case "edit": {
      const {
        table,
        entity: { id, ...data },
      } = action;
      query = client.from(table).update(data).eq("id", id) as any;
      break;
    }

    case "delete": {
      const {
        table,
        entity: { id },
      } = action;
      query = client.from(table).delete().eq("id", id) as any;
      break;
    }
    default:
      return Promise.resolve(null);
  }
  // query's are lazy, transform to an eager promise to begin execution.
  // This is so we can run the query in a non async context in a "fire-and-forget" fashion.
  return query.then((result) => {
    if (result.error) {
      // unique constraint violation. just ignore it and move on
      if (result.error?.code === "23505") {
        return result;
      } else {
        return Promise.reject(result);
      }
    } else {
      return result;
    }
  });
}

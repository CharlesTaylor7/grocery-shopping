import { DataClient } from "@/neon.ts";
import { type Action } from "@/types";

type Log = (...args: unknown[]) => void;

interface Args {
  db: IDBDatabase;
  client: DataClient;
  log: Log;
}

export function syncNextAction({ db, client, log }: Args): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("actions", "readonly");
    const request = tx.objectStore("actions").openCursor();

    request.onsuccess = async (event: any) => {
      const cursor: IDBCursorWithValue | null = event.target.result;

      if (!cursor) {
        resolve(false);
        return;
      }

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
      resolve(true);
    };
  });
}

export async function pushToPostgrest(
  client: DataClient,
  action: Action,
): Promise<unknown> {
  switch (action.op) {
    case "new": {
      const { table, entity } = action;
      return await client.post(table, entity);
      break;
    }

    case "edit": {
      const { table, entity: { id, ...data } } = action;
      return await client.patch(table, { id: `eq.${id}` }, data);
      break;
    }

    case "delete": {
      const { table, entity: { id } } = action;
      return await client.delete(table, { id: `eq.${id}` });
      break;
    }
    default:
      console.log("unknown op", action.op);
  }
  // TODO: port this:
  //   if (result.error) {
  //     // unique constraint violation. just ignore it and move on
  //     if (result.error?.code === "23505") {
  //       return result;
  //     } else {
  //       return Promise.reject(result.error.message);
  //     }
  //   } else {
  //     return result;
  //   }
  // });
}

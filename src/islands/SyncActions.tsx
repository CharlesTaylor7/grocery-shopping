import { useEffect } from "preact/hooks";
import { dataClient } from "@/client/neon.ts";
import { pushToPostgrest } from "@/client/model.ts";
import { openIndexedDB } from "@/client/indexed-db.ts";

async function run() {
  const db = await openIndexedDB();

  while (true) {
    processNextAction();
    await sleep(5000);
  }

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function processNextAction() {
    const tx = db.transaction("actions", "readonly");
    const request = tx.objectStore("actions").openCursor();

    request.onsuccess = async (event) => {
      const cursor = event.target.result;

      if (!cursor) return;

      const { primaryKey, value } = cursor;

      try {
        await pushToPostgrest(dataClient, value);
      } catch (e) {
        return;
      }

      const deleteTx = db.transaction("actions", "readwrite");

      deleteTx.objectStore("actions").delete(primaryKey);
      console.log("delete", primaryKey);
      deleteTx.oncomplete = processNextAction;
    };
  }
}

export default function SyncActions() {
  useEffect(() => void run(), []);
  return null;
}

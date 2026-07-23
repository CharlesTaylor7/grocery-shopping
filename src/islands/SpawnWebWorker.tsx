import { useEffect } from "preact/hooks";
import { authClient, dataClient } from "@/client/neon.ts";
import { pushToPostgrest } from "@/client/model.ts";
import { openIndexedDB } from "@/client/indexed-db.ts";

export default function SpawnWebWorker() {
  useEffect(() => {
    const url = new URL("../client/sync-worker.js", import.meta.url);
    const worker = new Worker(
      url,
      { type: "module" },
    );
    worker.addEventListener("message", (ev) => {
      debugError(ev.data);
      // console.log("from worker", ev.data);
    });
    authClient.token().then((token) => {
      if (token.data) {
        worker.postMessage(token.data.token);
      }
    });

    return () => worker.terminate();
  }, []);
  return null;
}

function debugError(key: string) {
  openIndexedDB().then((db) =>
    db.transaction("actions", "readwrite").objectStore("actions").get(key)
      .onsuccess = (event: any) => {
        const action = event.target.result;

        pushToPostgrest(dataClient, action);
      }
  );
}

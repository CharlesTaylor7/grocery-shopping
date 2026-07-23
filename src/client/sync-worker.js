import { NeonPostgrestClient } from "@neondatabase/postgrest-js";
import { pushToPostgrest } from "@/client/model.ts";
import { openIndexedDB } from "@/client/indexed-db.ts";

const client = new NeonPostgrestClient({
  dataApiUrl: import.meta.env.VITE_NEON_DATA_URL,
});

onmessage = (msg) => {
  const token = msg.data;
  client.headers.set("Authorization", `Bearer ${token}`);
};

const db = await openIndexedDB();

while (true) {
  processNextAction(db);
  await sleep(5000);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function log(anything) {
  self.postMessage(JSON.stringify(anything));
}

function processNextAction() {
  if (!client.headers.get("Authorization")) return;

  const tx = db.transaction("actions", "readonly");
  const request = tx.objectStore("actions").openCursor();

  request.onsuccess = async (event) => {
    const cursor = event.target.result;

    if (!cursor) return;

    const { primaryKey, value } = cursor;

    try {
      const result = await pushToPostgrest(client, value);
      log(result);
    } catch (e) {
      log("failure");
      log(Object.keys(e));
      return;
    }
    const deleteTx = db.transaction("actions", "readwrite");

    deleteTx.objectStore("actions").delete(primaryKey);
    deleteTx.oncomplete = processNextAction;
  };
}

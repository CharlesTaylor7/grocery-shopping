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
  await sleep(5000);
  if (!client.headers.get("Authorization")) continue;

  processNextAction(db);
}

function processNextAction() {
  const tx = db.transaction("actions", "readonly");
  const request = tx.objectStore("actions").openCursor();

  request.onsuccess = async (event) => {
    const cursor = event.target.result;

    if (!cursor) return;

    const { primaryKey, value } = cursor;

    try {
      await pushToPostgrest(client, value);
    } catch {
      return;
    }
    const deleteTx = db.transaction("actions", "readwrite");

    deleteTx.objectStore("actions").delete(primaryKey);
    deleteTx.oncomplete = processNextAction;
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

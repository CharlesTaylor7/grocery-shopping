import { NeonPostgrestClient } from "@neondatabase/postgrest-js";
import { postAction } from "@/client/model.ts";
import { openIndexedDB } from "@/client/indexed-db.ts";

const client = new NeonPostgrestClient({
  dataApiUrl: import.meta.env.VITE_NEON_DATA_URL,
});
// const action: Action<Store> = { op: "new", table: "stores", name: "betamx" };

onmessage = (msg: MessageEvent) => {
  const token = msg.data;
  client.headers.set("Authorization", `Bearer ${token}`);
};

const db = await openIndexedDB();
self.postMessage("global");
const req = db.transaction("actions", "readwrite").objectStore("actions")
  .getAll();
req.onsuccess = (event) => {
  self.postMessage(JSON.stringify(event));
};

//   for (let action of actions) {
// try {
//     const result = postAction(client, action);
//       self.postMessage(JSON.stringify(result));
// } catch (e) {
//       self.postMessage(JSON.stringify(e)));
//       }

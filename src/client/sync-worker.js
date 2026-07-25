import { NeonPostgrestClient } from "@neondatabase/postgrest-js";
import { openIndexedDB } from "@/client/indexed-db.ts";
import { syncNextAction } from "@/client/sync.ts";

const client = new NeonPostgrestClient({
  dataApiUrl: VITE_NEON_DATA_URL,
});

onmessage = (msg) => {
  const token = msg.data;
  client.headers.set("Authorization", `Bearer ${token}`);
};

const db = await openIndexedDB();

while (true) {
  if (!client.headers.get("Authorization") || !navigator.onLine) {
    await sleep(5000);
    continue;
  }
  await syncNextAction({ db, client, log });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function log() {
  self.postMessage(JSON.stringify(arguments));
}

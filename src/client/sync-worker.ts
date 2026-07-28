import { NeonPostgrestClient } from "@neondatabase/postgrest-js";
import { openIndexedDB } from "@/client/indexed-db.ts";
import { syncNextAction } from "@/client/sync.ts";
import { VITE_NEON_DATA_URL } from "@/client/config.ts";

const client = new NeonPostgrestClient({
  dataApiUrl: VITE_NEON_DATA_URL,
});

const db = await openIndexedDB();

const syncArgs = { db, client, log };

// token is passed on app startup 
// todo: everytime a new message is synced
// todo: everytime the session auto-renews
// todo: on logout 
onmessage = (msg) => {
  const token = msg.data;
  if (token) {
    client.headers.set("Authorization", `Bearer ${token}`);
    processQueue();
  } else {
    client.headers.delete("Authorization");
  }
};

async function processQueue() {
  if (!client.headers.get("Authorization")) return;

  let didWork = true;
  while (didWork) {
    didWork = await syncNextAction(syncArgs);
  }
}

function log(...args: any[]) {
  self.postMessage(JSON.stringify(args));
}

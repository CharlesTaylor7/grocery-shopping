import { openIndexedDb } from "@/indexed-db.ts";
import { syncNextAction } from "@/sync.ts";
import { DataClient } from "@/neon";

const client = await DataClient.new();

const db = await openIndexedDb();

const syncArgs = { db, client, log };

// token is passed on app startup
// todo: everytime a new message is synced
// todo: everytime the session auto-renews
// todo: on logout
onmessage = (msg) => {
  const token = msg.data;
  if (token) {
    client.token = token;
    processQueue();
  } else {
    client.token = "";
  }
};

async function processQueue() {
  if (!client.token) return;

  let didWork = true;
  while (didWork) {
    didWork = await syncNextAction(syncArgs);
  }
}

function log(...args: any[]) {
  self.postMessage(JSON.stringify(args));
}

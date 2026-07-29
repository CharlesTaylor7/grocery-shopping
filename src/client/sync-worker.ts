import { openIndexedDB } from "@/client/indexed-db.ts";
import { syncNextAction } from "@/client/sync.ts";
import { DataClient } from "@/client/neon";

const client = await DataClient.new();

const db = await openIndexedDB();

const syncArgs = { db, client, log };

// token is passed on app startup 
// todo: everytime a new message is synced
// todo: everytime the session auto-renews
// todo: on logout 
onmessage = (msg) => {
  const token = msg.data;
  if (token) {
    client.authHeader = `Bearer ${token}`;
    processQueue();
  } else {
    client.authHeader = '';
  }
};

async function processQueue() {
  if (!client.authHeader) return;

  let didWork = true;
  while (didWork) {
    didWork = await syncNextAction(syncArgs);
  }
}

function log(...args: any[]) {
  self.postMessage(JSON.stringify(args));
}

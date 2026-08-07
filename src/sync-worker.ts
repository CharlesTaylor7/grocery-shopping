import { openIndexedDb } from "@/indexed-db.ts";
import { syncNextAction } from "@/sync.ts";
import { DataClient } from "@/neon";

const client = new DataClient();
const db = await openIndexedDb();
const syncArgs = { db, client, log };


onmessage = msg => {
  const token = msg.data;
  client.token = token;
}

processQueue();

async function processQueue() {
  while (true) {
    if (!client.token) {
      await sleep(10_000)
    }

    const didWork = await syncNextAction(syncArgs);
    if (!didWork) {
      await sleep(10_000)
    }
  }
}
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function log(...args: any[]) {
  self.postMessage(JSON.stringify(args));
}

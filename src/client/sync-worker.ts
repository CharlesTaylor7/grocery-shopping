import { NeonPostgrestClient } from "@neondatabase/postgrest-js";
import { openIndexedDB } from "@/client/indexed-db.ts";
import { syncNextAction } from "@/client/sync.ts";
import { VITE_NEON_DATA_URL } from "@/client/config.ts";

const client = new NeonPostgrestClient({
  dataApiUrl: VITE_NEON_DATA_URL,
});

onmessage = (msg) => {
  const token = msg.data;
  if (token) {
    client.headers.set("Authorization", `Bearer ${token}`);
  } else {
    // handle logout
    client.headers.delete("Authorization");
  }
};

const db = await openIndexedDB();

while (true) {
  self.postMessage("worker loop")
  if (!client.headers.get("Authorization")) {

    self.postMessage("no authorization")
    await sleep(5000);
    continue;
  }
  try {
    const didWork = await syncNextAction({ db, client, log });

    if (!didWork) {
      self.postMessage("sync queue is empty")
      await sleep(5000);
    }
  } catch (e) {
    log(e)
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function log(...args: any[]) {
  self.postMessage(JSON.stringify(args));
}

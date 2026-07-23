import { useEffect } from "preact/hooks";
import { authClient } from "@/client/neon.ts";

export default function SpawnWebWorker() {
  useEffect(() => {
    const url = new URL("../client/sync-worker.js", import.meta.url);
    const worker = new Worker(
      url,
      { type: "module" },
    );
    worker.addEventListener("message", (ev) => {
      console.log("from worker", ev.data);
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

import { useEffect } from "react";
import { authClient, dataClient } from "@/client/neon.ts";
import { syncNextAction } from "@/client/sync.ts";
import { openIndexedDB } from "@/client/indexed-db.ts";
import SyncWorker from "@/client/sync-worker.ts?worker";

interface Props {
  useWebWorker?: boolean;
}
export default function SyncActions(props: Props) {
  useEffect(() => {
    if (props.useWebWorker) {
      return runOnWorkerThread();
    } else {
      console.log("run on main");
      runOnMainThread();
      return noOp;
    }
  }, [props.useWebWorker]);
  return null;
}

type EffectCleanup = () => void;
const noOp = () => {};

function runOnWorkerThread(): EffectCleanup {
  const worker = new SyncWorker();
  worker.addEventListener("message", (ev) => {
    console.log("from worker", ev.data);
  });
  authClient.token().then((token) => {
    if (token.data) {
      worker.postMessage(token.data.token);
    }
  });

  return () => worker.terminate();
}

async function runOnMainThread() {
  const db = await openIndexedDB();

  while (true) {
    if (!navigator.onLine) {
      await sleep(5000);
    }
    await syncNextAction({ db, client: dataClient, log: console.log });
  }

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

import { SyncContext, SyncModel, type SyncApi } from "@/client/model.ts";
import { type ReactNode, useEffect, useMemo } from "react";
import { authClient, dataClient } from "@/client/neon.ts";
import { syncNextAction } from "@/client/sync.ts";
import { openIndexedDB } from "@/client/indexed-db.ts";
import SyncWorker from "@/client/sync-worker.ts?worker";


export type SyncMode = "immediate" | "offline-sim" | "main-loop" | "web-worker"

interface Props {
  mode: SyncMode
  children: ReactNode;
}

// immediate means publish to postgrest immediately and ignore indexeddb
// offline-sim means publish to indexed db and don't start any worker to process those events
// main-loop means use an effect loop to publish indexedb actions from the main ui loop
// web-workermeans use a background web worker publish indexedb actions from the main ui loop

export default function SyncActionProvider(props: Props) {
  useEffect(() => {
    if (props.mode === "web-worker") {
      return runOnWorkerThread();
    } else if (props.mode === 'main-loop') {
      return runOnMainThread();
    }
  }, [props.mode]);
  const model = useMemo<SyncApi>(() => new SyncModel({ useIndexedDB: props.mode !== "immediate" }), [props.mode]);

  return <SyncContext.Provider value={model}>
    {props.children}
  </SyncContext.Provider>;
}

type EffectCleanup = () => void;

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

function runOnMainThread(): EffectCleanup {
  const worker = new MainThreadWorker();
  worker.run();
  return () => worker.terminate();
}


class MainThreadWorker {
  static counter = 0;
  private id: number;
  private terminated: boolean = false;
  constructor() {
    this.id = MainThreadWorker.counter++;
  }

  terminate() {
    this.terminated = true;
    console.log("terminate", this.id);
  }

  async run() {
    console.log("start", this.id);
    const db = await openIndexedDB();

    while (!this.terminated) {
      if (!navigator.onLine) {
        await sleep(5000);
        continue;
      }

      const didWork = await syncNextAction({ db, client: dataClient, log: console.log });
      if (!didWork) await sleep(5000);
    }

    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  }
}

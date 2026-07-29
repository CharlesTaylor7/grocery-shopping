import { syncAtom, SyncModel } from "@/client/model.ts";
import { type ReactNode, useEffect, useState } from "react";
import { authClient, DataClient } from "@/client/neon.ts";
import { syncNextAction } from "@/client/sync.ts";
import { openIndexedDB } from "@/client/indexed-db.ts";
import SyncWorker from "@/client/sync-worker.ts?worker";
import { createStore, Provider, } from "jotai";


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
  const [store, _] = useState(createStore);
  useEffect(() => {
    if (props.mode === "web-worker") {
      return runOnWorkerThread();
    } else if (props.mode === 'main-loop') {
      return runOnMainThread();
    }

    store.set(syncAtom, SyncModel.new({ useIndexedDB: props.mode !== "immediate" }));

  }, [props.mode, store]);

  return <Provider store={store}>
    {props.children}
  </Provider>;
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
  private terminated: boolean = false;
  constructor() {
  }

  terminate() {
    this.terminated = true;
  }

  async run() {
    const db = await openIndexedDB();
    const client = await DataClient.new();

    while (!this.terminated) {
      if (!navigator.onLine) {
        await sleep(5000);
        continue;
      }

      const didWork = await syncNextAction({ db, client, log: console.log });
      if (!didWork) await sleep(5000);
    }

    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  }
}

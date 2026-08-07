import { useEffect } from "react";
import { DataClient } from "@/neon";
import { syncNextAction } from "@/sync";
import { openIndexedDb } from "@/indexed-db";
import { SyncMode } from '@/config';
import SyncWorker from "@/sync-worker.ts?worker";


interface Props {
  mode: SyncMode;
}

export default function SyncActionRunner(props: Props) {
  useEffect(() => {
    if (props.mode === "web-worker") {
      return runOnWorkerThread();
    } else if (props.mode === "main-loop") {
      return runOnMainThread();
    }
  }, [props.mode]);

  return null;
}

type EffectCleanup = () => void;

function runOnWorkerThread(): EffectCleanup {
  const worker = new SyncWorker();
  worker.addEventListener("message", (ev) => {
    console.log("from worker", ev.data);
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
    const db = await openIndexedDb();
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

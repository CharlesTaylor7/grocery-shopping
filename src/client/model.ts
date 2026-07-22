import {
  createModel,
  effect,
  ReadonlySignal,
  Signal,
  signal,
  useModel,
} from "@preact/signals";
// @ts-types="preact"
import { createContext } from "preact";

import { useContext } from "preact/hooks";
import { Action } from "@/shared/types.ts";

interface SyncApi {
  // send an action
  // it writes the item to indexed db
  // a background worker checks when we are online and sends pending events to the server
  send(action: Action): void;

  // apply callback to every new action coming from the server
  subscribe(handler: (action: Action) => void): void;
}

interface SyncOptions {
  // skip indexed db, and do an api call
  immediate: boolean;
}
// debug means it just does an immediate fetch
export const SyncModel = createModel<SyncApi, [SyncOptions]>(function (opts) {
  const stores = signal([]);
  const storeItems = signal([]);
  const dataClient = effect(() => {
  });
  return {
    send() {
      if (opts.immediate) {
        // fetch({ method: "POST", url: "/api/event" });
      }
    },
    // todo:
    subscribe() { //
    },
  };
});

const SyncContext = createContext(new SyncModel({ immediate: true }));
export const SyncModelProvider = SyncContext.Provider;

export function useSyncModel() {
  const model = useContext(SyncContext);
  return model;
}

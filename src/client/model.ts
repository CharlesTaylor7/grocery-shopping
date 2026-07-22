import {
  createModel,
  effect,
  ReadonlySignal,
  Signal,
  signal,
  useModel,
} from "@preact/signals";
import { createContext } from "preact";

import { useContext } from "preact/hooks";
import { Action } from "@/shared/types.ts";
import { dataClient } from "@/client/neon.ts";
import type { NeonClient } from "@/client/neon.ts";

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
  return ({
    send(action: Action) {
      if (opts.immediate) {
        postAction(dataClient, action);
      }
    },
    // todo:
    subscribe() { //
    },
  });
});

const SyncContext = createContext(new SyncModel({ immediate: true }));
export const SyncModelProvider = SyncContext.Provider;

export function useSyncModel() {
  const model = useContext(SyncContext);
  return model;
}

function postAction(client: NeonClient, action: Action) {
  switch (action.op) {
    case "new": {
      const { op: _, entity, ...data } = action;
      client.from(entity).insert(data);
      break;
    }

    case "edit": {
      const { op: _, entity, id, ...data } = action;
      client.from(entity).update(data).eq("id", id);
      break;
    }

    case "delete": {
      const { entity, id } = action;
      client.from(entity).delete().eq("id", id);
      break;
    }
  }
}

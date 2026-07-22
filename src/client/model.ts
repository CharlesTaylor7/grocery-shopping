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
import { Action, HasId } from "@/shared/types.ts";
import { dataClient } from "@/client/neon.ts";
import type { NeonClient } from "@/client/neon.ts";
import * as UUID from "uuid";

interface SyncApi {
  // send an action
  // it writes the item to indexed db
  // a background worker checks when we are online and sends pending events to the server
  send<T extends HasId>(action: Action<T>): void;

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
    send<T extends HasId>(action: Action<T>) {
      if (action.op === "new") {
        // do this immediately and only once so any replays of this action are idempotent
        action.id = UUID.v4();
      }
      if (opts.immediate) {
        postAction(dataClient, action).then((v) => {
          console.log(v);
        }).catch((e) => {
          console.error(e);
        });
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

function postAction(
  client: NeonClient,
  action: Action,
): Promise<unknown> {
  switch (action.op) {
    case "new": {
      const { op: _, entity, ...data } = action;
      return client.from(entity).insert(data);
    }

    case "edit": {
      const { op: _, entity, id, ...data } = action;
      return client.from(entity).update(data).eq("id", id);
    }

    case "delete": {
      const { entity, id } = action;
      return client.from(entity).delete().eq("id", id);
    }
    default:
      return Promise.resolve(null);
  }
}

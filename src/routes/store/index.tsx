import { createFileRoute } from '@tanstack/react-router'
import type { Action, Store } from "@/types";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { v4 as newId } from "uuid";
import { atom, createStore, Provider, useAtomValue } from "jotai";
import { syncAtom } from "@/model";
import { DataClient } from "@/neon";

import { openIndexedDb, promisify, readTransaction } from '@/indexed-db';

const storesAtom = atom<Store[]>([]);
const sortedStoresAtom = atom(
  get => get(storesAtom).toSorted((a, b) => a.name.localeCompare(b.name)));

const jotaiStore = createStore();
export const Route = createFileRoute('/store/')({
  component: RouteComponent,
  loader: async () => {
    const dataClient = await DataClient.new();
    // fetch from postgrest
    const result: Store[] = await dataClient.get("stores", { select: "id,name", order: "name.asc" });

    jotaiStore.set(storesAtom, result);
    const db = await openIndexedDb();
    const actions = await promisify(readTransaction(db, "actions").getAll());

    for (const action of actions) {
      applyAction(action);
    }
  }
})

function applyAction(action: Action) {
  if (action.table != "stores") return;
  switch (action.op) {
    case "new": {
      jotaiStore.set(storesAtom,
        (stores) => [...stores, action.entity as Store]);
      break;
    }
    case "edit": {
      // todo
      break;
    }

    case "delete": {
      // todo
      break;
    }
  }
}


function RouteComponent() {
  return <Provider store={jotaiStore} >
    <Page />
  </Provider>
}

function Page() {
  const sync = useAtomValue(syncAtom);
  const stores: Store[] = useAtomValue(sortedStoresAtom);
  const [name, setName] = useState("");

  function onNewStore() {
    const action: Action<"stores", "new"> = {
      table: "stores",
      op: "new",
      entity: { id: newId(), name },
    };
    setName("");
    sync.send(action);
    applyAction(action);
  }
  return (
    <div>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Store Name"
        value={name}
        onChange={(e) => void setName(e.currentTarget.value)}
        onKeyDown={(e) => void (e.code === "Enter" ? onNewStore() : null)}
      />
      <button
        disabled={!name}
        type="button" className="btn btn-primary" onClick={onNewStore}>
        + New Store
      </button>
      <div className="flex flex-col items-start">

        {stores.filter((s) => s.name).map((s) => (
          <Link
            className="btn btn-ghost"
            key={s.id}
            // @ts-ignore
            to={`/store/${s.id}`}
          >
            <h2 id={s.id}>
              {s.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

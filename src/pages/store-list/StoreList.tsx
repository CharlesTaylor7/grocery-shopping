import type { Action, Store } from "@/types";
import { useEffect, useState } from "react";
import { openIndexedDB } from "@/indexed-db.ts";
import { Link } from "wouter";
import { v4 as newId } from "uuid";
import { useAtomValue } from "jotai";
import { syncAtom } from "@/model";
import { DataClient, dataClientAtom } from "@/neon";

export default function StoreList() {
  const [stores, setStores] = useState<Store[]>([]);

  function sortStores() {
    setStores((stores) =>
      stores.toSorted((a, b) => a.name.localeCompare(b.name))
    );
  }
  function applyAction(action: Action) {
    if (action.table != "stores") return;
    switch (action.op) {
      case "new": {
        //@ts-ignore
        setStores((stores) => [...stores, action.entity]);
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

  useEffect(() => {
    // IIFE to handle async
    (async function () {
      const dataClient = await DataClient.new();
      // fetch from postgrest
      const result = await dataClient.get("stores", { select: "id,name" });
      setStores(result);

      // apply local changes
      const db = await openIndexedDB();
      db.transaction("actions", "readonly").objectStore("actions").getAll()
        .onsuccess = (
          event: any,
        ) => {
          for (const action of event.target.result) {
            applyAction(action);
          }
        };
      sortStores();
    })();
  }, []);
  const sync = useAtomValue(syncAtom);
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
    sortStores();
  }
  return (
    <>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Store Name"
        value={name}
        onChange={(e) => void setName(e.currentTarget.value)}
        onKeyDown={(e) => void (e.code === "Enter" ? onNewStore() : null)}
      />
      <button type="button" className="btn btn-primary" onClick={onNewStore}>
        + New Store
      </button>
      <div className="flex flex-col p-2 px-2 ">
        {stores.filter((s) => s.name).map((s) => (
          <Link
            className="py-2 underline cursor-pointer"
            key={s.id}
            to={`/store/${s.id}`}
          >
            <h2 id={s.id}>
              {s.name}
            </h2>
          </Link>
        ))}
      </div>
    </>
  );
}

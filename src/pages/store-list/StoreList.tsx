import type { Store, Action } from "@/shared/types.ts";
import { useEffect, useState } from "react";
import { openIndexedDB } from "@/client/indexed-db.ts";
import { Link } from "wouter";
import { v4 as newId } from 'uuid';
import { useAtomValue } from 'jotai'
import { syncAtom } from "@/client/model";
import { DataClient, dataClientAtom } from "@/client/neon";

export default function StoreList() {
  const [stores, setStores] = useState<Store[]>([]);

  function sortStores() {
    setStores((stores) => stores.toSorted((a, b) => a.name.localeCompare(b.name)));
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
    (async function() {
      const dataClient = await DataClient.new();
      // fetch from postgrest
      const result = await dataClient.get("stores",
        { select: 'id,name' });
      setStores(result);

      // apply local changes
      const db = await openIndexedDB();
      db.transaction("actions", "readonly").objectStore("actions").getAll().onsuccess = (
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
      <ul>
        {stores.map((s) => (
          <li key={s.id}>
            <Link to={`/store/${s.id}`} className="underline cursor-pointer">
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

import { useSyncModel } from "@/client/model.ts";
import { Store } from "@/shared/types.ts";
import { useSignal } from "@preact/signals";
import { useCallback, useEffect } from "preact/hooks";
import { dataClient } from "@/client/neon.ts";
import { Action } from "@/shared/types.ts";
import { openIndexedDB } from "@/client/indexed-db.ts";

export default function StoreList() {
  const storesSignal = useSignal<Store[]>([]);

  function sortStores() {
    storesSignal.value = storesSignal.value.toSorted((a, b) =>
      a.name.localeCompare(b.name)
    );
  }
  function applyAction(action: Action) {
    if (action.table != "stores") return;
    switch (action.op) {
      case "new": {
        storesSignal.value = [...storesSignal.value, action.entity];
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
      // fetch from postgrest
      const result = await dataClient.from("stores").select();
      if (Array.isArray(result.data)) {
        storesSignal.value = result.data as Store[];
      }

      // apply local changes
      const db = await openIndexedDB();
      db.transaction("actions", "readonly").objectStore("actions").getAll()
        .onsuccess = (event: any) => {
          for (const action of event.target.result) {
            applyAction(action);
          }
        };
      sortStores();
    })();
  }, []);
  const sync = useSyncModel();
  const nameSignal = useSignal("");

  const onNewStore = useCallback(function () {
    const action: Action<"new", "stores"> = {
      table: "stores",
      op: "new",
      entity: {
        name: nameSignal.value,
      },
    };
    nameSignal.value = "";
    sync.send(action);
    applyAction(action);
    sortStores();
  }, [sync]);
  return (
    <>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Store Name"
        value={nameSignal.value}
        onChange={(e) => void (nameSignal.value = e.currentTarget.value)}
        onKeyDown={(e) => void (e.code === "Enter" ? onNewStore() : null)}
      />
      <button
        type="button"
        class="btn btn-primary"
        onClick={onNewStore}
      >
        + New Store
      </button>
      <ul>
        {storesSignal.value.map((s) => (
          <li key={s.id}>
            <a href={`/store/${s.id}`} class="underline cursor-pointer">
              {s.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

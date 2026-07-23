import { useSyncModel } from "@/client/model.ts";
import { Store } from "@/shared/types.ts";
import { useSignal } from "@preact/signals";
import { useCallback, useEffect } from "preact/hooks";
import { dataClient } from "@/client/neon.ts";
import { v4 } from "uuid";
import { Action } from "@/shared/types.ts";

export default function StoreList() {
  const storesSignal = useSignal<Store[]>([]);
  useEffect(() => {
    dataClient.from("stores").select().then((v) => {
      if (Array.isArray(v.data)) {
        storesSignal.value = v.data as Store[];
      }
    });
  }, []);
  const sync = useSyncModel();
  const nameSignal = useSignal("");

  const applyAction = useCallback(function (action: Action) {
    if (action.table != "stores") return;
    switch (action.op) {
      case "new": {
        const { table, op, idb_key, ...store } = action;
        storesSignal.value = [...storesSignal.value, store];
        break;
      }
      case "edit": {
        const { table, op, idb_key, ...store } = action;
        storesSignal.value = [...storesSignal.value, store];
        break;
      }

      case "delete": {
        const { table, op, idb_key, ...store } = action;
        storesSignal.value = [...storesSignal.value, store];
        break;
      }
    }
  }, [storesSignal]);

  const onNewStore = useCallback(function () {
    const action: Action<Store> = {
      table: "stores",
      op: "new",
      id: v4(),
      name: nameSignal.value,
    };
    sync.send<Store>(action);
    applyAction(action);
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
        {storesSignal.value.map((s) => <li key={s.id}>{s.name}</li>)}
      </ul>
    </>
  );
}

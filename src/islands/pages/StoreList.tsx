import { useSyncModel } from "@/client/model.ts";
import { Store } from "@/shared/types.ts";
import { useSignal } from "@preact/signals";
import { useCallback, useEffect } from "preact/hooks";
import { dataClient } from "@/client/neon.ts";
import { v4 } from "uuid";

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

  const onNewStore = useCallback(function () {
    const store = { id: v4(), name: nameSignal.value };
    sync.send<Store>({ table: "stores", op: "new", ...store });
    storesSignal.value = [...storesSignal.value, store];
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

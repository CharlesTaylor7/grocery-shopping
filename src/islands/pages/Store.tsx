import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { StoreItem } from "@/shared/types.ts";
import { dataClient } from "@/client/neon.ts";
import { openIndexedDB } from "@/client/indexed-db.ts";

interface Props {
  id: string;
}

interface Store {
  id: string;
  name: string;
  items: Omit<StoreItem, "store_id">[];
}

export default function Store(props: Props) {
  const storeSignal = useSignal<Partial<Store>>({ id: props.id, items: [] });
  useEffect(() => {
    (async function () {
      const result = await dataClient.from("stores").select(
        "name, items:store_items(id, description, got, order)",
      ).eq("id", props.id)
        .order("order", {
          referencedTable: "items",
          ascending: true,
        });
      if (result.data?.length) {
        const store: Partial<Store> = result.data[0];
        store.id = props.id;
        storeSignal.value = store;
      } else {
        // go to indexed db for the store
        const db = await openIndexedDB();
        db.transaction("actions").objectStore("actions").index(
          "actions_entity_id",
        ).getAll(IDBKeyRange.only(props.id))
          .onsuccess = (event: any) => {
            console.log(event);
          };
      }
    })();
  }, []);
  // do something unconventional, just edit the dom from effect handlers instead of doing things the react way.
  // I think it will be easier to debug actually
  // this is a compromise between this and just using htmx / alpine
  return (
    <>
      <h2>{storeSignal.value.name}</h2>

      <button type="button" class="btn btn-primary">+ New Item</button>
      <ul>
        {storeSignal.value.items.map((item) => (
          <li key={item.id}>{item.description}</li>
        ))}`
      </ul>
    </>
  );
}

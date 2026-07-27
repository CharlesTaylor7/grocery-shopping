import { useEffect, useState } from "react";
import type { StoreItem } from "@/shared/types.ts";
import { dataClient } from "@/client/neon.ts";
import { openIndexedDB } from "@/client/indexed-db.ts";
import { useParams } from "react-router";
import { v4 } from "uuid";


interface Store {
  id: string;
  name: string;
}

type LocalStoreItem = Omit<StoreItem, "store_id">;

export default function Store() {
  const params = useParams();
  const [store, setStore] = useState<Partial<Store>>({ id: params.id, });
  const [items, setItems] = useState<LocalStoreItem[]>([]);
  useEffect(() => {
    (async function() {
      const result = await dataClient.from("stores").select(
        "name, items:store_items(id, description, got, order)",
      ).eq("id", params.id)
        .order("order", {
          referencedTable: "items",
          ascending: true,
        });
      if (result.data?.length) {
        const store = result.data[0];
        // @ts-ignore
        store.id = params.id;
        setStore(store);
        setItems(store.items as LocalStoreItem[]);
      } else {
        // go to indexed db for the store
        const db = await openIndexedDB();
        db.transaction("actions").objectStore("actions").index(
          "actions_entity_id",
        ).getAll(IDBKeyRange.only(params.id))
          .onsuccess = (event: any) => {
            console.log(event);
          };
      }
    })();
  }, [params.id]);

  function newItem() {
    const lastItemOrder = items[items.length - 1]?.order ?? 0;
    const item = { id: v4(), got: false, description: '', order: lastItemOrder + 1000 };
    setItems([...items, item]);
  }
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      console.log(e)
      if (e.code == "Enter") newItem();
    }


    document.addEventListener("keydown", handleKeydown);


    return () => document.removeEventListener("keydown", handleKeydown);
  });
  console.log(items);
  // do something unconventional, just edit the dom from effect handlers instead of doing things the react way.
  // I think it will be easier to debug actually
  // this is a compromise between this and just using htmx / alpine
  return (
    <div >
      <h2 className="text-center underline">{store.name}</h2>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input tabIndex={-1} type="checkbox" className="checkbox" />
            <input type="text" className="w-80 mx-4" />
            {item.description}

          </li>
        ))}
      </ul>
      <button type="button" className="btn btn-ghost w-screen" onClick={newItem}>+</button>
    </div>
  );
}

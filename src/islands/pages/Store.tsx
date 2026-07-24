import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { StoreItem } from "@/shared/types.ts";
import { dataClient } from "@/client/neon.ts";

interface Props {
  id: string;
}

interface Store {
  id: string;
  name: string;
  items: Omit<StoreItem, "store_id">[];
}

export default function Store(props: Props) {
  const storeSignal = useSignal<Partial<Store>>({ id: props.id });
  useEffect(() => {
    (async function () {
      const result = await dataClient.from("stores").select(
        "name, items:store_items(id, description, got, order)",
      ).order("order").eq("id", props.id);
      if (result.data?.length) {
        const store: Partial<Store> = result.data[0];
        store.id = props.id;
        storeSignal.value = store;
      } else {
        // go to indexed db for the store
      }
    })();
  });
  // do something unconventional, just edit the dom from effect handlers instead of doing things the react way.
  // I think it will be easier to debug actually
  // this is a compromise between this and just using htmx / alpine
  return (
    <>
      <div>Store: {props.id}</div>

      <button type="button" class="btn btn-primary">+ New Item</button>
    </>
  );
}

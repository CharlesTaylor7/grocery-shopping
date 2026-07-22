import { useSyncModel } from "@/client/model.ts";
import { Store } from "@/shared/types.ts";
import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";

// manipulates the StoreList by data id, and bypasses the usual react rendering flow
// TODO: do it again the regular react way for dnd list support
interface Props {
  dataRoot: string;
}
export default function StoreList(props: Props) {
  const sync = useSyncModel();
  const nameSignal = useSignal("");
  const onNewStore = useCallback(function () {
    const domRoot = document.querySelector(`[data-root='${props.dataRoot}']`);
    const el = document.createElement("li");
    el.replaceChildren(nameSignal.value);
    domRoot!.appendChild(el);

    sync.send<Store>({ op: "new", entity: "stores", name: nameSignal.value });
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
      />
      <button
        type="button"
        class="btn btn-primary"
        onClick={onNewStore}
      >
        + New Store
      </button>
    </>
  );
}

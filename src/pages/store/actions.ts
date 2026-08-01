import type { StoreItem } from "@/types";
import { dataClientAtom } from "@/neon.ts";
import { openIndexedDB, promisify } from "@/indexed-db.ts";
import { type Action } from "@/types";
import { flushSync } from "react-dom";
import { v4 as newId } from "uuid";
import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";
import { syncAtom as syncModelAtom } from "@/model";

export interface GotItem extends StoreItem {
  got: true;
  last_got_at: Date;
}

export const storeAtom = atom({
  id: "",
  name: "",
});

export const focusIndexAtom = atom(-1);
export const storeItemsAtom = atomWithImmer<Record<string, StoreItem>>({});

export const itemsInOrderAtom = atom((get) => {
  return Object.values(get(storeItemsAtom))
    .sort((a, b) => a.order - b.order);
});

export const lastInOrderAtom = atom<StoreItem | undefined>((get) => {
  const array = get(itemsInOrderAtom);
  return array[array.length - 1];
});

export const needItemsAtom = atom((get) => {
  return get(itemsInOrderAtom)
    .filter((item) => !item.got);
});

export const gotItemsAtom = atom((get) => {
  const filtered = Object.values(get(storeItemsAtom)).filter((item) =>
    item.got
  ) as GotItem[];
  return filtered.sort((a, b) =>
    b.last_got_at.valueOf() - a.last_got_at.valueOf()
  );
});

export const loadStoreAtom = atom(
  null,
  async (get, set, storeId: string) => {
    const dataClient = await get(dataClientAtom);
    // TODO: how to abort this?
    const stores = await dataClient
      .get("stores", {
        "select":
          "name,items:store_items(id, description, got, order, last_got_at)",
        "id": `eq.${storeId}`,
        "store_items.order": "order.asc",
      });

    if (stores.length) {
      const store = stores[0];
      set(storeAtom, { id: storeId, name: store.name });
      const items: Record<string, StoreItem> = {};
      for (const item of store.items) {
        item.last_got_at = item.last_got_at ? new Date(item.last_got_at) : null;
        // @ts-ignore
        item.store_id = storeId;
        // @ts-ignore
        items[item.id] = item;
      }
      set(storeItemsAtom, items);
    }
    // go to indexed db for offline pending items
    const db = await openIndexedDB();
    const request = db
      .transaction("actions")
      .objectStore("actions")
      .index("actions_entity_store_id")
      .getAll(storeId);

    const actions = await promisify(request);
    for (const action of actions) {
      set(applyActionAtom, action);
    }
  },
);

const applyActionAtom = atom(null, (_get, set, action: Action) => {
  if (action.table !== "store_items") return;
  switch (action.op) {
    case "new":
      set(storeItemsAtom, (draft) => {
        // @ts-ignore
        draft[action.entity.id] = action.entity;
      });
      break;

    case "edit":
      set(storeItemsAtom, (draft) => {
        const item = draft[action.entity.id];
        if (item) {
          Object.assign(item, action.entity);
        }
      });
      break;
    case "delete":
      set(storeItemsAtom, (draft) => {
        delete draft[action.entity.id];
      });
      break;
  }
});

export const applyAndSyncAtom = atom(null, (_get, set, action: Action) => {
  set(applyActionAtom, action);
  set(syncActionAtom, action);
});

const syncActionAtom = atom(null, (get, _set, action: Action) => {
  // @ts-ignore
  action.entity.store_id = get(storeAtom).id;
  get(syncModelAtom).then((sync) => sync.send(action))
});

export const appendNewItemAtom = atom(null, (get, set) => {
  const lastOrder = get(lastInOrderAtom)?.order ?? 0;
  const item = {
    id: newId(),
    got: false,
    description: "",
    order: lastOrder + 1000,
  };

  set(applyAndSyncAtom, { op: "new", table: "store_items", entity: item });
});

export const handleKeydownAtom = atom(
  null,
  (get, set, event: React.KeyboardEvent<HTMLInputElement>) => {
    const focusIndex = get(focusIndexAtom);
    const needItems = get(needItemsAtom);
    if (event.code == "Enter") {
      if (focusIndex === -1 || focusIndex === needItems.length - 1) {
        set(appendNewItemAtom);
      } else {
        // next item is non-empty, insert one between
        if (needItems[focusIndex + 1]?.description) {
          const prevOrder = needItems[focusIndex].order;
          const nextOrder = needItems[focusIndex + 1].order;
          const order = (prevOrder + nextOrder) / 2;
          set(applyAndSyncAtom, {
            op: "new",
            table: "store_items",
            entity: { id: newId(), got: false, description: "", order },
          });
        }
      }
      set(focusIndexAtom, (i) => i + 1);
    } else if (event.code == "Backspace") {
      const val = event.currentTarget.value;
      const id = event.currentTarget.dataset.id!;
      if (!val) {
        event.preventDefault();

        set(applyAndSyncAtom, {
          op: "delete",
          table: "store_items",
          entity: { id },
        });
        set(focusIndexAtom, (i) => i - 1);
      }
    } else if (event.code === "ArrowUp") {
      set(focusIndexAtom, (i) => Math.max(0, i - 1));
    } else if (event.code === "ArrowDown") {
      set(
        focusIndexAtom,
        (i) => Math.min(get(needItemsAtom).length - 1, i + 1),
      );
    } else {
      console.log(event);
    }
  },
);

export const handleDragStartAtom = atom(null, (_get, set) => {
  set(focusIndexAtom, -1);
});

export const handleDragEndAtom = atom(null, (get, set, event: any) => {
  const { active, over } = event;
  if (!over || active.id === over.id) return;

  const activeItem = get(storeItemsAtom)[active.id];
  if (!activeItem) return;

  const items = get(itemsInOrderAtom);
  const oldIndex = items.findIndex((i) => i.id === active.id);
  const newIndex = items.findIndex((i) => i.id === over.id);


  if (newIndex === 0) {

    const order = items[0].order - 1000;
    set(applyAndSyncAtom, {
      op: "edit",
      table: "store_items",
      entity: { id: activeItem.id, order },
    });

    return
  } else if (newIndex === items.length - 1) {

    const order = items[items.length - 1].order + 1000;

    set(applyAndSyncAtom, {
      op: "edit",
      table: "store_items",
      entity: { id: activeItem.id, order },
    });

    return
  }


  // batch
  const edits: DndEdit[] = []

  if (newIndex > oldIndex) {
    const adjacentIndex = newIndex + 1;
    const targetOrder = items[newIndex].order;
    const adjacentOrder = items[adjacentIndex].order;
    let order = Math.ceil((targetOrder + adjacentOrder) / 2);
    edits.push({ id: activeItem.id, order });

    if (order === adjacentOrder) {
      for (let i = adjacentIndex; i < items.length; i++) {
        if (items[i].order - order < 1000) {
          order += 1000;
          edits.push({ id: items[i].id, order });
        }
        else break;
      }

    }
  }

  if (newIndex < oldIndex) {
    const adjacentIndex = newIndex - 1;
    const targetOrder = items[newIndex].order;
    const adjacentOrder = items[adjacentIndex].order;
    let order = Math.floor((targetOrder + adjacentOrder) / 2);
    edits.push({ id: activeItem.id, order });

    if (order === adjacentOrder) {
      for (let i = adjacentIndex; i >= 0; i--) {
        if (order - items[i].order < 1000) {
          order -= 1000;
          edits.push({ id: items[i].id, order });
        }
        else break;
      }
    }
  }

  set(batchDndUpdateAtom, edits);
});

interface DndEdit {
  id: string,
  order: number
}
const batchDndUpdateAtom = atom(null, (get, set, edits: DndEdit[]) => {
  // make all edits first 
  set(storeItemsAtom, draft => {
    for (const edit of edits) {
      draft[edit.id].order = edit.order;
    }
  });
  // then send all events to backend
  for (const edit of edits) {
    set(syncActionAtom, {
      op: "edit",
      table: "store_items",
      entity: edit,
    });
  }
});


type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
export const handleCheckboxAtom = atom(
  null,
  (_get, set, event: ChangeEvent) => {
    const action: Action<"store_items", "edit"> = {
      op: "edit",
      table: "store_items",
      entity: {
        id: event.currentTarget.dataset.id!,
        got: event.currentTarget.checked,
        last_got_at: new Date(),
      },
    };
    document.startViewTransition(() => {
      flushSync(() => {
        set(applyAndSyncAtom, action);
      });
    });
  },
);

export const handleTextboxAtom = atom(null, (_get, set, event: ChangeEvent) => {
  set(applyAndSyncAtom, {
    op: "edit",
    table: "store_items",
    entity: {
      id: event.currentTarget.dataset.id!,
      description: event.currentTarget.value,
    },
  });
});

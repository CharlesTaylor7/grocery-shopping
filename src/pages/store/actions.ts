import type { StoreItem } from "@/shared/types.ts";
import { dataClient } from "@/client/neon.ts";
import { openIndexedDB, promisify } from "@/client/indexed-db.ts";
import { proxy, type Snapshot } from "valtio";
import { type Action } from "@/shared/types";
import { flushSync } from "react-dom";
import { v4 as newId } from "uuid";


export interface LocalStoreItem extends Omit<StoreItem, "store_id"> { }
export interface GotItem extends LocalStoreItem {
  got: true,
  last_got_at: Date,
}

export interface State {
  focusIndex: null | number,
  storeName: string,
  items: LocalStoreItem[],
  get need(): LocalStoreItem[],
  get gots(): GotItem[],
}

const initialState: State = {
  focusIndex: null,
  storeName: '',
  items: [],

  get need() {
    return this.items
      .filter(item => !item.got)
      .sort((a, b) => a.order - b.order);
  },

  get gots() {
    const filtered = this.items.filter(item => item.got) as GotItem[];
    return filtered.sort((a, b) => b.last_got_at.valueOf() - a.last_got_at.valueOf());
  }
}

export const state: State = proxy(initialState);

export function resetState() {
  Object.assign(state, initialState);
}

export async function load(storeId: string) {
  const result = await dataClient
    .from("stores")
    .select("name, items:store_items(id, description, got, order, last_got_at)")
    .eq("id", storeId)
    .order("order", {
      referencedTable: "items",
      ascending: true,
    });
  const state: Partial<State> = {}
  if (result.data?.length) {
    const store = result.data[0];
    state.storeName = store.name;
    state.items = store.items.map(item => ({
      ...item,
      last_got_at: item.last_got_at ? new Date(item.last_got_at) : null
    }))
  }
  else {
    throw result.error;
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
    applyAction(action);
  }
}

export function applyAction(action: Action) {
  if (action.table !== 'store_items') return;
  switch (action.op) {
    case 'new':
      state.items.push(action.entity as StoreItem);
      break;
    case 'edit':
      const item = state.items.find(item => item.id === action.entity.id);
      if (item) {
        Object.assign(item, action.entity);
      }
      break;
    case 'delete':
      const index = state.items.findIndex(item => item.id === action.entity.id);
      if (index !== -1) {
        state.items.splice(index, 1);
        break;
      }
  }
}

export function appendNewItem(snapshot: Snapshot<State>) {
  const lastItemOrder = snapshot.need[state.items.length - 1]?.order ?? 0;
  const item = { id: newId(), got: false, description: "", order: lastItemOrder + 1000, };

  state.items.push(item);
  state.focusIndex = snapshot.need.length;
}

export function handleKeydown(snapshot: Snapshot<State>, e: any) {
  if (e.code == "Enter") {
    if (state.focusIndex === null || state.focusIndex === snapshot.need.length - 1) {
      appendNewItem(snapshot);
    }
    else {
      // next item is non-empty, insert one between
      if (snapshot.need[state.focusIndex + 1].description) {
        const prevOrder = snapshot.need[state.focusIndex].order;
        const nextOrder = snapshot.need[state.focusIndex + 1].order;
        const order = (prevOrder + nextOrder) / 2
        const item = { id: newId(), got: false, description: "", order };
        state.items.push(item);
      }
      // advance to empty item
      state.focusIndex++;
    }

  }
  if (e.code == "Backspace") {
    const val = e.currentTarget.value;
    const id = e.currentTarget.dataset!.id;
    if (!val) {
      e.preventDefault();
      const i = state.items.findIndex(x => x.id == id)

      state.items.splice(i, 1);
      state.focusIndex = state.focusIndex !== null ? state.focusIndex - 1 : null;

    }
  }
}


export function handleDragStart() {
  state.focusIndex = null;
}

export function handleDragEnd({ active, over }: any) {
  if (!over || active.id === over.id) return;
  const oldIndex = state.items.findIndex((i) => i.id === active.id);
  const newIndex = state.items.findIndex((i) => i.id === over.id);

  let newOrder;
  if (newIndex === 0) {
    newOrder = state.items[0].order - 1000;
  } else if (newIndex === state.items.length - 1) {
    newOrder = state.items[newIndex].order + 1000;
  } else if (newIndex > oldIndex) {
    const adjacentItem = state.items[newIndex + 1];
    newOrder = Math.floor((state.items[newIndex].order + adjacentItem.order) / 2);
    if (newOrder == adjacentItem.order) console.warn("panick");

  } else {
    const adjacentItem = state.items[newIndex - 1];
    newOrder = Math.floor((state.items[newIndex].order + adjacentItem.order) / 2);
    if (newOrder == adjacentItem.order) console.warn("panick");
  }

  state.items[oldIndex].order = newOrder;
}

export function handleCheckbox(item: LocalStoreItem) {
  return (e: any) => {
    const got = e.currentTarget.checked;
    const itemState = state.items.find(x => x.id === item.id);
    if (itemState) {
      const entity = {
        id: itemState.id,
        got,
        last_got_at: new Date()
      }
      document.startViewTransition(() => {
        flushSync(() => {
          itemState.got = entity.got
          itemState.last_got_at = entity.last_got_at
        })
      });
    }
  }
}



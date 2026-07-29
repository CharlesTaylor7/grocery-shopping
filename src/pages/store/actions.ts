import type { StoreItem } from "@/shared/types.ts";
import { dataClient } from "@/client/neon.ts";
import { openIndexedDB, promisify } from "@/client/indexed-db.ts";
import { proxy, type Snapshot } from "valtio";
import { type SyncApi } from "@/client/model";
import { type Action } from "@/shared/types";
import { flushSync } from "react-dom";
import { v4 as newId } from "uuid";


export interface ActionArgs {
  snapshot: Snapshot<State>,
  syncModel: SyncApi,
}
export interface LocalStoreItem extends Omit<StoreItem, "store_id"> { }
export interface GotItem extends LocalStoreItem {
  got: true,
  last_got_at: Date,
}

export interface State {
  storeId: string,
  storeName: string,
  focusIndex: number,
  items: Record<string, LocalStoreItem>,
  get allInOrder(): LocalStoreItem[],
  get need(): LocalStoreItem[],
  get gots(): GotItem[],
}

function initialState(): State {
  return {
    storeId: '',
    storeName: '',
    focusIndex: -1,
    items: {},

    get allInOrder() {
      return Object.values(this.items)
        .sort((a, b) => a.order - b.order);
    },

    get need() {
      return Object.values(this.items)
        .filter(item => !item.got)
        .sort((a, b) => a.order - b.order);
    },

    get gots() {
      const filtered = Object.values(this.items).filter(item => item.got) as GotItem[];
      return filtered.sort((a, b) => b.last_got_at.valueOf() - a.last_got_at.valueOf());
    }
  };
}

export const state: State = proxy(initialState());

export function resetState() {
  state.storeId = '';
  state.focusIndex = -1;
  state.storeName = '';
  state.items = {};
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
  if (result.data?.length) {
    const store = result.data[0];
    state.storeId = storeId;
    state.storeName = store.name;
    for (const item of store.items) {
      item.last_got_at = item.last_got_at ? new Date(item.last_got_at) : null;
      state.items[item.id] = item;
    }
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


type ValtioPath = (string | symbol)[];
type ValtioOp = [op: 'set', path: ValtioPath, value: unknown, prevValue: unknown] | [op: 'delete', path: ValtioPath, prevValue: unknown];

function handleOps(storeId: string, syncModel: SyncApi, ops: ValtioOp[]) {
  for (const operation of ops) {
    const [op, path, newValue] = operation;

    if (path[0] !== "items") continue;

    const id = path[1];
    if (op === 'set' && path[2] === undefined) {
      // new store item
      const entity = newValue as StoreItem;
      entity.store_id = storeId;
      syncModel.send({
        table: "store_items",
        op: "new",
        entity: newValue as any,
      })
    }
    // TODO: use op batches to send a single edit 
    else if (op === 'set') {
      // update item
      const entity: any = { id, store_id: storeId };
      entity[path[2]] = newValue;
      syncModel.send({
        table: "store_items",
        op: "edit",
        entity,
      })
    }
    else if (op === 'delete') {
      const entity: any = { id, store_id: storeId }
      // delete item
      syncModel.send({
        table: "store_items",
        op: "delete",
        entity: entity,
      });
    }
    else {
      console.log("skipping", operation);
    }
  }
}



export function applyAction(action: Action) {
  if (action.table !== 'store_items') return;
  switch (action.op) {
    case 'new': {
      state.items[action.entity.id!] = action.entity as StoreItem;
      break;
    }
    case 'edit': {
      const item = state.items[action.entity.id!];
      if (item) {
        Object.assign(item, action.entity);
      }
      break;
    }
    case 'delete': {
      delete state.items[action.entity.id!];
      break;
    }
  }
}

export function appendNewItem({ snapshot, syncModel }: ActionArgs) {

  const lastOrder = snapshot.allInOrder[snapshot.allInOrder.length - 1]?.order ?? 0;
  const item = {
    id: newId(),
    got: false,
    description: "",
    order: lastOrder + 1000,
    store_id: snapshot.storeId,
  };

  syncModel.send({ op: "new", table: "store_items", entity: item });
  state.items[item.id] = item;
  state.focusIndex = snapshot.allInOrder.length;
}

export function handleKeydown(args: ActionArgs, e: any) {
  const { snapshot, syncModel } = args;
  if (e.code == "Enter") {
    if (state.focusIndex === null || state.focusIndex === snapshot.need.length - 1) {
      appendNewItem(args);
    }
    else {
      // next item is non-empty, insert one between
      if (snapshot.need[state.focusIndex + 1].description) {
        const prevOrder = snapshot.need[state.focusIndex].order;
        const nextOrder = snapshot.need[state.focusIndex + 1].order;
        const order = (prevOrder + nextOrder) / 2
        const item = { id: newId(), got: false, description: "", order, store_id: snapshot.storeId };
        syncModel.send({ op: "new", table: "store_items", entity: item });
        state.items[item.id] = item;
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

      syncModel.send({ op: "delete", table: "store_items", entity: { id, store_id: snapshot.storeId } });
      delete state.items[id];
      state.focusIndex--;
    }
  }
}


export function handleDragStart() {
  state.focusIndex = -1;
}

export function handleDragEnd(args: ActionArgs, event: any) {
  const { active, over } = event;
  if (!over || active.id === over.id) return;
  const { snapshot, syncModel } = args;

  const activeItem = state.items[active.id]
  if (!activeItem) return;

  const oldIndex = snapshot.allInOrder.findIndex((i) => i.id === active.id);
  const newIndex = snapshot.allInOrder.findIndex((i) => i.id === over.id);

  let newOrder;
  if (newIndex === 0) {
    newOrder = snapshot.allInOrder[0].order - 1000;
  } else if (newIndex === snapshot.allInOrder.length - 1) {
    newOrder = snapshot.allInOrder[newIndex].order + 1000;
  } else if (newIndex > oldIndex) {
    const adjacentItem = snapshot.allInOrder[newIndex + 1];
    newOrder = Math.floor((snapshot.allInOrder[newIndex].order + adjacentItem.order) / 2);
    if (newOrder == adjacentItem.order) console.warn("panick");

  } else {
    const adjacentItem = snapshot.allInOrder[newIndex - 1];
    newOrder = Math.floor((snapshot.allInOrder[newIndex].order + adjacentItem.order) / 2);
    if (newOrder == adjacentItem.order) console.warn("panick");
  }

  syncModel.send({
    op: "edit", table: "store_items", entity: {
      id: activeItem.id,
      store_id: snapshot.storeId,
      order: newOrder
    }
  });
  activeItem.order = newOrder;
}

export function handleCheckbox(args: ActionArgs, item: Snapshot<LocalStoreItem>) {
  const { snapshot: { storeId }, syncModel } = args;
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const itemState = state.items[item.id];
    if (itemState) {
      const got = e.currentTarget.checked;
      const last_got_at = new Date()
      syncModel.send({
        op: "edit", table: "store_items", entity: {
          id: itemState.id,
          store_id: storeId,
          got, last_got_at
        }
      });
      document.startViewTransition(() => {
        flushSync(() => {
          itemState.got = got
          itemState.last_got_at = last_got_at
        })
      });
    }
  }
}

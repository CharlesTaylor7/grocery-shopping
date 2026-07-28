import { useEffect, type ReactNode } from "react";
import { flushSync } from "react-dom";
import type { StoreItem } from "@/shared/types.ts";
import { dataClient } from "@/client/neon.ts";
import { openIndexedDB } from "@/client/indexed-db.ts";
import { useNavigate, useParams } from "react-router";
import { v4 } from "uuid";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { proxy, useSnapshot } from "valtio";
import { useSyncModel } from "@/client/model";
import { type Action } from "@/shared/types";
import Input from "@/components/Input";

interface LocalStoreItem extends Omit<StoreItem, "store_id"> { }
interface GotItem extends LocalStoreItem {
  got: true,
  last_got_at: Date,
}
interface State {
  focusIndex: null | number,
  storeName: string,
  items: LocalStoreItem[],
}
const initialState: State = {
  focusIndex: null,
  storeName: '',
  items: []
}

const state: State = proxy(initialState);

function resetState() {
  Object.assign(state, initialState);
}

async function loader(storeId: string): Promise<State> {
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
    applyActionToState(state as State, action);
  }
  return state as State;
}

function promisify<T = unknown>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = reject;
  });
}

function applyActionToState(state: State, action: Action) {
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


export default function Store() {

  // stateful hooks
  const params = useParams();
  const snap = useSnapshot(state);
  console.log("rerender", snap.items);
  const syncModel = useSyncModel();
  const notGotItems = snap.items.filter(item => !item.got).toSorted((a, b) => a.order - b.order);
  const gotItems = (snap.items.filter(item => item.got) as GotItem[]).toSorted((a, b) => b.last_got_at.valueOf() - a.last_got_at.valueOf());

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const navigate = useNavigate();

  // effects
  useEffect(() => {
    if (!params.id) {
      navigate("/store");
      return
    }
    resetState();
    loader(params.id).then(s => Object.assign(state, s));
  }, [params.id, navigate]);

  // callbacks
  function sync(action: Action) {
    if (action.table === "store_items") {
      //@ts-ignore
      action.entity.store_id = params.id
    }
    syncModel.send(action);
  }

  function appendNewItem() {
    const lastItemOrder = notGotItems[state.items.length - 1]?.order ?? 0;
    const item = { id: v4(), got: false, description: "", order: lastItemOrder + 1000, store_id: params.id };

    sync({ op: 'new', table: 'store_items', entity: item })
    state.items.push(item);
    state.focusIndex = notGotItems.length;
  }

  function handleKeydown(e: any) {
    if (e.code == "Enter") {
      if (state.focusIndex === null || state.focusIndex === notGotItems.length - 1) {
        appendNewItem();
      }
      else {
        // next item is non-empty, insert one between
        if (notGotItems[state.focusIndex + 1].description) {
          const prevOrder = notGotItems[state.focusIndex].order;
          const nextOrder = notGotItems[state.focusIndex + 1].order;
          const order = (prevOrder + nextOrder) / 2
          const item = { id: v4(), got: false, description: "", order, store_id: params.id };
          sync({ op: 'new', table: 'store_items', entity: item })
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

        sync({
          op: 'delete',
          table: 'store_items',
          entity: {
            id: state.items[i].id,
          }
        });

        state.items.splice(i, 1);
        state.focusIndex = state.focusIndex !== null ? state.focusIndex - 1 : null;

      }
    }
  }


  function handleDragStart() {
    state.focusIndex = null;
  }

  function handleDragEnd({ active, over }: any) {
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

    sync({
      op: 'edit',
      table: 'store_items',
      entity: {
        id: state.items[oldIndex].id,
        order: newOrder
      }
    });
    state.items[oldIndex].order = newOrder;
  }

  function handleCheckbox(item: LocalStoreItem) {
    return (e: any) => {
      const got = e.currentTarget.checked;
      const itemState = state.items.find(x => x.id === item.id);
      if (itemState) {
        const entity = {
          id: itemState.id,
          got,
          last_got_at: new Date()
        }
        sync({ op: "edit", table: "store_items", entity });
        document.startViewTransition(() => {
          flushSync(() => {
            itemState.got = entity.got
            itemState.last_got_at = entity.last_got_at
          })
        });
      }
    }
  }

  // render
  return (
    <div>
      <h2 className="text-center underline">{snap.storeName}</h2>

      <div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={notGotItems.map(item => item.id)}
            strategy={verticalListSortingStrategy}>
            {notGotItems.map((item, index) => (
              <Sortable id={item.id} key={item.id}>
                <div id={item.id} className="flex flex-row m-2">
                  <input
                    tabIndex={-1}
                    type="checkbox"
                    className="checkbox p-2"
                    checked={item.got}
                    onChange={handleCheckbox(item)}
                  />
                  < Input
                    focus={index === snap.focusIndex}
                    data-id={item.id}
                    type="text"
                    className="w-80 mx-4 outline-hidden"
                    onFocus={() => state.focusIndex = index}
                    onKeyDown={handleKeydown}
                    value={item.description}
                    onChange={e => {

                      const local = state.items.find(x => x.id === item.id);
                      if (local) {
                        local.description = e.currentTarget.value;
                        sync({
                          op: "edit", table: "store_items", entity: {
                            id: local.id,
                            description: local.description,
                          }
                        });
                      }
                    }}
                  />
                  {/* grip bars */}
                  <Grip id={item.id} />
                </div>
              </Sortable>
            ))}
          </SortableContext>
        </DndContext>
        {gotItems.length ? <h3 className="my-3">GOT</h3> : null}
        <div>
          {gotItems.map(item => (
            <div id={item.id} key={item.id} className="flex flex-row m-2">
              <input
                tabIndex={-1}
                type="checkbox"
                className="checkbox p-2"
                checked={item.got}
                onChange={handleCheckbox(item)}
              />
              <input
                data-id={item.id}
                type="text"
                className="w-80 mx-4 outline-hidden"
                value={item.description}
                readOnly
              />
            </div>
          ))}
        </div>
      </div>
      <button type="button" className="btn btn-ghost w-screen" onClick={appendNewItem}>
        +
      </button>
    </div>
  );
}

interface GripProps {
  id: string;
}

function Grip(props: GripProps) {
  const { listeners, isDragging, attributes } = useSortable({ id: props.id });
  return (
    <div
      {...listeners}
      {...attributes}
      className={`px-2 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{
        touchAction: "none"
      }}
    >
      <img src="/grocery-shopping/grip-bars.svg" />
    </div>
  );
}

interface SortableProps {
  id: string;
  children: ReactNode;
}
function Sortable(props: SortableProps) {
  const { setNodeRef, transform, transition } = useSortable({ id: props.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {props.children}
    </div>
  );
}

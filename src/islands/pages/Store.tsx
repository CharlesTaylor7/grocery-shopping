// oxlint-disable
import { useEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import type { StoreItem } from "@/shared/types.ts";
import { dataClient } from "@/client/neon.ts";
import { openIndexedDB } from "@/client/indexed-db.ts";
import { useParams } from "react-router";
import { v4 } from "uuid";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { proxy, useSnapshot } from "valtio";

interface LocalStoreItem extends Omit<StoreItem, "store_id"> { }
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


export default function Store() {
  const params = useParams();
  const [state, setState] = useState(proxy(initialState));
  const snap = useSnapshot(state);
  const gotItems = snap.items.filter(item => item.got);
  const notGotItems = snap.items.filter(item => !item.got);

  useEffect(() => {
    setState(proxy(initialState));
    (async function() {
      const result = await dataClient
        .from("stores")
        .select("name, items:store_items(id, description, got, order)")
        .eq("id", params.id)
        .order("order", {
          referencedTable: "items",
          ascending: true,
        });
      if (result.data?.length) {
        const store = result.data[0];
        state.storeName = store.name;
        state.items = store.items;
      } else {
        // go to indexed db for the store
        const db = await openIndexedDB();
        db
          .transaction("actions")
          .objectStore("actions")
          .index("actions_entity_id")
          .getAll(IDBKeyRange.only(params.id)).onsuccess = (event: any) => {
            console.log(event);
          };
      }
    })();
  }, [params.id]);

  function appendNewItem() {
    const lastItemOrder = state.items[state.items.length - 1]?.order ?? 0;
    const item = { id: v4(), got: false, description: "", order: lastItemOrder + 1000 };
    state.focusIndex = state.items.length;
    state.items.push(item);
  }

  function handleKeydown(e: any) {
    if (e.code == "Enter") {
      if (state.focusIndex === null || state.focusIndex === state.items.length - 1) {
        appendNewItem();
      }
      else {
        state.focusIndex++;
        if (!state.items[state.focusIndex].description) {
          return
        } else {
          const prevOrder = state.items[state.focusIndex].order;
          const nextOrder = state.items[state.focusIndex + 1].order;
          const order = (prevOrder + nextOrder) / 2
          const item = { id: v4(), got: false, description: "", order };
          state.items.push(item);
          state.items.sort((a, b) => a.order - b.order);
        }
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


  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

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

    state.items[oldIndex].order = newOrder;
    state.items.sort((a, b) => a.order - b.order);
  }


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
                <div id={item.id} className="flex flex-row">
                  <input
                    tabIndex={-1}
                    type="checkbox"
                    className="checkbox"
                    checked={item.got}
                    onChange={e => {
                      const got = e.currentTarget.checked;
                      document.startViewTransition(() => {
                        flushSync(() => {

                          const local = state.items.find(x => x.id === item.id);
                          if (local)
                            local.got = got;
                        });
                      });
                    }
                    }
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
                      if (local)
                        local.description = e.currentTarget.value;
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
            <div id={item.id} key={item.id} className="flex flex-row">
              <input
                tabIndex={-1}
                type="checkbox"
                className="checkbox"
                checked={item.got}
                onChange={e => {
                  const got = e.currentTarget.checked;
                  document.startViewTransition(() => {
                    flushSync(() => {

                      const local = state.items.find(x => x.id === item.id);
                      if (local)
                        local.got = got;
                    });
                  });
                }}
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
  const { setNodeRef, transform, transition, isDragging } = useSortable({ id: props.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.35 : 1,
        cursor: "grab",
        touchAction: "none",
      }}
    >
      {props.children}
    </div>
  );
}

type ReactInputProps =
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


interface CustomInputProps extends ReactInputProps {
  focus: boolean
}

function Input({ focus, ...props }: CustomInputProps) {
  const ref = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    if (focus && ref.current) ref.current.focus();
  }, [focus]);
  return <input ref={ref} {...props} />
}

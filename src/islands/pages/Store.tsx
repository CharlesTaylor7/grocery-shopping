import { useEffect, useRef, useState, type ReactNode } from "react";
import type { StoreItem } from "@/shared/types.ts";
import { dataClient } from "@/client/neon.ts";
import { openIndexedDB } from "@/client/indexed-db.ts";
import { useParams } from "react-router";
import { v4 } from "uuid";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Store {
  id: string;
  name: string;
}

interface LocalStoreItem extends Omit<StoreItem, "store_id"> { }

export default function Store() {
  const params = useParams();
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const [store, setStore] = useState<Partial<Store>>({ id: params.id });
  const [items, setItems] = useState<LocalStoreItem[]>([]);
  useEffect(() => {
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
        // @ts-ignore
        store.id = params.id;
        setStore(store);
        setItems(store.items as LocalStoreItem[]);
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
    const lastItemOrder = items[items.length - 1]?.order ?? 0;
    const item = { id: v4(), got: false, description: "", order: lastItemOrder + 1000 };
    setFocusIndex(items.length);
    setItems([...items, item]);
  }

  function handleKeydown(e: any) {
    if (e.code == "Enter") {
      if (focusIndex === null || focusIndex === items.length - 1) {
        appendNewItem();
      }
      else {
        setFocusIndex(i => i! + 1);
        if (!items[focusIndex + 1].description) {
          return
        } else {
          const prevOrder = items[focusIndex].order;
          const nextOrder = items[focusIndex + 1].order;
          const order = (prevOrder + nextOrder) / 2
          const item = { id: v4(), got: false, description: "", order };
          const copy = [...items, item];
          copy.sort((a, b) => a.order - b.order);
          setItems(copy);
        }
      }

    }
    if (e.code == "Backspace") {
      const val = e.currentTarget.value;
      const id = e.currentTarget.dataset!.id;
      if (!val) {
        e.preventDefault();
        const i = items.findIndex(x => x.id == id)
        const copy = Array.from(items);
        copy.splice(i, 1);
        setItems(copy);
        setFocusIndex(i => i ? i - 1 : null);

      }
    }
  }


  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function handleDragStart() {
    setFocusIndex(null);
  }

  function handleDragEnd({ active, over }: any) {
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    let newOrder;
    if (newIndex === 0) {
      newOrder = items[0].order - 1000;
    } else if (newIndex === items.length - 1) {
      newOrder = items[newIndex].order + 1000;
    } else if (newIndex > oldIndex) {
      const adjacentItem = items[newIndex + 1];
      newOrder = Math.floor((items[newIndex].order + adjacentItem.order) / 2);
      if (newOrder == adjacentItem.order) console.warn("panick");
    } else {
      const adjacentItem = items[newIndex - 1];
      newOrder = Math.floor((items[newIndex].order + adjacentItem.order) / 2);
      if (newOrder == adjacentItem.order) console.warn("panick");
    }

    const copy = Array.from(items);
    copy[oldIndex].order = newOrder;
    copy.sort((a, b) => a.order - b.order);
    setItems(copy);
  }

  const ids = items.map((i) => i.id);

  return (
    <div>
      <h2 className="text-center underline">{store.name}</h2>

      <div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            {items.map((item, index) => (
              <Sortable id={item.id} key={item.id}>
                <div className="flex flex-row">
                  <input tabIndex={-1} type="checkbox" className="checkbox" />
                  <Input
                    focus={index === focusIndex}
                    data-id={item.id}
                    type="text"
                    className="w-80 mx-4 outline-hidden"
                    onFocus={() => setFocusIndex(index)}
                    onKeyDown={handleKeydown}
                    onChange={e => {
                      const copy = Array.from(items);
                      copy[index].description = e.currentTarget.value;
                      setItems(copy);
                    }}
                  />
                  {/* grip bars */}
                  <Grip id={item.id} />
                </div>
              </Sortable>
            ))}
          </SortableContext>
        </DndContext>
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

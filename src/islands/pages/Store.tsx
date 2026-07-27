import { useEffect, useState, type ReactNode } from "react";
import type { StoreItem } from "@/shared/types.ts";
import { dataClient } from "@/client/neon.ts";
import { openIndexedDB } from "@/client/indexed-db.ts";
import { useParams } from "react-router";
import { v4 } from "uuid";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";




interface Store {
  id: string;
  name: string;
}

interface LocalStoreItem extends Omit<StoreItem, "store_id"> {
}

export default function Store() {
  const params = useParams();
  const [focusId, setFocusId] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>();
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
    const item = { id: v4(), got: false, description: '', order: lastItemOrder + 1000, autoFocus: true };
    setItems([...items, item]);
    setFocusId(item.id);
  }
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.code == "Enter") newItem();
    }

    document.addEventListener("keydown", handleKeydown);

    return () => document.removeEventListener("keydown", handleKeydown);
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  function handleDragStart({ active }: any) {
    setDragId(active.id);
  }

  function handleDragEnd({ active, over }: any) {
    setDragId(null);
    if (!over || active.id === over.id) return;
    const prev = items;
    const oldIndex = prev.findIndex((i) => i.id === active.id);
    const newIndex = prev.findIndex((i) => i.id === over.id);

    setItems(arrayMove(prev, oldIndex, newIndex));
  }

  const ids = items.map((i) => i.id);
  return (
    <div >
      <h2 className="text-center underline">{store.name}</h2>

      <div>
        <DndContext

          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            {items.map((item) => (

              <Sortable id={item.id} key={item.id}>
                <div className="flex flex-row">
                  <input tabIndex={-1} type="checkbox" className="checkbox" />
                  <input type="text" className="w-80 mx-4" autoFocus={item.id == focusId} />
                  {item.description}
                  {/* grip bars */}
                  <Grip id={item.id} />


                </div>
              </Sortable>
            ))}
          </SortableContext>

        </DndContext>
      </div>
      <button type="button" className="btn btn-ghost w-screen" onClick={newItem}>+</button>
    </div >
  );
}
interface GripProps {
  id: string,
}

function Grip(props: GripProps) {
  const [visible, setVisible] = useState(false);
  const { listeners, isDragging, attributes } = useSortable({ id: props.id });
  return <div
    {...listeners}
    {...attributes}

    onPointerOver={() => setVisible(true)}
    onPointerOut={() => setVisible(false)}
    className="cursor-grab px-2"
    style={{
      opacity: isDragging ? 0.35 : visible ? 1 : 0
    }}
  ><img src="/grocery-shopping/grip-bars.svg" />
  </div>
}



interface SortableProps {
  id: string;
  children: ReactNode;
}
function Sortable(props: SortableProps) {
  const {
    // attributes,
    // listeners
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
    cursor: "grab",
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style}   >
      {props.children}
    </div>
  );
}


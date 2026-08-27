import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { type ReactNode, } from "react";
import { syncAtom } from "@/model";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Input from "@/components/Input";
import {
  atom,
  useAtom,
  useAtomValue,
  useSetAtom,
} from "jotai";

import {
  GotItem,
  appendNewItemAtom,
  applyActionAtom,
  focusIndexAtom,
  gotItemsAtom,
  handleCheckboxAtom,
  handleDragEndAtom,
  handleDragStartAtom,
  handleKeydownAtom,
  handleTextboxAtom,
  needItemsAtom,
  storeIdAtom,
  storeItemsAtom,
} from "@/pages/store/atoms";
import { Temporal } from "temporal-polyfill";
import { DataClient } from "@/neon";
import { StoreItem } from "@/types";
import { openIndexedDb, promisify, readTransaction } from "@/indexed-db";
import { JotaiStore } from "@/components/JotaiProvider";

const nowAtom = atom<Temporal.PlainDate>(toPlainDate(new Date()));
export const Route = createFileRoute("/store/$storeId")({
  component: RouteComponent,

  loader: async ({ params: { storeId }, abortController }) => {
    const dataClient = await DataClient.new();
    const stores = await dataClient
      .get("stores", {
        "select":
          "name,items:store_items(id, description, got, order, last_got_at)",
        "id": `eq.${storeId}`,
        "store_items.order": "order.asc",
      }, abortController.signal);

    const items: Record<string, StoreItem> = {};
    if (!stores.length) return { id: storeId, name: "", items };
    const store = stores[0];
    const result = { id: storeId, name: store.name, items };

    for (const item of store.items) {
      item.last_got_at = item.last_got_at ? new Date(item.last_got_at) : null;
      // @ts-ignore
      item.store_id = storeId;
      // @ts-ignore
      result.items[item.id] = item;
    }


    JotaiStore.set(storeIdAtom, storeId);
    JotaiStore.set(storeItemsAtom, items);
    JotaiStore.set(nowAtom, toPlainDate(new Date()));

    const db = await openIndexedDb();
    const actions = await promisify(readTransaction(db, "actions").getAll());
    for (const action of actions) {
      JotaiStore.set(applyActionAtom, action);
    }

    return { name: store.name }
  },
});

function toPlainDate(date: Date): Temporal.PlainDate {
  return new Temporal.PlainDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
}

function ago(item: GotItem, now: Temporal.PlainDate): string {
  if (typeof item.last_got_at !== "object") return "?";
  const duration = now.since(toPlainDate(item.last_got_at));

  if (duration.days === 0) return "today";
  return `${duration.days}d ago`;
}

function RouteComponent() {
  const { name } = Route.useLoaderData();
  const id = useAtomValue(storeIdAtom);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );
  const now = useAtomValue(nowAtom);
  const handleDragStart = useSetAtom(handleDragStartAtom);
  const handleDragEnd = useSetAtom(handleDragEndAtom);
  const need = useAtomValue(needItemsAtom);
  const gots = useAtomValue(gotItemsAtom);
  const [focusIndex, setFocusIndex] = useAtom(focusIndexAtom);
  const handleKeydown = useSetAtom(handleKeydownAtom);
  const handleTextbox = useSetAtom(handleTextboxAtom);
  const handleCheckbox = useSetAtom(handleCheckboxAtom);
  const addNewItem = useSetAtom(appendNewItemAtom);
  const navigate = useNavigate();
  const sync = useAtomValue(syncAtom);

  // render
  return (
    <div>
      <header className="relative flex items-center justify-center w-full">
        <h2
          id={id}
          className="text-center underline"
        >
          {name}
        </h2>

        <details className="dropdown dropdown-end absolute right-0">
          <summary className="btn m-1">
            <img src="/grocery-shopping/wrench.svg" alt="settings" />
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li>
              <button
                className="btn btn-error"
                onClick={() => {
                  sync.send({ table: "stores", op: "delete", entity: { id } })
                    .then(() => navigate({ to: "/stores" }));
                }}
              >
                delete
              </button>
            </li>
          </ul>
        </details>
      </header>

      <h3 className="my-3 text-xl">Need</h3>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={need.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {need.map((item, index) => (
            <Sortable id={item.id} key={item.id}>
              <div id={item.id} className="flex flex-row m-2">
                <input
                  data-id={item.id}
                  tabIndex={-1}
                  type="checkbox"
                  className="checkbox p-2"
                  checked={item.got}
                  onChange={handleCheckbox}
                />
                <Input
                  data-id={item.id}
                  focus={index === focusIndex}
                  type="text"
                  className="w-80 mx-2 outline-hidden"
                  onFocus={() => setFocusIndex(index)}
                  onKeyDown={handleKeydown}
                  onChange={handleTextbox}
                  value={item.description}
                />
                {/* grip bars */}
                <Grip id={item.id} />
              </div>
            </Sortable>
          ))}
        </SortableContext>
      </DndContext>

      <button
        type="button"
        className="btn btn-ghost w-100"
        onClick={addNewItem}
      >
        +
      </button>
      {gots.length ? <h3 className="my-3 text-xl">Got</h3> : null}
      <div>
        {gots.map((item) => (
          <div id={item.id} key={item.id} className="flex flex-row m-2">
            <input
              data-id={item.id}
              tabIndex={-1}
              type="checkbox"
              className="checkbox p-2 "
              checked={item.got}
              onChange={handleCheckbox}
            />
            <input
              data-id={item.id}
              type="text"
              className="mx-2 flex-1 outline-hidden overflow-x-hidden"
              value={item.description}
              readOnly
            />
            <div className="italic text-nowrap">
              {ago(item, now)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface GripProps {
  id: string;
}

function Grip(props: GripProps) {
  const { listeners, isDragging, attributes } = useSortable({ id: props.id });
  return (
    // @ts-ignore
    <div
      {...listeners}
      {...attributes}
      className={`px-4 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{
        touchAction: "none",
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

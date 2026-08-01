import { type ReactNode, useEffect } from "react";
import { useParams } from "wouter";
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
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

import {
  appendNewItemAtom,
  focusIndexAtom,
  GotItem,
  gotItemsAtom,
  handleCheckboxAtom,
  handleDragEndAtom,
  handleDragStartAtom,
  handleKeydownAtom,
  handleTextboxAtom,
  loadStoreAtom,
  needItemsAtom,
  storeAtom,
} from "./actions";
import { useNavigate } from "wouter";
import { Temporal } from "temporal-polyfill";

const nowAtom = atom(toPlainDate(new Date()));

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
export default function Store() {
  // stateful hooks
  const params = useParams();
  const storeId = params.id;
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const navigate = useNavigate();
  const now = useAtomValue(nowAtom);
  const load = useSetAtom(loadStoreAtom);
  const store = useAtomValue(storeAtom);
  const handleDragStart = useSetAtom(handleDragStartAtom);
  const handleDragEnd = useSetAtom(handleDragEndAtom);
  const need = useAtomValue(needItemsAtom);
  const gots = useAtomValue(gotItemsAtom);
  const [focusIndex, setFocusIndex] = useAtom(focusIndexAtom);
  const handleKeydown = useSetAtom(handleKeydownAtom);
  const handleTextbox = useSetAtom(handleTextboxAtom);
  const handleCheckbox = useSetAtom(handleCheckboxAtom);
  const addNewItem = useSetAtom(appendNewItemAtom);

  // effects
  useEffect(() => {
    if (!storeId) {
      navigate("/store");
      return;
    }
    load(storeId);
  }, [load, storeId, navigate]);

  // render
  return (
    <div>
      <h2
        id={storeId}
        className="text-center underline w-100"
      >
        {store.name}
      </h2>

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
                  className="w-80 ml-4 outline-hidden"
                  onFocus={() => setFocusIndex(index)}
                  onKeyDown={handleKeydown}
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
              className="checkbox p-2"
              checked={item.got}
              onChange={handleCheckbox}
            />
            <input
              data-id={item.id}
              type="text"
              className="w-80 mx-4 outline-hidden"
              value={item.description}
              readOnly
            />
            <div className="italic">
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

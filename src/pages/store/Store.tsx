import { useEffect, type ReactNode } from "react";
import { useParams } from "wouter";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Input from "@/components/Input";
import { useAtom, useSetAtom, useAtomValue } from 'jotai';

import { appendNewItemAtom, focusIndexAtom, gotItemsAtom, handleCheckboxAtom, handleDragEndAtom, handleDragStartAtom, handleKeydownAtom, handleTextboxAtom, loadStoreAtom, needItemsAtom, storeAtom } from "./actions";
import useNavigate from "@/useNavigate";


export default function Store() {
  // stateful hooks
  const params = useParams();
  const storeId = params.id;
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const navigate = useNavigate();
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
      return
    }
    load(storeId);
  }, [load, storeId, navigate]);

  // render
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
          <SortableContext
            items={need.map(item => item.id)}
            strategy={verticalListSortingStrategy}>
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
                    className="w-80 mx-4 outline-hidden"
                    onFocus={() => setFocusIndex(index)}
                    onKeyDown={handleKeydown}
                    value={item.description}
                    onChange={handleTextbox}
                  />
                  {/* grip bars */}
                  <Grip id={item.id} />
                </div>
              </Sortable>
            ))}
          </SortableContext>
        </DndContext>
        {gots.length ? <h3 className="my-3">GOT</h3> : null}
        <div>
          {gots.map(item => (
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
            </div>
          ))}
        </div>
      </div>
      <button type="button" className="btn btn-ghost w-screen" onClick={addNewItem}>
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

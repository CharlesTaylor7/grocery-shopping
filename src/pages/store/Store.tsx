import { useEffect, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSnapshot } from "valtio";
import { useSyncModel } from "@/client/model";
import Input from "@/components/Input";
import { proxy, load, handleDragStart, handleDragEnd, handleKeydown, handleCheckbox, appendNewItem, derivedProxy, } from "./actions";


export default function Store() {
  // stateful hooks
  const params = useParams();
  const stateSnapshot = useSnapshot(proxy);
  const computedSnapshot = useSnapshot(derivedProxy);
  const snap = { ...stateSnapshot, ...computedSnapshot };
  const syncModel = useSyncModel();
  const storeId = params.id;
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const navigate = useNavigate();
  const args = { snapshot: snap, syncModel };

  // effects
  useEffect(() => {
    if (!storeId) {
      navigate("/store");
      return
    }
    load(storeId);
  }, [storeId, navigate]);

  // render
  return (
    <div>
      <h2 className="text-center underline">{stateSnapshot.storeName}</h2>

      <div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={(event) => handleDragEnd(args, event)}
        >
          <SortableContext
            items={computedSnapshot.need.map(item => item.id)}
            strategy={verticalListSortingStrategy}>
            {computedSnapshot.need.map((item, index) => (
              <Sortable id={item.id} key={item.id}>
                <div id={item.id} className="flex flex-row m-2">
                  <input
                    tabIndex={-1}
                    type="checkbox"
                    className="checkbox p-2"
                    checked={item.got}
                    onChange={handleCheckbox(args, item)}
                  />
                  <Input
                    focus={index === stateSnapshot.focusIndex}
                    data-id={item.id}
                    type="text"
                    className="w-80 mx-4 outline-hidden"
                    onFocus={() => proxy.focusIndex = index}
                    onKeyDown={(e) => handleKeydown(args, e)}
                    value={item.description}
                    onChange={e => {
                      const local = proxy.items[item.id];
                      const description = e.currentTarget.value;
                      if (local) {
                        local.description = description;
                        syncModel.send({
                          op: "edit",
                          table: "store_items",
                          entity: {
                            id: item.id,
                            store_id: stateSnapshot.storeId,
                            description,
                          }
                        })
                      }
                    }
                    }
                  />
                  {/* grip bars */}
                  <Grip id={item.id} />
                </div>
              </Sortable>
            ))}
          </SortableContext>
        </DndContext>
        {computedSnapshot.gots.length ? <h3 className="my-3">GOT</h3> : null}
        <div>
          {computedSnapshot.gots.map(item => (
            <div id={item.id} key={item.id} className="flex flex-row m-2">
              <input
                tabIndex={-1}
                type="checkbox"
                className="checkbox p-2"
                checked={item.got}
                onChange={handleCheckbox(args, item)}
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
      <button type="button" className="btn btn-ghost w-screen" onClick={() => appendNewItem(args)}>
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

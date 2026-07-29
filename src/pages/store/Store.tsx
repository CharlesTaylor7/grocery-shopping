import { useEffect, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSnapshot } from "valtio";
import { useSyncModel } from "@/client/model";
import Input from "@/components/Input";
import { state, load, handleDragStart, handleDragEnd, handleKeydown, handleCheckbox, appendNewItem } from "./actions";


export default function Store() {
  // stateful hooks
  const params = useParams();
  const snapshot = useSnapshot(state);
  const syncModel = useSyncModel();
  const storeId = params.id;
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const navigate = useNavigate();
  const args = { snapshot, syncModel };

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
      <h2 className="text-center underline">{snapshot.storeName}</h2>

      <div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={(event) => handleDragEnd(args, event)}
        >
          <SortableContext
            items={snapshot.need.map(item => item.id)}
            strategy={verticalListSortingStrategy}>
            {snapshot.need.map((item, index) => (
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
                    focus={index === snapshot.focusIndex}
                    data-id={item.id}
                    type="text"
                    className="w-80 mx-4 outline-hidden"
                    onFocus={() => state.focusIndex = index}
                    onKeyDown={(e) => handleKeydown(args, e)}
                    value={item.description}
                    onChange={e => {
                      const local = state.items[item.id];
                      if (local) {
                        syncModel.send({
                          op: "edit",
                          table: "store_items",
                          entity: {
                            id: item.id,
                            store_id: snapshot.storeId,
                            description: snapshot.storeId
                          }
                        })
                        local.description = e.currentTarget.value;
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
        {snapshot.gots.length ? <h3 className="my-3">GOT</h3> : null}
        <div>
          {snapshot.gots.map(item => (
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

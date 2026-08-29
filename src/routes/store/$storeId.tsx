import { promisify, readTransaction, writeTransaction } from '@/indexed-db';
import { Store, StoreItem } from '@/migrate';
import { createFileRoute, Link, useRouter } from '@tanstack/solid-router'
import { For, createMemo, createSignal } from 'solid-js';
import { Temporal } from "temporal-polyfill";


export const Route = createFileRoute("/store/$storeId")({
  component: RouteComponent,
  async loader({ params, context }) {
    const storeId = Number(params.storeId);
    const store = await promisify<Store>(
      readTransaction(context.db, "stores").get(storeId)
    );
    const items = await promisify<StoreItem[]>(
      readTransaction(context.db, "store_items")
        .index("store_id")
        .getAll(Number(params.storeId))
    );

    return ({
      now: toPlainDate(new Date()),
      store,
      items
    })
  }
});

function Grip(props) {
  let isDragging = false; // fixme
  return (
    <div
      class={`px-4 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{
        "touch-action": "none",
      }}
    >
      <img src={`${import.meta.env.BASE_URL}grip-bars.svg`} />
    </div>
  );
}


function RouteComponent() {
  const params = Route.useParams();
  const context = Route.useRouteContext();
  const loader = Route.useLoaderData();
  const router = useRouter();

  const needs = createMemo(() =>
    loader().items.filter(item => !item.got)
  );

  const got = createMemo(() =>
    loader().items.filter(item => item.got)
  );
  const now = () => loader().now;

  async function onDelete() {
    const storeId = loader().store.id;
    await promisify(writeTransaction(context().db, "stores").delete(storeId));
  }

  async function handleCheckbox() {
  }
  return (
    <div>
      <header class="relative flex items-center justify-center w-full">
        <h2 class="text-center underline" >
          {loader().store.name}
        </h2>

        <details class="dropdown dropdown-end absolute right-0">
          <summary class="btn m-1">
            <img src={`${import.meta.env.BASE_URL}wrench.svg`} alt="settings" />
          </summary>
          <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li>
              <button
                class="btn btn-error"
                onClick={onDelete}
              >
                Delete
              </button>
            </li>
          </ul>
        </details>
      </header>

      <h3 class="my-3 text-xl">Need</h3>
      <For each={needs()}>
        {(item) =>
          <div id={item.id} class="flex flex-row m-2">
            <input
              data-id={item.id}
              tabindex={-1}
              type="checkbox"
              class="checkbox p-2"
              checked={item.got}
              onChange={handleCheckbox}
            />
            <input
              data-id={item.id}
              //        focus={index === focusIndex}
              type="text"
              class="w-80 mx-2 outline-hidden"
              value={item.description}
            />

            {/* onFocus={() => setFocusIndex(index)} */}
            {/* onKeyDown={handleKeydown} */}
            {/* onChange={handleTextbox} */}
            {/* grip bars */}
            <Grip id={item.id} />
          </div>
        }
      </For>
      <button
        type="button"
        class="btn btn-ghost w-100"
      // onClick={addNewItem}
      >
        +
      </button>
      {got().length ? <h3 class="my-3 text-xl">Got</h3> : null}
      <div>
        <For each={got()}>

          {(item) =>
            <div id={item.id} class="flex flex-row m-2">
              <input
                data-id={item.id}
                tabindex={-1}
                type="checkbox"
                class="checkbox p-2 "
                checked={item.got}
                onChange={handleCheckbox}
              />
              <input
                data-id={item.id}
                type="text"
                class="mx-2 flex-1 outline-hidden overflow-x-hidden"
                value={item.description}
                readonly
              />
              <div class="italic text-nowrap">
                {ago(item, now())}
              </div>
            </div>
          }
        </For>
      </div>
    </div>
  );
}


function toPlainDate(date: Date): Temporal.PlainDate {
  return new Temporal.PlainDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
}

function ago(item: StoreItem, now: Temporal.PlainDate): string {
  if (typeof item.last_got_at !== "object") return "?";
  const duration = now.since(toPlainDate(item.last_got_at));

  if (duration.days === 0) return "today";
  return `${duration.days}d ago`;
}

// function RouteComponent() {
//   const { name } = Route.useLoaderData();
//   const id = useAtomValue(storeIdAtom);
//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
//   );
//   const now = useAtomValue(nowAtom);
//   const handleDragStart = useSetAtom(handleDragStartAtom);
//   const handleDragEnd = useSetAtom(handleDragEndAtom);
//   const need = useAtomValue(needItemsAtom);
//   const gots = useAtomValue(gotItemsAtom);
//   const [focusIndex, setFocusIndex] = useAtom(focusIndexAtom);
//   const handleKeydown = useSetAtom(handleKeydownAtom);
//   const handleTextbox = useSetAtom(handleTextboxAtom);
//   const handleCheckbox = useSetAtom(handleCheckboxAtom);
//   const addNewItem = useSetAtom(appendNewItemAtom);
//   const navigate = useNavigate();
//   const sync = useAtomValue(syncAtom);
//
//   // render
// interface GripProps {
//   id: string;
// }
// interface SortableProps {
//   id: string;
//   children: ReactNode;
// }
// function Sortable(props: SortableProps) {
//   const { setNodeRef, transform, transition } = useSortable({ id: props.id });
//
//   return (
//     <div
//       ref={setNodeRef}
//       style={{
//         transform: CSS.Transform.toString(transform),
//         transition,
//       }}
//     >
//       {props.children}
//     </div>
//   );
// }


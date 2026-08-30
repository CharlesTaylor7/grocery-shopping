import { promisify, readTransaction, writeTransaction } from '@/indexed-db';
import { Store, StoreItem } from '@/migrate';
import { createFileRoute, useNavigate, useRouter } from '@tanstack/solid-router'
import { For, onSettled, createEffect, createMemo, createSignal, untrack } from 'solid-js';
import { Temporal } from "temporal-polyfill";

export const Route = createFileRoute("/store/$storeId")({
  component: RouteComponent,
  remountDeps: ({ params }) => params.storeId,
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

function Grip() {
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
  const context = Route.useRouteContext()
  const loader = Route.useLoaderData();
  const db = untrack(context).db;
  const navigate = useNavigate();
  const router = useRouter();
  const [getFocus, setFocus] = createSignal(-1);

  createEffect(
    getFocus,
    (focus) => {
      const el = document.querySelector(`[data-index="${focus}"][type="text"`) as HTMLElement;

      if (el) {
        el.focus();
      }
    }
  );

  // we need the ref callback for newly created items
  // we need the effect for focusing existing items
  function textInputRef(el: HTMLInputElement) {
    const focus = untrack(getFocus);
    onSettled(() => {
      if (focus.toString() === el.dataset.index) {
        el.focus()
      }
    });
  }

  const items = createMemo(() =>
    Object.fromEntries(loader().items.map(item => [item.id, item]))
  );
  const needs = createMemo(() =>
    loader().items.filter(item => !item.got)
  );

  const got = createMemo(() =>
    loader().items.filter(item => item.got)
  );
  const now = () => loader().now;

  async function onDelete() {
    const storeId = loader().store.id;
    await promisify(writeTransaction(db, "stores").delete(storeId));

    navigate({ to: "/stores" });
  }

  async function handleFocus(e: Event) {
    const el = e.currentTarget as HTMLInputElement
    const index = Number(el.dataset.index);
    setFocus(index);
  }

  async function handleCheckbox(e: Event) {
    const el = e.currentTarget as HTMLInputElement
    const id = Number(el.dataset.id);
    const item = untrack(items)[id];
    item.got = el.checked;
    item.last_got_at = new Date();
    await promisify(writeTransaction(db, "store_items").put(item));
    document.startViewTransition(() => {
      router.invalidate();
    });
  }

  async function handleTextbox(e: Event) {
    const el = e.currentTarget as HTMLInputElement
    const id = Number(el.dataset.id);
    const item = untrack(items)[id];
    item.description = el.value;
    await promisify(writeTransaction(db, "store_items").put(item));
    router.invalidate();
  }

  async function handleKeydown(e: KeyboardEvent) {
    const el = e.currentTarget as HTMLInputElement
    const id = Number(el.dataset.id);
    const item = untrack(items)[id];
    item.got = el.checked;

    if (e.code === 'Enter') {
      //
      let isLast = false;
      let nextItemIsNotEmpty = false;
      if (isLast) {
        addNewItem();
      }
      else if (nextItemIsNotEmpty) {
        // insert new between
      } else {
        // move focus down
      }
    }
    else if (e.code === 'Backspace') {
      // if val is empty, delete the item
      if (!el.value) {
        const id = Number(el.dataset.id)
        await promisify(writeTransaction(db, "store_items").delete(id));
        setFocus(f => f - 1);
      }
    }
    else if (e.code === 'ArrowUp') {
      // move focus up
      setFocus(f => f - 1);
    }

    else if (e.code === 'ArrowDown') {
      // move focus down
      setFocus(f => f + 1);
    }

    router.invalidate();
  }

  async function addNewItem() {
    const item = {
      store_id: loader().store.id,
      order: loader().items.length * 1000,
      description: '',
      got: false
    } as StoreItem;

    setFocus(untrack(needs).length);

    await promisify(writeTransaction(db, "store_items").add(item));
    router.invalidate()
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
        {(item, getIndex) =>
          <div class="flex flex-row m-2">
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
              data-index={getIndex()}
              ref={textInputRef}
              type="text"
              class="w-80 mx-2 outline-hidden"
              value={item.description}
              onFocus={handleFocus}
              onKeyDown={handleKeydown}
              onChange={handleTextbox}
            />

            {/* grip bars */}
            <Grip />
          </div>
        }
      </For>
      <button
        type="button"
        class="btn btn-ghost w-100"
        onClick={addNewItem}
      >
        +
      </button>
      {got().length ? <h3 class="my-3 text-xl">Got</h3> : null}
      <div>
        <For each={got()}>
          {(item) =>
            <div class="flex flex-row m-2">
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


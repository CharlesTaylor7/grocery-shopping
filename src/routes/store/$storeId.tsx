import { DragDropManager } from '@dnd-kit/dom';
import { isSortable, Sortable } from '@dnd-kit/dom/sortable';
import { promisify, readTransaction, writeTransaction } from '@/indexed-db';
import { Store, StoreItem } from '@/migrate';
import { createFileRoute, useNavigate, useRouter } from '@tanstack/solid-router'
import { For, onSettled, createEffect, createMemo, createSignal, untrack, onCleanup } from 'solid-js';
import { ago } from '@/lib/dates';

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
      store,
      items
    })
  }
});


function RouteComponent() {
  const context = Route.useRouteContext()
  const loader = Route.useLoaderData();
  const db = untrack(context).db;
  const navigate = useNavigate();
  const router = useRouter();
  const focus = useFocus();

  const getItemMap = createMemo(() =>
    Object.fromEntries(loader().items.map(item => [item.id, item]))
  );

  const getNeeded = createMemo(() =>
    loader().items.filter(item => !item.got)
      .toSorted((a, b) => a.order - b.order)
  );

  const getGot = createMemo(() =>
    loader().items.filter(item => item.got)
      .toSorted((a, b) => a.description.toLowerCase().localeCompare(b.description.toLowerCase()))

  );
  async function onDelete() {
    const storeId = loader().store.id;
    await promisify(writeTransaction(db, "stores").delete(storeId));

    navigate({ to: "/stores" });
  }

  async function handleCheckbox(e: Event) {
    const el = e.currentTarget as HTMLInputElement
    const id = Number(el.dataset.id);
    const item = untrack(getItemMap)[id];
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
    const item = untrack(getItemMap)[id];
    item.description = el.value;
    await promisify(writeTransaction(db, "store_items").put(item));
    router.invalidate();
  }

  async function handleKeydown(e: KeyboardEvent) {
    const el = e.currentTarget as HTMLInputElement
    const index = Number(el.dataset.index);
    const needed = untrack(getNeeded);

    if (e.code === 'Enter') {
      if (index === needed.length - 1) {
        addNewItem();
      }
      // next is empty
      else if (!needed[index + 1].description) {
        // move focus down
        focus.set(f => f + 1);
      } else {
        // insert new between
        focus.set(index + 1);
        const current = needed[index];
        const next = needed[index + 1];
        const order = Math.floor((current.order + next.order) / 2);
        const newItem = { description: '', order, got: false, store_id: loader().store.id }

        await promisify(writeTransaction(db, "store_items").add(newItem));
        router.invalidate();
      }
    }
    else if (e.code === 'Backspace') {
      // if val is empty, delete the item
      if (!el.value) {
        e.preventDefault();
        const id = Number(el.dataset.id)
        focus.set(f => f - 1);
        await promisify(writeTransaction(db, "store_items").delete(id));
        router.invalidate();
      }
    }
    else if (e.code === 'ArrowUp') {
      // move focus up
      focus.set(f => f - 1);
    }

    else if (e.code === 'ArrowDown') {
      // move focus down
      focus.set(f => f + 1);
    }
  }

  async function addNewItem() {
    const lastOrder = getNeeded().at(-1)?.order ?? 0
    const item = {
      store_id: loader().store.id,
      order: lastOrder + 1000,
      description: '',
      got: false
    } as StoreItem;

    focus.set(untrack(getNeeded).length);

    await promisify(writeTransaction(db, "store_items").add(item));
    document.startViewTransition(() => {
      router.invalidate()
    });
  }

  const manager = new DragDropManager();
  manager.monitor.addEventListener('dragend', event => {
    if (!isSortable(event.operation.source)) return

    const { initialIndex: oldIndex, index: newIndex } = event.operation.source;

    const edits: DndEdit[] = [];
    const needed = untrack(getNeeded);
    const activeItem = needed[oldIndex];
    if (newIndex === 0) {
      const order = needed[0].order - 1000;
      edits.push({ item: activeItem, order });
    } else if (newIndex === needed.length - 1) {
      const order = needed.at(-1)!.order + 1000;
      edits.push({ item: activeItem, order });
    }
    else if (newIndex > oldIndex) {
      const adjacentIndex = newIndex + 1;
      const targetOrder = needed[newIndex].order;
      const adjacentOrder = needed[adjacentIndex].order;
      let order = Math.ceil((targetOrder + adjacentOrder) / 2);
      edits.push({ item: activeItem, order });

      if (order === adjacentOrder) {
        for (let i = adjacentIndex; i < needed.length; i++) {
          if (needed[i].order - order < 1000) {
            order += 1000;
            edits.push({ item: needed[i], order });
          } else break;
        }
      }
    }
    else if (newIndex < oldIndex) {
      const adjacentIndex = newIndex - 1;
      const targetOrder = needed[newIndex].order;
      const adjacentOrder = needed[adjacentIndex].order;
      let order = Math.floor((targetOrder + adjacentOrder) / 2);
      edits.push({ item: activeItem, order });

      if (order === adjacentOrder) {
        for (let i = adjacentIndex; i >= 0; i--) {
          if (order - needed[i].order < 1000) {
            order -= 1000;
            edits.push({ item: needed[i], order });
          } else break;
        }
      }
    }

    batchDndEdit(db, edits)
      .catch(e => {
        console.error(e);
        // reset if failure
        router.invalidate();
      })
  })
  onCleanup(() => manager.destroy());

  function registerDndRef(element: HTMLElement) {
    onSettled(() => {
      const index = Number(element.dataset.index);
      const item = untrack(getNeeded)[index]
      const sortable = new Sortable({
        id: item.id,
        index,
        element,
        handle: element.querySelector('[data-role="grip"]')!,
      }, manager);
    });
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
      <For each={getNeeded()}>
        {(item, getIndex) =>
          <div
            ref={registerDndRef}
            data-index={getIndex()}
            data-order={item.order}
            class="flex flex-row m-2">
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
              ref={focus.callbackRef}
              type="text"
              class="w-80 mx-2 outline-hidden"
              value={item.description}
              onFocus={focus.eventHandler}
              onKeyDown={handleKeydown}
              onChange={handleTextbox}
            />
            <div
              data-role="grip"
              class="px-4 cursor-grab"
              style={{
                "touch-action": "none",
              }}
            >
              <img src={`${import.meta.env.BASE_URL}grip-bars.svg`} />
            </div>
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
      {getGot().length ? <h3 class="my-3 text-xl">Got</h3> : null}
      <For each={getGot()}>
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
              {ago(item.last_got_at)}
            </div>
          </div>
        }
      </For>
    </div>
  );
}


function useFocus() {
  const [getFocus, setFocus] = createSignal(-1);

  // we need the ref callback for newly created items
  // we need the effect for focusing existing items
  function callbackRef(el: HTMLInputElement) {
    const focus = untrack(getFocus);
    onSettled(() => {
      if (focus.toString() === el.dataset.index) {
        el.focus()
      }
    });
  }
  createEffect(
    getFocus,
    (focus) => {
      const el = document.querySelector(`[data-index="${focus}"][type="text"`) as HTMLElement;

      if (el) {
        el.focus();
      }
    }
  );

  function eventHandler(e: Event) {
    const el = e.currentTarget as HTMLInputElement
    const index = Number(el.dataset.index);
    setFocus(index);
  }

  return {
    callbackRef,
    eventHandler,
    set: setFocus,
  } as const
}

interface DndEdit {
  item: StoreItem,
  order: number
}

function batchDndEdit(db: IDBDatabase, edits: DndEdit[]): Promise<void> {
  // batch edits
  const tx = db.transaction("store_items", "readwrite");
  const table = tx.objectStore("store_items");
  for (const edit of edits) {
    table.put({
      ...edit.item,
      order: edit.order
    });
  }
  return new Promise((resolve, reject) => {
    tx.onerror = () => {
      reject(tx.error);
    }
    tx.oncomplete = () => {
      resolve();
    }
  });
}

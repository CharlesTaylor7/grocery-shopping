import { promisify, readTransaction, writeTransaction } from '@/indexed-db';
import { Store } from '@/migrate';
import { createFileRoute, Link, useRouter } from '@tanstack/solid-router'
import { For, createSignal } from 'solid-js';


export const Route = createFileRoute("/stores")({
  component: RouteComponent,
  async loader({ context }) {
    const stores = await promisify<Store[]>(
      readTransaction(context.db, "stores").index("name").getAll());
    return ({ stores })
  }
});

function RouteComponent() {
  const context = Route.useRouteContext();
  const loader = Route.useLoaderData();
  const router = useRouter();
  const [getName, setName] = createSignal('');
  async function createStore() {
    const name = getName();
    setName('');
    await promisify(
      writeTransaction(context().db, "stores")
        .add({ name })
    );
    router.invalidate();
  }
  return (
    <div>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Store Name"
        value={getName()}
        onInput={(e) => void setName(e.currentTarget.value)}
        onKeyDown={(e) => e.code === "Enter" && getName()
          ? createStore()
          : null
        }
      />
      <button
        disabled={!getName()}
        type="button"
        class="btn btn-primary"
        onClick={createStore}
      >
        + New Store
      </button>
      <div class="flex flex-col items-start">
        <For each={loader().stores}>
          {(s) =>
            <Link
              class="btn btn-ghost"
              viewTransition
              to="/store/$storeId"
              params={{ storeId: s.id.toString() }}
            >
              <h2>
                {s.name}
              </h2>
            </Link>
          }
        </For>
      </div>
    </div>
  );
}


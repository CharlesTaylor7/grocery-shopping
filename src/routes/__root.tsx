import { openIndexedDb } from "@/indexed-db";
import { exportNeonData } from "@/migrate";
import { createRootRoute, Link, Outlet } from "@tanstack/solid-router";
import { Notyf } from "notyf";

export const Route = createRootRoute({
  component: RootComponent,
  async beforeLoad() {
    const neon = await exportNeonData();
    const db = await openIndexedDb(neon);
    return ({ db });
  },
  context() {
    return ({
      notyf: new Notyf({
        duration: 3000,
        position: {
          x: 'right',
          y: 'bottom',
        },
        types: [
          {
            type: 'warning',
            background: 'orange',
            icon: {
              className: 'material-icons',
              tagName: 'i',
              text: 'warning'
            }
          },
          {
            type: 'error',
            background: 'indianred',
            duration: 2000,
            dismissible: true
          }
        ]
      })
    });
  }
});

function RootComponent() {
  return (
    <div>
      <header class="bg-base-200 p-3 text-sm flex flex-row justify-between w-full">
        <div class="flex items-center justify-between w-full">
          <nav class="tabs items-center">
            <Link viewTransition to="/stores" class="tab">
              Stores
            </Link>
            <Link viewTransition to="/" class="tab">
              Home
            </Link>
          </nav>

          <span>
            Greetings Traveler
          </span>
        </div>
      </header>
      <main class="p-3 overflow-y-scroll overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}

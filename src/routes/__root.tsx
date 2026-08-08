import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import JotaiProvider, { JotaiStore } from '@/components/JotaiProvider';
import Toaster from "@/components/Toaster";
import SyncActionRunner from "@/components/SyncActionRunner";
import { SYNC_MODE } from "@/config";
import LastVisitSave from "@/components/LastVisitSave";
import { TanStackRouterDevtools as RouterDev } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools as QueryDev } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/query-client";
import { authClient } from "@/auth";
import { syncAtom, SyncModel } from '@/model';

export const Route = createRootRoute({
  component: RootComponent,
  loader: async () => {

    JotaiStore.set(syncAtom, await SyncModel.new(SYNC_MODE));
    return await authClient.getSession();
  },
});

function RootComponent() {
  const { data } = Route.useLoaderData();
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <header className="bg-base-300 p-3 text-sm flex flex-row justify-between w-full">
          <div className="flex items-center justify-between w-full">
            <span>
              Hello, {data?.user?.name ?? "Guest"}
            </span>
            <nav className="tabs items-center">
              <Link to="/" className="tab">
                Home
              </Link>
              <Link to="/stores" className="tab">
                Stores
              </Link>
              <Link to="/trips" className="tab">
                Trips
              </Link>
              {data?.user != null ? null : (
                <Link to="/auth/login" className="tab">
                  Login
                </Link>
              )}
              {data?.user == null ? null : (
                <button
                  className="btn btn-error btn-xs mr-3"
                  onClick={() => authClient.signOut}
                >
                  Log out
                </button>
              )}
            </nav>
          </div>
        </header>
        <main className="p-3 overflow-y-scroll overflow-x-hidden">
          <Outlet />
          <LastVisitSave />
          <Toaster />
        </main>
        <RouterDev />
        <QueryDev />
        <SyncActionRunner mode={SYNC_MODE} />
      </JotaiProvider>
    </QueryClientProvider>
  );
}

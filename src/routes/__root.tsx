import { Outlet, Link, createRootRoute } from '@tanstack/react-router'
import Toaster from "@/components/Toaster";
import SyncActionProvider from "@/components/SyncActionProvider";
import { SYNC_MODE } from "@/config";
import LastVisitSave from "@/components/LastVisitSave";
import { TanStackRouterDevtools as RouterDev } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools as QueryDev } from '@tanstack/react-query-devtools'
import ClickMe from '@/components/ClickMe';
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '@/query-client';
import { authClient } from '@/auth';
import { useEffect } from 'react';


export const Route = createRootRoute({
  component: RootComponent,
  loader: async () => {
    return await authClient.getSession();
  }
});

function RootComponent() {
  const { data } = Route.useLoaderData();
  return (
    <QueryClientProvider client={queryClient}>
      <SyncActionProvider mode={SYNC_MODE}>
        <header className='px-3 pt-3 text-sm flex flex-row justify-between w-full'>
          <span>
            Hello {data?.user?.name ?? 'Guest'}
          </span>
        </header>
        <div className='flex justify-between w-full'>
          <nav className='tabs items-center'>

            <Link to="/store" className="tab">
              Stores
            </Link>

            {data?.user != null ? null :
              <>
                <Link to="/auth/login" className="tab">
                  Login
                </Link>
                <Link to="/auth/signup" className="tab">
                  Signup
                </Link>
              </>
            }

          </nav>

          {data?.user == null ? null : <button className="btn btn-error btn-xs mr-3"
            onClick={() => authClient.signOut}
          >
            Log out

          </button>}
        </div>
        <hr />
        <main className="p-3 overflow-y-scroll overflow-x-hidden">
          <Outlet />
          <LastVisitSave />
          <Toaster />
        </main>
        <RouterDev />
        <QueryDev />
      </SyncActionProvider>
    </QueryClientProvider >
  )
}

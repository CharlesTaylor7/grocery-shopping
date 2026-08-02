import { Outlet, ErrorComponentProps, Link, createRootRoute } from '@tanstack/react-router'
import Toaster from "@/components/Toaster";
import SyncActionProvider from "@/components/SyncActionProvider";
import { SYNC_MODE } from "@/config";
import LastVisitSave from "@/components/LastVisitSave";
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'



export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ErrorComponent,
});

function ErrorComponent(props: ErrorComponentProps) {
  return (
    <div className="flex flex-col">
      <code className='italic'>
        {props.error.message}
        <br />
        {props.error.stack}
      </code>
    </div>)
}

function RootComponent() {
  return (
    <SyncActionProvider mode={SYNC_MODE}>
      {/* nav */}
      <div className="p-2 flex gap-2">
        <Link to="/store" className="[&.active]:font-bold">
          Stores
        </Link>
        <Link to="/auth/login" className="[&.active]:font-bold">
          Login
        </Link>
        <Link to="/auth/signup" className="[&.active]:font-bold">
          Signup
        </Link>
        <Link to="/auth/signout" className="[&.active]:font-bold">
          Logout
        </Link>
      </div>
      <hr />
      {/* body */}
      <div className="p-3 flex-1 overflow-y-scroll overflow-x-hidden">
        <Outlet />

        <LastVisitSave />
        <Toaster />
      </div>

      <TanStackRouterDevtools />
    </SyncActionProvider >
  )
}

import { Link, Outlet, ScrollRestoration } from "react-router";
import "@/client/styles.css";
import LastVisitSave from "@/islands/LastVisitSave";
import Toaster from "@/islands/Toaster";
import SyncActions from "@/islands/SyncActions";
import LoginPrompt from "@/islands/LoginPrompt";
import SyncContextProvider from "@/islands/SyncContextProvider";

export default function Root() {
  return (
    <>
      <div className="h-screen flex flex-col">
        <h1 className="w-full p-3 bg-base-200 grid grid-cols-3 items-center">
          <div>
            <LoginPrompt />
          </div>

          <div className="text-center"></div>

          <div className="text-right">
            <Link to="/nav">Nav</Link>
          </div>
        </h1>

        <div className="flex-1 overflow-y-scroll overflow-x-hidden">
          <SyncContextProvider>
            <Outlet />
          </SyncContextProvider>
          <LastVisitSave />
          <Toaster />
        </div>
      </div>
      <SyncActions useWebWorker={false} />
      <ScrollRestoration />
    </>
  );
}

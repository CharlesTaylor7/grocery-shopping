import { Link, Outlet, ScrollRestoration } from "react-router";
import "@/client/styles.css";
import Toaster from "@/islands/Toaster";
import LoginPrompt from "@/islands/LoginPrompt";
import SyncActionProvider from "@/islands/SyncActionProvider";
import { SYNC_MODE } from "@/client/config";
import LastVisitSave from "./islands/LastVisitSave";
import { Suspense } from "react";

export default function Root() {
  return (
    <SyncActionProvider mode={SYNC_MODE}>
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
          <Suspense fallback="the suspense is killing me" >
            <Outlet />
          </Suspense>
          <Toaster />
        </div>
      </div>
      <ScrollRestoration />
      <LastVisitSave />
    </SyncActionProvider>
  );
}

import Toaster from "@/islands/Toaster";
import LoginPrompt from "@/islands/LoginPrompt";
import SyncActionProvider from "@/islands/SyncActionProvider";
import { SYNC_MODE } from "@/client/config";
import LastVisitSave from "@/islands/LastVisitSave";
import { Suspense } from "react";
import { Link } from "wouter";
import HashRouter from "@/components/HashRouter";
import RouteTree from "@/components/RouteTree";

export default function App() {
  return (
    <SyncActionProvider mode={SYNC_MODE}>
      <HashRouter>
        <div className="h-screen flex flex-col" data-theme="dark">
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
              <RouteTree />
            </Suspense>

            <LastVisitSave />
            <Toaster />
          </div>
        </div>
      </HashRouter>
    </SyncActionProvider>
  );
}



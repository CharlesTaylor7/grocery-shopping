import Toaster from "@/components/Toaster";
import LoginPrompt from "@/components/LoginPrompt";
import SyncActionProvider from "@/components/SyncActionProvider";
import { SYNC_MODE } from "@/config";
import LastVisitSave from "@/components/LastVisitSave";
import { Suspense } from "react";
import { Link, } from "wouter";
import HashRouter from "@/components/HashRouter";
import RouteTree from "@/components/RouteTree";

export default function App() {
  return (
    <SyncActionProvider mode={SYNC_MODE}>
      <HashRouter>
        <div className="h-screen flex flex-col p-3" data-theme="dark">
          <h1 className="w-full bg-base-200 grid grid-cols-3 items-center">
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



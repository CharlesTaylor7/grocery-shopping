import Toaster from "@/components/Toaster";
import LoginPrompt from "@/components/LoginPrompt";
import SyncActionProvider from "@/components/SyncActionProvider";
import { SYNC_MODE } from "@/config";
import LastVisitSave from "@/components/LastVisitSave";
import { Suspense } from "react";
import { Link } from "wouter";
import HashRouter from "@/components/HashRouter";
import RouteTree from "@/components/RouteTree";
import { toast } from "@/toast";

export default function App() {
  return (
    <SyncActionProvider mode={SYNC_MODE}>
      <HashRouter>
        <div className="h-screen flex flex-col " data-theme="dark">
          <h1 className="w-full bg-base-200 p-3 grid grid-cols-3 items-center">
            <div>
              <LoginPrompt />
            </div>
            <div className="text-center">
              <button
                className="btn btn-accent"
                onClick={() =>
                  toast(() => (
                    <div className="p-3 bg-base-300 rounded-full">
                      greetings traveler
                    </div>
                  ))}
              >
                Click Me
              </button>
            </div>
            <div className="text-right">
              <Link to="/nav">Nav</Link>
            </div>
          </h1>

          <div className="p-3 flex-1 overflow-y-scroll overflow-x-hidden">
            <Suspense fallback="the suspense is killing me">
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

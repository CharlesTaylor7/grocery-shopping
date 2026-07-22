import { define } from "@/server/define.ts";
import { Partial } from "fresh/runtime";
import Toaster from "@/islands/Toaster.tsx";
import LastVisitSave from "@/islands/LastVisitSave.tsx";
import LoginPrompt from "@/islands/LoginPrompt.tsx";
import { SyncModel, SyncModelProvider } from "@/client/model.ts";
import LoginSpinner from "@/islands/LoginSpinner.tsx";

export default define.page(function App({ Component, route, req }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Groceries</title>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body f-client-nav>
        <div class="h-screen flex flex-col">
          <h1 class="w-full p-3 bg-base-200 grid grid-cols-3 items-center">
            <div>
              <LoginPrompt url={req.url} />
            </div>

            <div class="text-center">
            </div>

            <div class="text-right">
              {route != "/nav" ? <a href="/nav">Nav</a> : null}
            </div>
          </h1>

          <div class="flex-1 overflow-y-scroll overflow-x-hidden">
            <Partial name="body">
              <SyncModelProvider value={new SyncModel({ immediate: true })}>
                <Component />
              </SyncModelProvider>
              <LastVisitSave />
              <Toaster />
            </Partial>
          </div>
        </div>
      </body>
    </html>
  );
});

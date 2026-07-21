import { define } from "@/server/define.ts";
import { Partial } from "fresh/runtime";
import Toaster from "@/islands/Toaster.tsx";
import LastVisitSave from "@/islands/LastVisitSave.tsx";

interface PageNameProps {
  route: string | null;
}
function PageName({ route }: PageNameProps) {
  if (route === "/articles") return "Articles";
  if (route === "/blogs") return "Blogs";
  if (route === "/import") return "Import";
  if (route === "/nav") return "Navigation";
  if (route === "/login") return "Login";
}
export default define.page(function App({ Component, route, req }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>RSS Reader</title>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <div class="h-screen flex flex-col">
          <h1 class="w-full p-3 bg-base-200 grid grid-cols-3 items-center">
            <div></div>

            <div class="text-center">
              <PageName route={route} />
            </div>

            <div class="text-right">
              {route != "/nav" ? <a href="/nav">Nav</a> : null}
            </div>
          </h1>

          <div class="flex-1 overflow-y-scroll overflow-x-hidden">
            <Partial name="body">
              <Component />
            </Partial>
          </div>
          <Toaster />
          <LastVisitSave url={req.url} />
        </div>
      </body>
    </html>
  );
});

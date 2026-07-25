import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "@/client/styles.css";
import LastVisitSave from "./islands/LastVisitSave";
import Toaster from "./islands/Toaster";
import SyncActions from "./islands/SyncActions";
import LoginPrompt from "./islands/LoginPrompt";
import SyncContextProvider from "./islands/SyncContextProvider";

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => console.log("registered service worker"))
    .catch(console.error);
}

export function Layout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Groceries</title>
        <link rel="manifest" href="/manifest.json" />
        <Meta />
        <Links />
      </head>

      <body >
        <div className="h-screen flex flex-col">
          <h1 className="w-full p-3 bg-base-200 grid grid-cols-3 items-center">
            <div>
              <LoginPrompt />
            </div>

            <div className="text-center">
            </div>

            <div className="text-right">
              <Link to="/nav">Nav</Link>
            </div>
          </h1>

          <div className="flex-1 overflow-y-scroll overflow-x-hidden">
            <SyncContextProvider>
              {children ?? null}
            </SyncContextProvider>
            <LastVisitSave />
            <Toaster />
          </div>
        </div>
        <SyncActions useWebWorker />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ENABLE_SERVICE_WORKER, SENTRY_DSN } from "@/config";
import * as Sentry from "@sentry/browser";
import "@/styles.css";
import { RouterProvider, createHashHistory, createRouter, Router } from '@tanstack/react-router'
import { routeTree } from "@/routeTree.gen";

const hashHistory = createHashHistory()

const router = createRouter({ routeTree, history: hashHistory })

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: SENTRY_DSN,
    release: __RELEASE_VERSION__,
    initialScope: {
      tags: {
        git_commit: __COMMIT_SHA__,
      },
    },
  });
}

if (ENABLE_SERVICE_WORKER) {
  navigator.serviceWorker
    .register("/grocery-shopping/service-worker.js")
    .catch(console.error);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

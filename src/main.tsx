import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ENABLE_SERVICE_WORKER } from "@/config";
import "@/styles.css";
import { RouterProvider, createHashHistory, createRouter, Router } from '@tanstack/react-router'
import { routeTree } from "@/routeTree.gen";

const hashHistory = createHashHistory()

const router = createRouter({ routeTree, history: hashHistory })

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

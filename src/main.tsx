import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ENABLE_SERVICE_WORKER } from "@/config";
import { RouterProvider } from "@tanstack/react-router";
import "@/styles.css";
import router from "./router";

if (ENABLE_SERVICE_WORKER) {
  navigator.serviceWorker
    .register("/grocery-shopping/service-worker.js");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

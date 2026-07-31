import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/components/App";
import { ENABLE_SERVICE_WORKER } from "@/config";
import * as Sentry from "@sentry/browser"
import "@/styles.css";

if (import.meta.env.PROD) {
  Sentry.init();
}

if (ENABLE_SERVICE_WORKER) {
  navigator.serviceWorker
    .register("/grocery-shopping/service-worker.js")
    .catch(console.error);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

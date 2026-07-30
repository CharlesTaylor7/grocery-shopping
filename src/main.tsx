import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/components/App";
import "@/client/styles.css";
import { ENABLE_SERVICE_WORKER } from "@/client/config";
import "@/client/auth";

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

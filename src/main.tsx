import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "@/router.tsx";
import "@/client/styles.css";

// navigator.serviceWorker.register("/grocery-shopping/service-worker.js").catch(console.error);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

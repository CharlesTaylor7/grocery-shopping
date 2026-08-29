import { render } from "@solidjs/web";
import { RouterProvider } from "@tanstack/solid-router";
import "@/styles.css";
import router from "./router";

render(
  () => <RouterProvider router={router} />,
  document.getElementById("root")!
)

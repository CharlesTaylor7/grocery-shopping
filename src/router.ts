import {
  createHashHistory,
  createRouter,
  DefaultGlobalNotFound,
  ErrorComponent,
  NotFoundRoute,
} from "@tanstack/solid-router";
import { routeTree } from "@/routeTree.gen";

const router = createRouter({
  routeTree,
  history: createHashHistory(),
  scrollRestoration: true,
  defaultViewTransition: true,
  defaultErrorComponent: ErrorComponent,
  defaultPendingComponent: () => "the suspense is killing me...",
  // Show spinner if it takes more than 200ms
  defaultPendingMs: 200,
  // keep spinner alive for at least 400ms
  defaultPendingMinMs: 400,
});

declare module "@tanstack/solid-router" {
  interface Register {
    router: typeof router;
  }
}
export default router;

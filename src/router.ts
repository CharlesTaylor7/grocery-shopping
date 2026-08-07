import { createHashHistory, createRouter, ErrorComponent } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";

const router = createRouter({
  routeTree,
  history: createHashHistory(),
  scrollRestoration: false,
  defaultViewTransition: true,
  defaultErrorComponent: ErrorComponent,
  defaultPendingComponent: () => "the suspense is killing me...",
  // Show spinner if it takes more than 200ms
  defaultPendingMs: 200,
  // keep spinner alive for at least 400ms
  defaultPendingMinMs: 400,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
export default router;

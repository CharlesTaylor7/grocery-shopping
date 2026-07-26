import { createBrowserRouter, Outlet } from "react-router";
import Index from "@/routes/index.tsx";
import Root from "@/root.tsx";
import Login from "@/routes/auth/login";
import Signup from "@/routes/auth/signup";
import PasswordReset from "@/routes/auth/password-reset";
import Store from "@/islands/pages/Store";
import StoreList from "@/islands/pages/StoreList";
import Trip from "@/routes/trip";
import TripList from "@/routes/trip/[id].tsx";
import Nav from "@/routes/nav.tsx";


const router = createBrowserRouter([
  {
    path: "/", Component: Root, children: [
      { index: true, Component: Index },
      { path: "nav", Component: Nav },
      {
        path: "store", Component: Outlet, children: [
          { index: true, Component: StoreList },
          { path: ":id", Component: Store },
        ],
      },
      {
        path: "trip", Component: Outlet, children: [
          { index: true, Component: TripList },
          { path: ":id", Component: Trip },
        ],
      },
      {
        path: "auth", children: [
          { path: "login", Component: Login, },
          { path: "signup", Component: Signup, },
          { path: "password-reset", Component: PasswordReset, },
        ]
      },
    ],
  },
])
export default router;

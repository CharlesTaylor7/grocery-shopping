import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),

  route("nav", "routes/nav.tsx"),

  route("store", "./islands/pages/StoreList.tsx"),
  route("store/:id", "islands/pages/Store.tsx"),

  route("trip", "routes/trip/index.tsx"),
  route("trip/:id", "routes/trip/[id].tsx"),

  ...prefix("auth",
    [
      layout("routes/auth/layout.tsx", [
        route("login", "routes/auth/login.tsx"),
        route("signup", "routes/auth/signup.tsx"),
        route("password-reset", "routes/auth/password-reset.tsx"),
      ])
    ]),
] satisfies RouteConfig;

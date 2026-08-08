import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div role="tablist" className="tabs tabs-border">
        <Link to="./login" from={Route.to} className="tab">Login</Link>
        <Link to="./signup" from={Route.to} className="tab">Signup</Link>
        <Link to="./forgor" from={Route.to} className="tab">Forgor</Link>
      </div>
      <Outlet />
    </div>
  )
}

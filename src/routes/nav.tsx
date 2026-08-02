import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/nav')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/nav"!</div>
}

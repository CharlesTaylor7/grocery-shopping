import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/version')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ul>
      <li>Version: {__RELEASE_VERSION__}</li>
      <li>Git Commit: {__COMMIT_SHA__}</li>
    </ul>
  );
}

import { createFileRoute } from '@tanstack/react-router'
import ClickMe from '@/components/ClickMe';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Welcome to my web zone!
      <details className='m-4'>
        <summary>
          Release info:
        </summary>
        <div className='italics'>
          <div>Version: {__RELEASE_VERSION__}</div>
          <div>Git Commit: {__COMMIT_SHA__}</div>
        </div >

      </details>
      <ClickMe />
    </div>
  );
}

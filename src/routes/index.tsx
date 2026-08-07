import { createFileRoute } from '@tanstack/react-router'
import ClickMe from '@/components/ClickMe';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex flex-col gap-4 items-start'>
      <div>
        Welcome to my web zone!
      </div>
      <ClickMe />

      <details className='mt-10 cursor-pointer'>
        <summary>
          Release info
        </summary>
        <div className='italic'>
          <div>Last Released: {import.meta.env.VITE_BUILD_TIME}</div>
          <a href={`https://github.com/charlestaylor7/grocery-shopping/commit/${import.meta.env.VITE_COMMIT_SHA}}`}>Git Commit: {import.meta.env.VITE_COMMIT_SHA}</a>
        </div>
      </details>
    </div>
  );
}

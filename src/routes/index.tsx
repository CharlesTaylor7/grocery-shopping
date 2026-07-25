// TODO: when not authenticated, go to to login screen
// store last app screen url in storage
// navigate back upon logging in
import LastVisitRedirect from "@/islands/LastVisitRedirect.tsx";

export default function Index() {
  return (
    <div className="flex gap-2">
      <a href="/auth/login" className="underline">Log in</a>
      <span>or</span>
      <a href="/auth/signup" className="underline">Sign up</a>
      <LastVisitRedirect />
    </div>
  );
};

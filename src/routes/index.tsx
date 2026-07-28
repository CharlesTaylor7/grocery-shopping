// TODO: when not authenticated, go to to login screen
// store last app screen url in storage
// navigate back upon logging in
import LastVisitRedirect from "@/islands/LastVisitRedirect.tsx";
import { Link } from "react-router";

export default function Index() {
  return (
    <div className="flex gap-2">
      <Link to="/auth/login" className="underline">
        Log in
      </Link>
      <span>or</span>
      <Link to="/auth/signup" className="underline">
        Sign up
      </Link>
    </div>
  );
}

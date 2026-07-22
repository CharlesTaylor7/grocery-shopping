// TODO: when not authenticated, go to to login screen
// store last app screen url in storage
// navigate back upon logging in
import { define } from "@/server/define.ts";
import LastVisitRedirect from "@/islands/LastVisitRedirect.tsx";

export default define.page(function () {
  return (
    <div class="flex gap-2">
      <a href="/auth/login" class="underline">Log in</a>
      <span>or</span>
      <a href="/auth/signup" class="underline">Sign up</a>
      <LastVisitRedirect />
    </div>
  );
});

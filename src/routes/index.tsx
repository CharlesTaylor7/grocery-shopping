// TODO: when not authenticated, go to to login screen
// store last app screen url in storage
// navigate back upon logging in
import { define } from "@/server/define.ts";
import LastVisitRedirect from "@/islands/LastVisitRedirect.tsx";

export default define.page(function () {
  return <LastVisitRedirect />;
});

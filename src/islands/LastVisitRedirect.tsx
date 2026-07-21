import { useEffect } from "preact/hooks";

export default function LastVisitRedirect() {
  useEffect(() => {
    const last_visit = localStorage.getItem("last_visited_url") ?? "/lists";
    location.assign(last_visit);
  }, []);
  return null;
}

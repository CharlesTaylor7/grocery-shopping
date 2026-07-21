import { useEffect } from "preact/hooks";

export default function LastVisitSave() {
  useEffect(() => {
    if (location.pathname.endsWith("/")) return;

    localStorage.setItem("last_visited_url", location.toString());
  });
  return null;
}

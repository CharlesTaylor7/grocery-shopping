import { useEffect } from "preact/hooks";

export default function LastVisitSave() {
  useEffect(() => {
    if (
      location.pathname.endsWith("/") || location.pathname.startsWith("/auth")
    ) return;

    localStorage.setItem("last_visited_url", location.toString());
  });
  return null;
}

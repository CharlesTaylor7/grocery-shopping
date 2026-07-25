import { useEffect } from "react";

export default function LastVisitSave() {
  useEffect(() => {
    if (
      location.pathname.endsWith("/") || location.pathname.startsWith("/auth")
    ) return;

    localStorage.setItem("last_visited_url", location.pathname);
  });
  return null;
}

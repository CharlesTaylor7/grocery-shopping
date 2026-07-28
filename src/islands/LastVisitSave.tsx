import { useEffect } from "react";

export default function LastVisitSave() {
  useEffect(() => {
    const route = location.hash;
    if (route.endsWith("/") || route.startsWith("/auth")) return;

    localStorage.setItem("last_visited_url", route);
  });
  return null;
}

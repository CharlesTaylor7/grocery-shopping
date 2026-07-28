import { useEffect } from "react";
import { useLocation } from "react-router";

export default function LastVisitSave() {
  const location = useLocation();
  useEffect(() => {
    const route = location.pathname
    if (route.endsWith("/") || route.startsWith("/auth")) return;

    localStorage.setItem("last_visited_url", route);
  }, [location.pathname]);
  return null;
}

import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

export default function LastVisitSave() {
  const { pathname: route } = useLocation();
  useEffect(() => {
    if (route.endsWith("/") || route.startsWith("/auth")) return;

    localStorage.setItem("last_visited_url", route);
  }, [route]);
  return null;
}

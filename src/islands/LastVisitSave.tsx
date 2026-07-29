import { useEffect } from "react";
import { useLocation } from "wouter";

export default function LastVisitSave() {
  const [location] = useLocation();
  useEffect(() => {
    console.log(location);
    const route = location
    if (route.endsWith("/") || route.startsWith("/auth")) return;

    localStorage.setItem("last_visited_url", route);
  }, [location]);
  return null;
}

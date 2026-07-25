export function lastVisitedUrl() {
  return localStorage.getItem("last_visited_url") ?? "/store";
}

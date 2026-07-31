export function lastVisitedUrl() {
  const url = localStorage.getItem("last_visited_url") ?? "/store";
  // fixme: wouter requires this...
  // return "~" + url;
  return url
}

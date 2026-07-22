export function redirectToLast() {
  const url = localStorage.getItem("last_visited_url") ?? "/store";
  location.assign(url);
}

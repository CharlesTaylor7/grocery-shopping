export function redirectToLast() {
  const url = localStorage.getItem("last_visited_url") ?? "/list";
  location.assign(url);
}

// oxlint-disable
import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

// array of callback subscribed to hash updates
const listeners = {
  v: [],
};

const onHashChange = () => {
  document.startViewTransition(() =>
    flushSync(() =>
      listeners.v.forEach((cb) =>
        cb()
      )
    )
  );
}

// we subscribe to `hashchange` only once when needed to guarantee that
// all listeners are called synchronously
const subscribeToHashUpdates = (callback) => {
  if (listeners.v.push(callback) === 1)
    addEventListener("hashchange", onHashChange);

  return () => {
    listeners.v = listeners.v.filter((i) => i !== callback);
    if (!listeners.v.length) removeEventListener("hashchange", onHashChange);
  };
};

// leading '#' is ignored, leading '/' is optional
const currentHashLocation = () => "/" + location.hash.replace(/^#?\/?/, "");

const hashNavigate = (to, { state = null, replace = false } = {}) => {
  console.log("hashNavigate", { to });
  const oldURL = location.href;

  const [hash, search] = to.replace(/^#?\/?/, "").split("?");

  // Works for ALL protocols including data:
  const url = new URL(location.href);
  url.hash = `/${hash}`;
  if (search) url.search = search;
  const newURL = url.href;

  if (replace) {
    history.replaceState(state, "", newURL);
  } else {
    history.pushState(state, "", newURL);
  }

  const event =
    typeof HashChangeEvent !== "undefined"
      ? new HashChangeEvent("hashchange", { oldURL, newURL })
      : new Event("hashchange", { detail: { oldURL, newURL } });

  dispatchEvent(event);
};

export const useHashLocation = () => [
  useSyncExternalStore(
    subscribeToHashUpdates,
    currentHashLocation,
  ),
  hashNavigate,
];

useHashLocation.hrefs = (href) => "#" + href;

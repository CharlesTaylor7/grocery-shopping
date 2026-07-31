
// oxlint-disable
import { useSyncExternalStore, createElement, type ReactNode } from "react";
import { Router } from "wouter"

export default function HashRouter(props: { children: ReactNode }) {
  // @ts-ignore
  return createElement(Router, { hook: useHashLocation }, props.children);
}
// copied from upstream wouter:

// array of callback subscribed to hash updates
const listeners = {
  v: [],
};

const onHashChange = () => listeners.v.forEach((cb) => cb());

// we subscribe to `hashchange` only once when needed to guarantee that
// all listeners are called synchronously
const subscribeToHashUpdates = (callback: any) => {
  // @ts-ignore
  if (listeners.v.push(callback) === 1)
    addEventListener("hashchange", onHashChange);

  return () => {
    listeners.v = listeners.v.filter((i) => i !== callback);
    if (!listeners.v.length) removeEventListener("hashchange", onHashChange);
  };
};

// leading '#' is ignored, leading '/' is optional
const currentHashLocation = () => "/" + location.hash.replace(/^#?\/?/, "");

export const navigate = (to: string, { state = null, replace = false } = {}) => {
  console.log(to);
  const [targetPath, targetQueryParams] = to.split("?");

  const oldURL = location.href;
  const targetUrl = new URL(oldURL);
  if (targetPath.startsWith("/")) {
    targetUrl.hash = '';
  }
  targetUrl.hash = targetPath;

  if (targetQueryParams) {
    targetUrl.search = targetQueryParams;
  }

  if (replace) {
    history.replaceState(state, "", targetUrl);
  } else {
    history.pushState(state, "", targetUrl);
  }

  const newURL = targetUrl.href;

  dispatchEvent(new HashChangeEvent("hashchange", { oldURL, newURL }));
};

const useHashLocation = () => [
  useSyncExternalStore(
    subscribeToHashUpdates,
    currentHashLocation
  ),
  navigate,
];

// useHashLocation.hrefs = (href: string) => "#" + href;

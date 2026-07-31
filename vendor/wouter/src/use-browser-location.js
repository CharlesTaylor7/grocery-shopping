// oxlint-disable
import { useSyncExternalStore } from "react";

/**
 * History API docs @see https://developer.mozilla.org/en-US/docs/Web/API/History
 */
export const eventPopstate = "popstate";
export const eventPushState = "pushState";
export const eventReplaceState = "replaceState";
export const eventHashchange = "hashchange";
export const events = [
  eventPopstate,
  eventPushState,
  eventReplaceState,
  eventHashchange,
];

const subscribeToLocationUpdates = (callback) => {
  for (const event of events) {
    addEventListener(event, callback);
  }
  return () => {
    for (const event of events) {
      removeEventListener(event, callback);
    }
  };
};

export const useLocationProperty = (fn) =>
  useSyncExternalStore(subscribeToLocationUpdates, fn);

const currentSearch = () => location.search;

export const useSearch = () =>
  useLocationProperty(
    currentSearch,
    currentSearch
  );

const currentPathname = () => location.pathname;

export const usePathname = ({ } = {}) =>
  useLocationProperty(
    currentPathname,
    currentPathname
  );

const currentHistoryState = () => history.state;
export const useHistoryState = () =>
  useLocationProperty(currentHistoryState, () => null);

export const navigate = (to, { replace = false, state = null } = {}) =>
  history[replace ? eventReplaceState : eventPushState](state, "", to);

// the 2nd argument of the `useBrowserLocation` return value is a function
// that allows to perform a navigation.
export const useBrowserLocation = (opts = {}) => [usePathname(opts), navigate];



import { parse as parsePattern } from "regexparam"
import { useRef, createContext, useContext } from "react";
import { useEvent } from "./use-event-polyfill";
import { useBrowserLocation } from "./use-browser-location";
import { absolutePath, relativePath } from "./paths";

export const defaultRouter = {
  hook: useBrowserLocation,
  parser: parsePattern,
  base: "",
  hrefs: (x) => x,
};


// context hooks
export const RouterCtx = createContext(defaultRouter);

// gets the closest parent router from the context
export const useRouter = () => useContext(RouterCtx);

/**
 * Parameters context. Used by `useParams()` to get the
 * matched params from the innermost `Route` component.
 */

export const Params0 = {};
export const ParamsCtx = createContext(Params0);

export const useParams = () => useContext(ParamsCtx);


// router hooks
export function useLocation() {
  const router = useRouter();
  const [location] = router.hook(router);
  return relativePath(router.base, location);
}

export function useNavigate() {
  const router = useRouter();
  const [_, navigate] = router.hook(router);
  return useEvent((to, opts) => {
    const target = absolutePath(to, router.base)
    console.log("useNavigate()", { to, target, base: router.base, opts });
    navigate(target, opts)
  })
}

export const useSearch = () => {
  const router = useRouter();
  return sanitizeSearch(useBrowserSearch(router));
};


// Internal version of useLocation to avoid redundant useRouter calls
export function useLocationFromRouter(router) {
  const [location, navigate] = router.hook(router);

  // the function reference should stay the same between re-renders, so that
  // it can be passed down as an element prop without any performance concerns.
  // (This is achieved via `useEvent`.)
  return [
    relativePath(router.base, location),
    useEvent((to, opts) => {
      const target = absolutePath(to, router.base)
      console.log("useLocationFromRouter", { to, target, opts, base: router.base });
      navigate(target, opts)
    })
  ];
};


export function useRoute(pattern) {
  return matchRoute(useRouter().parser, pattern, useLocation()[0]);
}


// Cache params object between renders if values are shallow equal
export function useCachedParams(value) {
  let prev = useRef(Params0);
  // oxlint-disable-next-line
  const curr = prev.current;
  // oxlint-disable-next-line
  return (prev.current =
    // Update cache if number of params changed or any value changed
    Object.keys(value).length !== Object.keys(curr).length ||
      // oxlint-disable-next-line
      Object.entries(value).some(([k, v]) => v !== curr[k])
      ? value // Return new value if there are changes
      : curr); // Return cached value if nothing changed
};

export function useSearchParams() {
  const [location, navigate] = useLocation();

  const search = useSearch();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  // cached value before next render, so you can call setSearchParams multiple times
  let tempSearchParams = searchParams;

  // oxlint-disable-next-line
  const setSearchParams = useEvent((nextInit, options) => {
    // oxlint-disable-next-line
    tempSearchParams = new URLSearchParams(
      typeof nextInit === "function" ? nextInit(tempSearchParams) : nextInit
    );
    navigate(
      location + (tempSearchParams.size ? "?" + tempSearchParams : ""),
      options
    );
  });

  return [searchParams, setSearchParams];
}


// helpers
export function matchRoute(parser, route, path, loose) {
  // if the input is a regexp, skip parsing
  const { pattern, keys } =
    route instanceof RegExp
      ? { keys: false, pattern: route }
      : parser(route || "*", loose);

  // array destructuring loses keys, so this is done in two steps
  const result = pattern.exec(path) || [];

  // when parser is in "loose" mode, `$base` is equal to the
  // first part of the route that matches the pattern
  // (e.g. for pattern `/a/:b` and path `/a/1/2/3` the `$base` is `a/1`)
  // we use this for route nesting
  const [$base, ...matches] = result;

  return $base !== undefined
    ? [
      true,

      (() => {
        // for regex paths, `keys` will always be false

        // an object with parameters matched, e.g. { foo: "bar" } for "/:foo"
        // we "zip" two arrays here to construct the object
        // ["foo"], ["bar"] → { foo: "bar" }
        const groups =
          keys !== false
            ? Object.fromEntries(keys.map((key, i) => [key, matches[i]]))
            : result.groups;

        // convert the array to an instance of object
        // this makes it easier to integrate with the existing param implementation
        let obj = { ...matches };

        // merge named capture groups with matches array
        if (groups) {
          Object.assign(obj, groups);
        }

        return obj;
      })(),

      // the third value if only present when parser is in "loose" mode,
      // so that we can extract the base path for nested routes
      ...(loose ? [$base] : []),
    ]
    : [false, null];
};


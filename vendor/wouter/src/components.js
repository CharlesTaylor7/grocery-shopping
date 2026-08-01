import { useEvent } from "./use-event-polyfill";
import { ParamsCtx, RouterCtx } from "./hooks";

import {
  cloneElement,
  createElement,
  Fragment,
  isValidElement,
  useRef,
} from "react";
import {
  defaultRouter,
  matchRoute,
  useCachedParams,
  useLocationFromRouter,
  useParams,
  useRouter,
  useLayoutEffect,
} from "./hooks.js";

export function Router({ children, ...props }) {
  // the router we will inherit from - it is the closest router in the tree,
  // unless the custom `hook` is provided (in that case it's the default one)
  const parent_ = useRouter();
  const parent = props.hook ? defaultRouter : parent_;

  // holds to the context value: the router object
  let value = parent;
  // hooks can define their own `href` formatter (e.g. for hash location)
  props.hrefs = props.hrefs ?? props.hook?.hrefs;

  // what is happening below: to avoid unnecessary rerenders in child components,
  // we ensure that the router object reference is stable, unless there are any
  // changes that require reload (e.g. `base` prop changes -> all components that
  // get the router from the context should rerender, even if the component is memoized).
  // the expected behaviour is:
  //
  //   1) when the resulted router is no different from the parent, use parent
  //   2) if the custom `hook` prop is provided, we always inherit from the
  //      default router instead. this resets all previously overridden options.
  //   3) when the router is customized here, it should stay stable between renders
  let ref = useRef({}),
    // oxlint-disable-next-line
    prev = ref.current,
    next = prev;

  for (let k in parent) {
    const option = k === "base"
      /* base is special case, it is appended to the parent's base */
      ? parent[k] + (props[k] ?? "")
      : props[k] ?? parent[k];

    if (prev === next && option !== next[k]) {
      // oxlint-disable-next-line
      ref.current = next = { ...next };
    }

    // oxlint-disable-next-line
    next[k] = option;

    // the new router is no different from the parent or from the memoized value, use parent
    if (option !== parent[k] || option !== value[k]) value = next;
  }

  return createElement(RouterCtx.Provider, { value }, children);
}

export function Route({ path, nest, match, ...renderProps }) {
  const router = useRouter();
  const [location] = useLocationFromRouter(router);

  const [matches, routeParams, base] =
    // `match` is a special prop to give up control to the parent,
    // it is used by the `Switch` to avoid double matching
    match ?? matchRoute(router.parser, path, location, nest);

  // when `routeParams` is `null` (there was no match), the argument
  // below becomes {...null} = {}, see the Object Spread specs
  // https://tc39.es/proposal-object-rest-spread/#AbstractOperations-CopyDataProperties
  const params = useCachedParams({ ...useParams(), ...routeParams });

  if (!matches) return null;

  const children = base
    ? createElement(Router, { base }, createRouteElement(renderProps, params))
    : createRouteElement(renderProps, params);

  return createElement(ParamsCtx.Provider, { value: params }, children);
}

export function Link(props) {
  const router = useRouter();
  const [currentPath, navigate] = useLocationFromRouter(router);

  const {
    ref,
    to = "",
    href: targetPath = to,
    onClick: _onClick,
    asChild,
    children,
    className: cls,
    // these are spread to remove them from `restProps`
    replace: _1,
    state: _2,
    transition: _3,
    ...restProps
  } = props;

  const onClick = useEvent((event) => {
    // ignores the navigation when clicked using right mouse button or
    // by holding a special modifier key: ctrl, command, win, alt, shift
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      event.shiftKey ||
      event.button !== 0
    ) {
      return;
    }

    _onClick?.(event);
    if (!event.defaultPrevented) {
      event.preventDefault();
      navigate(targetPath, props);
    }
  });

  // handle nested routers and absolute paths
  const href = router.hrefs(
    targetPath[0] === "~" ? targetPath.slice(1) : router.base + targetPath,
    router, // pass router as a second argument for convinience
  );

  return asChild && isValidElement(children)
    ? cloneElement(children, { onClick, href })
    // oxlint-disable-next-line
    : createElement("a", {
      ...restProps,
      onClick,
      href,
      // `className` can be a function to apply the class if this link is active
      className: cls?.call ? cls(currentPath === targetPath) : cls,
      children,
      ref,
    });
}

export function Switch({ children, location }) {
  const router = useRouter();
  const [originalLocation] = useLocationFromRouter(router);

  for (const element of flattenChildren(children)) {
    let match = 0;

    if (
      isValidElement(element) &&
      // we don't require an element to be of type Route,
      // but we do require it to contain a truthy `path` prop.
      // this allows to use different components that wrap Route
      // inside of a switch, for example <AnimatedRoute />.
      (match = matchRoute(
        router.parser,
        element.props.path,
        location || originalLocation,
        element.props.nest,
      ))[0]
    ) {
      return cloneElement(element, { match });
    }
  }

  return null;
}

export function Redirect(props) {
  const { to, href = to } = props;
  const router = useRouter();
  const [, navigate] = useLocationFromRouter(router);
  const redirect = useEvent(() => navigate(to || href, props));

  // redirect is guaranteed to be stable since it is returned from useEvent
  useLayoutEffect(() => {
    redirect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

// helpers

const flattenChildren = (children) =>
  Array.isArray(children)
    ? children.flatMap((c) =>
      flattenChildren(c && c.type === Fragment ? c.props.children : c)
    )
    : [children];

const createRouteElement = ({ children, component }, params) => {
  // React-Router style `component` prop
  if (component) return createElement(component, { params });

  // support render prop or plain children
  return typeof children === "function" ? children(params) : children;
};

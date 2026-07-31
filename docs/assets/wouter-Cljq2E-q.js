import { D as S, O as X, T as x, _ as mn, b as A, d as C, f as I, g as hn, k, m as bn } from "./dnd-kit-8Wt4G7bK.js";
import { t as parse } from "./regexparam-BItrLycJ.js";

//#region vendor/wouter/src/use-browser-location.js
var eventPopstate = "popstate";
var eventPushState = "pushState";
var eventReplaceState = "replaceState";
var eventHashchange = "hashchange";
var events = [
	eventPopstate,
	eventPushState,
	eventReplaceState,
	eventHashchange
];
var subscribeToLocationUpdates = (callback) => {
	for (const event of events) addEventListener(event, callback);
	return () => {
		for (const event of events) removeEventListener(event, callback);
	};
};
var useLocationProperty = (fn) => C(subscribeToLocationUpdates, fn);
var currentPathname = () => location.pathname;
var usePathname = ({} = {}) => useLocationProperty(currentPathname, currentPathname);
var navigate = (to, { replace = false, state = null } = {}) => history[replace ? eventReplaceState : eventPushState](state, "", to);
var useBrowserLocation = (opts = {}) => [usePathname(opts), navigate];

//#endregion
//#region vendor/wouter/src/monkey-patch.js
var patchKey = Symbol.for("wouter_v3");
if (typeof history !== "undefined" && typeof window[patchKey] === "undefined") {
	for (const type of [eventPushState, eventReplaceState]) {
		const original = history[type];
		history[type] = function() {
			const result = original.apply(this, arguments);
			const event = new Event(type);
			event.arguments = arguments;
			dispatchEvent(event);
			return result;
		};
	}
	Object.defineProperty(window, patchKey, { value: true });
}

//#endregion
//#region vendor/wouter/src/use-hash-location.js
var listeners = { v: [] };
var onHashChange = () => {
	document.startViewTransition(() => bn(() => listeners.v.forEach((cb) => cb())));
};
var subscribeToHashUpdates = (callback) => {
	if (listeners.v.push(callback) === 1) addEventListener("hashchange", onHashChange);
	return () => {
		listeners.v = listeners.v.filter((i) => i !== callback);
		if (!listeners.v.length) removeEventListener("hashchange", onHashChange);
	};
};
var currentHashLocation = () => "/" + location.hash.replace(/^#?\/?/, "");
var hashNavigate = (to, { state = null, replace = false } = {}) => {
	console.log("hashNavigate", { to });
	const oldURL = location.href;
	const [hash, search] = to.replace(/^#?\/?/, "").split("?");
	const url = new URL(location.href);
	url.hash = `/${hash}`;
	if (search) url.search = search;
	const newURL = url.href;
	if (replace) history.replaceState(state, "", newURL);
	else history.pushState(state, "", newURL);
	const event = typeof HashChangeEvent !== "undefined" ? new HashChangeEvent("hashchange", {
		oldURL,
		newURL
	}) : new Event("hashchange", { detail: {
		oldURL,
		newURL
	} });
	dispatchEvent(event);
};
var useHashLocation = () => [C(subscribeToHashUpdates, currentHashLocation), hashNavigate];
useHashLocation.hrefs = (href) => "#" + href;

//#endregion
//#region vendor/wouter/src/use-event-polyfill.js
function useEvent(fn) {
	const ref = A([fn, (...args) => ref[0](...args)]).current;
	I(() => {
		ref[0] = fn;
	});
	return ref[1];
}

//#endregion
//#region vendor/wouter/src/paths.js
var _relativePath = (base, path) => !path.toLowerCase().indexOf(base.toLowerCase()) ? path.slice(base.length) || "/" : "~" + path;
var baseDefaults = (base = "") => base === "/" ? "" : base;
var absolutePath = (to, base) => to[0] === "/" ? to : baseDefaults(base) + to;
var relativePath = (base = "", path) => _relativePath(unescape(baseDefaults(base)), unescape(path));
var unescape = (str) => {
	try {
		return decodeURI(str);
	} catch (_e) {
		return str;
	}
};

//#endregion
//#region vendor/wouter/src/hooks.js
var defaultRouter = {
	hook: useBrowserLocation,
	parser: parse,
	base: "",
	hrefs: (x) => x
};
var RouterCtx = X(defaultRouter);
var useRouter = () => x(RouterCtx);
var Params0 = {};
var ParamsCtx = X(Params0);
var useParams = () => x(ParamsCtx);
function useLocation() {
	const router = useRouter();
	const [location] = router.hook(router);
	return relativePath(router.base, location);
}
function useNavigate() {
	const router = useRouter();
	const [_, navigate] = router.hook(router);
	return useEvent((to, opts) => {
		const target = absolutePath(to, router.base);
		console.log("useNavigate()", {
			to,
			target,
			base: router.base,
			opts
		});
		navigate(target, opts);
	});
}
var useSearch = () => {
	const router = useRouter();
	return sanitizeSearch(useBrowserSearch(router));
};
function useLocationFromRouter(router) {
	const [location, navigate] = router.hook(router);
	return [relativePath(router.base, location), useEvent((to, opts) => {
		const target = absolutePath(to, router.base);
		console.log("useLocationFromRouter", {
			to,
			target,
			opts,
			base: router.base
		});
		navigate(target, opts);
	})];
}
function useCachedParams(value) {
	let prev = A(Params0);
	const curr = prev.current;
	return prev.current = Object.keys(value).length !== Object.keys(curr).length || Object.entries(value).some(([k, v]) => v !== curr[k]) ? value : curr;
}
function useSearchParams() {
	const [location, navigate] = useLocation();
	const search = useSearch();
	const searchParams = useMemo(() => new URLSearchParams(search), [search]);
	let tempSearchParams = searchParams;
	return [searchParams, useEvent((nextInit, options) => {
		tempSearchParams = new URLSearchParams(typeof nextInit === "function" ? nextInit(tempSearchParams) : nextInit);
		navigate(location + (tempSearchParams.size ? "?" + tempSearchParams : ""), options);
	})];
}
function matchRoute(parser, route, path, loose) {
	const { pattern, keys } = route instanceof RegExp ? {
		keys: false,
		pattern: route
	} : parser(route || "*", loose);
	const result = pattern.exec(path) || [];
	const [$base, ...matches] = result;
	return $base !== void 0 ? [
		true,
		(() => {
			const groups = keys !== false ? Object.fromEntries(keys.map((key, i) => [key, matches[i]])) : result.groups;
			let obj = { ...matches };
			if (groups) Object.assign(obj, groups);
			return obj;
		})(),
		...loose ? [$base] : []
	] : [false, null];
}

//#endregion
//#region vendor/wouter/src/components.js
function Router({ children, ...props }) {
	const parent_ = useRouter();
	const parent = props.hook ? defaultRouter : parent_;
	let value = parent;
	props.hrefs = props.hrefs ?? props.hook?.hrefs;
	let ref = A({}), prev = ref.current, next = prev;
	for (let k in parent) {
		const option = k === "base" ? parent[k] + (props[k] ?? "") : props[k] ?? parent[k];
		if (prev === next && option !== next[k]) ref.current = next = { ...next };
		next[k] = option;
		if (option !== parent[k] || option !== value[k]) value = next;
	}
	return k(RouterCtx.Provider, { value }, children);
}
function Route({ path, nest, match, ...renderProps }) {
	const router = useRouter();
	const [location] = useLocationFromRouter(router);
	const [matches, routeParams, base] = match ?? matchRoute(router.parser, path, location, nest);
	const params = useCachedParams({
		...useParams(),
		...routeParams
	});
	if (!matches) return null;
	const children = base ? k(Router, { base }, createRouteElement(renderProps, params)) : createRouteElement(renderProps, params);
	return k(ParamsCtx.Provider, { value: params }, children);
}
function Link(props) {
	const router = useRouter();
	const [currentPath, navigate] = useLocationFromRouter(router);
	const { ref, to = "", href: targetPath = to, onClick: _onClick, asChild, children, className: cls, replace: _1, state: _2, transition: _3, ...restProps } = props;
	const onClick = useEvent((event) => {
		if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.button !== 0) return;
		_onClick?.(event);
		if (!event.defaultPrevented) {
			event.preventDefault();
			navigate(targetPath, props);
		}
	});
	const href = router.hrefs(targetPath[0] === "~" ? targetPath.slice(1) : router.base + targetPath, router);
	return asChild && hn(children) ? mn(children, {
		onClick,
		href
	}) : k("a", {
		...restProps,
		onClick,
		href,
		className: cls?.call ? cls(currentPath === targetPath) : cls,
		children,
		ref
	});
}
function Switch({ children, location }) {
	const router = useRouter();
	const [originalLocation] = useLocationFromRouter(router);
	for (const element of flattenChildren(children)) {
		let match = 0;
		if (hn(element) && (match = matchRoute(router.parser, element.props.path, location || originalLocation, element.props.nest))[0]) return mn(element, { match });
	}
	return null;
}
function Redirect(props) {
	const { to, href = to } = props;
	const [, navigate] = useLocationFromRouter(useRouter());
	const redirect = useEvent(() => navigate(to || href, props));
	useLayoutEffect(() => {
		redirect();
	}, []);
	return null;
}
var flattenChildren = (children) => Array.isArray(children) ? children.flatMap((c) => flattenChildren(c && c.type === S ? c.props.children : c)) : [children];
var createRouteElement = ({ children, component }, params) => {
	if (component) return k(component, { params });
	return typeof children === "function" ? children(params) : children;
};

//#endregion
export { Switch as a, useParams as c, Router as i, useSearchParams as l, Redirect as n, useLocation as o, Route as r, useNavigate as s, Link as t, useHashLocation as u };
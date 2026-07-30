import { A as X, D as x, M as k, S as _, T as init_hooks_module, a as init_compat, c as I, g as mn, h as init_compat_module, j as init_preact_module, k as S, m as hn, s as D, w as h, x as T, y as A } from "./@dnd-kit/accessibility-B1tMwVlI.js";
import { t as parse } from "./regexparam-BItrLycJ.js";
import { t as require_shim } from "./use-sync-external-store-DUvvr42q.js";

//#region node_modules/.pnpm/wouter@3.10.0_@preact+compat@18.3.2_preact@10.29.7_/node_modules/wouter/src/use-sync-external-store.js
init_compat();
var import_shim = require_shim();

//#endregion
//#region node_modules/.pnpm/wouter@3.10.0_@preact+compat@18.3.2_preact@10.29.7_/node_modules/wouter/src/react-deps.js
var useBuiltinInsertionEffect = I;
var canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
var useIsomorphicLayoutEffect = canUseDOM ? _ : h;
var useInsertionEffect = useBuiltinInsertionEffect || useIsomorphicLayoutEffect;
var useEvent = (fn) => {
	const ref = A([fn, (...args) => ref[0](...args)]).current;
	useInsertionEffect(() => {
		ref[0] = fn;
	});
	return ref[1];
};

//#endregion
//#region node_modules/.pnpm/wouter@3.10.0_@preact+compat@18.3.2_preact@10.29.7_/node_modules/wouter/src/use-browser-location.js
var eventPopstate = "popstate";
var eventPushState = "pushState";
var eventReplaceState = "replaceState";
var events = [
	eventPopstate,
	eventPushState,
	eventReplaceState,
	"hashchange"
];
var subscribeToLocationUpdates = (callback) => {
	for (const event of events) addEventListener(event, callback);
	return () => {
		for (const event of events) removeEventListener(event, callback);
	};
};
var useLocationProperty = (fn, ssrFn) => (0, import_shim.useSyncExternalStore)(subscribeToLocationUpdates, fn, ssrFn);
var currentSearch = () => location.search;
var useSearch$1 = ({ ssrSearch } = {}) => useLocationProperty(currentSearch, ssrSearch != null ? () => ssrSearch : currentSearch);
var currentPathname = () => location.pathname;
var usePathname = ({ ssrPath } = {}) => useLocationProperty(currentPathname, ssrPath != null ? () => ssrPath : currentPathname);
var navigate$1 = (to, { replace = false, state = null } = {}) => history[replace ? eventReplaceState : eventPushState](state, "", to);
var useBrowserLocation = (opts = {}) => [usePathname(opts), navigate$1];
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
//#region node_modules/.pnpm/wouter@3.10.0_@preact+compat@18.3.2_preact@10.29.7_/node_modules/wouter/src/paths.js
var _relativePath = (base, path) => !path.toLowerCase().indexOf(base.toLowerCase()) ? path.slice(base.length) || "/" : "~" + path;
var baseDefaults = (base = "") => base === "/" ? "" : base;
var absolutePath = (to, base) => to[0] === "~" ? to.slice(1) : baseDefaults(base) + to;
var relativePath = (base = "", path) => _relativePath(unescape(baseDefaults(base)), unescape(path));
var stripQm = (str) => str[0] === "?" ? str.slice(1) : str;
var unescape = (str) => {
	try {
		return decodeURI(str);
	} catch (_e) {
		return str;
	}
};
var sanitizeSearch = (search) => unescape(stripQm(search));

//#endregion
//#region node_modules/.pnpm/wouter@3.10.0_@preact+compat@18.3.2_preact@10.29.7_/node_modules/wouter/src/index.js
var defaultRouter = {
	hook: useBrowserLocation,
	searchHook: useSearch$1,
	parser: parse,
	base: "",
	ssrPath: void 0,
	ssrSearch: void 0,
	ssrContext: void 0,
	hrefs: (x) => x,
	aroundNav: (n, t, o) => n(t, o)
};
var RouterCtx = X(defaultRouter);
var useRouter = () => x(RouterCtx);
var Params0 = {};
var ParamsCtx = X(Params0);
var useParams = () => x(ParamsCtx);
var useLocationFromRouter = (router) => {
	const [location, navigate] = router.hook(router);
	return [relativePath(router.base, location), useEvent((to, opts) => router.aroundNav(navigate, absolutePath(to, router.base), opts))];
};
var useLocation = () => useLocationFromRouter(useRouter());
var useSearch = () => {
	const router = useRouter();
	return sanitizeSearch(router.searchHook(router));
};
var matchRoute = (parser, route, path, loose) => {
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
			groups && Object.assign(obj, groups);
			return obj;
		})(),
		...loose ? [$base] : []
	] : [false, null];
};
var Router = ({ children, ...props }) => {
	const parent_ = useRouter();
	const parent = props.hook ? defaultRouter : parent_;
	let value = parent;
	const [path, search = props.ssrSearch ?? ""] = props.ssrPath?.split("?") ?? [];
	if (path) props.ssrSearch = search, props.ssrPath = path;
	props.hrefs = props.hrefs ?? props.hook?.hrefs;
	props.searchHook = props.searchHook ?? props.hook?.searchHook;
	let ref = A({}), prev = ref.current, next = prev;
	for (let k in parent) {
		const option = k === "base" ? parent[k] + (props[k] ?? "") : props[k] ?? parent[k];
		if (prev === next && option !== next[k]) ref.current = next = { ...next };
		next[k] = option;
		if (option !== parent[k] || option !== value[k]) value = next;
	}
	return k(RouterCtx.Provider, {
		value,
		children
	});
};
var h_route = ({ children, component }, params) => {
	if (component) return k(component, { params });
	return typeof children === "function" ? children(params) : children;
};
var useCachedParams = (value) => {
	let prev = A(Params0);
	const curr = prev.current;
	return prev.current = Object.keys(value).length !== Object.keys(curr).length || Object.entries(value).some(([k, v]) => v !== curr[k]) ? value : curr;
};
function useSearchParams() {
	const [location, navigate] = useLocation();
	const search = useSearch();
	const searchParams = T(() => new URLSearchParams(search), [search]);
	let tempSearchParams = searchParams;
	return [searchParams, useEvent((nextInit, options) => {
		tempSearchParams = new URLSearchParams(typeof nextInit === "function" ? nextInit(tempSearchParams) : nextInit);
		navigate(location + (tempSearchParams.size ? "?" + tempSearchParams : ""), options);
	})];
}
var Route = ({ path, nest, match, ...renderProps }) => {
	const router = useRouter();
	const [location] = useLocationFromRouter(router);
	const [matches, routeParams, base] = match ?? matchRoute(router.parser, path, location, nest);
	const params = useCachedParams({
		...useParams(),
		...routeParams
	});
	if (!matches) return null;
	const children = base ? k(Router, { base }, h_route(renderProps, params)) : h_route(renderProps, params);
	return k(ParamsCtx.Provider, {
		value: params,
		children
	});
};
var Link = D((props, ref) => {
	const router = useRouter();
	const [currentPath, navigate] = useLocationFromRouter(router);
	const { to = "", href: targetPath = to, onClick: _onClick, asChild, children, className: cls, replace, state, transition, ...restProps } = props;
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
});
var flattenChildren = (children) => Array.isArray(children) ? children.flatMap((c) => flattenChildren(c && c.type === S ? c.props.children : c)) : [children];
var Switch = ({ children, location }) => {
	const router = useRouter();
	const [originalLocation] = useLocationFromRouter(router);
	for (const element of flattenChildren(children)) {
		let match = 0;
		if (hn(element) && (match = matchRoute(router.parser, element.props.path, location || originalLocation, element.props.nest))[0]) return mn(element, { match });
	}
	return null;
};
var Redirect = (props) => {
	const { to, href = to } = props;
	const router = useRouter();
	const [, navigate] = useLocationFromRouter(router);
	const redirect = useEvent(() => navigate(to || href, props));
	const { ssrContext } = router;
	useIsomorphicLayoutEffect(() => {
		redirect();
	}, []);
	if (ssrContext) ssrContext.redirectTo = to;
	return null;
};

//#endregion
//#region node_modules/.pnpm/wouter@3.10.0_@preact+compat@18.3.2_preact@10.29.7_/node_modules/wouter/src/use-hash-location.js
var listeners = { v: [] };
var onHashChange = () => listeners.v.forEach((cb) => cb());
var subscribeToHashUpdates = (callback) => {
	if (listeners.v.push(callback) === 1) addEventListener("hashchange", onHashChange);
	return () => {
		listeners.v = listeners.v.filter((i) => i !== callback);
		if (!listeners.v.length) removeEventListener("hashchange", onHashChange);
	};
};
var currentHashLocation = () => "/" + location.hash.replace(/^#?\/?/, "");
var navigate = (to, { state = null, replace = false } = {}) => {
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
var useHashLocation = ({ ssrPath = "/" } = {}) => [(0, import_shim.useSyncExternalStore)(subscribeToHashUpdates, currentHashLocation, () => ssrPath), navigate];
useHashLocation.hrefs = (href) => "#" + href;

//#endregion
export { Router as a, useParams as c, Route as i, useSearchParams as l, Link as n, Switch as o, Redirect as r, useLocation as s, useHashLocation as t };
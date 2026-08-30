import { _ as createRoot, d as onCleanup, f as onSettled, g as untrack, h as runWithOwner, n as omit, t as merge, y as flush } from "../@solidjs/signals-Ckwt8Og4.js";
import { C as createSignal, S as createMemo, T as useContext, _ as Switch, a as insert, b as createContext, d as template, f as Errored, g as Show, h as Match$1, i as effect, l as setAttribute, m as Loading, n as claimElement, o as memo, r as delegateEvents, t as Dynamic, u as spread, v as children, w as sharedConfig, x as createEffect, y as createComponent } from "../@solidjs/web-uq8NbHI_.js";
import { _ as hasKeys, a as RouterCore, c as createNonReactiveReadonlyStore, d as exactPathTest, f as removeTrailingSlash, g as functionalUpdate, h as deepEqual, i as preloadWarning, l as rootRouteId, m as invariant, n as BaseRootRoute, o as getLocationChangeInfo, p as trimPathRight, r as BaseRoute, s as createNonReactiveMutableStore, t as getScrollRestorationScriptForRouter, u as isNotFound, v as isDangerousProtocol, y as replaceEqualDeep } from "./router-core-XO3LGjqP.js";

//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/CatchBoundary.jsx
var _tmpl$$3 = /* @__PURE__ */ template(`<div style=padding:.5rem;max-width:100%><div style=display:flex;align-items:center;gap:.5rem><strong style=font-size:1rem>Something went wrong!</strong><button style="appearance:none;font-size:.6em;border:1px solid currentColor;padding:.1rem .2rem;font-weight:bold;border-radius:.25rem"></button></div><div style=height:.25rem>`);
var _tmpl$2$1 = /* @__PURE__ */ template(`<div><pre style="font-size:.7em;border:1px solid red;border-radius:.25rem;padding:.3rem;color:red;overflow:auto">`);
var _tmpl$3 = /* @__PURE__ */ template(`<code>`);
function CatchBoundary(props) {
	const [retryKey, setRetryKey] = createSignal({});
	let resetBoundary;
	let initialized = false;
	let previousKey;
	onCleanup(() => {
		resetBoundary = void 0;
	});
	createEffect(props.getResetKey, (key) => {
		if (!initialized) {
			initialized = true;
			previousKey = key;
			return;
		}
		if (key === previousKey) return;
		previousKey = key;
		const reset = resetBoundary;
		if (reset) queueMicrotask(() => {
			if (resetBoundary !== reset) return;
			setRetryKey({});
			reset();
			flush();
		});
	});
	return createComponent(Errored, {
		fallback: (error, reset) => {
			const resolvedError = untrack(() => error());
			props.onCatch?.(resolvedError);
			resetBoundary = reset;
			return createComponent(Dynamic, {
				get component() {
					return props.errorComponent ?? ErrorComponent;
				},
				error: resolvedError,
				reset
			});
		},
		get children() {
			return createComponent(Show, {
				get when() {
					return retryKey();
				},
				keyed: true,
				children: (_retryKey) => props.render?.() ?? props.children
			});
		}
	});
}
function ErrorComponent({ error }) {
	const [show, setShow] = createSignal(false);
	var _el$ = _tmpl$$3();
	var _el$2 = _el$.firstChild;
	var _el$4 = _el$2.firstChild.nextSibling;
	_el$2.nextSibling;
	_el$4.$$click = () => setShow((d) => !d);
	insert(_el$4, () => {
		return show() ? "Hide Error" : "Show Error";
	});
	insert(_el$, (() => {
		var _c$ = memo(() => {
			return !!show();
		});
		return () => {
			return _c$() ? (() => {
				var _el$6 = _tmpl$2$1();
				var _el$7 = _el$6.firstChild;
				insert(_el$7, (() => {
					var _c$2 = memo(() => {
						return !!error.message;
					});
					return () => {
						return _c$2() ? (() => {
							var _el$8 = _tmpl$3();
							insert(_el$8, () => {
								return error.message;
							});
							return _el$8;
						})() : null;
					};
				})());
				return _el$6;
			})() : null;
		};
	})(), null);
	return _el$;
}
delegateEvents(["click"]);

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/ClientOnly.jsx
function ClientOnly(props) {
	const hydrated = useHydrated();
	return createComponent(Show, {
		get when() {
			return hydrated();
		},
		get fallback() {
			return props.fallback ?? null;
		},
		get children() {
			return props.children;
		}
	});
}
var globalHydrated = false;
function useHydrated() {
	const [hydrated, setHydrated] = createSignal(globalHydrated && !sharedConfig.hydrating);
	createEffect(() => true, () => {
		globalHydrated = true;
		setHydrated(true);
	});
	return hydrated;
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/routerContext.jsx
var routerContext = createContext(null);

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/useRouter.jsx
function useRouter(opts) {
	return useContext(routerContext);
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/utils.js
function useIntersectionObserver(ref, callback, disabled) {
	const isIntersectionObserverAvailable = typeof IntersectionObserver === "function";
	let observerRef = null;
	createEffect(() => [ref(), disabled()], ([r, isDisabled]) => {
		if (isDisabled || !r || !isIntersectionObserverAvailable) return () => callback();
		observerRef = new IntersectionObserver((entries) => {
			callback(entries.pop());
		}, { rootMargin: "100px" });
		observerRef.observe(r);
		return () => {
			observerRef?.disconnect();
			callback();
		};
	});
	return () => observerRef;
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/link.jsx
var _tmpl$$2 = /* @__PURE__ */ template(`<svg><a>`);
var _tmpl$2 = /* @__PURE__ */ template(`<a>`);
function mergeRefs(...refs) {
	const setRef = (ref, el) => {
		if (typeof ref === "function") ref(el);
		else if (Array.isArray(ref)) for (const nestedRef of ref) setRef(nestedRef, el);
	};
	return (el) => {
		for (const ref of refs) setRef(ref, el);
	};
}
function splitProps(props, keys) {
	return [props, omit(props, ...keys)];
}
var timeoutMap = /* @__PURE__ */ new WeakMap();
var cancelPreload = (eventTarget) => {
	clearTimeout(timeoutMap.get(eventTarget));
	timeoutMap.delete(eventTarget);
};
function useLinkProps(options) {
	const router = useRouter();
	const shouldHydrateHash = !false && !!router.options.ssr;
	const hasHydrated = useHydrated();
	let hasRenderFetched = false;
	const local = options;
	const activeProps = () => local.activeProps ?? STATIC_ACTIVE_PROPS_GET;
	const inactiveProps = () => local.inactiveProps ?? STATIC_INACTIVE_PROPS_GET;
	const propsSafeToSpread = omit(options, "activeProps", "inactiveProps", "activeOptions", "to", "preload", "preloadDelay", "preloadIntentProximity", "hashScrollIntoView", "replace", "startTransition", "resetScroll", "viewTransition", "target", "disabled", "style", "class", "onClick", "onBlur", "onFocus", "onMouseEnter", "onMouseLeave", "onMouseOver", "onMouseOut", "onTouchStart", "ignoreBlocker", "params", "search", "hash", "state", "mask", "reloadDocument", "unsafeRelative", "from");
	const currentLocation = createMemo(() => router.stores.location.get(), { equals: (prev, next) => prev.href === next.href });
	const _options = () => options;
	const next = createMemo(() => {
		const options = {
			_fromLocation: currentLocation(),
			..._options()
		};
		return untrack(() => router.buildLocation(options));
	}, {
		lazy: true,
		equals: (prev, next) => prev.href === next.href && prev.external === next.external && prev.maskedLocation?.href === next.maskedLocation?.href
	});
	const hrefOption = createMemo(() => {
		if (_options().disabled) return void 0;
		const location = next().maskedLocation ?? next();
		const publicHref = location.publicHref;
		if (location.external) return {
			href: publicHref,
			external: true
		};
		return {
			href: router.history.createHref(publicHref) || "/",
			external: false
		};
	}, { lazy: true });
	const externalLink = createMemo(() => {
		const _href = hrefOption();
		if (_href?.external) {
			if (isDangerousProtocol(_href.href, router.protocolAllowlist)) return;
			return _href.href;
		}
		const to = _options().to;
		if (isSafeInternal(to)) return void 0;
		if (typeof to !== "string" || to.indexOf(":") === -1) return void 0;
		try {
			new URL(to);
			if (isDangerousProtocol(to, router.protocolAllowlist)) return;
			return to;
		} catch {}
	}, { lazy: true });
	const preload = createMemo(() => {
		if (_options().reloadDocument || externalLink() || local.disabled) return false;
		return local.preload ?? router.options.defaultPreload;
	}, { lazy: true });
	const preloadDelay = () => local.preloadDelay ?? router.options.defaultPreloadDelay ?? 0;
	const isActive = createMemo(() => {
		if (externalLink()) return false;
		const activeOptions = local.activeOptions;
		const current = currentLocation();
		const nextLocation = next();
		if (activeOptions?.exact) {
			if (!exactPathTest(current.pathname, nextLocation.pathname, router.basepath)) return false;
		} else {
			const currentPath = removeTrailingSlash(current.pathname, router.basepath);
			const nextPath = removeTrailingSlash(nextLocation.pathname, router.basepath);
			if (!(currentPath.startsWith(nextPath) && (currentPath.length === nextPath.length || currentPath[nextPath.length] === "/"))) return false;
		}
		if (activeOptions?.includeSearch ?? true) {
			if (!deepEqual(current.search, nextLocation.search, {
				partial: !activeOptions?.exact,
				ignoreUndefined: !activeOptions?.explicitUndefined
			})) return false;
		}
		if (activeOptions?.includeHash) return (shouldHydrateHash && !hasHydrated() ? "" : current.hash) === nextLocation.hash;
		return true;
	}, { lazy: true });
	const doPreload = () => router.preloadRoute({
		...options,
		_builtLocation: next()
	}).catch((err) => {
		console.warn(err);
		console.warn(preloadWarning);
	});
	const [ref, setRefSignal] = createSignal(null);
	const setRef = (el) => {
		runWithOwner(null, () => {
			setRefSignal(el);
		});
	};
	const enqueuePreload = (e) => {
		if (!e) {
			cancelPreload(ref);
			return;
		}
		if (!(e.isIntersecting ?? preload() === "intent")) {
			if (e.isIntersecting === false) cancelPreload(ref);
			return;
		}
		if (!preloadDelay()) {
			doPreload();
			return;
		}
		if (!timeoutMap.has(ref)) timeoutMap.set(ref, setTimeout(() => {
			timeoutMap.delete(ref);
			doPreload();
		}, preloadDelay()));
	};
	useIntersectionObserver(ref, enqueuePreload, () => preload() !== "viewport");
	createEffect(preload, (preloadValue) => {
		if (hasRenderFetched) return;
		if (preloadValue === "render") {
			untrack(() => doPreload());
			hasRenderFetched = true;
		}
	});
	if (untrack(externalLink)) {
		const externalHref = untrack(externalLink);
		return merge(propsSafeToSpread, {
			ref: mergeRefs(setRef, options.ref),
			href: externalHref
		}, splitProps(local, [
			"target",
			"disabled",
			"style",
			"class",
			"onClick",
			"onBlur",
			"onFocus",
			"onMouseEnter",
			"onMouseLeave",
			"onMouseOut",
			"onMouseOver",
			"onTouchStart"
		])[0]);
	}
	const handleClick = (e) => {
		const elementTarget = e.currentTarget.getAttribute("target");
		const effectiveTarget = local.target !== void 0 ? local.target : elementTarget;
		if (!local.disabled && !isCtrlEvent(e) && !e.defaultPrevented && (!effectiveTarget || effectiveTarget === "_self") && e.button === 0) {
			e.preventDefault();
			router.navigate({
				...options,
				replace: local.replace,
				resetScroll: local.resetScroll,
				hashScrollIntoView: local.hashScrollIntoView,
				startTransition: local.startTransition,
				viewTransition: local.viewTransition,
				ignoreBlocker: local.ignoreBlocker
			});
		}
	};
	const handleTouchStart = () => {
		if (preload() !== "intent") return;
		doPreload();
	};
	const handleLeave = () => {
		if (preload() === "intent") cancelPreload(ref);
	};
	const simpleStyling = createMemo(() => activeProps() === STATIC_ACTIVE_PROPS_GET && inactiveProps() === STATIC_INACTIVE_PROPS_GET && local.class === void 0 && local.style === void 0, { lazy: true });
	const onClick = createComposedHandler(() => local.onClick, handleClick);
	const onBlur = createComposedHandler(() => local.onBlur, handleLeave);
	const onFocus = createComposedHandler(() => local.onFocus, enqueuePreload);
	const onMouseEnter = createComposedHandler(() => local.onMouseEnter, enqueuePreload);
	const onMouseOver = createComposedHandler(() => local.onMouseOver, enqueuePreload);
	const onMouseLeave = createComposedHandler(() => local.onMouseLeave, handleLeave);
	const onMouseOut = createComposedHandler(() => local.onMouseOut, handleLeave);
	const onTouchStart = createComposedHandler(() => local.onTouchStart, handleTouchStart);
	const resolvedStateProps = createMemo(() => (isActive() ? functionalUpdate(activeProps(), {}) : functionalUpdate(inactiveProps(), {})) ?? EMPTY_OBJECT, { lazy: true });
	const resolvedClass = createMemo(() => {
		if (simpleStyling()) return isActive() ? "active" : void 0;
		return [local.class, resolvedStateProps().class].filter(Boolean).join(" ") || void 0;
	}, { lazy: true });
	const resolvedStyle = createMemo(() => {
		if (simpleStyling()) return local.style;
		const style = {
			...local.style,
			...resolvedStateProps().style
		};
		return hasKeys(style) ? style : void 0;
	}, { lazy: true });
	const extraStateKeys = /* @__PURE__ */ new Set();
	untrack(() => {
		for (const stateProps of [functionalUpdate(activeProps(), {}), functionalUpdate(inactiveProps(), {})]) if (stateProps) {
			for (const key of Object.keys(stateProps)) if (key !== "class" && key !== "style") extraStateKeys.add(key);
		}
	});
	const composedRef = mergeRefs(setRef, (el) => {
		const r = _options().ref;
		if (typeof r === "function") r(el);
	});
	const linkProps = {};
	for (const key of Object.keys(propsSafeToSpread)) Object.defineProperty(linkProps, key, Object.getOwnPropertyDescriptor(propsSafeToSpread, key));
	for (const key of extraStateKeys) Object.defineProperty(linkProps, key, {
		get: () => resolvedStateProps()[key],
		enumerable: true,
		configurable: true
	});
	const defineGetters = (getters) => {
		for (const key of Object.keys(getters)) Object.defineProperty(linkProps, key, {
			get: getters[key],
			enumerable: true,
			configurable: true
		});
	};
	linkProps.ref = composedRef;
	linkProps.onClick = onClick;
	linkProps.onBlur = onBlur;
	linkProps.onFocus = onFocus;
	linkProps.onMouseEnter = onMouseEnter;
	linkProps.onMouseOver = onMouseOver;
	linkProps.onMouseLeave = onMouseLeave;
	linkProps.onMouseOut = onMouseOut;
	linkProps.onTouchStart = onTouchStart;
	defineGetters({
		href: () => hrefOption()?.href,
		disabled: () => !!local.disabled,
		target: () => local.target,
		role: () => local.disabled ? "link" : void 0,
		"aria-disabled": () => local.disabled ? "true" : void 0,
		"data-status": () => isActive() ? "active" : void 0,
		"aria-current": () => isActive() ? "page" : void 0,
		class: resolvedClass,
		style: resolvedStyle
	});
	return linkProps;
}
var STATIC_ACTIVE_PROPS = { class: "active" };
var STATIC_ACTIVE_PROPS_GET = () => STATIC_ACTIVE_PROPS;
var EMPTY_OBJECT = {};
var STATIC_INACTIVE_PROPS_GET = () => EMPTY_OBJECT;
function callHandler(event, handler) {
	if (typeof handler === "function") handler(event);
	else handler[0](handler[1], event);
	return event.defaultPrevented;
}
function createComposedHandler(getHandler, fallback) {
	return (event) => {
		const handler = getHandler();
		if (!handler || !callHandler(event, handler)) fallback(event);
	};
}
var Link = (props) => {
	const [local, rest] = splitProps(props, ["_asChild", "children"]);
	const [_, linkProps] = splitProps(useLinkProps(rest), ["type"]);
	const resolvedChildren = children(() => local.children);
	const children$1 = () => {
		const ch = resolvedChildren();
		if (typeof ch === "function") return ch({ get isActive() {
			return linkProps["data-status"] === "active";
		} });
		return ch;
	};
	if (local._asChild === "svg") {
		const [_, svgLinkProps] = splitProps(linkProps, ["class"]);
		var _el$ = _tmpl$$2();
		var _el$2 = _el$.firstChild;
		claimElement(_el$2);
		spread(_el$2, svgLinkProps, true);
		insert(_el$2, children$1);
		return _el$;
	}
	if (!local._asChild) {
		var _el$3 = _tmpl$2();
		claimElement(_el$3);
		spread(_el$3, linkProps, true);
		insert(_el$3, children$1);
		return _el$3;
	}
	return createComponent(Dynamic, merge({ get component() {
		return local._asChild;
	} }, linkProps, { get children() {
		return children$1();
	} }));
};
function isCtrlEvent(e) {
	return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function isSafeInternal(to) {
	if (typeof to !== "string") return false;
	const zero = to.charCodeAt(0);
	if (zero === 47) return to.charCodeAt(1) !== 47;
	return zero === 46;
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/matchContext.jsx
var defaultNearestMatchContext = [() => void 0, () => void 0];
var nearestMatchContext = createContext(defaultNearestMatchContext);

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/useMatch.jsx
function useMatch(opts) {
	const router = useRouter();
	const contextMatch = useContext(nearestMatchContext);
	const nearestMatch = opts.from ? void 0 : contextMatch;
	const match = () => {
		if (opts.from) return router.stores.getMatchStore(opts.from).get();
		return nearestMatch?.[1]();
	};
	createEffect(match, (selectedMatch) => {
		if (selectedMatch !== void 0) return;
		if (opts.shouldThrow ?? true) invariant();
	});
	return createMemo((prev) => {
		const selectedMatch = match();
		if (selectedMatch === void 0) return;
		const res = opts.select ? opts.select(selectedMatch) : selectedMatch;
		if (prev === void 0) return res;
		return replaceEqualDeep(prev, res);
	});
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/useLoaderData.jsx
function useLoaderData(opts) {
	return useMatch({
		from: opts.from,
		strict: opts.strict,
		select: (match) => {
			return opts.select ? opts.select(match.loaderData) : match.loaderData;
		}
	});
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/useLoaderDeps.jsx
function useLoaderDeps(opts) {
	return useMatch({
		...opts,
		select: (match) => {
			return opts.select ? opts.select(match.loaderDeps) : match.loaderDeps;
		}
	});
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/useParams.jsx
function useParams(opts) {
	return useMatch({
		from: opts.from,
		strict: opts.strict,
		shouldThrow: opts.shouldThrow,
		select: (match) => {
			const params = opts.strict === false ? match.params : match._strictParams;
			return opts.select ? opts.select(params) : params;
		}
	});
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/useSearch.jsx
function useSearch(opts) {
	return useMatch({
		from: opts.from,
		strict: opts.strict,
		shouldThrow: opts.shouldThrow,
		select: (match) => {
			const search = match.search;
			return opts.select ? opts.select(search) : search;
		}
	});
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/useNavigate.jsx
function useNavigate(_defaultOpts) {
	const router = useRouter();
	return ((options) => {
		return router.navigate({
			...options,
			from: options.from ?? _defaultOpts?.from
		});
	});
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/useRouteContext.js
function useRouteContext(opts) {
	return useMatch({
		...opts,
		select: (match) => opts.select ? opts.select(match.context) : match.context
	});
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/route.jsx
var Route = class extends BaseRoute {
	constructor(options) {
		super(options);
		this.useMatch = (opts) => {
			return useMatch({
				select: opts?.select,
				from: this.id
			});
		};
		this.useRouteContext = (opts) => {
			return useRouteContext({
				...opts,
				from: this.id
			});
		};
		this.useSearch = (opts) => {
			return useSearch({
				select: opts?.select,
				from: this.id
			});
		};
		this.useParams = (opts) => {
			return useParams({
				select: opts?.select,
				from: this.id
			});
		};
		this.useLoaderDeps = (opts) => {
			return useLoaderDeps({
				...opts,
				from: this.id
			});
		};
		this.useLoaderData = (opts) => {
			return useLoaderData({
				...opts,
				from: this.id
			});
		};
		this.useNavigate = () => {
			return useNavigate({ from: this.fullPath });
		};
		this.Link = ((props) => {
			const _self$ = this;
			return createComponent(Link, merge({ get from() {
				return _self$.fullPath;
			} }, props));
		});
	}
};
function createRoute(options) {
	return new Route(options);
}
var RootRoute = class extends BaseRootRoute {
	constructor(options) {
		super(options);
		this.useMatch = (opts) => {
			return useMatch({
				select: opts?.select,
				from: this.id
			});
		};
		this.useRouteContext = (opts) => {
			return useRouteContext({
				...opts,
				from: this.id
			});
		};
		this.useSearch = (opts) => {
			return useSearch({
				select: opts?.select,
				from: this.id
			});
		};
		this.useParams = (opts) => {
			return useParams({
				select: opts?.select,
				from: this.id
			});
		};
		this.useLoaderDeps = (opts) => {
			return useLoaderDeps({
				...opts,
				from: this.id
			});
		};
		this.useLoaderData = (opts) => {
			return useLoaderData({
				...opts,
				from: this.id
			});
		};
		this.useNavigate = () => {
			return useNavigate({ from: this.fullPath });
		};
		this.Link = ((props) => {
			const _self$2 = this;
			return createComponent(Link, merge({ get from() {
				return _self$2.fullPath;
			} }, props));
		});
	}
};
function createRootRoute(options) {
	return new RootRoute(options);
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/fileRoute.js
function createFileRoute(path) {
	return (options) => {
		const route = createRoute(options);
		route.isRoot = false;
		return route;
	};
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/Transitioner.jsx
function getResolvedLocation(router) {
	const resolvedLocation = router.stores.resolvedLocation.get();
	if (resolvedLocation?.href === router.latestLocation.href && resolvedLocation.state.__TSR_key === router.latestLocation.state.__TSR_key) return resolvedLocation;
}
function Transitioner() {
	const router = useRouter();
	router.startTransition = async (fn) => {
		const result = runWithOwner(null, fn);
		try {
			flush();
		} catch {}
		await result;
		await new Promise((resolve) => queueMicrotask(resolve));
		return true;
	};
	onSettled(() => {
		const unsub = router.history.subscribe(() => {
			queueMicrotask(() => router.load().catch(console.error));
		});
		router.updateLatestLocation();
		const nextLocation = router.buildLocation({
			to: router.latestLocation.pathname,
			search: true,
			params: true,
			hash: true,
			state: true,
			_includeValidateSearch: true
		});
		if (trimPathRight(router.latestLocation.publicHref) !== trimPathRight(nextLocation.publicHref)) {
			router.commitLocation({
				...nextLocation,
				replace: true,
				ignoreBlocker: true
			});
			return unsub;
		}
		if (!getResolvedLocation(router) && !router._tx) queueMicrotask(() => router.load().catch(console.error));
		return unsub;
	});
	return null;
}
function Rendered() {
	const router = useRouter();
	onSettled(() => {
		const resolvedLocation = getResolvedLocation(router);
		if (resolvedLocation) router.emit({
			type: "onRendered",
			...getLocationChangeInfo(resolvedLocation, resolvedLocation)
		});
	});
	return null;
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/SafeFragment.jsx
function SafeFragment(props) {
	return memo(() => {
		return props.children;
	});
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/not-found.jsx
var _tmpl$$1 = /* @__PURE__ */ template(`<p>Not Found`);
function getNotFound(error) {
	if (isNotFound(error)) return error;
	if (isNotFound(error?.cause)) return error.cause;
}
function CatchNotFound(props) {
	const router = useRouter();
	const pathname = createMemo(() => router.stores.location.get().pathname);
	const status = createMemo(() => router.stores.status.get());
	return createComponent(CatchBoundary, {
		getResetKey: () => `not-found-${pathname()}-${status()}`,
		onCatch: (error) => {
			const notFoundError = getNotFound(error);
			if (notFoundError) props.onCatch?.(notFoundError);
			else throw error;
		},
		errorComponent: ({ error }) => {
			const notFoundError = getNotFound(error);
			if (notFoundError) return props.fallback?.(notFoundError);
			else throw error;
		},
		get children() {
			return props.children;
		}
	});
}
function DefaultGlobalNotFound() {
	return _tmpl$$1();
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/renderRouteNotFound.jsx
function renderRouteNotFound(router, route, data) {
	if (!route.options.notFoundComponent) {
		if (router.options.defaultNotFoundComponent) return createComponent(router.options.defaultNotFoundComponent, data);
		return createComponent(DefaultGlobalNotFound, {});
	}
	return createComponent(route.options.notFoundComponent, data);
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/ScriptOnce.jsx
var _tmpl$ = /* @__PURE__ */ template(`<script class=$tsr>`);
function ScriptOnce({ children }) {
	const router = useRouter();
	if (!(false ?? router.isServer)) return null;
	var _el$ = _tmpl$();
	_el$.innerHTML = children + ";document.currentScript.remove()";
	effect(() => router.options.ssr?.nonce, (_v$) => {
		setAttribute(_el$, "nonce", _v$);
	});
	return _el$;
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/scroll-restoration.jsx
function ScrollRestoration() {
	const router = useRouter();
	const script = getScrollRestorationScriptForRouter(router);
	if (!script) return null;
	return createComponent(ScriptOnce, { children: script });
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/Match.jsx
var NearestMatchContext$1 = nearestMatchContext;
var renderScrollRestoration = false === false ? void 0 : (router, route) => (false ?? router.isServer) && route.parentRoute?.id === "__root__" && router.options.scrollRestoration ? createComponent(ScrollRestoration, {}) : null;
var Match = (props) => {
	const router = useRouter();
	const currentMatch = createMemo(() => router.stores.getMatchStore(props.routeId).get());
	const matchState = createMemo(() => {
		const match = currentMatch();
		if (!match) return null;
		return {
			routeId: match.routeId,
			ssr: match.ssr,
			status: match.status
		};
	});
	const nearestMatch = [() => props.routeId, currentMatch];
	return createComponent(Show, {
		get when() {
			return matchState();
		},
		children: (currentMatchState) => {
			const route = router.routesById[props.routeId];
			const routeOptions = () => {
				currentMatchState();
				return route.options;
			};
			const resolvePendingComponent = createMemo(() => routeOptions().pendingComponent ?? router.options.defaultPendingComponent);
			const routeErrorComponent = createMemo(() => routeOptions().errorComponent ?? router.options.defaultErrorComponent);
			const routeNotFoundComponent = createMemo(() => route.isRoot ? routeOptions().notFoundComponent ?? router.options.notFoundRoute?.options.component ?? router.options.defaultNotFoundComponent : routeOptions().notFoundComponent ?? router.options.defaultNotFoundComponent);
			const resolvedNoSsr = createMemo(() => currentMatchState().ssr === false || currentMatchState().ssr === "data-only");
			const ResolvedLoadingBoundary = createMemo(() => resolvedNoSsr() ? SafeFragment : Loading);
			const shouldSkipLoadingFallback = createMemo(() => false ?? router.isServer ? resolvedNoSsr() : currentMatchState().ssr === "data-only");
			const ResolvedNotFoundBoundary = createMemo(() => routeNotFoundComponent() ? CatchNotFound : SafeFragment);
			const ShellComponent = createMemo(() => route.isRoot ? route.options.shellComponent ?? SafeFragment : SafeFragment);
			const MatchContent = () => createComponent(Show, {
				get when() {
					return currentMatchState().status !== "pending";
				},
				get fallback() {
					return createComponent(Dynamic, { get component() {
						return resolvePendingComponent();
					} });
				},
				get children() {
					return createComponent(MatchInner, {});
				}
			});
			const RouteContent = () => createComponent(Dynamic, {
				get component() {
					return ResolvedNotFoundBoundary();
				},
				fallback: (error) => {
					const notFoundError = getNotFound(error) ?? error;
					notFoundError.routeId ?? (notFoundError.routeId = currentMatchState().routeId);
					if (notFoundError.routeId !== currentMatchState().routeId) throw notFoundError;
					return createComponent(Dynamic, merge({ get component() {
						return routeNotFoundComponent();
					} }, notFoundError));
				},
				get children() {
					return createComponent(Switch, { get children() {
						return [createComponent(Match$1, {
							get when() {
								return resolvedNoSsr();
							},
							get children() {
								return createComponent(ClientOnly, {
									get fallback() {
										return createComponent(Dynamic, { get component() {
											return resolvePendingComponent();
										} });
									},
									get children() {
										return createComponent(MatchContent, {});
									}
								});
							}
						}), createComponent(Match$1, {
							get when() {
								return !resolvedNoSsr();
							},
							get children() {
								return createComponent(MatchContent, {});
							}
						})];
					} });
				}
			});
			return createComponent(Dynamic, {
				get component() {
					return ShellComponent();
				},
				get children() {
					return [createComponent(NearestMatchContext$1, {
						value: nearestMatch,
						get children() {
							return createComponent(Dynamic, {
								get component() {
									return ResolvedLoadingBoundary();
								},
								get fallback() {
									if (shouldSkipLoadingFallback()) return;
									return createComponent(Dynamic, { get component() {
										return resolvePendingComponent();
									} });
								},
								get children() {
									return createComponent(Show, {
										get when() {
											return routeErrorComponent();
										},
										get fallback() {
											return createComponent(RouteContent, {});
										},
										children: (errorComponent) => createComponent(CatchBoundary, {
											getResetKey: () => {
												const matches = router.stores.matches.get();
												const index = matches.findIndex((match) => match.routeId === props.routeId);
												if (index === -1) return "";
												let key = "";
												for (let i = index; i < matches.length; i++) {
													const match = matches[i];
													key += `${match.status}|${match.updatedAt},`;
												}
												return key;
											},
											get errorComponent() {
												return errorComponent();
											},
											onCatch: (error) => {
												const notFoundError = getNotFound(error);
												if (notFoundError) {
													notFoundError.routeId ?? (notFoundError.routeId = currentMatchState().routeId);
													throw notFoundError;
												}
												(routeOptions().onCatch ?? router.options.defaultOnCatch)?.(error);
											},
											render: RouteContent
										})
									});
								}
							});
						}
					}), memo(() => {
						return renderScrollRestoration?.(router, route);
					})];
				}
			});
		}
	});
};
var MatchInner = () => {
	const router = useRouter();
	const nearestMatch = useContext(nearestMatchContext);
	const match = nearestMatch[1];
	const routeId = nearestMatch[0];
	const matchState = createMemo(() => {
		const currentMatch = match();
		const currentRouteId = routeId();
		if (!currentMatch || !currentRouteId) return null;
		const route = router.routesById[currentRouteId];
		const remount = route.options.remountDeps ?? router.options.defaultRemountDeps;
		let componentKey;
		if (!remount) componentKey = currentRouteId;
		else {
			const deps = remount({
				routeId: currentRouteId,
				loaderDeps: currentMatch.loaderDeps,
				params: currentMatch._strictParams,
				search: currentMatch._strictSearch
			});
			componentKey = JSON.stringify(deps) ?? currentRouteId;
		}
		return {
			route,
			routeId: currentRouteId,
			match: {
				id: currentMatch.id,
				status: currentMatch.status,
				error: currentMatch.error
			},
			componentKey
		};
	});
	return createComponent(Show, {
		get when() {
			return matchState();
		},
		children: (currentMatchState) => {
			const route = createMemo(() => currentMatchState().route);
			const currentMatch = createMemo(() => currentMatchState().match);
			const componentKey = createMemo(() => currentMatchState().componentKey);
			const OutComponent = createMemo(() => route().options.component ?? router.options.defaultComponent ?? Outlet);
			const keyedOut = () => createComponent(Show, {
				get when() {
					return componentKey();
				},
				keyed: true,
				children: (_key) => createComponent(Dynamic, { get component() {
					return OutComponent();
				} })
			});
			return createComponent(Switch, { get children() {
				return [
					createComponent(Match$1, {
						get when() {
							return currentMatch().status === "notFound";
						},
						children: (_) => untrack(() => renderRouteNotFound(router, route(), currentMatch().error))
					}),
					createComponent(Match$1, {
						get when() {
							return currentMatch().status === "error";
						},
						children: (_) => {
							const matchError = untrack(() => currentMatch().error);
							if (false ?? router.isServer) {
								const RouteErrorComponent = (route().options.errorComponent ?? router.options.defaultErrorComponent) || ErrorComponent;
								return createComponent(RouteErrorComponent, {
									error: matchError,
									reset: void 0,
									info: { componentStack: "" }
								});
							}
							throw matchError;
						}
					}),
					createComponent(Match$1, {
						get when() {
							return currentMatch().status === "success";
						},
						get children() {
							return keyedOut();
						}
					})
				];
			} });
		}
	});
};
var Outlet = () => {
	const router = useRouter();
	const nearestParentMatch = useContext(nearestMatchContext);
	const parentMatch = nearestParentMatch[1];
	const routeId = nearestParentMatch[0];
	const route = createMemo(() => {
		const currentRouteId = routeId();
		return currentRouteId ? router.routesById[currentRouteId] : void 0;
	});
	const parentNotFound = createMemo(() => parentMatch()?._notFound);
	const parentNotFoundError = createMemo(() => parentMatch()?.error);
	const childRouteId = createMemo(() => {
		if (parentNotFound()) return;
		const currentRouteId = routeId();
		if (!currentRouteId) return;
		const ids = router.stores.ids.get();
		return ids[ids.indexOf(currentRouteId) + 1];
	});
	const childPendingComponent = createMemo(() => {
		const childId = childRouteId();
		return childId ? router.routesById[childId].options.pendingComponent ?? router.options.defaultPendingComponent : router.options.defaultPendingComponent;
	});
	return createComponent(Show, {
		get when() {
			return childRouteId();
		},
		keyed: true,
		get fallback() {
			return createComponent(Show, {
				get when() {
					return memo(() => {
						return !!parentNotFound();
					})() ? route() : parentNotFound();
				},
				children: (resolvedRoute) => untrack(() => renderRouteNotFound(router, resolvedRoute(), parentNotFoundError()))
			});
		},
		children: (currentChildRouteId) => {
			const nextMatch = () => createComponent(Match, { routeId: currentChildRouteId });
			return createComponent(Show, {
				get when() {
					return routeId() === rootRouteId;
				},
				get fallback() {
					return nextMatch();
				},
				get children() {
					return createComponent(Loading, {
						get fallback() {
							if (!childPendingComponent()) return null;
							return createComponent(Dynamic, { get component() {
								return childPendingComponent();
							} });
						},
						get children() {
							return nextMatch();
						}
					});
				}
			});
		}
	});
};

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/Matches.jsx
var NearestMatchContext = nearestMatchContext;
function _resolveMatchesLoadingBoundary(router) {
	return !(router.routesById["__root__"]?.options.pendingComponent ?? router.options.defaultPendingComponent) || router.options.disableGlobalCatchBoundary || router.ssr ? SafeFragment : Loading;
}
function Matches() {
	const router = useRouter();
	const ResolvedSuspense = _resolveMatchesLoadingBoundary(router);
	const rootRoute = () => router.routesById[rootRouteId];
	const PendingComponent = rootRoute().options.pendingComponent ?? router.options.defaultPendingComponent;
	const OptionalWrapper = router.options.InnerWrap || SafeFragment;
	return createComponent(OptionalWrapper, { get children() {
		return createComponent(ResolvedSuspense, {
			get fallback() {
				return PendingComponent ? (() => {
					return createComponent(PendingComponent, {});
				})() : null;
			},
			get children() {
				return [
					createComponent(Transitioner, {}),
					createComponent(MatchesInner, {}),
					createComponent(Rendered, {})
				];
			}
		});
	} });
}
function MatchesInner() {
	const router = useRouter();
	const routeId = () => router.stores.ids.get()[0];
	const match = () => routeId() ? router.stores.byRoute.get(routeId())?.get() : void 0;
	const nearestMatch = [routeId, match];
	const matchContent = () => createComponent(Show, {
		get when() {
			return routeId();
		},
		keyed: true,
		children: (currentRouteId) => createComponent(Match, { routeId: currentRouteId })
	});
	if (router.options.disableGlobalCatchBoundary) return createComponent(NearestMatchContext, {
		value: nearestMatch,
		get children() {
			return matchContent();
		}
	});
	return createComponent(NearestMatchContext, {
		value: nearestMatch,
		get children() {
			return createComponent(CatchBoundary, {
				getResetKey: () => router.stores.matches.get(),
				render: matchContent,
				errorComponent: ErrorComponent,
				get onCatch() {}
			});
		}
	});
}

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/routerStores.js
function createSolidMutableStore(initialValue) {
	const [signal, setSignal] = createSignal(initialValue);
	return {
		get: signal,
		set: setSignal
	};
}
function createSolidReadonlyStore(read) {
	return { get: createRoot(() => createMemo(read)) };
}
var getStoreFactory = (opts) => {
	if (false ?? opts.isServer) return {
		createMutableStore: createNonReactiveMutableStore,
		createReadonlyStore: createNonReactiveReadonlyStore,
		batch: (fn) => fn()
	};
	let depth = 0;
	return {
		createMutableStore: createSolidMutableStore,
		createReadonlyStore: createSolidReadonlyStore,
		batch: (fn) => {
			depth++;
			try {
				fn();
			} finally {
				depth--;
				if (depth === 0) try {
					flush();
				} catch {}
			}
		}
	};
};

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/router.js
var createRouter = (options) => {
	return new Router(options);
};
var Router = class extends RouterCore {
	constructor(options) {
		super(options, getStoreFactory);
	}
};

//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-rc.4_@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4__solid-js@2.0.0-rc.4/node_modules/@tanstack/solid-router/dist/source/RouterProvider.jsx
var RouterContext = routerContext;
function RouterContextProvider({ router, children, ...rest }) {
	if (Object.keys(rest).length > 0) runWithOwner(null, () => {
		router.update({
			...router.options,
			...rest,
			context: {
				...router.options.context,
				...rest.context
			}
		});
	});
	const OptionalWrapper = router.options.Wrap || SafeFragment;
	return createComponent(OptionalWrapper, { get children() {
		return createComponent(RouterContext, {
			value: router,
			get children() {
				return children();
			}
		});
	} });
}
function RouterProvider({ router, ...rest }) {
	return createComponent(RouterContextProvider, merge({ router }, rest, { children: () => createComponent(Matches, {}) }));
}

//#endregion
export { createRootRoute as a, Link as c, createFileRoute as i, useRouter as l, createRouter as n, useRouteContext as o, Outlet as r, useNavigate as s, RouterProvider as t };
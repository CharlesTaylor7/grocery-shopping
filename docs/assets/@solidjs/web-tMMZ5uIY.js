import { _ as createRoot, a as flatten, c as createMemo$1, d as onCleanup, g as untrack, h as runWithOwner, i as createLoadingBoundary$1, l as createRenderEffect$1, m as setContext, n as omit, o as mapArray, p as getContext, r as createErrorBoundary$1, s as createEffect$1, u as createSignal$1, v as getOwner, y as flush } from "./signals-Ckwt8Og4.js";

//#region node_modules/.pnpm/solid-js@2.0.0-rc.4/node_modules/solid-js/dist/solid.js
var IS_DEV = false;
function createContext(defaultValue, options) {
	const id = Symbol(options && options.name || "");
	function provider(props) {
		return createRoot(() => {
			setContext(provider, props.value);
			return children(() => props.children);
		});
	}
	provider.id = id;
	provider.defaultValue = defaultValue;
	return provider;
}
function useContext(context) {
	return getContext(context);
}
function children(fn) {
	const c = createMemo$1(fn, { lazy: true });
	const memo = createMemo$1(() => flatten(c()), {
		lazy: true,
		sync: true
	});
	memo.toArray = () => {
		const v = memo();
		return Array.isArray(v) ? v : v != null ? [v] : [];
	};
	return memo;
}
var sharedConfig = {
	hydrating: false,
	registry: void 0,
	done: false
};
var _createMemo;
var _createSignal;
var _createErrorBoundary;
var _createRenderEffect;
var _createEffect;
var _createLoadingBoundary;
var createMemo = (...args) => {
	return (_createMemo || createMemo$1)(...args);
};
var createSignal = (...args) => {
	return (_createSignal || createSignal$1)(...args);
};
var createErrorBoundary = (...args) => (_createErrorBoundary || createErrorBoundary$1)(...args);
var createRenderEffect = (...args) => (_createRenderEffect || createRenderEffect$1)(...args);
var createEffect = (...args) => (_createEffect || createEffect$1)(...args);
var createLoadingBoundary = (fn, fallback, options) => (_createLoadingBoundary || createLoadingBoundary$1)(fn, fallback, options);
function createComponent(Comp, props) {
	return untrack(() => Comp(props || {}));
}
var narrowedError = (name) => `Stale read from <${name}>.`;
function For(props) {
	const options = "fallback" in props ? {
		keyed: props.keyed,
		fallback: () => props.fallback
	} : { keyed: props.keyed };
	const owner = getOwner();
	let mapped;
	const list = () => {
		if (mapped === void 0) mapped = runWithOwner(owner, () => mapArray(() => props.each, props.children, options));
		return mapped();
	};
	if (props.keyed !== false && !("fallback" in props) && props.children.length < 2) list.$ll = {
		each: () => props.each,
		row: props.children,
		keyed: props.keyed
	};
	return list;
}
function Show(props) {
	const keyed = props.keyed;
	const conditionValue = createMemo$1(() => props.when, void 0);
	const condition = keyed ? conditionValue : createMemo$1(conditionValue, {
		equals: (a, b) => !a === !b,
		sync: true
	});
	return createMemo$1(() => {
		const c = condition();
		if (c) {
			const child = props.children;
			return typeof child === "function" && child.length > 0 ? keyed ? untrack(() => child(c), IS_DEV) : untrack(() => child(() => {
				if (!untrack(condition)) throw narrowedError("Show");
				return conditionValue();
			}), IS_DEV) : child;
		}
		return props.fallback;
	}, { sync: true });
}
function Switch(props) {
	const chs = children(() => props.children);
	const switchFunc = createMemo$1(() => {
		const mps = chs.toArray();
		let func = () => void 0;
		for (let i = 0; i < mps.length; i++) {
			const index = i;
			const mp = mps[i];
			if (mp == null) continue;
			const prevFunc = func;
			const conditionValue = createMemo$1(() => prevFunc() ? void 0 : mp.when, void 0);
			const condition = mp.keyed ? conditionValue : createMemo$1(conditionValue, {
				equals: (a, b) => !a === !b,
				sync: true
			});
			func = () => {
				const prev = prevFunc();
				if (prev) return prev;
				const c = condition();
				return c ? [
					index,
					c,
					conditionValue,
					mp
				] : void 0;
			};
		}
		return func;
	}, { sync: true });
	return createMemo$1(() => {
		const sel = switchFunc()();
		if (!sel) return props.fallback;
		const [index, value, conditionValue, mp] = sel;
		const child = mp.children;
		return typeof child === "function" && child.length > 0 ? mp.keyed ? untrack(() => child(value), IS_DEV) : untrack(() => child(() => {
			if (untrack(switchFunc)()?.[0] !== index) throw narrowedError("Match");
			return conditionValue();
		}), IS_DEV) : child;
	}, { sync: true });
}
function Match(props) {
	return props;
}
function Errored(props) {
	return createErrorBoundary(() => props.children, (err, reset) => {
		const f = props.fallback;
		return typeof f === "function" && f.length ? f(err, reset) : f;
	});
}
function Loading(props) {
	const onOpt = "on" in props ? { on: () => props.on } : void 0;
	return createLoadingBoundary(() => props.children, () => props.fallback, onOpt);
}

//#endregion
//#region node_modules/.pnpm/@solidjs+web@2.0.0-rc.4_solid-js@2.0.0-rc.4/node_modules/@solidjs/web/dist/web.js
var DOMWithState = {
	INPUT: {
		value: 1,
		defaultValue: 2,
		checked: 1,
		defaultChecked: 2
	},
	SELECT: { value: 1 },
	OPTION: {
		value: 1,
		selected: 1,
		defaultSelected: 2
	},
	TEXTAREA: {
		value: 1,
		defaultValue: 2
	},
	VIDEO: {
		muted: 1,
		defaultMuted: 2
	},
	AUDIO: {
		muted: 1,
		defaultMuted: 2
	}
};
var ChildProperties = /*#__PURE__*/ new Set([
	"innerHTML",
	"textContent",
	"innerText",
	"children"
]);
var $$SLOT = /*#__PURE__*/ Symbol("slot");
var $$HOST = /*#__PURE__*/ Symbol("host");
var DelegatedEvents = /*#__PURE__*/ new Set([
	"beforeinput",
	"click",
	"dblclick",
	"contextmenu",
	"focusin",
	"focusout",
	"input",
	"keydown",
	"keyup",
	"mousedown",
	"mousemove",
	"mouseout",
	"mouseover",
	"mouseup",
	"pointerdown",
	"pointermove",
	"pointerout",
	"pointerover",
	"pointerup",
	"touchend",
	"touchmove",
	"touchstart"
]);
var SVGElements = /*#__PURE__*/ new Set([
	"altGlyph",
	"altGlyphDef",
	"altGlyphItem",
	"animate",
	"animateColor",
	"animateMotion",
	"animateTransform",
	"circle",
	"clipPath",
	"color-profile",
	"cursor",
	"defs",
	"desc",
	"ellipse",
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence",
	"filter",
	"font",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignObject",
	"g",
	"glyph",
	"glyphRef",
	"hkern",
	"image",
	"line",
	"linearGradient",
	"marker",
	"mask",
	"metadata",
	"missing-glyph",
	"mpath",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"radialGradient",
	"rect",
	"set",
	"stop",
	"svg",
	"switch",
	"symbol",
	"text",
	"textPath",
	"tref",
	"tspan",
	"use",
	"view",
	"vkern"
]);
var MathMLElements = /*#__PURE__*/ new Set([
	"annotation",
	"annotation-xml",
	"maction",
	"math",
	"menclose",
	"merror",
	"mfenced",
	"mfrac",
	"mi",
	"mmultiscripts",
	"mn",
	"mo",
	"mover",
	"mpadded",
	"mphantom",
	"mprescripts",
	"mroot",
	"mrow",
	"ms",
	"mspace",
	"msqrt",
	"mstyle",
	"msub",
	"msubsup",
	"msup",
	"mtable",
	"mtd",
	"mtext",
	"mtr",
	"munder",
	"munderover",
	"semantics"
]);
var Namespaces = {
	svg: "http://www.w3.org/2000/svg",
	mathml: "http://www.w3.org/1998/Math/MathML",
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace"
};
var transparentOptions = {
	transparent: true,
	sync: true
};
var syncOptions = { sync: true };
function effect(fn, effectFn, options) {
	createRenderEffect(fn, effectFn, options ? {
		sync: true,
		...options,
		transparent: !options.scope
	} : transparentOptions);
}
function memo(fn) {
	return createMemo(() => fn(), syncOptions);
}
function reconcileArrays(parentNode, a, b, marker) {
	let bLength = b.length, aEnd = a.length, bEnd = bLength, aStart = 0, bStart = 0, tail = a[aEnd - 1], tailTag = tail[$$SLOT], after = tail.parentNode === parentNode && (!tailTag || tailTag === marker) ? tail.nextSibling : marker || null, map = null, anchor, anchorTag;
	const isLive = (n) => {
		if (!n) return false;
		const tag = n[$$SLOT];
		return n.parentNode === parentNode && (!tag || tag === marker);
	};
	while (aStart < aEnd || bStart < bEnd) {
		if (a[aStart] === b[bStart] && isLive(a[aStart])) {
			aStart++;
			bStart++;
			continue;
		}
		while (a[aEnd - 1] === b[bEnd - 1] && isLive(a[aEnd - 1])) {
			aEnd--;
			bEnd--;
		}
		if (aEnd === aStart) {
			let node;
			if (bEnd < bLength) {
				if (bStart) {
					const prev = b[bStart - 1];
					const prevTag = prev[$$SLOT];
					node = prev.parentNode === parentNode && (!prevTag || prevTag === marker) ? prev.nextSibling : after;
				} else node = b[bEnd - bStart];
			} else node = after;
			while (bStart < bEnd) {
				const n = b[bStart++];
				parentNode.insertBefore(n, node);
				if (marker) n[$$SLOT] = marker;
			}
		} else if (bEnd === bStart) while (aStart < aEnd) {
			const n = a[aStart++];
			if (!map || !map.has(n)) {
				const tag = n[$$SLOT];
				if (n.parentNode === parentNode && (!tag || tag === marker)) n.remove();
			}
		}
		else if ((anchor = a[aStart]) === b[bEnd - 1] && b[bStart] === a[aEnd - 1] && anchor.parentNode === parentNode && (!(anchorTag = anchor[$$SLOT]) || anchorTag === marker)) {
			if (marker) do {
				const n = a[--aEnd];
				parentNode.insertBefore(n, anchor);
				n[$$SLOT] = marker;
				bStart++;
				if (aStart >= aEnd - 1 || bStart >= bEnd) break;
			} while (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]);
			else do {
				parentNode.insertBefore(a[--aEnd], anchor);
				bStart++;
				if (aStart >= aEnd - 1 || bStart >= bEnd) break;
			} while (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]);
		} else {
			if (!map) {
				map = /* @__PURE__ */ new Map();
				let i = bStart;
				while (i < bEnd) map.set(b[i], i++);
			}
			const index = map.get(a[aStart]);
			if (index != null) {
				if (bStart < index && index < bEnd) {
					let i = aStart, sequence = 1, t;
					while (++i < aEnd && i < bEnd) {
						if ((t = map.get(a[i])) == null || t !== index + sequence) break;
						sequence++;
					}
					if (sequence > index - bStart) {
						const head = a[aStart];
						const headTag = head[$$SLOT];
						const node = head.parentNode === parentNode && (!headTag || headTag === marker) ? head : after;
						while (bStart < index) {
							const n = b[bStart++];
							parentNode.insertBefore(n, node);
							if (marker) n[$$SLOT] = marker;
						}
					} else {
						const oldNode = a[aStart++];
						const newNode = b[bStart++];
						const oldTag = oldNode[$$SLOT];
						if (oldNode.parentNode === parentNode && (!oldTag || oldTag === marker)) parentNode.replaceChild(newNode, oldNode);
						else parentNode.insertBefore(newNode, after);
						if (marker) newNode[$$SLOT] = marker;
					}
				} else aStart++;
			} else {
				const n = a[aStart++];
				const nTag = n[$$SLOT];
				if (n.parentNode === parentNode && (!nTag || nTag === marker)) n.remove();
			}
		}
	}
}
var FLASH_COOKIE = "flash";
var FLASH_MATCHER = new RegExp(`(?:^|;\\s*)${FLASH_COOKIE}=([^;]+)`);
var listDriver;
var $$EVENT_OWNER = "_$SOLID_EVENT_OWNER";
var INNER_OWNED = {};
var delegatedEvents = /* @__PURE__ */ new Set();
var delegatedContainers = /* @__PURE__ */ new Map();
function render(code, element, init, options = {}) {
	let disposer;
	registerDelegatedRoot(element);
	try {
		createRoot((dispose) => {
			disposer = dispose;
			if (element === document) {
				const tree = code();
				effect(() => flatten(tree), () => {});
			} else {
				const tree = code();
				insert(element, () => tree, element.firstChild ? null : void 0, init, {
					...options.insertOptions,
					schedule: true
				});
			}
		}, { id: options.renderId });
		flush();
	} catch (err) {
		if (disposer) disposer();
		unregisterDelegatedRoot(element);
		throw err;
	}
	return () => {
		disposer();
		unregisterDelegatedRoot(element);
		element.textContent = "";
	};
}
function create(html, bypassGuard, flag) {
	const t = document.createElement("template");
	t.innerHTML = html;
	return flag === 2 ? t.content.firstChild.firstChild : t.content.firstChild;
}
function template(html, flag) {
	let node;
	return flag === 1 ? (bypassGuard) => document.importNode(node || (node = create(html, bypassGuard, flag)), true) : (bypassGuard) => (node || (node = create(html, bypassGuard, flag))).cloneNode(true);
}
function delegateEvents(eventNames) {
	for (let i = 0, l = eventNames.length; i < l; i++) {
		const name = eventNames[i];
		if (!delegatedEvents.has(name)) {
			delegatedEvents.add(name);
			delegatedContainers.forEach((state, container) => attachDelegatedEvent(name, container, state));
		}
	}
}
function registerDelegatedRoot(root) {
	const state = registerDelegatedContainer(root, root);
	if (state) state.roots = (state.roots || 0) + 1;
}
function unregisterDelegatedRoot(root) {
	const state = delegatedContainers.get(root);
	if (state) state.roots > 1 ? state.roots-- : delete state.roots;
	unregisterDelegatedContainer(root, root);
}
function registerDelegatedContainer(container, owner = container) {
	if (!container || !owner) return;
	let state = delegatedContainers.get(container);
	if (!state) delegatedContainers.set(container, state = {
		owners: /* @__PURE__ */ new Map(),
		handlers: /* @__PURE__ */ new Map()
	});
	state.owners.set(owner, (state.owners.get(owner) || 0) + 1);
	delegatedEvents.forEach((name) => attachDelegatedEvent(name, container, state));
	return state;
}
function unregisterDelegatedContainer(container, owner = container) {
	const state = delegatedContainers.get(container);
	if (!state) return;
	const count = state.owners.get(owner);
	if (count > 1) state.owners.set(owner, count - 1);
	else state.owners.delete(owner);
	if (state.owners.size) return;
	state.handlers.forEach((handler, name) => container.removeEventListener(name, handler));
	delegatedContainers.delete(container);
}
function attachDelegatedEvent(name, container, state) {
	if (state.handlers.has(name)) return;
	const handler = (e) => eventHandler(e, container, state);
	state.handlers.set(name, handler);
	container.addEventListener(name, handler);
}
function findOwner(target, state) {
	let node = target;
	let distance = 0;
	while (node) {
		if (state.owners.has(node)) return {
			owner: node,
			distance
		};
		distance++;
		node = node._$host || node.parentNode || node.host;
	}
}
var claimHandlers = null;
function claimElement(node) {
	if (claimHandlers !== null) for (let i = 0; i < claimHandlers.length; i++) claimHandlers[i](node);
	return node;
}
function setAttribute(node, name, value) {
	if (isHydrating(node)) return;
	if (value == null || value === false) node.removeAttribute(name);
	else node.setAttribute(name, value === true ? "" : value);
	if (claimHandlers !== null && (name === "href" || name === "action")) claimElement(node);
}
function setAttributeNS(node, namespace, name, value) {
	if (isHydrating(node)) return;
	if (value == null || value === false) node.removeAttributeNS(namespace, name.indexOf(":") > -1 ? name.split(":").pop() : name);
	else node.setAttributeNS(namespace, name, value === true ? "" : value);
}
function className(node, value, prev) {
	if (isHydrating(node)) return;
	if (value == null || value === false) {
		prev && node.removeAttribute("class");
		return;
	}
	if (typeof value === "string") {
		value !== prev && node.setAttribute("class", value);
		return;
	}
	if (typeof prev === "string") {
		prev = {};
		node.removeAttribute("class");
	} else prev = classListToObject(prev || {});
	value = classListToObject(value);
	const classKeys = Object.keys(value || {});
	const prevKeys = Object.keys(prev);
	let i, len;
	for (i = 0, len = prevKeys.length; i < len; i++) {
		const key = prevKeys[i];
		if (!key || key === "undefined" || value[key]) continue;
		node.classList.remove(key);
	}
	for (i = 0, len = classKeys.length; i < len; i++) {
		const key = classKeys[i], classValue = !!value[key];
		if (!key || key === "undefined" || prev[key] === classValue || !classValue) continue;
		node.classList.add(key);
	}
}
function addEvent(node, name, handler, delegate) {
	if (delegate) {
		if (Array.isArray(handler)) {
			node[`$$${name}`] = handler[0];
			node[`$$${name}Data`] = handler[1];
		} else node[`$$${name}`] = handler;
	} else if (Array.isArray(handler)) {
		const handlerFn = handler[0];
		node.addEventListener(name, handler[0] = (e) => handlerFn.call(node, handler[1], e));
	} else node.addEventListener(name, handler, typeof handler !== "function" && handler);
}
function style(node, value, prev) {
	if (!value) {
		if (prev || node._$styles) {
			setAttribute(node, "style");
			node._$styles = void 0;
		}
		return;
	}
	const nodeStyle = node.style;
	if (typeof value === "string") {
		node._$styles = void 0;
		return nodeStyle.cssText = value;
	}
	if (typeof prev === "string") {
		nodeStyle.cssText = "";
		prev = void 0;
	}
	let applied = node._$styles;
	if (!applied) applied = node._$styles = prev ? { ...prev } : {};
	let v, s;
	for (s in applied) if (value[s] == null) {
		nodeStyle.removeProperty(s);
		delete applied[s];
	}
	for (s in value) {
		v = value[s];
		if (v != null && v !== applied[s]) {
			nodeStyle.setProperty(s, v);
			applied[s] = v;
		}
	}
}
function spread(node, props = {}, skipChildren) {
	const prevProps = {};
	if (!skipChildren) insert(node, () => props.children);
	effect(() => {
		const r = props.ref;
		(typeof r === "function" || Array.isArray(r)) && ref(() => r, node);
	}, () => {});
	effect(() => {
		const newProps = {};
		for (const prop in props) {
			if (prop === "children" || prop === "ref") continue;
			newProps[prop] = props[prop];
		}
		return newProps;
	}, (props) => assign(node, props, true, prevProps, true));
	return prevProps;
}
function applyRef(r, element) {
	Array.isArray(r) ? r.flat(Infinity).forEach((f) => f && f(element)) : r(element);
}
function ref(fn, element) {
	const resolved = untrack(fn);
	runWithOwner(null, () => applyRef(resolved, element));
}
var SCOPE_OPTIONS = { scope: true };
var hydrationRt = null;
function insert(parent, accessor, marker, initial, options) {
	const multi = marker !== void 0;
	const host = options && options.host;
	if (multi && !initial) initial = [];
	if (hydrationRt !== null) initial = hydrationRt.claimInitial(parent, multi, initial);
	if (listDriver !== void 0 && typeof accessor === "function" && accessor.$ll !== void 0) {
		const listAccessor = accessor;
		const owner = getOwner();
		if (listDriver(parent, accessor, marker, () => runWithOwner(owner, () => insert(parent, () => listAccessor(), marker, marker !== void 0 ? [] : void 0, options)))) return;
	}
	if (typeof accessor !== "function") {
		accessor = normalize(accessor, initial, multi, true);
		if (typeof accessor !== "function") {
			insertExpression(parent, accessor, initial, marker);
			host && tagHost(accessor, host);
			return;
		}
	}
	if (multi && initial.length === 0) {
		const placeholder = document.createTextNode("");
		parent.insertBefore(placeholder, marker);
		initial = [placeholder];
	}
	let current = initial;
	effect((prev) => {
		if (hydrationRt !== null) current = hydrationRt.reclaimRegion(current, parent, marker);
		const value = normalize(accessor(), current, multi, true);
		if (typeof value !== "function") return value;
		effect(() => (hydrationRt !== null && (current = hydrationRt.reclaimRegion(current, parent, marker)), normalize(value, current, multi)), (inner) => {
			current = insertExpression(parent, inner, current, marker);
			host && tagHost(current, host);
		}, prev !== void 0 && !(options && options.schedule) ? {
			...options,
			schedule: true
		} : options);
		return INNER_OWNED;
	}, (value) => {
		if (value === INNER_OWNED) return;
		current = insertExpression(parent, value, current, marker);
		host && tagHost(current, host);
	}, accessor.$s ? options ? {
		...options,
		scope: true
	} : SCOPE_OPTIONS : options);
}
function assign(node, props, skipChildren, prevProps = {}, skipRef = false) {
	const nodeName = node.nodeName;
	props || (props = {});
	for (const prop in prevProps) if (!(prop in props)) {
		if (prop === "children") continue;
		prevProps[prop] = assignProp(node, prop, null, prevProps[prop], skipRef, nodeName);
	}
	for (const prop in props) {
		if (prop === "children") {
			if (!skipChildren) insertExpression(node, normalize(props.children, void 0, false));
			continue;
		}
		prevProps[prop] = assignProp(node, prop, props[prop], prevProps[prop], skipRef, nodeName);
	}
}
function getNextElement(template) {
	let node, key;
	if (!isHydrating() || !(node = sharedConfig.registry.get(key = getHydrationKey()))) {
		if (!template) throw new Error(`Hydration Mismatch. Unable to find DOM nodes for hydration key: ${key}`);
		return template(true);
	}
	if (sharedConfig.completed) sharedConfig.completed.add(node);
	sharedConfig.registry.delete(key);
	return node;
}
function isHydrating(node) {
	if (!sharedConfig.hydrating) return false;
	if (!node || node.isConnected) return true;
	const roots = sharedConfig.claimRoots;
	if (roots) {
		for (let i = 0; i < roots.length; i++) if (roots[i].contains(node)) return true;
	}
	return false;
}
function classListToObject(classList) {
	if (Array.isArray(classList)) {
		const result = {};
		flattenClassList(classList, result);
		classList = result;
	}
	if (classList && typeof classList === "object") {
		const result = {}, keys = Object.keys(classList);
		for (let i = 0, len = keys.length; i < len; i++) {
			const key = keys[i];
			if (!classList[key]) continue;
			const classNames = key.trim().split(/\s+/);
			for (let j = 0, nameLen = classNames.length; j < nameLen; j++) classNames[j] && (result[classNames[j]] = true);
		}
		return result;
	}
	return classList;
}
function flattenClassList(list, result) {
	for (let i = 0, len = list.length; i < len; i++) {
		const item = list[i];
		if (Array.isArray(item)) flattenClassList(item, result);
		else if (typeof item === "object" && item != null) Object.assign(result, item);
		else if (item || item === 0) result[item] = true;
	}
}
function assignProp(node, prop, value, prev, skipRef, nodeName) {
	if (prop === "style") return style(node, value, prev), value;
	if (prop === "class") return className(node, value, prev), value;
	if (value === prev && DOMWithState[nodeName]?.[prop] !== 1) return prev;
	if (prop === "ref") {
		if (!skipRef && value) ref(() => value, node);
		return value;
	}
	const hasNamespace = prop.indexOf(":") > -1;
	if (!hasNamespace && prop.slice(0, 2) === "on") {
		const name = prop.slice(2).toLowerCase();
		const delegate = DelegatedEvents.has(name);
		if (!delegate && prev) {
			const h = Array.isArray(prev) ? prev[0] : prev;
			node.removeEventListener(name, h);
		}
		if (delegate || value) {
			addEvent(node, name, value, delegate);
			delegate && delegateEvents([name]);
		}
	} else if (hasNamespace && prop.slice(0, 5) === "prop:" || ChildProperties.has(prop) || DOMWithState[nodeName]?.[prop]) {
		if (hasNamespace) prop = prop.slice(5);
		else if (isHydrating(node)) return value;
		if (prop === "value" && nodeName === "SELECT") queueMicrotask(() => node.value = value) || (node.value = value);
		else if ((prop === "value" || prop === "defaultValue") && (nodeName === "INPUT" || nodeName === "TEXTAREA")) node[prop] = value ?? "";
		else node[prop] = value;
	} else {
		const ns = hasNamespace && Namespaces[prop.split(":")[0]];
		if (ns) setAttributeNS(node, ns, prop, value);
		else setAttribute(node, prop, value);
	}
	return value;
}
function eventHandler(e, container, state) {
	if (hydrationRt !== null && hydrationRt.dedupEvent(e)) return;
	const prev = e[$$EVENT_OWNER];
	let resumeNode;
	if (prev) {
		if (prev === true || prev === container || !container.contains(prev)) return;
		resumeNode = prev;
	}
	const owner = state && (state.owners.size === 1 && state.owners.has(container) ? container : findOwner(e.target, state)?.owner);
	if (state && !owner) return;
	if (owner && owner === resumeNode) return;
	e[$$EVENT_OWNER] = owner || true;
	let node = resumeNode || e.target;
	const key = `$$${e.type}`;
	const oriTarget = e.target;
	const boundary = owner || container || e.currentTarget;
	const retarget = (value) => Object.defineProperty(e, "target", {
		configurable: true,
		value
	});
	const handleNode = () => {
		let handler = node[key];
		if (handler === void 0 && node.hasAttribute && node.hasAttribute("_bnd")) {
			const seam = globalThis[Symbol.for("solid.bnd")];
			if (seam) handler = seam.resolve(node, e.type);
		}
		if (handler && !node.disabled) {
			const data = node[`${key}Data`];
			data !== void 0 ? handler.call(node, data, e) : handler.call(node, e);
			if (e.cancelBubble) return;
		}
		node.host && typeof node.host !== "string" && !node.host._$host && node.contains(e.target) && retarget(node.host);
		return true;
	};
	const walkUpTree = () => {
		while (node && handleNode()) {
			if (node === boundary || node.parentNode === boundary) break;
			node = node._$host || node.parentNode || node.host;
		}
	};
	Object.defineProperty(e, "currentTarget", {
		configurable: true,
		get() {
			return node || boundary || document;
		}
	});
	if (resumeNode) {
		if (resumeNode === e.target) node = resumeNode._$host || resumeNode.parentNode || resumeNode.host;
		if (node && node !== boundary) walkUpTree();
	} else if (e.composedPath) {
		const path = e.composedPath();
		if (path.length) {
			retarget(path[0]);
			for (let i = 0; i < path.length; i++) {
				node = path[i];
				if (!handleNode()) break;
				if (node._$host) {
					node = node._$host;
					walkUpTree();
					break;
				}
				if (node === boundary || node.parentNode === boundary) break;
			}
		} else walkUpTree();
	} else walkUpTree();
	retarget(oriTarget);
}
function insertExpression(parent, value, current, marker) {
	if (hydrationRt !== null && isHydrating(parent)) {
		if (value && value !== current) {
			const arr = Array.isArray(value);
			for (const n of arr ? value : [value]) if (n && n.nodeType) {
				if (!isHydrating(n)) return current;
			} else if (arr && (typeof n === "string" || typeof n === "number")) return current;
		}
		return value;
	}
	if (value === current) return value;
	const t = typeof value, multi = marker !== void 0;
	if (t === "string" || t === "number") {
		const tc = typeof current;
		if (tc === "string" || tc === "number") parent.firstChild.data = value;
		else if (ownsAllChildren(parent, current)) parent.textContent = value;
		else {
			removeOwnedChildren(parent, current);
			parent.insertBefore(document.createTextNode(value), parent.firstChild);
		}
	} else if (value === void 0) cleanChildren(parent, current, marker);
	else if (value.nodeType) {
		if (Array.isArray(current)) cleanChildren(parent, current, multi ? marker : null, value);
		else if (current && current.nodeType) current.parentNode === parent ? parent.replaceChild(value, current) : parent.appendChild(value);
		else if (current && parent.firstChild) parent.replaceChild(value, parent.firstChild);
		else parent.appendChild(value);
		if (marker) value[$$SLOT] = marker;
	} else if (Array.isArray(value)) {
		const currentArray = current && Array.isArray(current);
		for (let i = 0, len = value.length; i < len; i++) {
			const item = value[i], t = typeof item;
			if (t === "string" || t === "number") {
				const prev = currentArray ? current[i] : void 0;
				if (prev && prev.nodeType === 3) {
					if (prev.data !== "" + item) prev.data = item;
					value[i] = prev;
				} else value[i] = document.createTextNode(item);
			}
		}
		if (value.length === 0) cleanChildren(parent, current, marker);
		else if (currentArray) {
			if (current.length === 0) appendNodes(parent, value, marker);
			else reconcileArrays(parent, current, value, marker);
		} else {
			current && cleanChildren(parent, current);
			appendNodes(parent, value);
		}
	}
	return value;
}
function normalize(value, current, multi, doNotUnwrap) {
	value = flatten(value, {
		skipNonRendered: true,
		doNotUnwrap
	});
	if (doNotUnwrap && typeof value === "function") return value;
	if (multi && !Array.isArray(value)) value = [value != null ? value : ""];
	if (sharedConfig.hydrating && Array.isArray(value)) for (let i = 0, len = value.length; i < len; i++) {
		const item = value[i], prev = current && current[i], t = typeof item;
		if ((t === "string" || t === "number") && prev && prev.nodeType === 3) value[i] = prev;
	}
	return value;
}
function tagHost(value, host) {
	if (Array.isArray(value)) for (let i = 0, len = value.length; i < len; i++) tagHost(value[i], host);
	else if (value && value.nodeType && value[$$HOST] !== host) {
		value[$$HOST] = host;
		Object.defineProperty(value, "_$host", {
			get: host,
			configurable: true
		});
	}
}
function appendNodes(parent, array, marker = null) {
	for (let i = 0, len = array.length; i < len; i++) {
		const n = array[i];
		parent.insertBefore(n, marker);
		if (marker) n[$$SLOT] = marker;
	}
}
function ownsAllChildren(parent, current) {
	if (current == null) return true;
	if (Array.isArray(current)) return current.length ? parent.firstChild === current[0] && parent.lastChild === current[current.length - 1] : parent.firstChild === null;
	if (current === "") return parent.firstChild === null;
	if (current.nodeType) return parent.firstChild === current && parent.lastChild === current;
	const first = parent.firstChild;
	return first !== null && first.nodeType === 3 && parent.lastChild === first;
}
function removeOwnedChildren(parent, current) {
	if (Array.isArray(current)) for (let i = 0; i < current.length; i++) {
		const el = current[i];
		if (el.parentNode === parent) el.remove();
	}
	else if (current.nodeType) {
		if (current.parentNode === parent) current.remove();
	} else {
		const first = parent.firstChild;
		if (first && first.nodeType === 3) first.remove();
	}
}
function cleanChildren(parent, current, marker, replacement) {
	if (marker === void 0) {
		if (ownsAllChildren(parent, current)) return parent.textContent = "";
		return removeOwnedChildren(parent, current);
	}
	if (current.length) {
		let inserted = false;
		for (let i = current.length - 1; i >= 0; i--) {
			const el = current[i];
			if (replacement !== el) {
				const tag = el[$$SLOT];
				const owns = el.parentNode === parent && (!tag || tag === marker);
				if (replacement && !inserted && !i) owns ? parent.replaceChild(replacement, el) : parent.insertBefore(replacement, marker);
				else if (owns) el.remove();
			} else inserted = true;
		}
	} else if (replacement) parent.insertBefore(replacement, marker);
	if (replacement && marker) replacement[$$SLOT] = marker;
}
function getHydrationKey() {
	return sharedConfig.getNextContextId();
}
var COMPONENT_BINDING = Symbol.for("solid.component-binding");
function bindingOf(value) {
	return value !== null && (typeof value === "function" || typeof value === "object") && value[COMPONENT_BINDING] || void 0;
}
function dynamic(source) {
	let latest = 0;
	const sites = /* @__PURE__ */ new Set();
	let deliveredAddress;
	const resolveBinding = (next, prev) => {
		const binding = bindingOf(next);
		if (!binding) return next;
		deliveredAddress = binding.address;
		const prevBinding = bindingOf(prev);
		if (prevBinding && prevBinding.component === binding.component) {
			for (const deliver of sites) deliver(binding.address);
			return prev;
		}
		return next;
	};
	const cached = createMemo((prev) => {
		const next = source();
		if (!next || typeof next.then !== "function") return resolveBinding(next, prev);
		const token = ++latest;
		return { then: (onFulfilled, onRejected) => next.then((resolved) => onFulfilled(token === latest ? resolveBinding(resolved, prev) : resolved), onRejected) };
	}, { lazy: true });
	return (props) => {
		return createMemo(() => {
			const component = cached();
			switch (typeof component) {
				case "function": {
					const binding = bindingOf(component);
					if (binding) {
						const [address, setAddress] = createSignal(deliveredAddress ?? binding.address);
						sites.add(setAddress);
						onCleanup(() => sites.delete(setAddress));
						return untrack(() => binding.component(props, address));
					}
					return untrack(() => component(props));
				}
				case "string":
					const el = sharedConfig.hydrating ? getNextElement() : createElement(component, untrack(() => props.is));
					spread(el, props);
					return el;
			}
		});
	};
}
function Dynamic(props) {
	const Comp = dynamic(() => props.component);
	return createComponent(Comp, omit(props, "component"));
}
function createElement(tagName, is = void 0) {
	return SVGElements.has(tagName) ? document.createElementNS(Namespaces.svg, tagName) : MathMLElements.has(tagName) ? document.createElementNS(Namespaces.mathml, tagName) : document.createElement(tagName, { is });
}

//#endregion
export { createMemo as C, useContext as E, createEffect as S, sharedConfig as T, Show as _, effect as a, createComponent as b, ref as c, spread as d, template as f, Match as g, Loading as h, delegateEvents as i, render as l, For as m, addEvent as n, insert as o, Errored as p, claimElement as r, memo as s, Dynamic as t, setAttribute as u, Switch as v, createSignal as w, createContext as x, children as y };
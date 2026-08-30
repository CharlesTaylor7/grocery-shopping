import { r as parseHref, t as createBrowserHistory } from "./history-Dlc5q7Fh.js";

//#region node_modules/.pnpm/@tanstack+router-core@1.171.22/node_modules/@tanstack/router-core/dist/esm/utils.js
function last(arr) {
	return arr[arr.length - 1];
}
function isFunction(d) {
	return typeof d === "function";
}
function functionalUpdate(updater, previous) {
	if (isFunction(updater)) return updater(previous);
	return updater;
}
var hasOwn = Object.prototype.hasOwnProperty;
var isEnumerable = Object.prototype.propertyIsEnumerable;
function hasKeys(obj) {
	for (const key in obj) if (hasOwn.call(obj, key)) return true;
	return false;
}
var createNull = () => Object.create(null);
var nullReplaceEqualDeep = (prev, next) => replaceEqualDeep(prev, next, createNull);
function replaceEqualDeep(prev, _next, _makeObj = () => ({}), _depth = 0) {
	if (false) return _next;
	if (prev === _next) return prev;
	if (_depth > 500) return _next;
	const next = _next;
	const array = isPlainArray(prev) && isPlainArray(next);
	if (!array && !(isPlainObject(prev) && isPlainObject(next))) return next;
	const prevItems = array ? prev : getEnumerableOwnKeys(prev);
	if (!prevItems) return next;
	const nextItems = array ? next : getEnumerableOwnKeys(next);
	if (!nextItems) return next;
	const prevSize = prevItems.length;
	const nextSize = nextItems.length;
	const copy = array ? new Array(nextSize) : _makeObj();
	let equalItems = 0;
	for (let i = 0; i < nextSize; i++) {
		const key = array ? i : nextItems[i];
		const p = prev[key];
		const n = next[key];
		if (p === n) {
			copy[key] = p;
			if (array ? i < prevSize : hasOwn.call(prev, key)) equalItems++;
			continue;
		}
		if (p === null || n === null || typeof p !== "object" || typeof n !== "object") {
			copy[key] = n;
			continue;
		}
		const v = replaceEqualDeep(p, n, _makeObj, _depth + 1);
		copy[key] = v;
		if (v === p) equalItems++;
	}
	return prevSize === nextSize && equalItems === prevSize ? prev : copy;
}
function getEnumerableOwnKeys(o) {
	const keys = Object.keys(o);
	if (keys.length !== Object.getOwnPropertyNames(o).length) return false;
	const symbols = Object.getOwnPropertySymbols(o);
	if (symbols.length === 0) return keys;
	for (const symbol of symbols) {
		if (!isEnumerable.call(o, symbol)) return false;
		keys.push(symbol);
	}
	return keys;
}
function isPlainObject(o) {
	if (!hasObjectPrototype(o)) return false;
	const ctor = o.constructor;
	if (typeof ctor === "undefined") return true;
	const prot = ctor.prototype;
	if (!hasObjectPrototype(prot)) return false;
	if (!prot.hasOwnProperty("isPrototypeOf")) return false;
	return true;
}
function hasObjectPrototype(o) {
	return Object.prototype.toString.call(o) === "[object Object]";
}
function isPlainArray(value) {
	return Array.isArray(value) && value.length === Object.keys(value).length;
}
function deepEqual(a, b, opts) {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;
		for (let i = 0, l = a.length; i < l; i++) if (!deepEqual(a[i], b[i], opts)) return false;
		return true;
	}
	if (isPlainObject(a) && isPlainObject(b)) {
		const ignoreUndefined = opts?.ignoreUndefined ?? true;
		if (opts?.partial) {
			for (const k in b) if (!ignoreUndefined || b[k] !== void 0) {
				if (!deepEqual(a[k], b[k], opts)) return false;
			}
			return true;
		}
		let aCount = 0;
		if (!ignoreUndefined) aCount = Object.keys(a).length;
		else for (const k in a) if (a[k] !== void 0) aCount++;
		let bCount = 0;
		for (const k in b) if (!ignoreUndefined || b[k] !== void 0) {
			bCount++;
			if (bCount > aCount || !deepEqual(a[k], b[k], opts)) return false;
		}
		return aCount === bCount;
	}
	return false;
}
var PATH_UNSAFE_RE = /[\x00-\x1f\x7f"<>`{}]/g;
function sanitizePathSegment(segment) {
	return segment.replace(PATH_UNSAFE_RE, (ch) => "%" + ch.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0"));
}
function decodeSegment(segment) {
	let decoded;
	try {
		decoded = decodeURI(segment);
	} catch {
		decoded = segment.replaceAll(/%[0-9A-F]{2}/gi, (match) => {
			try {
				return decodeURI(match);
			} catch {
				return match;
			}
		});
	}
	return sanitizePathSegment(decoded);
}
var DEFAULT_PROTOCOL_ALLOWLIST = [
	"http:",
	"https:",
	"mailto:",
	"tel:"
];
function isDangerousProtocol(url, allowlist) {
	if (!url) return false;
	try {
		const parsed = new URL(url);
		return !allowlist.has(parsed.protocol);
	} catch {
		return false;
	}
}
function decodePath(path) {
	if (!path) return {
		path,
		handledProtocolRelativeURL: false
	};
	if (!/[%\\\x00-\x1f\x7f]/.test(path) && !path.startsWith("//")) return {
		path,
		handledProtocolRelativeURL: false
	};
	const re = /%25|%5C/gi;
	let cursor = 0;
	let result = "";
	let match;
	while (null !== (match = re.exec(path))) {
		result += decodeSegment(path.slice(cursor, match.index)) + match[0];
		cursor = re.lastIndex;
	}
	result = result + decodeSegment(cursor ? path.slice(cursor) : path);
	let handledProtocolRelativeURL = false;
	if (result.startsWith("//")) {
		handledProtocolRelativeURL = true;
		result = "/" + result.replace(/^\/+/, "");
	}
	return {
		path: result,
		handledProtocolRelativeURL
	};
}
function encodePathLikeUrl(path) {
	if (!/\s|[^\u0000-\u007F]/.test(path)) return path;
	return path.replace(/\s|[^\u0000-\u007F]/gu, encodeURIComponent);
}
function arraysEqual(a, b) {
	if (a === b) return true;
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
	return true;
}

//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.171.22/node_modules/@tanstack/router-core/dist/esm/invariant.js
function invariant() {
	throw new Error("Invariant failed");
}

//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.171.22/node_modules/@tanstack/router-core/dist/esm/lru-cache.js
function createLRUCache(max) {
	const cache = /* @__PURE__ */ new Map();
	let oldest;
	let newest;
	const touch = (entry) => {
		if (!entry.next) return;
		if (!entry.prev) {
			entry.next.prev = void 0;
			oldest = entry.next;
			entry.next = void 0;
			if (newest) {
				entry.prev = newest;
				newest.next = entry;
			}
		} else {
			entry.prev.next = entry.next;
			entry.next.prev = entry.prev;
			entry.next = void 0;
			if (newest) {
				newest.next = entry;
				entry.prev = newest;
			}
		}
		newest = entry;
	};
	return {
		get(key) {
			const entry = cache.get(key);
			if (!entry) return void 0;
			touch(entry);
			return entry.value;
		},
		set(key, value) {
			if (cache.size >= max && oldest) {
				const toDelete = oldest;
				cache.delete(toDelete.key);
				if (toDelete.next) {
					oldest = toDelete.next;
					toDelete.next.prev = void 0;
				}
				if (toDelete === newest) newest = void 0;
			}
			const existing = cache.get(key);
			if (existing) {
				existing.value = value;
				touch(existing);
			} else {
				const entry = {
					key,
					value,
					prev: newest
				};
				if (newest) newest.next = entry;
				newest = entry;
				if (!oldest) oldest = entry;
				cache.set(key, entry);
			}
		},
		clear() {
			cache.clear();
			oldest = void 0;
			newest = void 0;
		}
	};
}

//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.171.22/node_modules/@tanstack/router-core/dist/esm/new-process-route-tree.js
var SEGMENT_TYPE_INDEX = 4;
var SEGMENT_TYPE_PATHLESS = 5;
function getOpenAndCloseBraces(part) {
	const openBrace = part.indexOf("{");
	if (openBrace === -1) return null;
	const closeBrace = part.indexOf("}", openBrace);
	if (closeBrace === -1) return null;
	if (openBrace + 1 >= part.length) return null;
	return [openBrace, closeBrace];
}
function parseSegment(path, start, output = /* @__PURE__ */ new Uint16Array(6)) {
	const next = path.indexOf("/", start);
	const end = next === -1 ? path.length : next;
	const part = path.substring(start, end);
	if (!part || !part.includes("$")) {
		output[0] = 0;
		output[1] = start;
		output[2] = start;
		output[3] = end;
		output[4] = end;
		output[5] = end;
		return output;
	}
	if (part === "$") {
		const total = path.length;
		output[0] = 2;
		output[1] = start;
		output[2] = start;
		output[3] = total;
		output[4] = total;
		output[5] = total;
		return output;
	}
	if (part.charCodeAt(0) === 36) {
		output[0] = 1;
		output[1] = start;
		output[2] = start + 1;
		output[3] = end;
		output[4] = end;
		output[5] = end;
		return output;
	}
	const braces = getOpenAndCloseBraces(part);
	if (braces) {
		const [openBrace, closeBrace] = braces;
		const firstChar = part.charCodeAt(openBrace + 1);
		if (firstChar === 45) {
			if (openBrace + 2 < part.length && part.charCodeAt(openBrace + 2) === 36) {
				const paramStart = openBrace + 3;
				const paramEnd = closeBrace;
				if (paramStart < paramEnd) {
					output[0] = 3;
					output[1] = start + openBrace;
					output[2] = start + paramStart;
					output[3] = start + paramEnd;
					output[4] = start + closeBrace + 1;
					output[5] = end;
					return output;
				}
			}
		} else if (firstChar === 36) {
			const dollarPos = openBrace + 1;
			const afterDollar = openBrace + 2;
			if (afterDollar === closeBrace) {
				output[0] = 2;
				output[1] = start + openBrace;
				output[2] = start + dollarPos;
				output[3] = start + afterDollar;
				output[4] = start + closeBrace + 1;
				output[5] = path.length;
				return output;
			}
			output[0] = 1;
			output[1] = start + openBrace;
			output[2] = start + afterDollar;
			output[3] = start + closeBrace;
			output[4] = start + closeBrace + 1;
			output[5] = end;
			return output;
		}
	}
	output[0] = 0;
	output[1] = start;
	output[2] = start;
	output[3] = end;
	output[4] = end;
	output[5] = end;
	return output;
}
function parseSegments(defaultCaseSensitive, data, route, start, node, depth, dynamicListsToSort, onRoute) {
	onRoute?.(route);
	let cursor = start;
	{
		const path = route.fullPath ?? route.from;
		const options = route.options;
		const length = path.length;
		const caseSensitive = options?.caseSensitive ?? defaultCaseSensitive;
		const parseParams = options?.params?.parse ?? options?.parseParams;
		while (cursor < length) {
			const segment = parseSegment(path, cursor, data);
			let nextNode;
			const start = cursor;
			const end = segment[5];
			cursor = end + 1;
			depth++;
			const kind = segment[0];
			switch (kind) {
				case 0: {
					const value = path.substring(segment[2], segment[3]);
					let name = value;
					let staticChildren;
					if (caseSensitive) staticChildren = node.static ??= /* @__PURE__ */ new Map();
					else {
						name = value.toLowerCase();
						staticChildren = node.staticInsensitive ??= /* @__PURE__ */ new Map();
					}
					const existingNode = staticChildren.get(name);
					if (existingNode) nextNode = existingNode;
					else {
						const next = createStaticNode(path);
						next.parent = node;
						next.depth = depth;
						nextNode = next;
						staticChildren.set(name, next);
					}
					break;
				}
				case 1:
				case 3:
				case 2: {
					const prefix_raw = path.substring(start, segment[1]);
					const suffix_raw = path.substring(segment[4], end);
					const actuallyCaseSensitive = caseSensitive && !!(prefix_raw || suffix_raw);
					const prefix = !prefix_raw ? void 0 : actuallyCaseSensitive ? prefix_raw : prefix_raw.toLowerCase();
					const suffix = !suffix_raw ? void 0 : actuallyCaseSensitive ? suffix_raw : suffix_raw.toLowerCase();
					const siblings = kind === 1 ? node.dynamic : kind === 3 ? node.optional : node.wildcard;
					const existingNode = kind !== 2 && !parseParams && siblings?.find((s) => !s.parse && s.caseSensitive === actuallyCaseSensitive && s.prefix === prefix && s.suffix === suffix);
					if (existingNode) nextNode = existingNode;
					else {
						const next = createDynamicNode(kind, path, actuallyCaseSensitive, prefix, suffix);
						nextNode = next;
						next.parent = node;
						next.depth = depth;
						let nodes;
						if (kind === 1) nodes = node.dynamic ??= [];
						else if (kind === 3) nodes = node.optional ??= [];
						else nodes = node.wildcard ??= [];
						nodes.push(next);
						if (nodes.length === 2) dynamicListsToSort?.push(nodes);
					}
					break;
				}
			}
			node = nextNode;
		}
		if (parseParams && route.children && !route.isRoot && route.id && route.id.charCodeAt(route.id.lastIndexOf("/") + 1) === 95) {
			const pathlessNode = createStaticNode(path);
			pathlessNode.kind = SEGMENT_TYPE_PATHLESS;
			pathlessNode.parent = node;
			depth++;
			pathlessNode.depth = depth;
			node.pathless ??= [];
			node.pathless.push(pathlessNode);
			node = pathlessNode;
		}
		const isLeaf = (route.path || !route.children) && !route.isRoot;
		if (isLeaf && path.endsWith("/")) {
			const indexNode = createStaticNode(path);
			indexNode.kind = SEGMENT_TYPE_INDEX;
			indexNode.parent = node;
			depth++;
			indexNode.depth = depth;
			node.index = indexNode;
			node = indexNode;
		}
		node.parse = parseParams ?? null;
		node.priority = options?.params?.priority ?? 0;
		if (isLeaf && !node.route) {
			node.route = route;
			node.fullPath = path;
		}
	}
	if (route.children) for (const child of route.children) parseSegments(defaultCaseSensitive, data, child, cursor, node, depth, dynamicListsToSort, onRoute);
}
function sortDynamic(a, b) {
	if (a.parse && !b.parse) return -1;
	if (!a.parse && b.parse) return 1;
	if (a.parse && b.parse && (a.priority || b.priority)) return b.priority - a.priority;
	if (a.prefix && b.prefix && a.prefix !== b.prefix) {
		if (a.prefix.startsWith(b.prefix)) return -1;
		if (b.prefix.startsWith(a.prefix)) return 1;
	}
	if (a.suffix && b.suffix && a.suffix !== b.suffix) {
		if (a.suffix.endsWith(b.suffix)) return -1;
		if (b.suffix.endsWith(a.suffix)) return 1;
	}
	if (a.prefix && !b.prefix) return -1;
	if (!a.prefix && b.prefix) return 1;
	if (a.suffix && !b.suffix) return -1;
	if (!a.suffix && b.suffix) return 1;
	if (a.caseSensitive && !b.caseSensitive) return -1;
	if (!a.caseSensitive && b.caseSensitive) return 1;
	return 0;
}
function createStaticNode(fullPath) {
	return {
		kind: 0,
		depth: 0,
		pathless: null,
		index: null,
		static: null,
		staticInsensitive: null,
		dynamic: null,
		optional: null,
		wildcard: null,
		route: null,
		fullPath,
		parent: null,
		parse: null,
		priority: 0
	};
}
function createDynamicNode(kind, fullPath, caseSensitive, prefix, suffix) {
	return {
		kind,
		depth: 0,
		pathless: null,
		index: null,
		static: null,
		staticInsensitive: null,
		dynamic: null,
		optional: null,
		wildcard: null,
		route: null,
		fullPath,
		parent: null,
		parse: null,
		priority: 0,
		caseSensitive,
		prefix,
		suffix
	};
}
function processRouteMasks(routeList, processedTree) {
	const segmentTree = createStaticNode("/");
	const data = /* @__PURE__ */ new Uint16Array(6);
	const dynamicListsToSort = [];
	for (const route of routeList) parseSegments(false, data, route, 1, segmentTree, 0, dynamicListsToSort);
	for (const nodes of dynamicListsToSort) nodes.sort(sortDynamic);
	processedTree.masksTree = segmentTree;
	processedTree.flatCache = createLRUCache(1e3);
}
function findFlatMatch(path, processedTree) {
	path ||= "/";
	const cached = processedTree.flatCache.get(path);
	if (cached) return cached;
	const result = findMatch(path, processedTree.masksTree);
	processedTree.flatCache.set(path, result);
	return result;
}
function findSingleMatch(from, caseSensitive, fuzzy, path, processedTree) {
	from ||= "/";
	path ||= "/";
	const key = caseSensitive ? `case\0${from}` : from;
	let tree = processedTree.singleCache.get(key);
	if (!tree) {
		tree = createStaticNode("/");
		parseSegments(caseSensitive, /* @__PURE__ */ new Uint16Array(6), { from }, 1, tree, 0);
		processedTree.singleCache.set(key, tree);
	}
	return findMatch(path, tree, fuzzy);
}
function findRouteMatch(path, processedTree, fuzzy = false) {
	const key = fuzzy ? path : `nofuzz\0${path}`;
	const cached = processedTree.matchCache.get(key);
	if (cached !== void 0) return cached;
	path ||= "/";
	let result;
	try {
		result = findMatch(path, processedTree.segmentTree, fuzzy);
	} catch (err) {
		if (err instanceof URIError) result = null;
		else throw err;
	}
	if (result) result.branch = buildRouteBranch(result.route);
	processedTree.matchCache.set(key, result);
	return result;
}
function trimPathRight$1(path) {
	return path === "/" ? path : path.replace(/\/{1,}$/, "");
}
function processRouteTree(routeTree, caseSensitive = false, initRoute) {
	const segmentTree = createStaticNode(routeTree.fullPath);
	const data = /* @__PURE__ */ new Uint16Array(6);
	const dynamicListsToSort = [];
	const routesById = {};
	const routesByPath = {};
	let index = 0;
	parseSegments(caseSensitive, data, routeTree, 1, segmentTree, 0, dynamicListsToSort, (route) => {
		initRoute?.(route, index);
		if (route.id in routesById) invariant();
		routesById[route.id] = route;
		if (index !== 0 && route.path) {
			const trimmedFullPath = trimPathRight$1(route.fullPath);
			if (!routesByPath[trimmedFullPath] || route.fullPath.endsWith("/")) routesByPath[trimmedFullPath] = route;
		}
		index++;
	});
	for (const nodes of dynamicListsToSort) nodes.sort(sortDynamic);
	return {
		processedTree: {
			segmentTree,
			singleCache: createLRUCache(1e3),
			matchCache: createLRUCache(1e3),
			flatCache: null,
			masksTree: null
		},
		routesById,
		routesByPath
	};
}
function findMatch(path, segmentTree, fuzzy = false) {
	const parts = path.split("/");
	const leaf = getNodeMatch(path, parts, segmentTree, fuzzy);
	if (!leaf) return null;
	const [rawParams] = extractParams(path, parts, leaf);
	return {
		route: leaf.node.route,
		rawParams
	};
}
function extractParams(path, parts, leaf) {
	const list = buildBranch(leaf.node);
	let nodeParts = null;
	const rawParams = Object.create(null);
	let partIndex = leaf.extract?.part ?? 0;
	let nodeIndex = leaf.extract?.node ?? 0;
	let pathIndex = leaf.extract?.path ?? 0;
	let segmentCount = leaf.extract?.segment ?? 0;
	for (; nodeIndex < list.length; partIndex++, nodeIndex++, pathIndex++, segmentCount++) {
		const node = list[nodeIndex];
		if (node.kind === SEGMENT_TYPE_INDEX) break;
		if (node.kind === SEGMENT_TYPE_PATHLESS) {
			segmentCount--;
			partIndex--;
			pathIndex--;
			continue;
		}
		const part = parts[partIndex];
		const currentPathIndex = pathIndex;
		if (part) pathIndex += part.length;
		if (node.kind === 1) {
			nodeParts ??= leaf.node.fullPath.split("/");
			const nodePart = nodeParts[segmentCount];
			const preLength = node.prefix?.length ?? 0;
			if (nodePart.charCodeAt(preLength) === 123) {
				const sufLength = node.suffix?.length ?? 0;
				const name = nodePart.substring(preLength + 2, nodePart.length - sufLength - 1);
				const value = part.substring(preLength, part.length - sufLength);
				rawParams[name] = decodeURIComponent(value);
			} else {
				const name = nodePart.substring(1);
				rawParams[name] = decodeURIComponent(part);
			}
		} else if (node.kind === 3) {
			if (leaf.skipped & 1 << nodeIndex) {
				partIndex--;
				pathIndex = currentPathIndex - 1;
				continue;
			}
			nodeParts ??= leaf.node.fullPath.split("/");
			const nodePart = nodeParts[segmentCount];
			const preLength = node.prefix?.length ?? 0;
			const sufLength = node.suffix?.length ?? 0;
			const name = nodePart.substring(preLength + 3, nodePart.length - sufLength - 1);
			const value = node.suffix || node.prefix ? part.substring(preLength, part.length - sufLength) : part;
			if (value) rawParams[name] = decodeURIComponent(value);
		} else if (node.kind === 2) {
			const n = node;
			const value = path.substring(currentPathIndex + (n.prefix?.length ?? 0), path.length - (n.suffix?.length ?? 0));
			const splat = decodeURIComponent(value);
			rawParams["*"] = splat;
			rawParams._splat = splat;
			break;
		}
	}
	if (leaf.rawParams) Object.assign(rawParams, leaf.rawParams);
	return [rawParams, {
		part: partIndex,
		node: nodeIndex,
		path: pathIndex,
		segment: segmentCount
	}];
}
function buildRouteBranch(route) {
	const list = [route];
	while (route.parentRoute) {
		route = route.parentRoute;
		list.push(route);
	}
	list.reverse();
	return list;
}
function buildBranch(node) {
	const list = Array(node.depth + 1);
	do {
		list[node.depth] = node;
		node = node.parent;
	} while (node);
	return list;
}
function getNodeMatch(path, parts, segmentTree, fuzzy) {
	if (path === "/" && segmentTree.index) return {
		node: segmentTree.index,
		skipped: 0
	};
	const trailingSlash = !last(parts);
	const pathIsIndex = trailingSlash && path !== "/";
	const partsLength = parts.length - (trailingSlash ? 1 : 0);
	const stack = [{
		node: segmentTree,
		index: 1,
		skipped: 0,
		statics: 0,
		dynamics: 0,
		optionals: 0
	}];
	let bestFuzzy = null;
	let bestMatch = null;
	while (stack.length) {
		const frame = stack.pop();
		const { node, index, skipped, statics, dynamics, optionals } = frame;
		let { extract, rawParams } = frame;
		if (node.kind === 2 && node.route && !isFrameMoreSpecific(bestMatch, frame)) continue;
		if (node.parse) {
			if (!validateParseParams(path, parts, frame)) continue;
			rawParams = frame.rawParams;
			extract = frame.extract;
		}
		if (fuzzy && node.route && node.kind !== SEGMENT_TYPE_INDEX && isFrameMoreSpecific(bestFuzzy, frame)) bestFuzzy = frame;
		const isBeyondPath = index === partsLength;
		if (isBeyondPath) {
			if (node.route && (!pathIsIndex || node.kind === SEGMENT_TYPE_INDEX || node.kind === 2) && isFrameMoreSpecific(bestMatch, frame)) bestMatch = frame;
			if (!node.optional && !node.wildcard && !node.index && !node.pathless) continue;
		}
		const part = isBeyondPath ? void 0 : parts[index];
		let lowerPart;
		if (isBeyondPath && node.index) {
			const indexFrame = {
				node: node.index,
				index,
				skipped,
				statics,
				dynamics,
				optionals,
				extract,
				rawParams
			};
			let indexValid = true;
			if (node.index.parse) {
				if (!validateParseParams(path, parts, indexFrame)) indexValid = false;
			}
			if (indexValid) {
				if (!dynamics && !optionals && !skipped && isPerfectStaticMatch(statics, partsLength)) return indexFrame;
				if (isFrameMoreSpecific(bestMatch, indexFrame)) bestMatch = indexFrame;
			}
		}
		if (node.wildcard) for (let i = node.wildcard.length - 1; i >= 0; i--) {
			const segment = node.wildcard[i];
			const { prefix, suffix } = segment;
			if (prefix) {
				if (isBeyondPath) continue;
				if (!(segment.caseSensitive ? part : lowerPart ??= part.toLowerCase()).startsWith(prefix)) continue;
			}
			if (suffix) {
				if (isBeyondPath) continue;
				const end = parts.slice(index).join("/").slice(-suffix.length);
				if ((segment.caseSensitive ? end : end.toLowerCase()) !== suffix) continue;
			}
			stack.push({
				node: segment,
				index: partsLength,
				skipped,
				statics,
				dynamics,
				optionals,
				extract,
				rawParams
			});
		}
		if (node.optional) {
			const nextSkipped = skipped | 1 << node.depth + 1;
			for (let i = node.optional.length - 1; i >= 0; i--) {
				const segment = node.optional[i];
				stack.push({
					node: segment,
					index,
					skipped: nextSkipped,
					statics,
					dynamics,
					optionals,
					extract,
					rawParams
				});
			}
			if (!isBeyondPath) for (let i = node.optional.length - 1; i >= 0; i--) {
				const segment = node.optional[i];
				const { prefix, suffix } = segment;
				if (prefix || suffix) {
					const casePart = segment.caseSensitive ? part : lowerPart ??= part.toLowerCase();
					if (prefix && !casePart.startsWith(prefix)) continue;
					if (suffix && !casePart.endsWith(suffix)) continue;
				}
				stack.push({
					node: segment,
					index: index + 1,
					skipped,
					statics,
					dynamics,
					optionals: optionals + segmentScore(partsLength, index),
					extract,
					rawParams
				});
			}
		}
		if (!isBeyondPath && node.dynamic && part) for (let i = node.dynamic.length - 1; i >= 0; i--) {
			const segment = node.dynamic[i];
			const { prefix, suffix } = segment;
			if (prefix || suffix) {
				const casePart = segment.caseSensitive ? part : lowerPart ??= part.toLowerCase();
				if (prefix && !casePart.startsWith(prefix)) continue;
				if (suffix && !casePart.endsWith(suffix)) continue;
			}
			stack.push({
				node: segment,
				index: index + 1,
				skipped,
				statics,
				dynamics: dynamics + segmentScore(partsLength, index),
				optionals,
				extract,
				rawParams
			});
		}
		if (!isBeyondPath && node.staticInsensitive) {
			const match = node.staticInsensitive.get(lowerPart ??= part.toLowerCase());
			if (match) stack.push({
				node: match,
				index: index + 1,
				skipped,
				statics: statics + segmentScore(partsLength, index),
				dynamics,
				optionals,
				extract,
				rawParams
			});
		}
		if (!isBeyondPath && node.static) {
			const match = node.static.get(part);
			if (match) stack.push({
				node: match,
				index: index + 1,
				skipped,
				statics: statics + segmentScore(partsLength, index),
				dynamics,
				optionals,
				extract,
				rawParams
			});
		}
		if (node.pathless) for (let i = node.pathless.length - 1; i >= 0; i--) {
			const segment = node.pathless[i];
			stack.push({
				node: segment,
				index,
				skipped,
				statics,
				dynamics,
				optionals,
				extract,
				rawParams
			});
		}
	}
	if (bestMatch) return bestMatch;
	if (fuzzy && bestFuzzy) {
		let sliceIndex = bestFuzzy.index;
		for (let i = 0; i < bestFuzzy.index; i++) sliceIndex += parts[i].length;
		const splat = sliceIndex === path.length ? "/" : path.slice(sliceIndex);
		bestFuzzy.rawParams ??= Object.create(null);
		bestFuzzy.rawParams["**"] = decodeURIComponent(splat);
		return bestFuzzy;
	}
	return null;
}
function segmentScore(partsLength, index) {
	return 2 ** (partsLength - index - 1);
}
function isPerfectStaticMatch(statics, partsLength) {
	return statics === 2 ** (partsLength - 1) - 1;
}
function validateParseParams(path, parts, frame) {
	let rawParams;
	let state;
	try {
		[rawParams, state] = extractParams(path, parts, frame);
	} catch {
		return null;
	}
	frame.rawParams = rawParams;
	frame.extract = state;
	if (!frame.node.parse) return true;
	try {
		if (frame.node.parse(rawParams) === false) return null;
	} catch {}
	return true;
}
function isFrameMoreSpecific(prev, next) {
	if (!prev) return true;
	return next.statics > prev.statics || next.statics === prev.statics && (next.dynamics > prev.dynamics || next.dynamics === prev.dynamics && (next.optionals > prev.optionals || next.optionals === prev.optionals && ((next.node.kind === SEGMENT_TYPE_INDEX) > (prev.node.kind === SEGMENT_TYPE_INDEX) || next.node.kind === SEGMENT_TYPE_INDEX === (prev.node.kind === SEGMENT_TYPE_INDEX) && next.node.depth > prev.node.depth)));
}

//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.171.22/node_modules/@tanstack/router-core/dist/esm/path.js
function joinPaths(paths) {
	return cleanPath(paths.filter((val) => {
		return val !== void 0;
	}).join("/"));
}
function cleanPath(path) {
	return path.replace(/\/{2,}/g, "/");
}
function trimPathLeft(path) {
	return path === "/" ? path : path.replace(/^\/{1,}/, "");
}
function trimPathRight(path) {
	const len = path.length;
	return len > 1 && path[len - 1] === "/" ? path.replace(/\/{1,}$/, "") : path;
}
function trimPath(path) {
	return trimPathRight(trimPathLeft(path));
}
function removeTrailingSlash(value, basepath) {
	if (value?.endsWith("/") && value !== "/" && value !== `${basepath}/`) return value.slice(0, -1);
	return value;
}
function exactPathTest(pathName1, pathName2, basepath) {
	return removeTrailingSlash(pathName1, basepath) === removeTrailingSlash(pathName2, basepath);
}
function resolvePath({ base, to, trailingSlash = "never", cache }) {
	const isBase = to === ".";
	const isAbsolute = to.startsWith("/");
	let key;
	if (cache) {
		key = isAbsolute ? to : isBase ? base : base + "\0" + to;
		const cached = cache.get(key);
		if (cached) return cached;
	}
	let baseSegments;
	if (isBase) baseSegments = base.split("/");
	else if (isAbsolute) baseSegments = to.split("/");
	else {
		baseSegments = base.split("/");
		while (baseSegments.length > 1 && last(baseSegments) === "") baseSegments.pop();
		const toSegments = to.split("/");
		for (let index = 0, length = toSegments.length; index < length; index++) {
			const value = toSegments[index];
			if (value === "") {
				if (!index) baseSegments = [value];
				else if (index === length - 1) baseSegments.push(value);
			} else if (value === "..") if (baseSegments.length > 1) baseSegments.pop();
			else baseSegments = [""];
			else if (value === ".") {} else baseSegments.push(value);
		}
	}
	if (baseSegments.length > 1) {
		if (last(baseSegments) === "") {
			if (trailingSlash === "never") baseSegments.pop();
		} else if (trailingSlash === "always") baseSegments.push("");
	}
	const result = cleanPath(baseSegments.join("/")) || "/";
	if (key && cache) cache.set(key, result);
	return result;
}
function compileDecodeCharMap(pathParamsAllowedCharacters) {
	const charMap = new Map(pathParamsAllowedCharacters.map((char) => [encodeURIComponent(char), char]));
	const pattern = Array.from(charMap.keys()).map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
	const regex = new RegExp(pattern, "g");
	return (encoded) => encoded.replace(regex, (match) => charMap.get(match) ?? match);
}
function encodeParam(key, params, decoder) {
	const value = params[key];
	if (typeof value !== "string") return value;
	if (key === "_splat") {
		if (/^[a-zA-Z0-9\-._~!/]*$/.test(value)) return value;
		return value.split("/").map((segment) => encodePathParam(segment, decoder)).join("/");
	} else return encodePathParam(value, decoder);
}
function interpolatePath({ path, params, decoder, ...rest }) {
	let isMissingParams = false;
	const usedParams = Object.create(null);
	if (!path || path === "/") return {
		interpolatedPath: "/",
		usedParams,
		isMissingParams
	};
	if (!path.includes("$")) return {
		interpolatedPath: path,
		usedParams,
		isMissingParams
	};
	if (false ?? rest.server) {
		if (path.indexOf("{") === -1) {
			const length = path.length;
			let cursor = 0;
			let joined = "";
			while (cursor < length) {
				while (cursor < length && path.charCodeAt(cursor) === 47) cursor++;
				if (cursor >= length) break;
				const start = cursor;
				let end = path.indexOf("/", cursor);
				if (end === -1) end = length;
				cursor = end;
				const part = path.substring(start, end);
				if (!part) continue;
				if (part.charCodeAt(0) === 36) if (part.length === 1) {
					const splat = params._splat;
					usedParams._splat = splat;
					usedParams["*"] = splat;
					if (!splat) {
						isMissingParams = true;
						continue;
					}
					const value = encodeParam("_splat", params, decoder);
					joined += "/" + value;
				} else {
					const key = part.substring(1);
					if (!isMissingParams && !(key in params)) isMissingParams = true;
					usedParams[key] = params[key];
					const value = encodeParam(key, params, decoder) ?? "undefined";
					joined += "/" + value;
				}
				else joined += "/" + part;
			}
			if (path.endsWith("/")) joined += "/";
			return {
				usedParams,
				interpolatedPath: joined || "/",
				isMissingParams
			};
		}
	}
	const length = path.length;
	let cursor = 0;
	let segment;
	let joined = "";
	while (cursor < length) {
		const start = cursor;
		segment = parseSegment(path, start, segment);
		const end = segment[5];
		cursor = end + 1;
		if (start === end) continue;
		const kind = segment[0];
		if (kind === 0) {
			joined += "/" + path.substring(start, end);
			continue;
		}
		if (kind === 2) {
			const splat = params._splat;
			usedParams._splat = splat;
			usedParams["*"] = splat;
			const prefix = path.substring(start, segment[1]);
			const suffix = path.substring(segment[4], end);
			if (!splat) {
				isMissingParams = true;
				if (prefix || suffix) joined += "/" + prefix + suffix;
				continue;
			}
			const value = encodeParam("_splat", params, decoder);
			joined += "/" + prefix + value + suffix;
			continue;
		}
		if (kind === 1) {
			const key = path.substring(segment[2], segment[3]);
			if (!isMissingParams && !(key in params)) isMissingParams = true;
			usedParams[key] = params[key];
			const prefix = path.substring(start, segment[1]);
			const suffix = path.substring(segment[4], end);
			const value = encodeParam(key, params, decoder) ?? "undefined";
			joined += "/" + prefix + value + suffix;
			continue;
		}
		if (kind === 3) {
			const key = path.substring(segment[2], segment[3]);
			const valueRaw = params[key];
			if (valueRaw == null) continue;
			usedParams[key] = valueRaw;
			const prefix = path.substring(start, segment[1]);
			const suffix = path.substring(segment[4], end);
			const value = encodeParam(key, params, decoder) ?? "";
			joined += "/" + prefix + value + suffix;
			continue;
		}
	}
	if (path.endsWith("/")) joined += "/";
	return {
		usedParams,
		interpolatedPath: joined || "/",
		isMissingParams
	};
}
function encodePathParam(value, decoder) {
	const encoded = encodeURIComponent(value);
	return decoder?.(encoded) ?? encoded;
}

//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.171.22/node_modules/@tanstack/router-core/dist/esm/not-found.js
function isNotFound(obj) {
	return obj?.isNotFound === true;
}

//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.171.22/node_modules/@tanstack/router-core/dist/esm/scroll-restoration.js
function getSafeSessionStorage() {
	try {
		return sessionStorage;
	} catch {
		return;
	}
}
var storageKey = "tsr-scroll-restoration-v1_3";
var safeSessionStorage = getSafeSessionStorage();
function createScrollRestorationCache() {
	try {
		return JSON.parse(safeSessionStorage?.getItem("tsr-scroll-restoration-v1_3") || "{}");
	} catch {
		return {};
	}
}
function persistScrollRestorationCache() {
	try {
		safeSessionStorage?.setItem(storageKey, JSON.stringify(scrollRestorationCache));
	} catch {}
}
var scrollRestorationCache = /* @__PURE__ */ createScrollRestorationCache();
var scrollRestorationIdAttribute = "data-scroll-restoration-id";
var defaultGetScrollRestorationKey = (location) => {
	return location.state.__TSR_key || location.href;
};
function getScrollRestorationSelector(element) {
	const attrId = element.getAttribute(scrollRestorationIdAttribute);
	if (attrId) return `[${scrollRestorationIdAttribute}="${attrId}"]`;
	let selector = "";
	let el = element;
	let parent;
	while (parent = el.parentNode) {
		let index = 1;
		let sibling = el;
		while (sibling = sibling.previousElementSibling) index++;
		const part = `${el.localName}:nth-child(${index})`;
		selector = selector ? `${part} > ${selector}` : part;
		el = parent;
	}
	return selector;
}
var ignoreScroll = false;
var windowScrollTarget = "window";
function getElement(selector) {
	try {
		return typeof selector === "function" ? selector() : document.querySelector(selector);
	} catch {}
}
function getScrollToTopElements(scrollToTopSelectors) {
	const elements = /* @__PURE__ */ new Set();
	for (const selector of scrollToTopSelectors) {
		if (selector === windowScrollTarget) continue;
		const element = getElement(selector);
		if (element) elements.add(element);
	}
	return elements;
}
function setupScrollRestoration(router, force) {
	const shouldSetupScrollRestoration = force ?? router.options.scrollRestoration;
	const scroll = router._scroll;
	if (shouldSetupScrollRestoration) scroll.restoring = true;
	if (false ?? router.isServer) return;
	const getKey = router.options.getScrollRestorationKey || defaultGetScrollRestorationKey;
	const trackedScrollTargets = /* @__PURE__ */ new Set();
	const snapshotCurrentScrollTargets = (restoreKey) => {
		const keyEntry = scrollRestorationCache[restoreKey] ||= {};
		for (const target of trackedScrollTargets) if (target === document) keyEntry[windowScrollTarget] = {
			scrollX,
			scrollY
		};
		else if (target.isConnected) keyEntry[getScrollRestorationSelector(target)] = {
			scrollX: target.scrollLeft,
			scrollY: target.scrollTop
		};
	};
	if (shouldSetupScrollRestoration && !scroll.restoration) {
		scroll.restoration = true;
		ignoreScroll = false;
		history.scrollRestoration = "manual";
		document.addEventListener("scroll", (event) => {
			if (ignoreScroll) return;
			trackedScrollTargets.add(event.target);
		}, true);
		router.subscribe("onBeforeLoad", (event) => {
			if (event.fromLocation) snapshotCurrentScrollTargets(getKey(event.fromLocation));
			trackedScrollTargets.clear();
		});
		addEventListener("pagehide", () => {
			snapshotCurrentScrollTargets(getKey(router.stores.resolvedLocation.get() ?? router.stores.location.get()));
			persistScrollRestorationCache();
		});
	}
	if (scroll.reset) return;
	scroll.reset = true;
	router.subscribe("onRendered", (event) => {
		const behavior = router.options.scrollRestorationBehavior;
		const scrollToTopSelectors = router.options.scrollToTopSelectors;
		const shouldResetScroll = scroll.next;
		const hashNavigation = scroll.hash;
		let scrollToTopElements;
		trackedScrollTargets.clear();
		scroll.next = true;
		scroll.hash = false;
		if (typeof router.options.scrollRestoration === "function" && !router.options.scrollRestoration({ location: router.latestLocation })) return;
		const cacheKey = getKey(event.toLocation);
		const fromCacheKey = event.fromLocation && getKey(event.fromLocation);
		if (scroll.restoring && fromCacheKey && fromCacheKey !== cacheKey) {
			const fromElementEntries = scrollRestorationCache[fromCacheKey];
			if (fromElementEntries) {
				let toElementEntries = scrollRestorationCache[cacheKey];
				for (const elementSelector in fromElementEntries) {
					if (elementSelector === windowScrollTarget) {
						if (shouldResetScroll) continue;
					} else {
						const element = getElement(elementSelector);
						if (!element) continue;
						if (shouldResetScroll && scrollToTopSelectors) {
							scrollToTopElements ??= getScrollToTopElements(scrollToTopSelectors);
							if (scrollToTopElements.has(element)) continue;
						}
					}
					if (!toElementEntries) toElementEntries = scrollRestorationCache[cacheKey] = {};
					toElementEntries[elementSelector] ??= fromElementEntries[elementSelector];
				}
			}
		}
		ignoreScroll = true;
		try {
			const hash = event.toLocation.hash;
			const hashScrollIntoViewOptions = event.toLocation.state.__hashScrollIntoViewOptions ?? true;
			let windowRestored = false;
			if (shouldResetScroll) {
				if (!hash && scrollToTopSelectors) scrollToTopElements ??= getScrollToTopElements(scrollToTopSelectors);
				const skipWindowRestore = hash && hashScrollIntoViewOptions && hashNavigation;
				const elementEntries = scroll.restoring ? scrollRestorationCache[cacheKey] : void 0;
				if (elementEntries) for (const elementSelector in elementEntries) {
					const { scrollX, scrollY } = elementEntries[elementSelector];
					if (elementSelector === windowScrollTarget) {
						if (skipWindowRestore) continue;
						scrollTo({
							top: scrollY,
							left: scrollX,
							behavior
						});
						windowRestored = true;
					} else {
						const element = getElement(elementSelector);
						if (element) {
							element.scrollLeft = scrollX;
							element.scrollTop = scrollY;
							scrollToTopElements?.delete(element);
						}
					}
				}
				if (!hash) {
					const scrollOptions = {
						top: 0,
						left: 0,
						behavior
					};
					if (!windowRestored) scrollTo(scrollOptions);
					if (scrollToTopElements) for (const element of scrollToTopElements) element.scrollTo(scrollOptions);
				}
			}
			if (!windowRestored && hash && hashScrollIntoViewOptions) document.getElementById(hash)?.scrollIntoView(hashScrollIntoViewOptions);
		} finally {
			ignoreScroll = false;
		}
	});
}

//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.171.22/node_modules/@tanstack/router-core/dist/esm/qss.js
function encode(obj, stringify = String) {
	const result = new URLSearchParams();
	for (const key in obj) {
		const val = obj[key];
		if (val !== void 0) result.set(key, stringify(val));
	}
	return result.toString();
}
function toValue(str) {
	if (!str) return "";
	if (str === "false") return false;
	if (str === "true") return true;
	return +str * 0 === 0 && +str + "" === str ? +str : str;
}
function decode(str) {
	const searchParams = new URLSearchParams(str);
	const result = Object.create(null);
	for (const [key, value] of searchParams.entries()) {
		const previousValue = result[key];
		if (previousValue == null) result[key] = toValue(value);
		else if (Array.isArray(previousValue)) previousValue.push(toValue(value));
		else result[key] = [previousValue, toValue(value)];
	}
	return result;
}

//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.171.22/node_modules/@tanstack/router-core/dist/esm/searchParams.js
var jsonStart = /^(?:\s|["[{\d-]|fa|nu|tr)/;
var defaultParseSearch = parseSearchWith(JSON.parse);
var defaultStringifySearch = stringifySearchWith(JSON.stringify, JSON.parse);
function parseSearchWith(parser) {
	return (searchStr) => {
		if (searchStr[0] === "?") searchStr = searchStr.substring(1);
		const query = decode(searchStr);
		for (const key in query) {
			const value = query[key];
			if (typeof value === "string") try {
				query[key] = parser(value);
			} catch (_err) {}
		}
		return query;
	};
}
function stringifySearchWith(stringify, parser) {
	const isJsonParser = parser === JSON.parse;
	function stringifyValue(val) {
		if (val && typeof val === "object") try {
			return stringify(val);
		} catch (_err) {}
		else if (parser && typeof val === "string") {
			if (isJsonParser && !jsonStart.test(val)) return val;
			try {
				parser(val);
				return stringify(val);
			} catch (_err) {}
		}
		return val;
	}
	return (search) => {
		const searchStr = encode(search, stringifyValue);
		return searchStr ? `?${searchStr}` : "";
	};
}

//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.171.22/node_modules/@tanstack/router-core/dist/esm/root.js
var rootRouteId = "__root__";

//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.171.22/node_modules/@tanstack/router-core/dist/esm/redirect.js
function redirect(opts) {
	opts.statusCode = opts.statusCode || opts.code || 307;
	if (!opts._builtLocation && !opts.reloadDocument && typeof opts.href === "string") try {
		new URL(opts.href);
		opts.reloadDocument = true;
	} catch {}
	const headers = new Headers(opts.headers);
	if (opts.href && headers.get("Location") === null) headers.set("Location", opts.href);
	const response = new Response(null, {
		status: opts.statusCode,
		headers
	});
	response.options = opts;
	if (opts.throw) throw response;
	return response;
}
function isRedirect(obj) {
	return obj instanceof Response && !!obj.options;
}

//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.171.22/node_modules/@tanstack/router-core/dist/esm/rewrite.js
function composeRewrites(rewrites) {
	return {
		input: ({ url }) => {
			for (const rewrite of rewrites) url = executeRewriteInput(rewrite, url);
			return url;
		},
		output: ({ url }) => {
			for (let i = rewrites.length - 1; i >= 0; i--) url = executeRewriteOutput(rewrites[i], url);
			return url;
		}
	};
}
function rewriteBasepath(opts) {
	const trimmedBasepath = trimPath(opts.basepath);
	const normalizedBasepath = `/${trimmedBasepath}`;
	const checkBasepath = opts.caseSensitive ? normalizedBasepath : normalizedBasepath.toLowerCase();
	const checkBasepathWithSlash = `${checkBasepath}/`;
	return {
		input: ({ url }) => {
			const pathname = opts.caseSensitive ? url.pathname : url.pathname.toLowerCase();
			if (pathname === checkBasepath) url.pathname = "/";
			else if (pathname.startsWith(checkBasepathWithSlash)) url.pathname = url.pathname.slice(normalizedBasepath.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = joinPaths([
				"/",
				trimmedBasepath,
				url.pathname
			]);
			return url;
		}
	};
}
function executeRewriteInput(rewrite, url) {
	const res = rewrite?.input?.({ url });
	if (res) {
		if (typeof res === "string") return new URL(res);
		else if (res instanceof URL) return res;
	}
	return url;
}
function executeRewriteOutput(rewrite, url) {
	const res = rewrite?.output?.({ url });
	if (res) {
		if (typeof res === "string") return new URL(res);
		else if (res instanceof URL) return res;
	}
	return url;
}

//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.171.22/node_modules/@tanstack/router-core/dist/esm/stores.js
function createNonReactiveMutableStore(initialValue) {
	let value = initialValue;
	return {
		get() {
			return value;
		},
		set(nextOrUpdater) {
			value = functionalUpdate(nextOrUpdater, value);
		}
	};
}
function createNonReactiveReadonlyStore(read) {
	return { get() {
		return read();
	} };
}
function createRouterStores(initialLocation, config) {
	const { createMutableStore, createReadonlyStore, batch } = config;
	const byRoute = /* @__PURE__ */ new Map();
	const status = createMutableStore("idle");
	const location = createMutableStore(initialLocation);
	const resolvedLocation = createMutableStore(void 0);
	const ids = createMutableStore([]);
	const matches = createReadonlyStore(() => ids.get().map((id) => byRoute.get(id).get()));
	const __store = createReadonlyStore(() => ({
		status: status.get(),
		isLoading: status.get() === "pending",
		matches: matches.get(),
		location: location.get(),
		resolvedLocation: resolvedLocation.get()
	}));
	function getMatchStore(routeId) {
		let matchStore = byRoute.get(routeId);
		if (!matchStore) {
			matchStore = createMutableStore(void 0);
			byRoute.set(routeId, matchStore);
		}
		return matchStore;
	}
	const store = {
		status,
		location,
		resolvedLocation,
		ids,
		matches,
		byRoute,
		__store,
		getMatchStore,
		setMatches
	};
	function setMatches(nextMatches) {
		const previousIds = ids.get();
		const nextIds = nextMatches.map((match) => match.routeId);
		batch(() => {
			if (!arraysEqual(previousIds, nextIds)) ids.set(nextIds);
			for (const id of previousIds) if (!nextIds.includes(id)) byRoute.get(id).set(() => void 0);
			for (const nextMatch of nextMatches) {
				const matchStore = getMatchStore(nextMatch.routeId);
				if (matchStore.get() !== nextMatch) matchStore.set(nextMatch);
			}
		});
	}
	return store;
}

//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.171.22/node_modules/@tanstack/router-core/dist/esm/router.js
function routeNeedsLoad(route) {
	return route.options.loader || route.options.beforeLoad || route.lazyFn || route.options.component?.preload || route.options.pendingComponent?.preload;
}
function getLocationChangeInfo(location, resolvedLocation) {
	return {
		fromLocation: resolvedLocation,
		toLocation: location,
		pathChanged: resolvedLocation?.pathname !== location.pathname,
		hrefChanged: resolvedLocation?.href !== location.href,
		hashChanged: resolvedLocation?.hash !== location.hash
	};
}
function _getUserHistoryState({ key: _key, __TSR_key: _tsrKey, __TSR_index: _tsrIndex, __hashScrollIntoViewOptions: _hashScroll, ...state }) {
	return state;
}
function runRouteLifecycle(router, previous, matches, isCurrent) {
	for (const match of previous) {
		if (isCurrent?.() === false) return;
		if (!matches.some((candidate) => candidate.routeId === match.routeId)) router.routesById[match.routeId].options.onLeave?.(match);
	}
	for (const match of matches) {
		if (isCurrent?.() === false) return;
		router.routesById[match.routeId].options[previous.some((candidate) => candidate.routeId === match.routeId) ? "onStay" : "onEnter"]?.(match);
	}
}
var RouterCore = class {
	constructor(options, getStoreConfig) {
		this.tempLocationKey = `${Math.round(Math.random() * 1e7)}`;
		this._scroll = { next: true };
		this.subscribers = /* @__PURE__ */ new Set();
		this._cache = /* @__PURE__ */ new Map();
		this._committed = [];
		this.routeBranchCache = /* @__PURE__ */ new WeakMap();
		this.lightweightCache = /* @__PURE__ */ new WeakMap();
		this.startTransition = async (fn) => {
			fn();
			return false;
		};
		this.update = (newOptions) => {
			const prevOptions = this.options;
			const prevBasepath = this.basepath ?? prevOptions?.basepath ?? "/";
			const basepathWasUnset = this.basepath === void 0;
			const prevRewriteOption = prevOptions?.rewrite;
			this.options = {
				...prevOptions,
				...newOptions
			};
			this.isServer = this.options.isServer ?? false ?? typeof document === "undefined";
			this.protocolAllowlist = new Set(this.options.protocolAllowlist);
			if (this.options.pathParamsAllowedCharacters) this.pathParamsDecoder = compileDecodeCharMap(this.options.pathParamsAllowedCharacters);
			if (!this.history || this.options.history && this.options.history !== this.history) if (!this.options.history) {
				if (!(false ?? this.isServer)) this.history = createBrowserHistory();
			} else this.history = this.options.history;
			this.origin = this.options.origin;
			if (!this.origin) if (!(false ?? this.isServer) && window?.origin && window.origin !== "null") this.origin = window.origin;
			else this.origin = "http://localhost";
			if (this.history) this.updateLatestLocation();
			if (this.options.routeTree !== this.routeTree) {
				this.routeTree = this.options.routeTree;
				let processRouteTreeResult;
				if ((false ?? this.isServer) && globalThis.__TSR_CACHE__ && globalThis.__TSR_CACHE__.routeTree === this.routeTree) {
					const cached = globalThis.__TSR_CACHE__;
					this.resolvePathCache = cached.resolvePathCache;
					processRouteTreeResult = cached.processRouteTreeResult;
				} else {
					this.resolvePathCache = createLRUCache(1e3);
					processRouteTreeResult = this.buildRouteTree();
					if ((false ?? this.isServer) && globalThis.__TSR_CACHE__ === void 0) globalThis.__TSR_CACHE__ = {
						routeTree: this.routeTree,
						processRouteTreeResult,
						resolvePathCache: this.resolvePathCache
					};
				}
				this.setRoutes(processRouteTreeResult);
			}
			if (!this.stores && this.latestLocation) {
				const config = this.getStoreConfig(this);
				this.batch = config.batch;
				this.stores = createRouterStores(this.latestLocation, config);
				if (!(false ?? this.isServer)) setupScrollRestoration(this);
			}
			const nextBasepath = this.options.basepath ?? "/";
			const nextRewriteOption = this.options.rewrite;
			if (basepathWasUnset || prevBasepath !== nextBasepath || prevRewriteOption !== nextRewriteOption) {
				this.basepath = nextBasepath;
				const rewrites = [];
				const trimmed = trimPath(nextBasepath);
				if (trimmed && trimmed !== "/") rewrites.push(rewriteBasepath({ basepath: nextBasepath }));
				if (nextRewriteOption) rewrites.push(nextRewriteOption);
				this.rewrite = rewrites.length === 0 ? void 0 : rewrites.length === 1 ? rewrites[0] : composeRewrites(rewrites);
				if (this.history) this.updateLatestLocation();
				if (this.stores) this.stores.location.set(this.latestLocation);
			}
		};
		this.updateLatestLocation = () => {
			this.latestLocation = this.parseLocation(this.history.location, this.latestLocation);
		};
		this.buildRouteTree = () => {
			const result = processRouteTree(this.routeTree, this.options.caseSensitive, (route, i) => {
				route.init({ originalIndex: i });
			});
			if (this.options.routeMasks) processRouteMasks(this.options.routeMasks, result.processedTree);
			return result;
		};
		this.subscribe = (eventType, fn) => {
			const listener = {
				eventType,
				fn
			};
			this.subscribers.add(listener);
			return () => {
				this.subscribers.delete(listener);
			};
		};
		this.emit = (routerEvent) => {
			for (const listener of this.subscribers) if (listener.eventType === routerEvent.type) try {
				listener.fn(routerEvent);
			} catch (e) {
				console.error(e);
			}
		};
		this.parseLocation = (locationToParse, previousLocation) => {
			const parse = ({ pathname, search, hash, href, state }) => {
				if (!this.rewrite && !/[ \x00-\x1f\x7f\u0080-\uffff]/.test(pathname)) {
					const parsedSearch = this.options.parseSearch(search);
					const searchStr = this.options.stringifySearch(parsedSearch);
					return {
						href: pathname + searchStr + hash,
						publicHref: pathname + searchStr + hash,
						pathname: decodePath(pathname).path,
						external: false,
						searchStr,
						search: nullReplaceEqualDeep(previousLocation?.search, parsedSearch),
						hash: decodePath(hash.slice(1)).path,
						state: replaceEqualDeep(previousLocation?.state, state)
					};
				}
				const fullUrl = new URL(href, this.origin);
				const url = executeRewriteInput(this.rewrite, fullUrl);
				const parsedSearch = this.options.parseSearch(url.search);
				const searchStr = this.options.stringifySearch(parsedSearch);
				url.search = searchStr;
				return {
					href: url.href.replace(url.origin, ""),
					publicHref: href,
					pathname: decodePath(url.pathname).path,
					external: !!this.rewrite && url.origin !== this.origin,
					searchStr,
					search: nullReplaceEqualDeep(previousLocation?.search, parsedSearch),
					hash: decodePath(url.hash.slice(1)).path,
					state: replaceEqualDeep(previousLocation?.state, state)
				};
			};
			const location = parse(locationToParse);
			const { __tempLocation, __tempKey } = location.state;
			if (__tempLocation && (!__tempKey || __tempKey === this.tempLocationKey)) {
				const parsedTempLocation = parse(__tempLocation);
				parsedTempLocation.state.key = location.state.key;
				parsedTempLocation.state.__TSR_key = location.state.__TSR_key;
				delete parsedTempLocation.state.__tempLocation;
				return {
					...parsedTempLocation,
					maskedLocation: location
				};
			}
			return location;
		};
		this.resolvePathWithBase = (from, path) => {
			return resolvePath({
				base: from,
				to: path.includes("//") ? cleanPath(path) : path,
				trailingSlash: this.options.trailingSlash,
				cache: this.resolvePathCache
			});
		};
		this.matchRoutes = (pathnameOrNext, locationSearchOrOpts, opts) => {
			if (typeof pathnameOrNext === "string") return this.matchRoutesInternal({
				pathname: pathnameOrNext,
				search: locationSearchOrOpts
			}, opts);
			return this.matchRoutesInternal(pathnameOrNext, locationSearchOrOpts);
		};
		this.getMatchedRoutes = (pathname) => {
			const rawParams = Object.create(null);
			const match = findRouteMatch(trimPathRight(pathname), this.processedTree, true);
			if (match) Object.assign(rawParams, match.rawParams);
			return [
				match?.branch || [this.routesById["__root__"]],
				rawParams,
				match?.route
			];
		};
		this.buildLocation = (opts) => {
			const build = (dest = {}) => {
				const currentLocation = dest._fromLocation || this._pendingLocation || this.latestLocation;
				const lightweightResult = this.matchRoutesLightweight(currentLocation);
				if (dest.from && false);
				const defaultedFromPath = dest.unsafeRelative === "path" ? currentLocation.pathname : dest.from ?? lightweightResult[1];
				const destTo = dest.to ? `${dest.to}` : void 0;
				const fromSearch = lightweightResult[2];
				const fromParams = Object.assign(Object.create(null), lightweightResult[3]);
				const sourcePath = destTo?.charCodeAt(0) === 47 ? "/" : this.resolvePathWithBase(defaultedFromPath, ".");
				const nextTo = destTo ? this.resolvePathWithBase(sourcePath, destTo) : sourcePath;
				const nextParams = resolveNextParams(dest.params, fromParams);
				const destRoute = this.routesByPath[trimPathRight(nextTo)];
				let destRoutes;
				if (destRoute) destRoutes = this.getRouteBranch(destRoute);
				else if (nextTo.includes("$")) destRoutes = [];
				else {
					const [matchedRoutes, rawParams, foundRoute] = this.getMatchedRoutes(nextTo);
					destRoutes = matchedRoutes;
					if (this.options.notFoundRoute && (!foundRoute || foundRoute.path !== "/" && rawParams["**"])) destRoutes = [...destRoutes, this.options.notFoundRoute];
				}
				if (destRoutes.length && hasKeys(nextParams)) for (const route of destRoutes) {
					const fn = route.options.params?.stringify ?? route.options.stringifyParams;
					if (fn) try {
						Object.assign(nextParams, fn(nextParams));
					} catch {}
				}
				const nextPathname = opts.leaveParams ? nextTo : decodePath(interpolatePath({
					path: nextTo,
					params: nextParams,
					decoder: this.pathParamsDecoder,
					server: this.isServer
				}).interpolatedPath).path;
				let nextSearch = fromSearch;
				if (opts._includeValidateSearch && this.options.search?.strict) {
					const validatedSearch = {};
					destRoutes.forEach((route) => {
						if (route.options.validateSearch) try {
							Object.assign(validatedSearch, validateSearch(route.options.validateSearch, {
								...validatedSearch,
								...nextSearch
							}));
						} catch {}
					});
					nextSearch = validatedSearch;
				}
				nextSearch = applySearchMiddleware(nextSearch, dest, destRoutes, opts._includeValidateSearch);
				nextSearch = nullReplaceEqualDeep(fromSearch, nextSearch);
				const searchStr = this.options.stringifySearch(nextSearch);
				const hash = dest.hash === true ? currentLocation.hash : dest.hash ? functionalUpdate(dest.hash, currentLocation.hash) : void 0;
				const hashStr = hash ? `#${hash}` : "";
				let nextState = dest.state === true ? currentLocation.state : dest.state ? functionalUpdate(dest.state, currentLocation.state) : {};
				nextState = replaceEqualDeep(currentLocation.state, nextState);
				const fullPath = `${nextPathname}${searchStr}${hashStr}`;
				let href;
				let publicHref;
				let external = false;
				if (this.rewrite) {
					const url = new URL(fullPath, this.origin);
					const rewrittenUrl = executeRewriteOutput(this.rewrite, url);
					href = url.href.replace(url.origin, "");
					if (rewrittenUrl.origin !== this.origin) {
						publicHref = rewrittenUrl.href;
						external = true;
					} else publicHref = rewrittenUrl.pathname + rewrittenUrl.search + rewrittenUrl.hash;
				} else {
					href = encodePathLikeUrl(fullPath);
					publicHref = href;
				}
				return {
					publicHref,
					href,
					pathname: nextPathname,
					search: nextSearch,
					searchStr,
					state: nextState,
					hash: hash ?? "",
					external,
					unmaskOnReload: dest.unmaskOnReload
				};
			};
			const buildWithMatches = (dest = {}, maskedDest) => {
				const next = build(dest);
				let maskedNext = maskedDest ? build(maskedDest) : void 0;
				if (!maskedNext) {
					const params = Object.create(null);
					if (this.options.routeMasks) {
						const match = findFlatMatch(next.pathname, this.processedTree);
						if (match) {
							Object.assign(params, match.rawParams);
							const { from: _from, params: maskParams, ...maskProps } = match.route;
							const nextParams = resolveNextParams(maskParams, params);
							maskedDest = {
								from: opts.from,
								...maskProps,
								params: nextParams
							};
							maskedNext = build(maskedDest);
						}
					}
				}
				if (maskedNext) next.maskedLocation = maskedNext;
				return next;
			};
			if (opts.mask) return buildWithMatches(opts, {
				from: opts.from,
				...opts.mask
			});
			return buildWithMatches(opts);
		};
		this.commitLocation = async ({ viewTransition, ignoreBlocker, ...next }) => {
			let historyAction;
			const isSameLocation = trimPathRight(this.latestLocation.href) === trimPathRight(next.href) && deepEqual(_getUserHistoryState(next.state), _getUserHistoryState(this.latestLocation.state));
			const previousCommitPromise = this._commitPromise;
			let resolve;
			const commitPromise = new Promise((done) => {
				resolve = done;
			});
			commitPromise.resolve = () => {
				resolve();
				previousCommitPromise?.resolve();
			};
			this._commitPromise = commitPromise;
			if (isSameLocation) this.load();
			else {
				let { maskedLocation, hashScrollIntoView, ...nextHistory } = next;
				if (maskedLocation) {
					nextHistory = {
						...maskedLocation,
						state: {
							...maskedLocation.state,
							__tempKey: void 0,
							__tempLocation: {
								...nextHistory,
								search: nextHistory.searchStr,
								state: {
									...nextHistory.state,
									__tempKey: void 0,
									__tempLocation: void 0,
									__TSR_key: void 0,
									key: void 0
								}
							}
						}
					};
					if (nextHistory.unmaskOnReload ?? this.options.unmaskOnReload ?? false) nextHistory.state.__tempKey = this.tempLocationKey;
				}
				nextHistory.state.__hashScrollIntoViewOptions = hashScrollIntoView ?? this.options.defaultHashScrollIntoView ?? true;
				this.shouldViewTransition = viewTransition;
				historyAction = next.replace ? "REPLACE" : "PUSH";
				this.history[historyAction === "REPLACE" ? "replace" : "push"](nextHistory.publicHref, nextHistory.state, { ignoreBlocker });
				if (!this.history.subscribers.size) this.load({ action: { type: historyAction } });
			}
			this._scroll.next = next.resetScroll ?? true;
			return this._commitPromise;
		};
		this.buildAndCommitLocation = ({ replace, resetScroll, hashScrollIntoView, viewTransition, ignoreBlocker, _redirects, href, ...rest } = {}) => {
			if (href) {
				const currentIndex = this.history.location.state.__TSR_index;
				const parsed = parseHref(href, { __TSR_index: replace ? currentIndex : currentIndex + 1 });
				const hrefUrl = new URL(parsed.pathname, this.origin);
				rest.to = executeRewriteInput(this.rewrite, hrefUrl).pathname;
				rest.search = this.options.parseSearch(parsed.search);
				rest.hash = parsed.hash.slice(1);
			}
			const location = this.buildLocation({
				...rest,
				_includeValidateSearch: true
			});
			if (_redirects) location._redirects = _redirects;
			this._pendingLocation = location;
			const commitPromise = this.commitLocation({
				...location,
				viewTransition,
				replace,
				resetScroll,
				hashScrollIntoView,
				ignoreBlocker
			});
			queueMicrotask(() => {
				if (this._pendingLocation === location) this._pendingLocation = void 0;
			});
			return commitPromise;
		};
		this.navigate = async ({ to, reloadDocument, href, publicHref, ...rest }) => {
			let hrefIsUrl = false;
			if (href) try {
				new URL(`${href}`);
				hrefIsUrl = true;
			} catch {}
			if (hrefIsUrl && !reloadDocument) reloadDocument = true;
			if (reloadDocument) {
				if (to !== void 0 || !href) {
					const location = this.buildLocation({
						to,
						...rest
					});
					href = href ?? location.publicHref;
					publicHref = publicHref ?? location.publicHref;
				}
				const reloadHref = !hrefIsUrl && publicHref ? publicHref : href;
				if (isDangerousProtocol(reloadHref, this.protocolAllowlist)) return;
				if (!rest.ignoreBlocker) {
					const blockers = this.history.getBlockers?.() ?? [];
					for (const blocker of blockers) if (blocker?.blockerFn) {
						if (await blocker.blockerFn({
							currentLocation: this.latestLocation,
							nextLocation: this.latestLocation,
							action: "PUSH"
						})) return;
					}
				}
				if (rest.replace) window.location.replace(reloadHref);
				else window.location.href = reloadHref;
				return;
			}
			return this.buildAndCommitLocation({
				...rest,
				href,
				to,
				_isNavigate: true
			});
		};
		this.load = async (opts) => {
			if (false ?? this.isServer) return (void 0)(this, opts);
			this.updateLatestLocation();
			if (opts?.action) this._scroll.hash = opts.action.type === "PUSH" || opts.action.type === "REPLACE";
			await loadClientRoute(this, opts);
		};
		this.startViewTransition = (fn) => {
			const shouldViewTransition = this.shouldViewTransition ?? this.options.defaultViewTransition;
			this.shouldViewTransition = void 0;
			if (shouldViewTransition && !(false ?? typeof document === "undefined") && typeof document.startViewTransition === "function") {
				let startViewTransitionParams;
				if (typeof shouldViewTransition === "object" && window.CSS?.supports?.("selector(:active-view-transition-type(a))")) {
					const next = this.latestLocation;
					const prevLocation = this.stores.resolvedLocation.get();
					const resolvedViewTransitionTypes = typeof shouldViewTransition.types === "function" ? shouldViewTransition.types(getLocationChangeInfo(next, prevLocation)) : shouldViewTransition.types;
					if (resolvedViewTransitionTypes === false) return fn();
					startViewTransitionParams = {
						update: fn,
						types: resolvedViewTransitionTypes
					};
				} else startViewTransitionParams = fn;
				return document.startViewTransition(startViewTransitionParams).updateCallbackDone;
			}
			return fn();
		};
		this.invalidate = (opts) => {
			const committedMatches = this._committed;
			const filter = opts?.filter;
			const preloads = this._preloads;
			const invalidIds = new Set([
				...committedMatches,
				...this._cache.values(),
				...[...preloads?.values() ?? []].flat(),
				...this._tx?.[3] ?? []
			].filter((match) => !filter || filter(match)).map((match) => match.id));
			const discardedPreloads = [];
			for (const [controller, matches] of preloads ?? []) if (matches.some((match) => invalidIds.has(match.id))) {
				preloads.delete(controller);
				discardedPreloads.push(controller);
			}
			const invalidate = (d) => {
				if (invalidIds.has(d.id)) {
					const route = this.routesById[d.routeId];
					const next = {
						...d,
						invalid: true,
						...(opts?.forcePending || d.status === "error" || d.status === "notFound") && routeNeedsLoad(route) ? {
							status: "pending",
							error: void 0
						} : void 0
					};
					d._flight = void 0;
					return next;
				}
				return d;
			};
			this._committed = committedMatches.map(invalidate);
			for (const [id, match] of this._cache) if (invalidIds.has(id)) {
				match.invalid = true;
				if (opts?.forcePending) match.status = "pending";
			}
			for (const id of invalidIds) this._flights?.delete(id);
			for (const controller of discardedPreloads) controller.abort();
			this.shouldViewTransition = false;
			return this.load({ sync: opts?.sync });
		};
		this.resolveRedirect = (redirect) => {
			const locationHeader = redirect.headers.get("Location");
			if (!redirect.options.href || redirect.options._builtLocation) {
				const href = (redirect.options._builtLocation ?? this.buildLocation(redirect.options)).publicHref || "/";
				redirect.options.href = href;
				redirect.headers.set("Location", href);
			} else if (locationHeader) try {
				const url = new URL(locationHeader);
				if (this.origin && url.origin === this.origin) {
					const href = url.pathname + url.search + url.hash;
					redirect.options.href = href;
					redirect.headers.set("Location", href);
				}
			} catch {}
			if (redirect.options.href && !redirect.options._builtLocation && isDangerousProtocol(redirect.options.href, this.protocolAllowlist)) throw new Error("Redirect blocked: unsafe protocol");
			if (!redirect.headers.get("Location")) redirect.headers.set("Location", redirect.options.href);
			return redirect;
		};
		this.clearCache = (opts) => {
			const cached = this._cache;
			const preloads = this._preloads;
			const filter = opts?.filter;
			const discarded = [];
			const discardedIds = [];
			for (const [id, match] of cached) if (!filter || filter(match)) {
				discardedIds.push(id);
				discarded.push(match);
			}
			const abort = [];
			for (const [controller, matches] of preloads ?? []) if (!filter || matches.some(filter)) {
				abort.push(controller);
				discarded.push(...matches);
			}
			for (const id of discardedIds) cached.delete(id);
			for (const controller of abort) preloads.delete(controller);
			for (const match of discarded) {
				const flight = match._flight;
				match._flight = void 0;
				if (flight && !--flight[2]) {
					if (this._flights?.get(match.id) === flight) this._flights.delete(match.id);
					abort.push(flight[1]);
				}
			}
			for (const controller of abort) controller.abort();
		};
		this.loadRouteChunk = loadRouteChunk;
		this.preloadRoute = (opts) => preloadClientRoute(this, opts);
		this.matchRoute = (location, opts) => {
			const matchLocation = {
				...location,
				to: location.to ? this.resolvePathWithBase(location.from || "", location.to) : void 0,
				params: location.params || {},
				leaveParams: true
			};
			const next = this.buildLocation(matchLocation);
			const isPending = this.stores.status.get() === "pending";
			if (opts?.pending && !isPending) return false;
			const baseLocation = opts?.pending ?? !isPending ? this.latestLocation : this.stores.resolvedLocation.get() || this.stores.location.get();
			const match = findSingleMatch(next.pathname, opts?.caseSensitive ?? false, opts?.fuzzy ?? false, baseLocation.pathname, this.processedTree);
			if (!match) return false;
			if (location.params) {
				if (!deepEqual(match.rawParams, location.params, { partial: true })) return false;
			}
			if (opts?.includeSearch ?? true) return deepEqual(baseLocation.search, next.search, { partial: true }) ? match.rawParams : false;
			return match.rawParams;
		};
		this.getStoreConfig = getStoreConfig;
		this.update({
			defaultPreloadDelay: 50,
			defaultPendingMs: 1e3,
			defaultPendingMinMs: 500,
			context: void 0,
			...options,
			caseSensitive: options.caseSensitive ?? false,
			notFoundMode: options.notFoundMode ?? "fuzzy",
			stringifySearch: options.stringifySearch ?? defaultStringifySearch,
			parseSearch: options.parseSearch ?? defaultParseSearch,
			protocolAllowlist: options.protocolAllowlist ?? DEFAULT_PROTOCOL_ALLOWLIST
		});
		if (!(false ?? typeof document === "undefined")) self.__TSR_ROUTER__ = this;
	}
	isShell() {
		return !!this.options.isShell;
	}
	get state() {
		return this.stores.__store.get();
	}
	setRoutes({ routesById, routesByPath, processedTree }) {
		this.routesById = routesById;
		this.routesByPath = routesByPath;
		this.processedTree = processedTree;
		const notFoundRoute = this.options.notFoundRoute;
		if (notFoundRoute) {
			notFoundRoute.init({ originalIndex: 99999999999 });
			this.routesById[notFoundRoute.id] = notFoundRoute;
		}
	}
	getRouteBranch(route) {
		let branch = this.routeBranchCache.get(route);
		if (!branch) {
			branch = buildRouteBranch(route);
			this.routeBranchCache.set(route, branch);
		}
		return branch;
	}
	matchRoutesInternal(next, opts) {
		const [initialMatchedRoutes, rawParams, foundRoute] = this.getMatchedRoutes(next.pathname);
		let matchedRoutes = initialMatchedRoutes;
		let isGlobalNotFound = false;
		if (foundRoute ? foundRoute.path !== "/" && rawParams["**"] : trimPathRight(next.pathname)) if (this.options.notFoundRoute) matchedRoutes = [...matchedRoutes, this.options.notFoundRoute];
		else isGlobalNotFound = true;
		const _notFoundRouteId = isGlobalNotFound ? findGlobalNotFoundRouteId(this.options.notFoundMode, matchedRoutes) : void 0;
		const matches = new Array(matchedRoutes.length);
		const committed = this._committed;
		const previousAt = (route, index) => {
			const match = committed[index];
			return match?.routeId === route.id ? match : route === this.options.notFoundRoute ? committed.find((candidate) => candidate.routeId === route.id) : void 0;
		};
		let strictParams;
		for (let index = 0; index < matchedRoutes.length; index++) {
			const route = matchedRoutes[index];
			const parentMatch = matches[index - 1];
			let preMatchSearch;
			let strictMatchSearch;
			let searchError;
			{
				const parentSearch = parentMatch?.search ?? next.search;
				const parentStrictSearch = parentMatch?._strictSearch ?? void 0;
				try {
					const strictSearch = validateSearch(route.options.validateSearch, { ...parentSearch }) ?? void 0;
					preMatchSearch = {
						...parentSearch,
						...strictSearch
					};
					strictMatchSearch = {
						...parentStrictSearch,
						...strictSearch
					};
				} catch (err) {
					let searchParamError = err;
					if (!(err instanceof SearchParamError)) searchParamError = new SearchParamError(err.message, { cause: err });
					if (opts?.throwOnError) throw searchParamError;
					preMatchSearch = parentSearch;
					strictMatchSearch = {};
					searchError = searchParamError;
				}
			}
			let loaderDeps = "";
			let loaderDepsHash = "";
			try {
				loaderDeps = route.options.loaderDeps?.({ search: preMatchSearch }) ?? "";
				loaderDepsHash = loaderDeps ? JSON.stringify(loaderDeps) || "" : "";
			} catch (cause) {
				if (opts?.throwOnError) throw cause;
				searchError ??= cause;
			}
			const { interpolatedPath, usedParams } = interpolatePath({
				path: route.fullPath,
				params: rawParams,
				decoder: this.pathParamsDecoder,
				server: this.isServer
			});
			const matchId = route.id + interpolatedPath + loaderDepsHash;
			const previousMatch = previousAt(route, index);
			const existingMatch = this._cache.get(matchId) ?? (previousMatch?.id === matchId ? previousMatch : void 0);
			strictParams = existingMatch?._strictParams ?? Object.assign(usedParams, strictParams);
			let paramsError;
			if (!existingMatch) try {
				extractStrictParams(route, strictParams);
			} catch (err) {
				if (isNotFound(err) || isRedirect(err)) paramsError = err;
				else paramsError = new PathParamError(err.message, { cause: err });
				if (opts?.throwOnError) throw paramsError;
			}
			const cause = previousMatch ? "stay" : "enter";
			let match;
			if (existingMatch) match = {
				...existingMatch,
				cause,
				search: previousMatch ? nullReplaceEqualDeep(previousMatch.search, preMatchSearch) : nullReplaceEqualDeep(existingMatch.search, preMatchSearch),
				_strictSearch: strictMatchSearch,
				searchError
			};
			else {
				const status = routeNeedsLoad(route) ? "pending" : "success";
				match = {
					id: matchId,
					ssr: false ?? this.isServer ? void 0 : route.options.ssr,
					index,
					routeId: route.id,
					params: previousMatch?.params ?? strictParams,
					_strictParams: strictParams,
					pathname: interpolatedPath,
					updatedAt: Date.now(),
					search: previousMatch ? nullReplaceEqualDeep(previousMatch.search, preMatchSearch) : preMatchSearch,
					_strictSearch: strictMatchSearch,
					searchError,
					status,
					isFetching: false,
					error: void 0,
					paramsError,
					context: {},
					abortController: opts?._controller ?? new AbortController(),
					cause,
					loaderDeps: previousMatch ? replaceEqualDeep(previousMatch.loaderDeps, loaderDeps) : loaderDeps,
					invalid: false,
					preload: false,
					staticData: route.options.staticData || {},
					fullPath: route.fullPath
				};
			}
			const _notFound = _notFoundRouteId === route.id;
			if (match._notFound && !_notFound) match.error = void 0;
			match._notFound = _notFound;
			matches[index] = match;
		}
		for (let index = 0; index < matches.length; index++) {
			const match = matches[index];
			match.params = match.cause === "stay" ? nullReplaceEqualDeep(match.params, strictParams) : strictParams;
			if (opts?._controller) match.context = {};
		}
		return matches;
	}
	matchRoutesLightweight(location) {
		const lastRouteId = last(this.stores.ids.get());
		const lastStateMatch = lastRouteId ? this.stores.byRoute.get(lastRouteId).get() : void 0;
		const lastStateMatchId = lastStateMatch?.id;
		const cached = this.lightweightCache.get(location);
		if (cached && cached[0] === lastStateMatchId) return cached[1];
		const [matchedRoutes, rawParams] = this.getMatchedRoutes(location.pathname);
		const lastRoute = last(matchedRoutes);
		const accumulatedSearch = { ...location.search };
		for (const route of matchedRoutes) try {
			Object.assign(accumulatedSearch, validateSearch(route.options.validateSearch, accumulatedSearch));
		} catch {}
		const canReuseParams = lastStateMatch && lastStateMatch.routeId === lastRoute.id && lastStateMatch.pathname === location.pathname;
		let params;
		if (canReuseParams) params = lastStateMatch.params;
		else {
			const strictParams = Object.assign(Object.create(null), rawParams);
			for (const route of matchedRoutes) try {
				extractStrictParams(route, strictParams);
			} catch {}
			params = strictParams;
		}
		const result = [
			matchedRoutes,
			lastRoute.fullPath,
			accumulatedSearch,
			params
		];
		this.lightweightCache.set(location, [lastStateMatchId, result]);
		return result;
	}
};
var SearchParamError = class extends Error {};
var PathParamError = class extends Error {};
function validateSearch(validateSearch, input) {
	if (validateSearch == null) return {};
	if ("~standard" in validateSearch) {
		const result = validateSearch["~standard"].validate(input);
		if (result instanceof Promise) throw new SearchParamError("Async validation not supported");
		if (result.issues) throw new SearchParamError(JSON.stringify(result.issues, void 0, 2), { cause: result });
		return result.value;
	}
	if ("parse" in validateSearch) return validateSearch.parse(input);
	if (typeof validateSearch === "function") return validateSearch(input);
	return {};
}
function applySearchMiddleware(search, dest, destRoutes, includeValidateSearch) {
	const middlewares = [];
	for (const route of destRoutes) {
		const routeOptions = route.options;
		if ("search" in routeOptions) {
			if (routeOptions.search?.middlewares) middlewares.push(...routeOptions.search.middlewares);
		} else if (routeOptions.preSearchFilters || routeOptions.postSearchFilters) {
			const legacyMiddleware = ({ search, next }) => {
				const result = next(routeOptions.preSearchFilters ? routeOptions.preSearchFilters.reduce((prev, next) => next(prev), search) : search);
				return routeOptions.postSearchFilters ? routeOptions.postSearchFilters.reduce((prev, next) => next(prev), result) : result;
			};
			middlewares.push(legacyMiddleware);
		}
		const routeValidateSearch = routeOptions.validateSearch;
		if (routeValidateSearch) {
			const validate = ({ search, next, meta }) => {
				const result = next(search);
				if (includeValidateSearch) try {
					const validated = validateSearch(routeValidateSearch, result);
					if (meta && validated) {
						for (const key in validated) if (!(key in result)) (meta.defaulted ||= /* @__PURE__ */ new Map()).set(key, validated[key]);
					}
					return {
						...result,
						...validated
					};
				} catch {}
				return result;
			};
			middlewares.push(validate);
		}
	}
	const applyNext = (index, currentSearch, meta) => {
		if (index >= middlewares.length) {
			if (!dest.search) return {};
			if (dest.search === true) return currentSearch;
			const result = functionalUpdate(dest.search, currentSearch);
			if (meta) meta.explicit = result;
			return result;
		}
		const next = (newSearch, collectMeta) => {
			if (collectMeta) {
				const nextMeta = meta || {};
				return {
					search: applyNext(index + 1, newSearch, nextMeta),
					meta: nextMeta
				};
			}
			return applyNext(index + 1, newSearch, meta);
		};
		return middlewares[index]({
			search: currentSearch,
			next,
			meta
		});
	};
	return applyNext(0, search);
}
function findGlobalNotFoundRouteId(notFoundMode, routes) {
	if (notFoundMode !== "root") {
		let fallback;
		for (let i = routes.length - 1; i >= 0; i--) {
			const route = routes[i];
			if (route.options.notFoundComponent) return route.id;
			fallback ||= route.children && route.id;
		}
		if (fallback) return fallback;
	}
	return rootRouteId;
}
function resolveNextParams(spec, base) {
	return spec === false || spec === null ? Object.create(null) : (spec ?? true) === true ? base : Object.assign(base, functionalUpdate(spec, base));
}
function extractStrictParams(route, accumulatedParams) {
	const parseParams = route.options.params?.parse ?? route.options.parseParams;
	if (parseParams) Object.assign(accumulatedParams, parseParams(accumulatedParams));
}

//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.171.22/node_modules/@tanstack/router-core/dist/esm/load-client.js
function preloadComponent(route, type) {
	return route.options[type]?.preload?.();
}
function loadComponents(route, onPendingReady) {
	const component = preloadComponent(route, "component");
	const pending = preloadComponent(route, "pendingComponent");
	const pendingReady = onPendingReady && pending ? pending.then(onPendingReady) : pending;
	if (onPendingReady && !pending) onPendingReady();
	if (component && pendingReady) return Promise.all([component, pendingReady]).then(() => {});
	return component ?? pendingReady;
}
function loadRouteChunk(route, componentType, onPendingReady) {
	const afterLazy = () => componentType === false ? void 0 : componentType ? preloadComponent(route, componentType) : loadComponents(route, onPendingReady);
	const current = route._lazy;
	if (current) return current === true ? afterLazy() : current.then(afterLazy);
	if (!route.lazyFn) return afterLazy();
	const promise = route.lazyFn().then((lazyRoute) => {
		{
			const { id: _id, ...options } = lazyRoute.options;
			Object.assign(route.options, options);
			route._lazy = true;
		}
	}, (error) => {
		route._lazy = void 0;
		throw error;
	});
	route._lazy = promise;
	return promise.then(afterLazy);
}
function _getRenderedMatches(matches) {
	const end = matches.findIndex((match) => match.status !== "success" || match._notFound) + 1;
	return end && end < matches.length ? matches.slice(0, end) : matches;
}
var SUCCESS = 0;
var ERROR = 1;
var NOT_FOUND = 2;
var REDIRECTED = 3;
var CANCELED = 4;
function isControl(result) {
	return typeof result[0] === "number";
}
function waitFor(value, signal) {
	if (signal.aborted) return Promise.race([Promise.reject(signal), value]);
	return new Promise((resolve, reject) => {
		const abort = () => reject(signal);
		signal.addEventListener("abort", abort, { once: true });
		Promise.resolve(value).then(resolve, reject).finally(() => signal.removeEventListener("abort", abort));
	});
}
function getRoute(router, match) {
	return router.routesById[match.routeId];
}
function normalize(value, rejected, routeId) {
	if (isRedirect(value)) return [REDIRECTED, value];
	if (isNotFound(value)) {
		value.routeId ||= routeId;
		return [NOT_FOUND, value];
	}
	if (rejected && typeof value?.then === "function") value = new Error("A Promise was thrown", { cause: value });
	return rejected ? [ERROR, value] : [SUCCESS, value];
}
function normalizeError(route, cause) {
	let outcome = normalize(cause, true, route.id);
	if (outcome[0] !== ERROR) return outcome;
	try {
		route.options.onError?.(outcome[1]);
	} catch (onErrorCause) {
		outcome = normalize(onErrorCause, true, route.id);
	}
	return outcome;
}
function normalizeLaneError(route, cause, options) {
	if (options[0].signal.aborted || !options[2]()) {
		options[0].abort();
		return [CANCELED];
	}
	return normalizeError(route, cause);
}
function navigateFrom(router, location) {
	return (opts) => router.navigate({
		...opts,
		_fromLocation: location
	});
}
async function contextualize(router, lane, options, end, planSuccessfulLane, retainedEnd) {
	const [location, matches] = lane;
	const signal = options[0].signal;
	const preload = !!options[4];
	for (let index = options[7] ?? 0; index < end; index++) {
		const match = matches[index];
		const route = getRoute(router, match);
		match.abortController = options[0];
		const parentContext = matches[index - 1]?.context ?? router.options.context ?? {};
		const common = {
			params: match.params,
			location,
			navigate: navigateFrom(router, location),
			buildLocation: router.buildLocation,
			cause: preload ? "preload" : match.cause,
			abortController: options[0],
			preload,
			matches,
			routeId: route.id
		};
		let context = parentContext;
		try {
			let routeContext = match._ctx;
			if (!routeContext && route.options.context) routeContext = match._ctx = route.options.context({
				...common,
				deps: match.loaderDeps,
				context: parentContext
			}) || {};
			context = {
				...parentContext,
				...routeContext
			};
			match.context = context;
		} catch (cause) {
			releaseFlight(router, match);
			return [index, normalizeLaneError(route, cause, options)];
		}
		if (signal.aborted || !options[2]()) {
			options[0].abort();
			return [index, [CANCELED]];
		}
		const validationError = match.paramsError ?? match.searchError;
		if (validationError !== void 0) {
			releaseFlight(router, match);
			return [index, normalizeLaneError(route, validationError, options)];
		}
		const beforeLoad = route.options.beforeLoad;
		if (!beforeLoad) continue;
		const beforeLoadContext = {
			...common,
			search: match.search,
			context,
			...router.options.additionalContext
		};
		const previousStatus = match.status;
		if (previousStatus === "success" && index >= retainedEnd) match.status = "pending";
		options[8]?.();
		try {
			setFetching(router, match, "beforeLoad", options[0]);
			const result = await waitFor(beforeLoad(beforeLoadContext), signal);
			if (!options[2]()) {
				options[0].abort();
				return [index, [CANCELED]];
			}
			const outcome = normalize(result, false, route.id);
			if (outcome[0] !== SUCCESS) {
				releaseFlight(router, match);
				return [index, outcome];
			}
			match.context = {
				...context,
				...result
			};
		} catch (cause) {
			releaseFlight(router, match);
			return [index, normalizeLaneError(route, cause, options)];
		} finally {
			if (previousStatus === "success" && match.status === "pending") match.status = "success";
			setFetching(router, match, false, options[0]);
		}
	}
	planSuccessfulLane();
}
function releaseOwnedFlight(router, match, flight) {
	if (!flight || --flight[2]) return;
	if (router._flights?.get(match.id) === flight) {
		const current = router._tx;
		if (current && !current[0].signal.aborted && !current[3].includes(match) && current[3].some((candidate) => candidate.id === match.id) && current[3].some((candidate) => candidate.isFetching === "beforeLoad")) return;
		router._flights.delete(match.id);
	}
	return flight[1];
}
function releaseFlight(router, match) {
	const flight = match._flight;
	match._flight = void 0;
	releaseOwnedFlight(router, match, flight)?.abort();
}
function transferMatchResources(router, previous, next, deferSameIdFlight) {
	const abort = [];
	for (const match of previous) if (!next?.includes(match)) {
		const flight = match._flight;
		match._flight = void 0;
		if (deferSameIdFlight && flight?.[2] === 1 && router._flights?.get(match.id) === flight && next?.some((candidate) => candidate.id === match.id)) flight[2] = 0;
		else {
			const controller = releaseOwnedFlight(router, match, flight);
			if (controller) abort.push(controller);
		}
	}
	for (const controller of abort) controller.abort();
}
function acquireMatchResources(matches) {
	for (const match of matches) {
		const flight = match._flight;
		if (flight) flight[2]++;
	}
}
function setFetching(router, match, value, owner) {
	match.isFetching = value;
	if (owner && router._tx?.[0] !== owner) return;
	const store = router.stores.byRoute.get(match.routeId);
	const presented = store?.get();
	if (presented?.id === match.id) store.set({
		...presented,
		isFetching: value
	});
}
function getLoaderContext(router, lane, match, route, controller, parentMatchPromise, preload) {
	const location = lane[0];
	return {
		params: match.params,
		location,
		navigate: navigateFrom(router, location),
		cause: preload ? "preload" : match.cause,
		abortController: controller,
		preload,
		deps: match.loaderDeps,
		parentMatchPromise,
		context: match.context,
		route,
		...router.options.additionalContext
	};
}
async function loadResource(router, lane, match, route, loader, parentMatchPromise, preload, owner) {
	const signal = owner.signal;
	if (signal.aborted) return [CANCELED];
	if (!loader) return [SUCCESS, void 0];
	let flight = match._flight;
	setFetching(router, match, "loader", owner);
	try {
		if (!flight) {
			const controller = new AbortController();
			flight = [
				Promise.resolve().then(() => loader(getLoaderContext(router, lane, match, route, controller, parentMatchPromise, preload))).then((value) => normalize(value, false, route.id), (cause) => normalize(cause, true, route.id)).then((result) => {
					if (result[0] !== SUCCESS && router._flights?.get(match.id) === flight) {
						router._flights.delete(match.id);
						if (!flight[2]) controller.abort();
					}
					return result[0] === ERROR && flight[2] ? normalizeError(route, result[1]) : result;
				}),
				controller,
				1
			];
			(router._flights ??= /* @__PURE__ */ new Map()).set(match.id, flight);
		}
		match._flight = flight;
		match.abortController = flight[1];
		return await waitFor(flight[0], signal);
	} catch (cause) {
		if (cause !== signal) throw cause;
		releaseFlight(router, match);
		return [CANCELED];
	} finally {
		setFetching(router, match, false, owner);
	}
}
function settleInto(match, result, preload) {
	if (result[0] === SUCCESS) {
		match.loaderData = result[1];
		match.error = void 0;
		match.status = "success";
		match.invalid = false;
		match.updatedAt = Date.now();
		match.preload = preload;
	} else if (result[0] !== REDIRECTED) {
		match.status = "success";
		match.error = void 0;
		match.invalid = true;
	}
}
function cacheLoaderMatch(router, match, planned) {
	const current = router._cache.get(match.id);
	if (current !== planned || router._committed.some((candidate) => candidate.id === match.id && candidate._flight === match._flight)) return;
	const cached = {
		...match,
		_notFound: void 0,
		context: {}
	};
	if (cached._flight) cached._flight[2]++;
	router._cache.set(match.id, cached);
	if (current) releaseFlight(router, current);
}
function getParentSnapshot(match, outcome) {
	if (outcome[0] === ERROR || outcome[0] === NOT_FOUND) return {
		...match,
		status: outcome[0] === ERROR ? "error" : "notFound",
		error: outcome[1],
		_flight: void 0
	};
	return match;
}
function createLoaderTask(router, lane, index, tasks, semanticParent, options, retainedEnd) {
	const match = lane[1][index];
	const route = getRoute(router, match);
	const preload = !!options[4];
	const plannedCacheMatch = router._cache.get(match.id);
	let configured;
	let reload = false;
	let reloadFailure;
	try {
		if (match.status === "success") {
			configured = route.options.shouldReload;
			if (typeof configured === "function") configured = configured(getLoaderContext(router, lane, match, route, options[0], semanticParent, preload));
			if (!options[2]()) {
				options[0].abort();
				reloadFailure = [CANCELED];
			}
		}
		if (!reloadFailure) if (match.status !== "success") reload = true;
		else {
			const staleAge = options[4] || match.preload ? route.options.preloadStaleTime ?? router.options.defaultPreloadStaleTime ?? 3e4 : route.options.staleTime ?? router.options.defaultStaleTime ?? 0;
			reload = !!(match.invalid || configured || configured === void 0 && Date.now() - match.updatedAt >= staleAge && (options[6] || match.cause === "enter" || options[3].some((candidate) => candidate.routeId === match.routeId && candidate.id !== match.id)));
		}
	} catch (cause) {
		match.invalid = true;
		releaseFlight(router, match);
		reloadFailure = normalizeLaneError(route, cause, options);
	}
	const routeLoader = route.options.loader;
	const loader = typeof routeLoader === "function" ? routeLoader : routeLoader?.handler;
	let donor = (!preload || route.options.preload !== false) && routeLoader && true ? router._flights?.get(match.id) : void 0;
	if (donor === match._flight || reloadFailure) donor = void 0;
	else if (donor && !reload && !preload && configured === void 0) reload = true;
	else if (!reload) donor = void 0;
	const background = !!(routeLoader && reload && match.status === "success" && !preload && !options[5] && ((typeof routeLoader === "function" ? void 0 : routeLoader?.staleReloadMode) ?? router.options.defaultStaleReloadMode) !== "blocking");
	const loaded = reload && (!preload || route.options.preload !== false);
	const blocking = loaded && !background && (match.status !== "success" || !!routeLoader);
	const onLazyReady = route.lazyFn && route._lazy !== true ? options[8] : void 0;
	if (loaded && !routeLoader) {
		match.invalid = false;
		match.updatedAt = Date.now();
	}
	if (donor) donor[2]++;
	if (blocking) {
		const acceptedFlight = match._flight;
		match._flight = donor;
		releaseOwnedFlight(router, match, acceptedFlight)?.abort();
		if (match.status === "success" && index >= retainedEnd) match.status = "pending";
		options[8]?.();
	}
	if (!loaded) match.isFetching = false;
	const outcome = (reloadFailure ? Promise.resolve(reloadFailure) : !blocking ? Promise.resolve([SUCCESS, match.loaderData]) : loadResource(router, lane, match, route, loader, semanticParent, preload, options[0])).then((result) => {
		if (blocking) {
			settleInto(match, result, preload);
			if (result[0] === SUCCESS) {
				if (routeLoader && !options[0].signal.aborted && true) cacheLoaderMatch(router, match, plannedCacheMatch);
				match.status = "pending";
			}
		}
		return result;
	});
	const chunkFailure = waitFor(Promise.resolve().then(() => loadRouteChunk(route, void 0, onLazyReady)), options[0].signal).then(() => void 0, (cause) => [index, normalizeLaneError(route, cause, options)]).then((failure) => outcome.then((result) => {
		if (blocking && !failure && result[0] === SUCCESS && match.status === "pending" && options[2]()) {
			match.status = "success";
			options[8]?.();
		}
		return failure;
	}));
	tasks.push([
		index,
		outcome,
		chunkFailure
	]);
	if (!background) return outcome.then((result) => getParentSnapshot(match, result));
	const candidate = {
		...match,
		status: "pending",
		preload: false,
		_flight: donor
	};
	match.invalid = false;
	match.isFetching = "loader";
	const backgroundOutcome = loadResource(router, lane, candidate, route, loader, semanticParent, false, options[0]).then((result) => {
		match.isFetching = false;
		settleInto(candidate, result, false);
		return result;
	});
	(lane[2] ??= []).push([
		index,
		backgroundOutcome,
		chunkFailure,
		candidate
	]);
	return backgroundOutcome.then((result) => getParentSnapshot(candidate, result));
}
async function getNotFoundBoundary(router, matches, indexed, signal, fallback = 0) {
	const cause = indexed?.[1][1];
	let index = cause?.routeId ? matches.findIndex((match) => match.routeId === cause.routeId) : indexed?.[0] ?? matches.length - 1;
	if (index < 0) index = 0;
	for (let i = index; i >= 0; i--) {
		const route = getRoute(router, matches[i]);
		const loading = loadRouteChunk(route, false);
		if (loading) try {
			await waitFor(loading, signal);
		} catch (cause) {
			if (cause === signal) throw cause;
		}
		if (route.options.notFoundComponent) return i;
	}
	return cause?.routeId ? index : fallback;
}
function discardBackground(router, lane) {
	if (lane[2]) {
		transferMatchResources(router, lane[2].map((task) => task[3]));
		lane[2] = void 0;
	}
}
async function settleTasks(tasks, serialFailure, redirectTasks, gate) {
	let loaderFailure;
	try {
		await Promise.all(tasks.map((task) => task[1].then(async (outcome) => {
			const taskIndex = task[0];
			if (gate && taskIndex >= await gate) return;
			if (outcome[0] >= REDIRECTED) throw [taskIndex, outcome];
			if (!loaderFailure && outcome[0] !== SUCCESS) {
				loaderFailure = [taskIndex, outcome];
				await Promise.all((redirectTasks ?? []).map((nextTask) => {
					if (nextTask[0] <= taskIndex) return;
					return nextTask[1].then((nextOutcome) => {
						if (nextOutcome[0] === REDIRECTED) throw [nextTask[0], nextOutcome];
					});
				}));
			}
		})));
	} catch (cause) {
		return cause;
	}
	return serialFailure ?? loaderFailure;
}
async function reduceLane(router, lane, tasks, controller, redirects, settlement, onReady) {
	const matches = lane[1];
	let failure = await settlement;
	let redirectLimitExceeded = false;
	const plannedBoundary = matches.findIndex((match) => match._notFound);
	const boundaryOf = (found) => found[1][0] === NOT_FOUND ? getNotFoundBoundary(router, matches, found, controller.signal) : found[0];
	let readinessEnd = plannedBoundary < 0 ? matches.length : plannedBoundary;
	if ((failure?.[1][0] ?? 0) >= REDIRECTED) readinessEnd = 0;
	else if (failure) {
		readinessEnd = failure[2] ??= await boundaryOf(failure);
		for (const task of tasks) {
			if (task[0] >= readinessEnd) break;
			const outcome = await task[1];
			if (outcome[0] !== SUCCESS && outcome[0] < REDIRECTED && !("loaderData" in matches[task[0]])) {
				failure = [task[0], outcome];
				readinessEnd = failure[2] = await boundaryOf(failure);
				break;
			}
		}
	}
	for (const task of tasks) {
		if (task[0] >= readinessEnd) break;
		const chunkFailure = await task[2];
		if (!chunkFailure) continue;
		failure = chunkFailure;
		break;
	}
	if ((failure?.[1][0] ?? 0) >= REDIRECTED) {
		const outcome = failure[1];
		if (outcome[0] !== REDIRECTED || outcome[1].options.reloadDocument || redirects < 20) {
			discardBackground(router, lane);
			return outcome;
		}
		redirectLimitExceeded = true;
		failure = [0, [ERROR, /* @__PURE__ */ new Error("Too many redirects")]];
	}
	const boundary = failure ? failure[2] ?? await boundaryOf(failure) : plannedBoundary;
	if (boundary >= 0) {
		const outcome = failure?.[1];
		const kind = outcome?.[0];
		const match = matches[boundary];
		const cause = outcome?.[1];
		const install = () => {
			if (outcome) {
				match._notFound = void 0;
				if (kind === ERROR) match.status = "error";
				else {
					cause.routeId = match.routeId;
					if (match.routeId === router.routeTree.id) {
						match.status = "success";
						match._notFound = true;
					} else match.status = "notFound";
				}
				match.error = cause;
				match.isFetching = false;
			}
		};
		install();
		const route = getRoute(router, match);
		try {
			await waitFor(outcome ? Promise.resolve().then(() => loadRouteChunk(route, kind === ERROR ? "errorComponent" : "notFoundComponent")) : Promise.all([loadRouteChunk(route), loadRouteChunk(route, "notFoundComponent")]), controller.signal);
		} catch (cause) {
			if (cause === controller.signal) {
				discardBackground(router, lane);
				return [CANCELED];
			}
		}
		if (!outcome) {
			match.status = "success";
			onReady?.();
		} else if (redirectLimitExceeded) {
			controller.abort();
			await Promise.all([
				...tasks.map((task) => task[1]),
				...tasks.map((task) => task[2]),
				...(lane[2] ?? []).map((task) => task[1])
			]);
			discardBackground(router, lane);
			transferMatchResources(router, matches);
			install();
		}
	}
	return lane;
}
async function projectLane(router, lane, signal, start = 0, end = lane[1].length) {
	const matches = lane[1];
	for (let index = start; index < end; index++) {
		const match = matches[index];
		const routeOptions = getRoute(router, match).options;
		if (routeOptions.head || routeOptions.scripts) try {
			const context = {
				ssr: router.options.ssr,
				matches,
				match,
				params: match.params,
				loaderData: match.loaderData
			};
			const [head, scripts] = await waitFor(Promise.all([routeOptions.head?.(context), routeOptions.scripts?.(context)]), signal);
			match.meta = head?.meta;
			match.links = head?.links;
			match.headScripts = head?.scripts;
			match.styles = head?.styles;
			match.scripts = scripts;
		} catch (cause) {
			if (cause === signal) break;
			console.error(cause);
		}
		if (match.status !== "success" || match._notFound) break;
	}
	return lane;
}
async function executeClientLane(router, location, matches, options) {
	const matched = [location, matches];
	const presented = router.stores.matches.get();
	let plannedBoundary = matches.findIndex((match) => match._notFound);
	if (router.options.notFoundMode !== "root" && plannedBoundary >= 0) {
		const boundary = await getNotFoundBoundary(router, matched[1], void 0, options[0].signal, plannedBoundary);
		if (boundary !== plannedBoundary) {
			matches[plannedBoundary]._notFound = void 0;
			matches[boundary]._notFound = true;
		}
		plannedBoundary = boundary;
	}
	let end = plannedBoundary < 0 ? matches.length : plannedBoundary + 1;
	let retainedEnd = 0;
	while (retainedEnd < end && retainedEnd !== plannedBoundary) {
		const match = matches[retainedEnd];
		const committed = options[3][retainedEnd];
		const visible = presented[retainedEnd];
		if (committed?.id !== match.id || committed.status !== "success" || committed._notFound || match.preload || visible?.id !== match.id || visible.status !== "success" || visible._notFound) break;
		retainedEnd++;
	}
	const tasks = [];
	const start = options[7] ?? 0;
	let semanticParent = start ? Promise.resolve(matched[1][start - 1]) : void 0;
	const planSuccessfulLane = () => {
		for (let index = start; index < end; index++) {
			if (options[0].signal.aborted) break;
			semanticParent = createLoaderTask(router, matched, index, tasks, semanticParent, options, retainedEnd);
		}
	};
	const failure = await contextualize(router, matched, options, end, planSuccessfulLane, retainedEnd);
	if (failure) {
		options[5] = true;
		end = failure[0];
		if (failure[1][0] === NOT_FOUND) {
			failure[2] = await getNotFoundBoundary(router, matched[1], failure, options[0].signal);
			end = Math.min(end, failure[2] + 1);
		} else if (failure[1][0] >= REDIRECTED) end = 0;
		planSuccessfulLane();
	}
	if (options[2]() && !options[4]) {
		const abort = [];
		for (const [id, flight] of router._flights ?? []) if (!flight[2]) {
			router._flights.delete(id);
			abort.push(flight[1]);
		}
		for (const controller of abort) controller.abort();
	}
	let reduced;
	try {
		const reduction = reduceLane(router, matched, tasks, options[0], options[1], settleTasks(tasks, failure, matched[2]), options[8]);
		if (matched[2]?.length) matched[3] = settleTasks(matched[2], void 0, void 0, reduction.then((foreground) => isControl(foreground) ? 0 : _getRenderedMatches(foreground[1]).length, () => 0));
		reduced = await reduction;
	} catch (cause) {
		discardBackground(router, matched);
		throw cause;
	}
	if (isControl(reduced)) return reduced;
	return projectLane(router, reduced, options[0].signal, options[7] === reduced[1].length ? options[7] : 0);
}
function offerPending(router, tx) {
	if (router._tx !== tx) return;
	let session = router._pending;
	let tookOver = false;
	const sessionMatchId = session?.[0][3][session[1]]?.id;
	if (session?.[0] !== tx) if (session && tx[3][session[1]]?.id === sessionMatchId) {
		session[0] = tx;
		tookOver = true;
	} else {
		clearTimeout(session?.[3]);
		router._pending = session = void 0;
	}
	const matches = tx[3];
	const presented = router.stores.matches.get();
	let boundary = -1;
	let delay;
	let min;
	let component;
	let presentedPending = false;
	for (let index = 0; index < matches.length; index++) {
		const match = matches[index];
		const success = match.status === "success";
		presentedPending = presented[index]?.id === match.id && presented[index]?.status === "pending";
		if (success && !presentedPending) continue;
		const route = getRoute(router, match);
		delay = success && presentedPending || match.invalid ? 0 : route.options.pendingMs ?? router.options.defaultPendingMs;
		component = route.options.pendingComponent ?? router.options.defaultPendingComponent;
		if (!component || typeof delay !== "number" || delay === Infinity) return;
		boundary = index;
		min = route.options.pendingMinMs ?? router.options.defaultPendingMinMs ?? 0;
		break;
	}
	if (boundary < 0) return;
	const matchId = matches[boundary].id;
	if (!session || session[1] !== boundary || sessionMatchId !== matchId) {
		clearTimeout(session?.[3]);
		router._pending = session = [
			tx,
			boundary,
			presentedPending ? Date.now() + min : tx[4] + delay,
			void 0,
			presentedPending ? Promise.resolve(true) : void 0,
			component
		];
	}
	if (session[4] && !tookOver && session[5] === component) return;
	session[5] = component;
	if (!session[4]) {
		clearTimeout(session[3]);
		const remaining = session[2] - Date.now();
		if (remaining > 0) {
			session[3] = setTimeout(() => offerPending(router, tx), remaining);
			return;
		}
		session[2] = 0;
	}
	const offered = matches.map((match) => ({
		...match,
		_flight: void 0
	}));
	offered[boundary].status = "pending";
	const ack = router.startTransition(() => router.stores.setMatches(offered), offered).then((rendered) => {
		if (rendered && router._pending === session && session[4] === ack && !session[2]) session[2] = Date.now() + min;
		return rendered;
	});
	session[4] = ack;
}
function finishPending(router, tx) {
	const session = router._pending;
	if (session?.[0] === tx) {
		clearTimeout(session[3]);
		router._pending = void 0;
	}
}
function publishMatches(router, matches) {
	router._committed = matches;
	router.stores.setMatches(matches);
}
function discardLane(router, lane) {
	transferMatchResources(router, lane[1]);
	discardBackground(router, lane);
}
function commitMatches(router, tx, matches, resolvedPrefix) {
	const previous = router._committed;
	const previousCached = router._cache;
	for (const match of matches) {
		match.preload = false;
		if (resolvedPrefix) match._assetEnd = void 0;
	}
	const cut = _getRenderedMatches(matches).length;
	const cached = /* @__PURE__ */ new Map();
	const now = Date.now();
	for (const match of [...previous, ...previousCached.values()]) {
		if (match.status !== "success" || matches.some((candidate, index) => candidate.id === match.id && (index < cut || candidate.status === "success"))) continue;
		const route = getRoute(router, match);
		if (!route.options.loader || now - match.updatedAt >= (match.preload ? route.options.preloadGcTime ?? router.options.defaultPreloadGcTime ?? 3e5 : route.options.gcTime ?? router.options.defaultGcTime ?? 3e5)) continue;
		cached.set(match.id, previousCached.get(match.id) === match ? match : {
			...match,
			_flight: void 0,
			isFetching: false,
			context: {}
		});
	}
	tx[3] = [];
	router._cache = cached;
	publishMatches(router, matches);
	transferMatchResources(router, [...previousCached.values(), ...previous], [...matches, ...cached.values()]);
	runRouteLifecycle(router, previous, matches, () => router._tx === tx);
}
async function awaitCurrent(router, owner) {
	let current = router._tx;
	while (current && current !== owner) {
		await current[5];
		if (router._tx === current) return;
		current = router._tx;
	}
}
async function followRedirect(router, tx, redirect) {
	await router.navigate({
		...redirect.options,
		replace: true,
		ignoreBlocker: true,
		_redirects: tx[1] + 1
	});
}
function restoreCommitted(router, tx) {
	finishPending(router, tx);
	tx[0].abort();
	transferMatchResources(router, tx[3]);
	tx[3] = [];
	if (router._tx !== tx) return;
	router.batch(() => {
		router.stores.status.set("idle");
		router.stores.setMatches(router._committed);
	});
	if (router._tx === tx) {
		router._commitPromise?.resolve();
		router._commitPromise = void 0;
	}
}
async function runBackground(router, tx, base, tasks, settlement) {
	const next = base.map((match) => ({ ...match }));
	acquireMatchResources(next);
	for (const task of tasks) {
		releaseFlight(router, next[task[0]]);
		next[task[0]] = task[3];
	}
	const lane = [tx[2], next];
	let reduced;
	try {
		reduced = await reduceLane(router, lane, tasks, tx[0], tx[1], settlement);
	} catch (cause) {
		transferMatchResources(router, next);
		throw cause;
	}
	if (isControl(reduced)) {
		transferMatchResources(router, next);
		if (reduced[0] === REDIRECTED && router._tx === tx && router._committed === base) await followRedirect(router, tx, reduced[1]);
		return;
	}
	const projected = await projectLane(router, reduced, tx[0].signal);
	if (router._tx !== tx || router._committed !== base) {
		transferMatchResources(router, projected[1]);
		return;
	}
	for (const match of projected[1]) {
		const cached = router._cache.get(match.id);
		if (cached?._flight && cached._flight === match._flight) {
			router._cache.delete(match.id);
			releaseFlight(router, cached);
		}
	}
	publishMatches(router, projected[1]);
	transferMatchResources(router, base, projected[1]);
}
async function runClientTransaction(router, tx, forceStaleReload, onReady, sync, resolvedPrefix) {
	const options = [
		tx[0],
		tx[1],
		() => router._tx === tx && !!tx[3].length,
		router._committed,
		void 0,
		sync,
		forceStaleReload,
		resolvedPrefix,
		onReady
	];
	const result = await executeClientLane(router, tx[2], tx[3], options);
	if (isControl(result)) {
		if (result[0] === REDIRECTED && router._tx === tx) {
			finishPending(router, tx);
			transferMatchResources(router, tx[3]);
			tx[3] = [];
			if (router._tx === tx) await followRedirect(router, tx, result[1]);
		} else restoreCommitted(router, tx);
		return;
	}
	const pending = router._pending;
	if (pending?.[0] === tx) {
		clearTimeout(pending[3]);
		if (pending[4]) {
			const signal = tx[0].signal;
			let rendered = false;
			try {
				rendered = await waitFor(pending[4], signal);
			} catch (cause) {
				if (cause !== signal) throw cause;
			}
			if (rendered && router._pending === pending && pending[0] === tx) {
				const remaining = pending[2] - Date.now();
				if (remaining > 0) {
					try {
						await waitFor(new Promise((resolve) => {
							pending[3] = setTimeout(resolve, remaining);
						}), signal);
					} catch {}
					clearTimeout(pending[3]);
				}
			}
		}
	}
	if (router._tx !== tx) {
		finishPending(router, tx);
		discardLane(router, result);
		return;
	}
	const toLocation = tx[2];
	const changeInfo = getLocationChangeInfo(toLocation, router.stores.resolvedLocation.get());
	const background = result[2];
	await router.startViewTransition(async () => {
		if (router._tx !== tx) {
			discardLane(router, result);
			return;
		}
		const commit = () => {
			finishPending(router, tx);
			commitMatches(router, tx, result[1], resolvedPrefix);
			if (router._tx !== tx) return;
			router.emit({
				type: "onLoad",
				...changeInfo
			});
			if (router._tx === tx) router.emit({
				type: "onBeforeRouteMount",
				...changeInfo
			});
		};
		const rendered = await router.startTransition(commit, result[1]);
		if (router._tx !== tx) {
			discardBackground(router, result);
			return;
		}
		if (background?.length) runBackground(router, tx, result[1], background, result[3]).catch(console.error);
		router.batch(() => {
			router.stores.resolvedLocation.set(toLocation);
			router.stores.status.set("idle");
			if (router._tx === tx) router.emit({
				type: "onResolved",
				...changeInfo
			});
			if (rendered && router._tx === tx) router.emit({
				type: "onRendered",
				...changeInfo
			});
		});
		if (router._tx !== tx) return;
		router._commitPromise?.resolve();
		router._commitPromise = void 0;
	});
}
async function loadClientRoute(router, opts) {
	const previousOwner = router._tx;
	const resolvedLocation = router.stores.resolvedLocation.get();
	const previousLocation = resolvedLocation ?? router.stores.location.get();
	const location = router.latestLocation;
	const pendingLocation = router._pendingLocation;
	const redirects = pendingLocation?.href === location.href ? pendingLocation._redirects ?? 0 : 0;
	const handoff = router._handoff;
	const hydrationController = handoff?.[0]();
	const preflight = new AbortController();
	const previousPreflight = router._preflight;
	router._preflight = preflight;
	if (!hydrationController) handoff?.[1]();
	previousPreflight?.abort();
	if (preflight.signal.aborted) {
		await awaitCurrent(router, previousOwner);
		return;
	}
	const changeInfo = getLocationChangeInfo(location, resolvedLocation);
	router.emit({
		type: "onBeforeNavigate",
		...changeInfo
	});
	if (!preflight.signal.aborted) router.emit({
		type: "onBeforeLoad",
		...changeInfo
	});
	if (preflight.signal.aborted) {
		await awaitCurrent(router, previousOwner);
		return;
	}
	const sameHref = previousLocation.href === location.href;
	let matches;
	let controller = preflight;
	try {
		matches = router.matchRoutes(location, { _controller: preflight });
		acquireMatchResources(matches);
	} catch (cause) {
		preflight.abort();
		if (!isRedirect(cause)) {
			await awaitCurrent(router);
			router._commitPromise?.resolve();
			router._commitPromise = void 0;
			return;
		}
		await router.navigate({
			...cause.options,
			replace: true,
			ignoreBlocker: true
		});
		await awaitCurrent(router, previousOwner);
		return;
	}
	const resolvedPrefix = hydrationController ? handoff[1](matches) : void 0;
	if (resolvedPrefix) controller = hydrationController;
	else hydrationController?.abort();
	if (preflight.signal.aborted) {
		transferMatchResources(router, matches);
		await awaitCurrent(router, previousOwner);
		return;
	}
	router._preflight = void 0;
	const tx = [
		controller,
		redirects,
		location,
		matches,
		Date.now(),
		Promise.resolve().then(() => runClientTransaction(router, tx, sameHref, () => offerPending(router, tx), opts?.sync, resolvedPrefix)).catch(() => {
			if (router._tx === tx) restoreCommitted(router, tx);
		})
	];
	router._tx = tx;
	if (previousOwner) {
		for (const match of router.stores.matches.get()) {
			if (router._tx !== tx) break;
			if (match.isFetching) setFetching(router, match, false);
		}
		previousOwner[0].abort();
		transferMatchResources(router, previousOwner[3], tx[3], true);
	}
	if (router._tx !== tx) {
		transferMatchResources(router, tx[3]);
		tx[3] = [];
		await awaitCurrent(router, tx);
		return;
	}
	router.batch(() => {
		router.stores.status.set("pending");
		router.stores.location.set(location);
	});
	if (!resolvedLocation && !matches.some((match) => match._notFound)) offerPending(router, tx);
	try {
		await tx[5];
	} finally {
		await awaitCurrent(router, tx);
	}
}
async function preloadClientRoute(router, opts, redirects = 0) {
	if (redirects > 20) return;
	const location = opts._builtLocation ?? router.buildLocation(opts);
	const base = router._committed;
	const controller = new AbortController();
	let matches;
	try {
		matches = router.matchRoutes(location, { _controller: controller });
		acquireMatchResources(matches);
	} catch (cause) {
		controller.abort();
		if (!isNotFound(cause)) console.error(cause);
		return;
	}
	(router._preloads ??= /* @__PURE__ */ new Map()).set(controller, matches);
	let active;
	try {
		let result;
		try {
			result = await executeClientLane(router, location, matches, [
				controller,
				redirects,
				() => true,
				base,
				true
			]);
		} finally {
			active = router._preloads.delete(controller);
			transferMatchResources(router, matches);
			controller.abort();
		}
		if (!isControl(result)) return result[1];
		if (active && result[0] === REDIRECTED && !result[1].options.reloadDocument) return preloadClientRoute(router, {
			...result[1].options,
			_fromLocation: location
		}, redirects + 1);
	} catch (cause) {
		if (!isNotFound(cause)) console.error(cause);
	}
}

//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.171.22/node_modules/@tanstack/router-core/dist/esm/link.js
var preloadWarning = "Error preloading route! ☝️";

//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.171.22/node_modules/@tanstack/router-core/dist/esm/route.js
var BaseRoute = class {
	get to() {
		return this._to;
	}
	get id() {
		return this._id;
	}
	get path() {
		return this._path;
	}
	get fullPath() {
		return this._fullPath;
	}
	constructor(options) {
		this.init = (opts) => {
			this.originalIndex = opts.originalIndex;
			const options = this.options;
			const isRoot = !options?.path && !options?.id;
			this.parentRoute = this.options.getParentRoute?.();
			if (isRoot) this._path = rootRouteId;
			else if (!this.parentRoute) invariant();
			let path = isRoot ? rootRouteId : options?.path;
			if (path && path !== "/") path = trimPathLeft(path);
			const customId = options?.id || path;
			let id = isRoot ? rootRouteId : joinPaths([this.parentRoute.id === "__root__" ? "" : this.parentRoute.id, customId]);
			if (path === "__root__") path = "/";
			if (id !== "__root__") id = joinPaths(["/", id]);
			const fullPath = id === "__root__" ? "/" : joinPaths([this.parentRoute.fullPath, path]);
			this._path = path;
			this._id = id;
			this._fullPath = fullPath;
			this._to = trimPathRight(fullPath);
		};
		this.addChildren = (children) => {
			return this._addFileChildren(children);
		};
		this._addFileChildren = (children) => {
			if (Array.isArray(children)) this.children = children;
			if (typeof children === "object" && children !== null) this.children = Object.values(children);
			return this;
		};
		this._addFileTypes = () => {
			return this;
		};
		this.updateLoader = (options) => {
			Object.assign(this.options, options);
			return this;
		};
		this.update = (options) => {
			Object.assign(this.options, options);
			return this;
		};
		this.lazy = (lazyFn) => {
			this.lazyFn = lazyFn;
			return this;
		};
		this.redirect = (opts) => redirect({
			from: this.fullPath,
			...opts
		});
		this.options = options || {};
		this.isRoot = !options?.getParentRoute;
		if (options?.id && options?.path) throw new Error(`Route cannot have both an 'id' and a 'path' option.`);
	}
};
var BaseRootRoute = class extends BaseRoute {
	constructor(options) {
		super(options);
	}
};

//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.171.22/node_modules/@tanstack/router-core/dist/esm/scroll-restoration-script/client.js
function getScrollRestorationScriptForRouter(_router) {
	return null;
}

//#endregion
export { hasKeys as _, RouterCore as a, createNonReactiveReadonlyStore as c, exactPathTest as d, removeTrailingSlash as f, functionalUpdate as g, deepEqual as h, preloadWarning as i, rootRouteId as l, invariant as m, BaseRootRoute as n, getLocationChangeInfo as o, trimPathRight as p, BaseRoute as r, createNonReactiveMutableStore as s, getScrollRestorationScriptForRouter as t, isNotFound as u, isDangerousProtocol as v, replaceEqualDeep as y };
import { M as init_preact_module, P as l } from "./@dnd-kit/accessibility-CY2E8eFF.js";

//#region node_modules/.pnpm/preact@10.29.7/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
init_preact_module();
var f = 0;
var i = Array.isArray;
function u(e, t, n, o, i, u) {
	t || (t = {});
	var a, c, p = t;
	if ("ref" in p) for (c in p = {}, t) "ref" == c ? a = t[c] : p[c] = t[c];
	var l$1 = {
		type: e,
		props: p,
		key: n,
		ref: a,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: --f,
		__i: -1,
		__u: 0,
		__source: i,
		__self: u
	};
	if ("function" == typeof e && (a = e.defaultProps)) for (c in a) void 0 === p[c] && (p[c] = a[c]);
	return l.vnode && l.vnode(l$1), l$1;
}

//#endregion
export { u as t };
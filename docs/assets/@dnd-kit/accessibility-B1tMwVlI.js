import { n as __esmMin, r as __exportAll } from "../rolldown-runtime-DgArcLmv.js";

//#region node_modules/.pnpm/preact@10.29.7/node_modules/preact/dist/preact.module.js
function m$1(n, l) {
	for (var u in l) n[u] = l[u];
	return n;
}
function b$1(n) {
	n && n.parentNode && n.parentNode.removeChild(n);
}
function k$2(l, u, t) {
	var i, r, o, e = {};
	for (o in u) "key" == o ? i = u[o] : "ref" == o ? r = u[o] : e[o] = u[o];
	if (arguments.length > 2 && (e.children = arguments.length > 3 ? n.call(arguments, 2) : t), "function" == typeof l && null != l.defaultProps) for (o in l.defaultProps) void 0 === e[o] && (e[o] = l.defaultProps[o]);
	return x$2(l, e, i, r, null);
}
function x$2(n, t, i, r, o) {
	var e = {
		type: n,
		props: t,
		key: i,
		ref: r,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: null == o ? ++u$1 : o,
		__i: -1,
		__u: 0
	};
	return null == o && null != l$1.vnode && l$1.vnode(e), e;
}
function M$1() {
	return { current: null };
}
function S(n) {
	return n.children;
}
function C$2(n, l) {
	this.props = n, this.context = l;
}
function $$1(n, l) {
	if (null == l) return n.__ ? $$1(n.__, n.__i + 1) : null;
	for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
	return "function" == typeof n.type ? $$1(n) : null;
}
function I$1(n) {
	if (n.__P && n.__d) {
		var u = n.__v, t = u.__e, i = [], r = [], o = m$1({}, u);
		o.__v = u.__v + 1, l$1.vnode && l$1.vnode(o), q$2(n.__P, o, u, n.__n, n.__P.namespaceURI, 32 & u.__u ? [t] : null, i, null == t ? $$1(u) : t, !!(32 & u.__u), r), o.__v = u.__v, o.__.__k[o.__i] = o, D$2(i, o, r), u.__e = u.__ = null, o.__e != t && P$2(o);
	}
}
function P$2(n) {
	if (null != (n = n.__) && null != n.__c) return n.__e = n.__c.base = null, n.__k.some(function(l) {
		if (null != l && null != l.__e) return n.__e = n.__c.base = l.__e;
	}), P$2(n);
}
function A$2(n) {
	(!n.__d && (n.__d = !0) && i$1.push(n) && !H$1.__r++ || r$1 != l$1.debounceRendering) && ((r$1 = l$1.debounceRendering) || o$1)(H$1);
}
function H$1() {
	try {
		for (var n, l = 1; i$1.length;) i$1.length > l && i$1.sort(e$1), n = i$1.shift(), l = i$1.length, I$1(n);
	} finally {
		i$1.length = H$1.__r = 0;
	}
}
function L$1(n, l, u, t, i, r, o, e, f, c, a) {
	var s, h, p, v, y, _, g, m = t && t.__k || w$2, b = l.length;
	for (f = T$2(u, l, m, f, b), s = 0; s < b; s++) null != (p = u.__k[s]) && (h = -1 != p.__i && m[p.__i] || d$1, p.__i = s, _ = q$2(n, p, h, i, r, o, e, f, c, a), v = p.__e, p.ref && h.ref != p.ref && (h.ref && J$1(h.ref, null, p), a.push(p.ref, p.__c || v, p)), null == y && null != v && (y = v), (g = !!(4 & p.__u)) || h.__k === p.__k ? (f = j$2(p, f, n, g), g && h.__e && (h.__e = null)) : "function" == typeof p.type && void 0 !== _ ? f = _ : v && (f = v.nextSibling), p.__u &= -7);
	return u.__e = y, f;
}
function T$2(n, l, u, t, i) {
	var r, o, e, f, c, a = u.length, s = a, h = 0;
	for (n.__k = new Array(i), r = 0; r < i; r++) null != (o = l[r]) && "boolean" != typeof o && "function" != typeof o ? ("string" == typeof o || "number" == typeof o || "bigint" == typeof o || o.constructor == String ? o = n.__k[r] = x$2(null, o, null, null, null) : g$2(o) ? o = n.__k[r] = x$2(S, { children: o }, null, null, null) : void 0 === o.constructor && o.__b > 0 ? o = n.__k[r] = x$2(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : n.__k[r] = o, f = r + h, o.__ = n, o.__b = n.__b + 1, e = null, -1 != (c = o.__i = O$1(o, u, f, s)) && (s--, (e = u[c]) && (e.__u |= 2)), null == e || null == e.__v ? (-1 == c && (i > a ? h-- : i < a && h++), "function" != typeof o.type && (o.__u |= 4)) : c != f && (c == f - 1 ? h-- : c == f + 1 ? h++ : (c > f ? h-- : h++, o.__u |= 4))) : n.__k[r] = null;
	if (s) for (r = 0; r < a; r++) null != (e = u[r]) && 0 == (2 & e.__u) && (e.__e == t && (t = $$1(e)), K$1(e, e));
	return t;
}
function j$2(n, l, u, t) {
	var i, r;
	if ("function" == typeof n.type) {
		for (i = n.__k, r = 0; i && r < i.length; r++) i[r] && (i[r].__ = n, l = j$2(i[r], l, u, t));
		return l;
	}
	n.__e != l && (t && (l && n.type && !l.parentNode && (l = $$1(n)), u.insertBefore(n.__e, l || null)), l = n.__e);
	do
		l = l && l.nextSibling;
	while (null != l && 8 == l.nodeType);
	return l;
}
function F$2(n, l) {
	return l = l || [], null == n || "boolean" == typeof n || (g$2(n) ? n.some(function(n) {
		F$2(n, l);
	}) : l.push(n)), l;
}
function O$1(n, l, u, t) {
	var i, r, o, e = n.key, f = n.type, c = l[u], a = null != c && 0 == (2 & c.__u);
	if (null === c && null == e || a && e == c.key && f == c.type) return u;
	if (t > (a ? 1 : 0)) {
		for (i = u - 1, r = u + 1; i >= 0 || r < l.length;) if (null != (c = l[o = i >= 0 ? i-- : r++]) && 0 == (2 & c.__u) && e == c.key && f == c.type) return o;
	}
	return -1;
}
function z$2(n, l, u) {
	"-" == l[0] ? n.setProperty(l, null == u ? "" : u) : n[l] = null == u ? "" : "number" != typeof u || _$1.test(l) ? u : u + "px";
}
function N$1(n, l, u, t, i) {
	var r, o;
	n: if ("style" == l) if ("string" == typeof u) n.style.cssText = u;
	else {
		if ("string" == typeof t && (n.style.cssText = t = ""), t) for (l in t) u && l in u || z$2(n.style, l, "");
		if (u) for (l in u) t && u[l] == t[l] || z$2(n.style, l, u[l]);
	}
	else if ("o" == l[0] && "n" == l[1]) r = l != (l = l.replace(s$1, "$1")), o = l.toLowerCase(), l = o in n || "onFocusOut" == l || "onFocusIn" == l ? o.slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + r] = u, u ? t ? u[a$1] = t[a$1] : (u[a$1] = h$1, n.addEventListener(l, r ? v$1 : p$1, r)) : n.removeEventListener(l, r ? v$1 : p$1, r);
	else {
		if ("http://www.w3.org/2000/svg" == i) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
		else if ("width" != l && "height" != l && "href" != l && "list" != l && "form" != l && "tabIndex" != l && "download" != l && "rowSpan" != l && "colSpan" != l && "role" != l && "popover" != l && l in n) try {
			n[l] = null == u ? "" : u;
			break n;
		} catch (n) {}
		"function" == typeof u || (null == u || !1 === u && "-" != l[4] ? n.removeAttribute(l) : n.setAttribute(l, "popover" == l && 1 == u ? "" : u));
	}
}
function V$1(n) {
	return function(u) {
		if (this.l) {
			var t = this.l[u.type + n];
			if (null == u[c$1]) u[c$1] = h$1++;
			else if (u[c$1] < t[a$1]) return;
			return t(l$1.event ? l$1.event(u) : u);
		}
	};
}
function q$2(n, u, t, i, r, o, e, f, c, a) {
	var s, h, p, v, y, d, _, k, x, M, $, I, P, A, H, T, j = u.type;
	if (void 0 !== u.constructor) return null;
	128 & t.__u && (c = !!(32 & t.__u), o = [f = u.__e = t.__e]), (s = l$1.__b) && s(u);
	n: if ("function" == typeof j) {
		h = e.length;
		try {
			if (x = u.props, M = j.prototype && j.prototype.render, $ = (s = j.contextType) && i[s.__c], I = s ? $ ? $.props.value : s.__ : i, t.__c ? k = (p = u.__c = t.__c).__ = p.__E : (M ? u.__c = p = new j(x, I) : (u.__c = p = new C$2(x, I), p.constructor = j, p.render = Q$1), $ && $.sub(p), p.state || (p.state = {}), p.__n = i, v = p.__d = !0, p.__h = [], p._sb = []), M && null == p.__s && (p.__s = p.state), M && null != j.getDerivedStateFromProps && (p.__s == p.state && (p.__s = m$1({}, p.__s)), m$1(p.__s, j.getDerivedStateFromProps(x, p.__s))), y = p.props, d = p.state, p.__v = u, v) M && null == j.getDerivedStateFromProps && null != p.componentWillMount && p.componentWillMount(), M && null != p.componentDidMount && p.__h.push(p.componentDidMount);
			else {
				if (M && null == j.getDerivedStateFromProps && x !== y && null != p.componentWillReceiveProps && p.componentWillReceiveProps(x, I), u.__v == t.__v || !p.__e && null != p.shouldComponentUpdate && !1 === p.shouldComponentUpdate(x, p.__s, I)) {
					u.__v != t.__v && (p.props = x, p.state = p.__s, p.__d = !1), u.__e = t.__e, u.__k = t.__k, u.__k.some(function(n) {
						n && (n.__ = u);
					}), w$2.push.apply(p.__h, p._sb), p._sb = [], p.__h.length && e.push(p);
					break n;
				}
				null != p.componentWillUpdate && p.componentWillUpdate(x, p.__s, I), M && null != p.componentDidUpdate && p.__h.push(function() {
					p.componentDidUpdate(y, d, _);
				});
			}
			if (p.context = I, p.props = x, p.__P = n, p.__e = !1, P = l$1.__r, A = 0, M) p.state = p.__s, p.__d = !1, P && P(u), s = p.render(p.props, p.state, p.context), w$2.push.apply(p.__h, p._sb), p._sb = [];
			else do
				p.__d = !1, P && P(u), s = p.render(p.props, p.state, p.context), p.state = p.__s;
			while (p.__d && ++A < 25);
			p.state = p.__s, null != p.getChildContext && (i = m$1(m$1({}, i), p.getChildContext())), M && !v && null != p.getSnapshotBeforeUpdate && (_ = p.getSnapshotBeforeUpdate(y, d)), H = null != s && s.type === S && null == s.key ? E$1(s.props.children) : s, f = L$1(n, g$2(H) ? H : [H], u, t, i, r, o, e, f, c, a), p.base = u.__e, u.__u &= -161, p.__h.length && e.push(p), k && (p.__E = p.__ = null);
		} catch (n) {
			if (e.length = h, u.__v = null, c || null != o) {
				if (n.then) {
					for (u.__u |= c ? 160 : 128; f && 8 == f.nodeType && f.nextSibling;) f = f.nextSibling;
					null != o && (o[o.indexOf(f)] = null), u.__e = f;
				} else if (null != o) for (T = o.length; T--;) b$1(o[T]);
			} else u.__e = t.__e;
			u.__k ??= t.__k || [], n.then || B$2(u), l$1.__e(n, u, t);
		}
	} else null == o && u.__v == t.__v ? (u.__k = t.__k, u.__e = t.__e) : f = u.__e = G$1(t.__e, u, t, i, r, o, e, c, a);
	return (s = l$1.diffed) && s(u), 128 & u.__u ? void 0 : f;
}
function B$2(n) {
	n && (n.__c && (n.__c.__e = !0), n.__k && n.__k.some(B$2));
}
function D$2(n, u, t) {
	for (var i = 0; i < t.length; i++) J$1(t[i], t[++i], t[++i]);
	l$1.__c && l$1.__c(u, n), n.some(function(u) {
		try {
			n = u.__h, u.__h = [], n.some(function(n) {
				n.call(u);
			});
		} catch (n) {
			l$1.__e(n, u.__v);
		}
	});
}
function E$1(n) {
	return "object" != typeof n || null == n || n.__b > 0 ? n : g$2(n) ? n.map(E$1) : void 0 !== n.constructor ? null : m$1({}, n);
}
function G$1(u, t, i, r, o, e, f, c, a) {
	var s, h, p, v, y, w, _, m = i.props || d$1, k = t.props, x = t.type;
	if ("svg" == x ? o = "http://www.w3.org/2000/svg" : "math" == x ? o = "http://www.w3.org/1998/Math/MathML" : o || (o = "http://www.w3.org/1999/xhtml"), null != e) {
		for (s = 0; s < e.length; s++) if ((y = e[s]) && "setAttribute" in y == !!x && (x ? y.localName == x : 3 == y.nodeType)) {
			u = y, e[s] = null;
			break;
		}
	}
	if (null == u) {
		if (null == x) return document.createTextNode(k);
		u = document.createElementNS(o, x, k.is && k), c && (l$1.__m && l$1.__m(t, e), c = !1), e = null;
	}
	if (null == x) m === k || c && u.data == k || (u.data = k);
	else {
		if (e = "textarea" == x && null != k.defaultValue ? null : e && n.call(u.childNodes), !c && null != e) for (m = {}, s = 0; s < u.attributes.length; s++) m[(y = u.attributes[s]).name] = y.value;
		for (s in m) y = m[s], "dangerouslySetInnerHTML" == s ? p = y : "children" == s || s in k || "value" == s && "defaultValue" in k || "checked" == s && "defaultChecked" in k || N$1(u, s, null, y, o);
		for (s in k) y = k[s], "children" == s ? v = y : "dangerouslySetInnerHTML" == s ? h = y : "value" == s ? w = y : "checked" == s ? _ = y : c && "function" != typeof y || m[s] === y || N$1(u, s, y, m[s], o);
		if (h) c || p && (h.__html == p.__html || h.__html == u.innerHTML) || (u.innerHTML = h.__html), t.__k = [];
		else if (p && (u.innerHTML = ""), L$1("template" == t.type ? u.content : u, g$2(v) ? v : [v], t, i, r, "foreignObject" == x ? "http://www.w3.org/1999/xhtml" : o, e, f, e ? e[0] : i.__k && $$1(i, 0), c, a), null != e) for (s = e.length; s--;) b$1(e[s]);
		c && "textarea" != x || (s = "value", "progress" == x && null == w ? u.removeAttribute("value") : null != w && (w !== u[s] || "progress" == x && !w || "option" == x && w != m[s]) && N$1(u, s, w, m[s], o), s = "checked", null != _ && _ != u[s] && N$1(u, s, _, m[s], o));
	}
	return u;
}
function J$1(n, u, t) {
	try {
		if ("function" == typeof n) {
			var i = "function" == typeof n.__u;
			i && n.__u(), i && null == u || (n.__u = n(u));
		} else n.current = u;
	} catch (n) {
		l$1.__e(n, t);
	}
}
function K$1(n, u, t) {
	var i, r;
	if (l$1.unmount && l$1.unmount(n), (i = n.ref) && (i.current && i.current != n.__e || J$1(i, null, u)), null != (i = n.__c)) {
		if (i.componentWillUnmount) try {
			i.componentWillUnmount();
		} catch (n) {
			l$1.__e(n, u);
		}
		i.base = i.__P = i.__n = null;
	}
	if (i = n.__k) for (r = 0; r < i.length; r++) i[r] && K$1(i[r], u, t || "function" != typeof n.type);
	t || b$1(n.__e), n.__c = n.__ = n.__e = void 0;
}
function Q$1(n, l, u) {
	return this.constructor(n, u);
}
function R$1(u, t, i) {
	var r, o, e, f;
	t == document && (t = document.documentElement), l$1.__ && l$1.__(u, t), o = (r = "function" == typeof i) ? null : i && i.__k || t.__k, e = [], f = [], q$2(t, u = (!r && i || t).__k = k$2(S, null, [u]), o || d$1, d$1, t.namespaceURI, !r && i ? [i] : o ? null : t.firstChild ? n.call(t.childNodes) : null, e, !r && i ? i : o ? o.__e : t.firstChild, r, f), D$2(e, u, f), u.props.children = null;
}
function U$1(n, l) {
	R$1(n, l, U$1);
}
function W$1(l, u, t) {
	var i, r, o, e, f = m$1({}, l.props);
	for (o in l.type && l.type.defaultProps && (e = l.type.defaultProps), u) "key" == o ? i = u[o] : "ref" == o ? r = u[o] : f[o] = void 0 === u[o] && null != e ? e[o] : u[o];
	return arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : t), x$2(l.type, f, i || l.key, r || l.ref, null);
}
function X$1(n) {
	function l(n) {
		var u, t;
		return this.getChildContext || (u = /* @__PURE__ */ new Set(), (t = {})[l.__c] = this, this.getChildContext = function() {
			return t;
		}, this.componentWillUnmount = function() {
			u = null;
		}, this.shouldComponentUpdate = function(n) {
			this.props.value != n.value && u.forEach(function(n) {
				n.__e = !0, A$2(n);
			});
		}, this.sub = function(n) {
			u.add(n);
			var l = n.componentWillUnmount;
			n.componentWillUnmount = function() {
				u && u.delete(n), l && l.call(n);
			};
		}), n.children;
	}
	return l.__c = "__cC" + y$1++, l.__ = n, l.Provider = l.__l = (l.Consumer = function(n, l) {
		return n.children(l);
	}).contextType = l, l;
}
var n, l$1, u$1, t$1, i$1, r$1, o$1, e$1, f$1, c$1, a$1, s$1, h$1, p$1, v$1, y$1, d$1, w$2, _$1, g$2;
var init_preact_module = __esmMin((() => {
	;
	;
	;
	;
	;
	;
	;
	;
	;
	;
	;
	;
	;
	;
	;
	;
	d$1 = {};
	w$2 = [];
	_$1 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
	g$2 = Array.isArray;
	n = w$2.slice, l$1 = { __e: function(n, l, u, t) {
		for (var i, r, o; l = l.__;) if ((i = l.__c) && !i.__) try {
			if ((r = i.constructor) && null != r.getDerivedStateFromError && (i.setState(r.getDerivedStateFromError(n)), o = i.__d), null != i.componentDidCatch && (i.componentDidCatch(n, t || {}), o = i.__d), o) return i.__E = i;
		} catch (l) {
			n = l;
		}
		throw n;
	} }, u$1 = 0, t$1 = function(n) {
		return null != n && void 0 === n.constructor;
	}, C$2.prototype.setState = function(n, l) {
		var u = null != this.__s && this.__s != this.state ? this.__s : this.__s = m$1({}, this.state);
		"function" == typeof n && (n = n(m$1({}, u), this.props)), n && m$1(u, n), null != n && this.__v && (l && this._sb.push(l), A$2(this));
	}, C$2.prototype.forceUpdate = function(n) {
		this.__v && (this.__e = !0, n && this.__h.push(n), A$2(this));
	}, C$2.prototype.render = S, i$1 = [], o$1 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$1 = function(n, l) {
		return n.__v.__b - l.__v.__b;
	}, H$1.__r = 0, f$1 = Math.random().toString(8), c$1 = "__d" + f$1, a$1 = "__a" + f$1, s$1 = /(PointerCapture)$|Capture$/i, h$1 = 0, p$1 = V$1(!1), v$1 = V$1(!0), y$1 = 0;
}));

//#endregion
//#region node_modules/.pnpm/preact@10.29.7/node_modules/preact/hooks/dist/hooks.module.js
function s(n, t) {
	c.__h && c.__h(r, n, o || t), o = 0;
	var u = r.__H || (r.__H = {
		__: [],
		__h: []
	});
	return n >= u.__.length && u.__.push({}), u.__[n];
}
function d(n) {
	return o = 1, y(D$1, n);
}
function y(n, u, i) {
	var o = s(t++, 2);
	if (o.t = n, !o.__c && (o.__ = [i ? i(u) : D$1(void 0, u), function(n) {
		var t = o.__N ? o.__N[0] : o.__[0], r = o.t(t, n);
		t !== r && (o.__N = [r, o.__[1]], o.__c.setState({}));
	}], o.__c = r, !r.__f)) {
		var f = function(n, t, r) {
			if (!o.__c.__H) return !0;
			var u = !1, i = o.__c.props !== n;
			if (o.__c.__H.__.some(function(n) {
				if (n.__N) {
					u = !0;
					var t = n.__[0];
					n.__ = n.__N, n.__N = void 0, t !== n.__[0] && (i = !0);
				}
			}), c) {
				var f = c.call(this, n, t, r);
				return u ? f || i : f;
			}
			return !u || i;
		};
		r.__f = !0;
		var c = r.shouldComponentUpdate, e = r.componentWillUpdate;
		r.componentWillUpdate = function(n, t, r) {
			if (this.__e) {
				var u = c;
				c = void 0, f(n, t, r), c = u;
			}
			e && e.call(this, n, t, r);
		}, r.shouldComponentUpdate = f;
	}
	return o.__N || o.__;
}
function h(n, u) {
	var i = s(t++, 3);
	!c.__s && C$1(i.__H, u) && (i.__ = n, i.u = u, r.__H.__h.push(i));
}
function _(n, u) {
	var i = s(t++, 4);
	!c.__s && C$1(i.__H, u) && (i.__ = n, i.u = u, r.__h.push(i));
}
function A$1(n) {
	return o = 5, T$1(function() {
		return { current: n };
	}, []);
}
function F$1(n, t, r) {
	o = 6, _(function() {
		if ("function" == typeof n) {
			var r = n(t());
			return function() {
				n(null), r && "function" == typeof r && r();
			};
		}
		if (n) return n.current = t(), function() {
			return n.current = null;
		};
	}, null == r ? r : r.concat(n));
}
function T$1(n, r) {
	var u = s(t++, 7);
	return C$1(u.__H, r) && (u.__ = n(), u.__H = r, u.__h = n), u.__;
}
function q$1(n, t) {
	return o = 8, T$1(function() {
		return n;
	}, t);
}
function x$1(n) {
	var u = r.context[n.__c], i = s(t++, 9);
	return i.c = n, u ? (i.__ ?? (i.__ = !0, u.sub(r)), u.props.value) : n.__;
}
function P$1(n, t) {
	c.useDebugValue && c.useDebugValue(t ? t(n) : n);
}
function b(n) {
	var u = s(t++, 10), i = d();
	return u.__ = n, r.componentDidCatch || (r.componentDidCatch = function(n, t) {
		u.__ && u.__(n, t), i[1](n);
	}), [i[0], function() {
		i[1](void 0);
	}];
}
function g$1() {
	var n = s(t++, 11);
	if (!n.__) {
		for (var u = r.__v; null !== u && !u.__m && null !== u.__;) u = u.__;
		var i = u.__m || (u.__m = [0, 0]);
		n.__ = "P" + i[0] + "-" + i[1]++;
	}
	return n.__;
}
function j$1() {
	for (var n; n = f.shift();) {
		var t = n.__H;
		if (n.__P && t) try {
			t.__h.some(z$1), t.__h.some(B$1), t.__h = [];
		} catch (r) {
			t.__h = [], c.__e(r, n.__v);
		}
	}
}
function w$1(n) {
	var t, r = function() {
		clearTimeout(u), k$1 && cancelAnimationFrame(t), setTimeout(n);
	}, u = setTimeout(r, 35);
	k$1 && (t = requestAnimationFrame(r));
}
function z$1(n) {
	var t = r, u = n.__c;
	"function" == typeof u && (n.__c = void 0, u()), r = t;
}
function B$1(n) {
	var t = r;
	n.__c = n.__(), r = t;
}
function C$1(n, t) {
	return !n || n.length !== t.length || t.some(function(t, r) {
		return t !== n[r];
	});
}
function D$1(n, t) {
	return "function" == typeof t ? t(n) : t;
}
var t, r, u, i, o, f, c, e, a, v, l, m, p, k$1;
var init_hooks_module = __esmMin((() => {
	init_preact_module();
	;
	;
	;
	;
	o = 0;
	f = [];
	c = l$1;
	e = c.__b;
	a = c.__r;
	v = c.diffed;
	l = c.__c;
	m = c.unmount;
	p = c.__;
	c.__b = function(n) {
		r = null, e && e(n);
	}, c.__ = function(n, t) {
		n && t.__k && t.__k.__m && (n.__m = t.__k.__m), p && p(n, t);
	}, c.__r = function(n) {
		a && a(n), t = 0;
		var i = (r = n.__c).__H;
		i && (u === r ? (i.__h = [], r.__h = [], i.__.some(function(n) {
			n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
		})) : (i.__h.some(z$1), i.__h.some(B$1), i.__h = [], t = 0)), u = r;
	}, c.diffed = function(n) {
		v && v(n);
		var t = n.__c;
		t && t.__H && (t.__H.__h.length && (1 !== f.push(t) && i === c.requestAnimationFrame || ((i = c.requestAnimationFrame) || w$1)(j$1)), t.__H.__.some(function(n) {
			n.u && (n.__H = n.u, n.u = void 0);
		})), u = r = null;
	}, c.__c = function(n, t) {
		t.some(function(n) {
			try {
				n.__h.some(z$1), n.__h = n.__h.filter(function(n) {
					return !n.__ || B$1(n);
				});
			} catch (r) {
				t.some(function(n) {
					n.__h && (n.__h = []);
				}), t = [], c.__e(r, n.__v);
			}
		}), l && l(n, t);
	}, c.unmount = function(n) {
		m && m(n);
		var t, r = n.__c;
		r && r.__H && (r.__H.__.some(function(n) {
			try {
				z$1(n);
			} catch (n) {
				t = n;
			}
		}), r.__H = void 0, t && c.__e(t, r.__v));
	};
	k$1 = "function" == typeof requestAnimationFrame;
}));

//#endregion
//#region node_modules/.pnpm/preact@10.29.7/node_modules/preact/compat/dist/compat.module.js
function g(n, t) {
	for (var e in t) n[e] = t[e];
	return n;
}
function E(n, t) {
	for (var e in n) if ("__source" !== e && !(e in t)) return !0;
	for (var r in t) if ("__source" !== r && n[r] !== t[r]) return !0;
	return !1;
}
function C(n, t) {
	var e = t(), r = d({ t: {
		__: e,
		u: t
	} }), u = r[0].t, o = r[1];
	return _(function() {
		u.__ = e, u.u = t, R(u) && o({ t: u });
	}, [
		n,
		e,
		t
	]), h(function() {
		return R(u) && o({ t: u }), n(function() {
			R(u) && o({ t: u });
		});
	}, [n]), e;
}
function R(n) {
	try {
		return !((t = n.__) === (e = n.u()) && (0 !== t || 1 / t == 1 / e) || t != t && e != e);
	} catch (n) {
		return !0;
	}
	var t, e;
}
function x(n) {
	n();
}
function w(n) {
	return n;
}
function k() {
	return [!1, x];
}
function M(n, t) {
	this.props = n, this.context = t;
}
function N(n, e) {
	function r(n) {
		var t = this.props.ref;
		return t != n.ref && t && ("function" == typeof t ? t(null) : t.current = null), e ? !e(this.props, n) || t != n.ref : E(this.props, n);
	}
	function u(e) {
		return this.shouldComponentUpdate = r, k$2(n, e);
	}
	return u.displayName = "Memo(" + (n.displayName || n.name) + ")", u.__f = u.prototype.isReactComponent = !0, u.type = n, u;
}
function D(n) {
	function t(t) {
		var e = g({}, t);
		return delete e.ref, n(e, t.ref || null);
	}
	return t.$$typeof = A, t.render = n, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", t;
}
function V(n, t, e) {
	return n && (n.__c && n.__c.__H && (n.__c.__H.__.forEach(function(n) {
		"function" == typeof n.__c && n.__c();
	}), n.__c.__H = null), null != (n = g({}, n)).__c && (n.__c.__P === e && (n.__c.__P = t), n.__c.__e = !0, n.__c = null), n.__k = n.__k && n.__k.map(function(n) {
		return V(n, t, e);
	})), n;
}
function W(n, t, e) {
	return n && e && (n.__v = null, n.__k = n.__k && n.__k.map(function(n) {
		return W(n, t, e);
	}), n.__c && n.__c.__P === t && (n.__e && e.appendChild(n.__e), n.__c.__e = !0, n.__c.__P = e)), n;
}
function P() {
	this.__u = 0, this.o = null, this.__b = null;
}
function j(n) {
	var t = n.__ && n.__.__c;
	return t && t.__a && t.__a(n);
}
function z(n) {
	var e, r, u, o = null;
	function i(i) {
		if (e || (e = n()).then(function(n) {
			n && (o = n.default || n), u = !0;
		}, function(n) {
			r = n, u = !0;
		}), r) throw r;
		if (!u) throw e;
		return o ? k$2(o, i) : null;
	}
	return i.displayName = "Lazy", i.__f = !0, i;
}
function B() {
	this.i = null, this.l = null;
}
function Z(n) {
	return this.getChildContext = function() {
		return n.context;
	}, n.children;
}
function Y(n) {
	var e = this, r = n.h;
	if (e.componentWillUnmount = function() {
		R$1(null, e.v), e.v = null, e.h = null;
	}, e.h && e.h !== r && e.componentWillUnmount(), !e.v) {
		for (var u = e.__v; null !== u && !u.__m && null !== u.__;) u = u.__;
		e.h = r, e.v = {
			nodeType: 1,
			parentNode: r,
			childNodes: [],
			__k: { __m: u.__m },
			contains: function() {
				return !0;
			},
			namespaceURI: r.namespaceURI,
			insertBefore: function(n, t) {
				this.childNodes.push(n), e.h.insertBefore(n, t);
			},
			removeChild: function(n) {
				this.childNodes.splice(this.childNodes.indexOf(n) >>> 1, 1), e.h.removeChild(n);
			}
		};
	}
	R$1(k$2(Z, { context: e.context }, n.__v), e.v);
}
function $(n, e) {
	var r = k$2(Y, {
		__v: n,
		h: e
	});
	return r.containerInfo = e, r;
}
function nn(n, t, e) {
	return t.__k ?? (t.textContent = ""), R$1(n, t), "function" == typeof e && e(), n ? n.__c : null;
}
function tn(n, t, e) {
	return U$1(n, t), "function" == typeof e && e(), n ? n.__c : null;
}
function sn(n) {
	return k$2.bind(null, n);
}
function hn(n) {
	return !!n && n.$$typeof === q;
}
function vn(n) {
	return hn(n) && n.type === S;
}
function dn(n) {
	return !!n && "string" == typeof n.displayName && 0 == n.displayName.indexOf("Memo(");
}
function mn(n) {
	return hn(n) ? W$1.apply(null, arguments) : n;
}
function pn(n) {
	return !!n.__k && (R$1(null, n), !0);
}
function yn(n) {
	return n && (n.base || 1 === n.nodeType && n) || null;
}
var I, T, A, F, L, O, U, H, q, G, J, K, Q, X, en, rn, un, on, ln, cn, fn, an, _n, bn, Sn, gn;
var init_compat_module = __esmMin((() => {
	init_preact_module();
	init_hooks_module();
	init_hooks_module();
	I = _;
	(M.prototype = new C$2()).isPureReactComponent = !0, M.prototype.shouldComponentUpdate = function(n, t) {
		return E(this.props, n) || E(this.state, t);
	};
	T = l$1.__b;
	l$1.__b = function(n) {
		n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), T && T(n);
	};
	A = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
	F = function(n, t) {
		return null == n ? null : F$2(F$2(n).map(t));
	};
	L = {
		map: F,
		forEach: F,
		count: function(n) {
			return n ? F$2(n).length : 0;
		},
		only: function(n) {
			var t = F$2(n);
			if (1 !== t.length) throw "Children.only";
			return t[0];
		},
		toArray: F$2
	};
	O = l$1.__e;
	l$1.__e = function(n, t, e, r) {
		if (n.then) {
			for (var u, o = t; o = o.__;) if ((u = o.__c) && u.__c) return t.__e ?? (t.__e = e.__e, t.__k = e.__k || []), u.__c(n, t);
		}
		O(n, t, e, r);
	};
	U = l$1.unmount;
	l$1.unmount = function(n) {
		var t = n.__c;
		t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & n.__u && (n.type = null), U && U(n);
	}, (P.prototype = new C$2()).__c = function(n, t) {
		var e = t.__c, r = this;
		r.o ??= [], r.o.push(e);
		var u = j(r.__v), o = !1, i = function() {
			o || r.__z || (o = !0, e.__R = null, u ? u(c) : c());
		};
		e.__R = i;
		var l = e.__P;
		e.__P = null;
		var c = function() {
			if (!--r.__u) {
				if (r.state.__a) {
					var n = r.state.__a;
					r.__v.__k[0] = W(n, n.__c.__P, n.__c.__O);
				}
				var t;
				for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = l, t.forceUpdate();
			}
		};
		r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), n.then(i, i);
	}, P.prototype.componentWillUnmount = function() {
		this.o = [];
	}, P.prototype.render = function(n, e) {
		if (this.__b) {
			if (this.__v.__k) {
				var r = document.createElement("div"), o = this.__v.__k[0].__c;
				this.__v.__k[0] = V(this.__b, r, o.__O = o.__P);
			}
			this.__b = null;
		}
		var i = e.__a && k$2(S, null, n.fallback);
		return i && (i.__u &= -33), [k$2(S, null, e.__a ? null : n.children), i];
	};
	H = function(n, t, e) {
		if (++e[1] === e[0] && n.l.delete(t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.l.size)) for (e = n.i; e;) {
			for (; e.length > 3;) e.pop()();
			if (e[1] < e[0]) break;
			n.i = e = e[2];
		}
	};
	(B.prototype = new C$2()).__a = function(n) {
		var t = this, e = j(t.__v), r = t.l.get(n);
		return r[0]++, function(u) {
			var o = function() {
				t.props.revealOrder ? (r.push(u), H(t, n, r)) : u();
			};
			e ? e(o) : o();
		};
	}, B.prototype.render = function(n) {
		this.i = null, this.l = /* @__PURE__ */ new Map();
		var t = F$2(n.children);
		n.revealOrder && "b" === n.revealOrder[0] && t.reverse();
		for (var e = t.length; e--;) this.l.set(t[e], this.i = [
			1,
			0,
			this.i
		]);
		return n.children;
	}, B.prototype.componentDidUpdate = B.prototype.componentDidMount = function() {
		var n = this;
		this.l.forEach(function(t, e) {
			H(n, e, t);
		});
	};
	q = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
	G = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
	J = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
	K = /[A-Z0-9]/g;
	Q = "undefined" != typeof document;
	X = function(n) {
		return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n);
	};
	C$2.prototype.isReactComponent = !0, [
		"componentWillMount",
		"componentWillReceiveProps",
		"componentWillUpdate"
	].forEach(function(t) {
		Object.defineProperty(C$2.prototype, t, {
			configurable: !0,
			get: function() {
				return this["UNSAFE_" + t];
			},
			set: function(n) {
				Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: n
				});
			}
		});
	});
	en = l$1.event;
	l$1.event = function(n) {
		return en && (n = en(n)), n.persist = function() {}, n.isPropagationStopped = function() {
			return this.cancelBubble;
		}, n.isDefaultPrevented = function() {
			return this.defaultPrevented;
		}, n.nativeEvent = n;
	};
	;
	un = {
		configurable: !0,
		get: function() {
			return this.class;
		}
	};
	on = l$1.vnode;
	l$1.vnode = function(n) {
		"string" == typeof n.type && function(n) {
			var t = n.props, e = n.type, u = {}, o = -1 == e.indexOf("-");
			for (var i in t) {
				var l = t[i];
				if (!("value" === i && "defaultValue" in t && null == l || Q && "children" === i && "noscript" === e || "class" === i || "className" === i)) {
					var c = i.toLowerCase();
					"defaultValue" === i && "value" in t && null == t.value ? i = "value" : "download" === i && !0 === l ? l = "" : "translate" === c && "no" === l ? l = !1 : "o" === c[0] && "n" === c[1] ? "ondoubleclick" === c ? i = "ondblclick" : "onchange" !== c || "input" !== e && "textarea" !== e || X(t.type) ? "onfocus" === c ? i = "onfocusin" : "onblur" === c ? i = "onfocusout" : J.test(i) && (i = c) : c = i = "oninput" : o && G.test(i) ? i = i.replace(K, "-$&").toLowerCase() : null === l && (l = void 0), "oninput" === c && u[i = c] && (i = "oninputCapture"), u[i] = l;
				}
			}
			"select" == e && (u.multiple && Array.isArray(u.value) && (u.value = F$2(t.children).forEach(function(n) {
				n.props.selected = -1 != u.value.indexOf(n.props.value);
			})), null != u.defaultValue && (u.value = F$2(t.children).forEach(function(n) {
				n.props.selected = u.multiple ? -1 != u.defaultValue.indexOf(n.props.value) : u.defaultValue == n.props.value;
			}))), t.class && !t.className ? (u.class = t.class, Object.defineProperty(u, "className", un)) : t.className && (u.class = u.className = t.className), n.props = u;
		}(n), n.$$typeof = q, on && on(n);
	};
	ln = l$1.__r;
	l$1.__r = function(n) {
		ln && ln(n), rn = n.__c;
	};
	cn = l$1.diffed;
	l$1.diffed = function(n) {
		cn && cn(n);
		var t = n.props, e = n.__e;
		null != e && "textarea" === n.type && "value" in t && t.value !== e.value && (e.value = null == t.value ? "" : t.value), rn = null;
	};
	fn = { ReactCurrentDispatcher: { current: {
		readContext: function(n) {
			return rn.__n[n.__c].props.value;
		},
		useCallback: q$1,
		useContext: x$1,
		useDebugValue: P$1,
		useDeferredValue: w,
		useEffect: h,
		useId: g$1,
		useImperativeHandle: F$1,
		useInsertionEffect: I,
		useLayoutEffect: _,
		useMemo: T$1,
		useReducer: y,
		useRef: A$1,
		useState: d,
		useSyncExternalStore: C,
		useTransition: k
	} } };
	an = "18.3.1";
	_n = function(n, t) {
		return n(t);
	};
	bn = function(n, t) {
		var r = l$1.debounceRendering;
		l$1.debounceRendering = function(n) {
			return n();
		};
		var u = n(t);
		return l$1.debounceRendering = r, u;
	};
	Sn = hn;
	gn = {
		useState: d,
		useId: g$1,
		useReducer: y,
		useEffect: h,
		useLayoutEffect: _,
		useInsertionEffect: I,
		useTransition: k,
		useDeferredValue: w,
		useSyncExternalStore: C,
		startTransition: x,
		useRef: A$1,
		useImperativeHandle: F$1,
		useMemo: T$1,
		useCallback: q$1,
		useContext: x$1,
		useDebugValue: P$1,
		version: "18.3.1",
		Children: L,
		render: nn,
		hydrate: tn,
		unmountComponentAtNode: pn,
		createPortal: $,
		createElement: k$2,
		createContext: X$1,
		createFactory: sn,
		cloneElement: mn,
		createRef: M$1,
		Fragment: S,
		isValidElement: hn,
		isElement: Sn,
		isFragment: vn,
		isMemo: dn,
		findDOMNode: yn,
		Component: C$2,
		PureComponent: M,
		memo: N,
		forwardRef: D,
		flushSync: bn,
		unstable_batchedUpdates: _n,
		StrictMode: S,
		Suspense: P,
		SuspenseList: B,
		lazy: z,
		__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: fn
	};
}));

//#endregion
//#region node_modules/.pnpm/@preact+compat@18.3.2_preact@10.29.7/node_modules/@preact/compat/index.mjs
var compat_exports = /* @__PURE__ */ __exportAll({
	Children: () => L,
	Component: () => C$2,
	Fragment: () => S,
	PureComponent: () => M,
	StrictMode: () => S,
	Suspense: () => P,
	SuspenseList: () => B,
	__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: () => fn,
	cloneElement: () => mn,
	createContext: () => X$1,
	createElement: () => k$2,
	createFactory: () => sn,
	createPortal: () => $,
	createRef: () => M$1,
	default: () => gn,
	findDOMNode: () => yn,
	flushSync: () => bn,
	forwardRef: () => D,
	hydrate: () => tn,
	isElement: () => Sn,
	isFragment: () => vn,
	isMemo: () => dn,
	isValidElement: () => hn,
	lazy: () => z,
	memo: () => N,
	render: () => nn,
	startTransition: () => x,
	unmountComponentAtNode: () => pn,
	unstable_batchedUpdates: () => _n,
	useCallback: () => q$1,
	useContext: () => x$1,
	useDebugValue: () => P$1,
	useDeferredValue: () => w,
	useEffect: () => h,
	useErrorBoundary: () => b,
	useId: () => g$1,
	useImperativeHandle: () => F$1,
	useInsertionEffect: () => I,
	useLayoutEffect: () => _,
	useMemo: () => T$1,
	useReducer: () => y,
	useRef: () => A$1,
	useState: () => d,
	useSyncExternalStore: () => C,
	useTransition: () => k,
	version: () => an
});
var init_compat = __esmMin((() => {
	init_compat_module();
	init_compat_module();
}));

//#endregion
//#region node_modules/.pnpm/@dnd-kit+accessibility@3.1.1_@preact+compat@18.3.2_preact@10.29.7_/node_modules/@dnd-kit/accessibility/dist/accessibility.esm.js
init_compat();
var hiddenStyles = { display: "none" };
function HiddenText(_ref) {
	let { id, value } = _ref;
	return gn.createElement("div", {
		id,
		style: hiddenStyles
	}, value);
}
function LiveRegion(_ref) {
	let { id, announcement, ariaLiveType = "assertive" } = _ref;
	return gn.createElement("div", {
		id,
		style: {
			position: "fixed",
			top: 0,
			left: 0,
			width: 1,
			height: 1,
			margin: -1,
			border: 0,
			padding: 0,
			overflow: "hidden",
			clip: "rect(0 0 0 0)",
			clipPath: "inset(100%)",
			whiteSpace: "nowrap"
		},
		role: "status",
		"aria-live": ariaLiveType,
		"aria-atomic": true
	}, announcement);
}
function useAnnouncement() {
	const [announcement, setAnnouncement] = d("");
	return {
		announce: q$1((value) => {
			if (value != null) setAnnouncement(value);
		}, []),
		announcement
	};
}

//#endregion
export { X$1 as A, d as C, x$1 as D, q$1 as E, k$2 as M, l$1 as N, y as O, _ as S, init_hooks_module as T, nn as _, init_compat as a, P$1 as b, I as c, _n as d, bn as f, mn as g, init_compat_module as h, compat_exports as i, init_preact_module as j, S as k, N as l, hn as m, LiveRegion as n, $ as o, gn as p, useAnnouncement as r, D as s, HiddenText as t, P as u, pn as v, h as w, T$1 as x, A$1 as y };
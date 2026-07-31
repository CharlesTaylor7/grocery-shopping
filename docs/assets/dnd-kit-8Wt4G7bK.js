//#region node_modules/.pnpm/preact@10.29.7/node_modules/preact/dist/preact.module.js
var n;
var l$1;
var u$2;
var t$1;
var i$2;
var r$1;
var o$1;
var e$1;
var f$2;
var c$1;
var a$1;
var s$1;
var h$1;
var p$1;
var v$1;
var y$1;
var d$1 = {};
var w$2 = [];
var _$1 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
var g$2 = Array.isArray;
function m$1(n, l) {
	for (var u in l) n[u] = l[u];
	return n;
}
function b(n) {
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
		__v: null == o ? ++u$2 : o,
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
	(!n.__d && (n.__d = !0) && i$2.push(n) && !H$1.__r++ || r$1 != l$1.debounceRendering) && ((r$1 = l$1.debounceRendering) || o$1)(H$1);
}
function H$1() {
	try {
		for (var n, l = 1; i$2.length;) i$2.length > l && i$2.sort(e$1), n = i$2.shift(), l = i$2.length, I$1(n);
	} finally {
		i$2.length = H$1.__r = 0;
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
				} else if (null != o) for (T = o.length; T--;) b(o[T]);
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
		else if (p && (u.innerHTML = ""), L$1("template" == t.type ? u.content : u, g$2(v) ? v : [v], t, i, r, "foreignObject" == x ? "http://www.w3.org/1999/xhtml" : o, e, f, e ? e[0] : i.__k && $$1(i, 0), c, a), null != e) for (s = e.length; s--;) b(e[s]);
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
	t || b(n.__e), n.__c = n.__ = n.__e = void 0;
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
n = w$2.slice, l$1 = { __e: function(n, l, u, t) {
	for (var i, r, o; l = l.__;) if ((i = l.__c) && !i.__) try {
		if ((r = i.constructor) && null != r.getDerivedStateFromError && (i.setState(r.getDerivedStateFromError(n)), o = i.__d), null != i.componentDidCatch && (i.componentDidCatch(n, t || {}), o = i.__d), o) return i.__E = i;
	} catch (l) {
		n = l;
	}
	throw n;
} }, u$2 = 0, t$1 = function(n) {
	return null != n && void 0 === n.constructor;
}, C$2.prototype.setState = function(n, l) {
	var u = null != this.__s && this.__s != this.state ? this.__s : this.__s = m$1({}, this.state);
	"function" == typeof n && (n = n(m$1({}, u), this.props)), n && m$1(u, n), null != n && this.__v && (l && this._sb.push(l), A$2(this));
}, C$2.prototype.forceUpdate = function(n) {
	this.__v && (this.__e = !0, n && this.__h.push(n), A$2(this));
}, C$2.prototype.render = S, i$2 = [], o$1 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$1 = function(n, l) {
	return n.__v.__b - l.__v.__b;
}, H$1.__r = 0, f$2 = Math.random().toString(8), c$1 = "__d" + f$2, a$1 = "__a" + f$2, s$1 = /(PointerCapture)$|Capture$/i, h$1 = 0, p$1 = V$1(!1), v$1 = V$1(!0), y$1 = 0;

//#endregion
//#region node_modules/.pnpm/preact@10.29.7/node_modules/preact/hooks/dist/hooks.module.js
var t;
var r;
var u$1;
var i$1;
var o = 0;
var f$1 = [];
var c = l$1;
var e = c.__b;
var a = c.__r;
var v = c.diffed;
var l = c.__c;
var m = c.unmount;
var p = c.__;
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
	for (var n; n = f$1.shift();) {
		var t = n.__H;
		if (n.__P && t) try {
			t.__h.some(z$1), t.__h.some(B$1), t.__h = [];
		} catch (r) {
			t.__h = [], c.__e(r, n.__v);
		}
	}
}
c.__b = function(n) {
	r = null, e && e(n);
}, c.__ = function(n, t) {
	n && t.__k && t.__k.__m && (n.__m = t.__k.__m), p && p(n, t);
}, c.__r = function(n) {
	a && a(n), t = 0;
	var i = (r = n.__c).__H;
	i && (u$1 === r ? (i.__h = [], r.__h = [], i.__.some(function(n) {
		n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
	})) : (i.__h.some(z$1), i.__h.some(B$1), i.__h = [], t = 0)), u$1 = r;
}, c.diffed = function(n) {
	v && v(n);
	var t = n.__c;
	t && t.__H && (t.__H.__h.length && (1 !== f$1.push(t) && i$1 === c.requestAnimationFrame || ((i$1 = c.requestAnimationFrame) || w$1)(j$1)), t.__H.__.some(function(n) {
		n.u && (n.__H = n.u, n.u = void 0);
	})), u$1 = r = null;
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
var k$1 = "function" == typeof requestAnimationFrame;
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
var I = _;
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
(M.prototype = new C$2()).isPureReactComponent = !0, M.prototype.shouldComponentUpdate = function(n, t) {
	return E(this.props, n) || E(this.state, t);
};
var T = l$1.__b;
l$1.__b = function(n) {
	n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), T && T(n);
};
var A = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function D(n) {
	function t(t) {
		var e = g({}, t);
		return delete e.ref, n(e, t.ref || null);
	}
	return t.$$typeof = A, t.render = n, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", t;
}
var F = function(n, t) {
	return null == n ? null : F$2(F$2(n).map(t));
};
var L = {
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
var O = l$1.__e;
l$1.__e = function(n, t, e, r) {
	if (n.then) {
		for (var u, o = t; o = o.__;) if ((u = o.__c) && u.__c) return t.__e ?? (t.__e = e.__e, t.__k = e.__k || []), u.__c(n, t);
	}
	O(n, t, e, r);
};
var U = l$1.unmount;
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
var H = function(n, t, e) {
	if (++e[1] === e[0] && n.l.delete(t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.l.size)) for (e = n.i; e;) {
		for (; e.length > 3;) e.pop()();
		if (e[1] < e[0]) break;
		n.i = e = e[2];
	}
};
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
var q = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
var G = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
var J = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
var K = /[A-Z0-9]/g;
var Q = "undefined" != typeof document;
var X = function(n) {
	return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n);
};
function nn(n, t, e) {
	return t.__k ?? (t.textContent = ""), R$1(n, t), "function" == typeof e && e(), n ? n.__c : null;
}
function tn(n, t, e) {
	return U$1(n, t), "function" == typeof e && e(), n ? n.__c : null;
}
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
var en = l$1.event;
l$1.event = function(n) {
	return en && (n = en(n)), n.persist = function() {}, n.isPropagationStopped = function() {
		return this.cancelBubble;
	}, n.isDefaultPrevented = function() {
		return this.defaultPrevented;
	}, n.nativeEvent = n;
};
var rn;
var un = {
	configurable: !0,
	get: function() {
		return this.class;
	}
};
var on = l$1.vnode;
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
var ln = l$1.__r;
l$1.__r = function(n) {
	ln && ln(n), rn = n.__c;
};
var cn = l$1.diffed;
l$1.diffed = function(n) {
	cn && cn(n);
	var t = n.props, e = n.__e;
	null != e && "textarea" === n.type && "value" in t && t.value !== e.value && (e.value = null == t.value ? "" : t.value), rn = null;
};
var fn = { ReactCurrentDispatcher: { current: {
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
var _n = function(n, t) {
	return n(t);
};
var bn = function(n, t) {
	var r = l$1.debounceRendering;
	l$1.debounceRendering = function(n) {
		return n();
	};
	var u = n(t);
	return l$1.debounceRendering = r, u;
};
var Sn = hn;
var gn = {
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

//#endregion
//#region node_modules/.pnpm/preact@10.29.7/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var f = 0;
var i = Array.isArray;
function u(e, t, n, o, i, u) {
	t || (t = {});
	var a, c, p = t;
	if ("ref" in p) for (c in p = {}, t) "ref" == c ? a = t[c] : p[c] = t[c];
	var l = {
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
	return l$1.vnode && l$1.vnode(l), l;
}

//#endregion
//#region vendor/dnd-kit/src/utilities/hooks/useCombinedRefs.ts
function useCombinedRefs(...refs) {
	return T$1(() => (node) => {
		refs.forEach((ref) => ref(node));
	}, refs);
}

//#endregion
//#region vendor/dnd-kit/src/utilities/execution-context/canUseDOM.ts
var canUseDOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";

//#endregion
//#region vendor/dnd-kit/src/utilities/type-guards/isWindow.ts
function isWindow(element) {
	const elementString = Object.prototype.toString.call(element);
	return elementString === "[object Window]" || elementString === "[object global]";
}

//#endregion
//#region vendor/dnd-kit/src/utilities/type-guards/isNode.ts
function isNode(node) {
	return "nodeType" in node;
}

//#endregion
//#region vendor/dnd-kit/src/utilities/execution-context/getWindow.ts
function getWindow(target) {
	if (!target) return window;
	if (isWindow(target)) return target;
	if (!isNode(target)) return window;
	return target.ownerDocument?.defaultView ?? window;
}

//#endregion
//#region vendor/dnd-kit/src/utilities/type-guards/isDocument.ts
function isDocument(node) {
	const { Document } = getWindow(node);
	return node instanceof Document;
}

//#endregion
//#region vendor/dnd-kit/src/utilities/type-guards/isHTMLElement.ts
function isHTMLElement(node) {
	if (isWindow(node)) return false;
	return node instanceof getWindow(node).HTMLElement;
}

//#endregion
//#region vendor/dnd-kit/src/utilities/type-guards/isSVGElement.ts
function isSVGElement(node) {
	return node instanceof getWindow(node).SVGElement;
}

//#endregion
//#region vendor/dnd-kit/src/utilities/execution-context/getOwnerDocument.ts
function getOwnerDocument(target) {
	if (!target) return document;
	if (isWindow(target)) return target.document;
	if (!isNode(target)) return document;
	if (isDocument(target)) return target;
	if (isHTMLElement(target) || isSVGElement(target)) return target.ownerDocument;
	return document;
}

//#endregion
//#region vendor/dnd-kit/src/utilities/hooks/useIsomorphicLayoutEffect.ts
var useIsomorphicLayoutEffect = canUseDOM ? _ : h;

//#endregion
//#region vendor/dnd-kit/src/utilities/hooks/useEvent.ts
function useEvent(handler) {
	const handlerRef = A$1(handler);
	useIsomorphicLayoutEffect(() => {
		handlerRef.current = handler;
	});
	return q$1(function(...args) {
		return handlerRef.current?.(...args);
	}, []);
}

//#endregion
//#region vendor/dnd-kit/src/utilities/hooks/useInterval.ts
function useInterval() {
	const intervalRef = A$1(null);
	return [q$1((listener, duration) => {
		intervalRef.current = setInterval(listener, duration);
	}, []), q$1(() => {
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, [])];
}

//#endregion
//#region vendor/dnd-kit/src/utilities/hooks/useLatestValue.ts
function useLatestValue(value, dependencies = [value]) {
	const valueRef = A$1(value);
	useIsomorphicLayoutEffect(() => {
		if (valueRef.current !== value) valueRef.current = value;
	}, dependencies);
	return valueRef;
}

//#endregion
//#region vendor/dnd-kit/src/utilities/hooks/useLazyMemo.ts
function useLazyMemo(callback, dependencies) {
	const valueRef = A$1();
	return T$1(() => {
		const newValue = callback(valueRef.current);
		valueRef.current = newValue;
		return newValue;
	}, [...dependencies]);
}

//#endregion
//#region vendor/dnd-kit/src/utilities/hooks/useNodeRef.ts
function useNodeRef(onChange) {
	const onChangeHandler = useEvent(onChange);
	const node = A$1(null);
	return [node, q$1((element) => {
		if (element !== node.current) onChangeHandler?.(element, node.current);
		node.current = element;
	}, [])];
}

//#endregion
//#region vendor/dnd-kit/src/utilities/hooks/usePrevious.ts
function usePrevious(value) {
	const ref = A$1();
	h(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
}

//#endregion
//#region vendor/dnd-kit/src/utilities/hooks/useUniqueId.ts
var ids = {};
function useUniqueId(prefix, value) {
	return T$1(() => {
		if (value) return value;
		const id = ids[prefix] == null ? 0 : ids[prefix] + 1;
		ids[prefix] = id;
		return `${prefix}-${id}`;
	}, [prefix, value]);
}

//#endregion
//#region vendor/dnd-kit/src/utilities/adjustment.ts
function createAdjustmentFn(modifier) {
	return (object, ...adjustments) => {
		return adjustments.reduce((accumulator, adjustment) => {
			const entries = Object.entries(adjustment);
			for (const [key, valueAdjustment] of entries) {
				const value = accumulator[key];
				if (value != null) accumulator[key] = value + modifier * valueAdjustment;
			}
			return accumulator;
		}, { ...object });
	};
}
var add = createAdjustmentFn(1);
var subtract = createAdjustmentFn(-1);

//#endregion
//#region vendor/dnd-kit/src/utilities/event/hasViewportRelativeCoordinates.ts
function hasViewportRelativeCoordinates(event) {
	return "clientX" in event && "clientY" in event;
}

//#endregion
//#region vendor/dnd-kit/src/utilities/event/isKeyboardEvent.ts
function isKeyboardEvent(event) {
	if (!event) return false;
	const { KeyboardEvent } = getWindow(event.target);
	return KeyboardEvent && event instanceof KeyboardEvent;
}

//#endregion
//#region vendor/dnd-kit/src/utilities/event/isTouchEvent.ts
function isTouchEvent(event) {
	if (!event) return false;
	const { TouchEvent } = getWindow(event.target);
	return TouchEvent && event instanceof TouchEvent;
}

//#endregion
//#region vendor/dnd-kit/src/utilities/coordinates/getEventCoordinates.ts
function getEventCoordinates(event) {
	if (isTouchEvent(event)) {
		if (event.touches && event.touches.length) {
			const { clientX: x, clientY: y } = event.touches[0];
			return {
				x,
				y
			};
		} else if (event.changedTouches && event.changedTouches.length) {
			const { clientX: x, clientY: y } = event.changedTouches[0];
			return {
				x,
				y
			};
		}
	}
	if (hasViewportRelativeCoordinates(event)) return {
		x: event.clientX,
		y: event.clientY
	};
	return null;
}

//#endregion
//#region vendor/dnd-kit/src/utilities/css.ts
var CSS = Object.freeze({
	Translate: { toString(transform) {
		if (!transform) return;
		const { x, y } = transform;
		return `translate3d(${x ? Math.round(x) : 0}px, ${y ? Math.round(y) : 0}px, 0)`;
	} },
	Scale: { toString(transform) {
		if (!transform) return;
		const { scaleX, scaleY } = transform;
		return `scaleX(${scaleX}) scaleY(${scaleY})`;
	} },
	Transform: { toString(transform) {
		if (!transform) return;
		return [CSS.Translate.toString(transform), CSS.Scale.toString(transform)].join(" ");
	} },
	Transition: { toString({ property, duration, easing }) {
		return `${property} ${duration}ms ${easing}`;
	} }
});

//#endregion
//#region vendor/dnd-kit/src/core/store/actions.ts
var Action = /* @__PURE__ */ function(Action) {
	Action["DragStart"] = "dragStart";
	Action["DragMove"] = "dragMove";
	Action["DragEnd"] = "dragEnd";
	Action["DragCancel"] = "dragCancel";
	Action["DragOver"] = "dragOver";
	Action["RegisterDroppable"] = "registerDroppable";
	Action["SetDroppableDisabled"] = "setDroppableDisabled";
	Action["UnregisterDroppable"] = "unregisterDroppable";
	return Action;
}({});

//#endregion
//#region vendor/dnd-kit/src/core/utilities/other/noop.ts
function noop(..._args) {}

//#endregion
//#region vendor/dnd-kit/src/core/sensors/useSensor.ts
function useSensor(sensor, options) {
	return T$1(() => ({
		sensor,
		options: options ?? {}
	}), [sensor, options]);
}

//#endregion
//#region vendor/dnd-kit/src/core/sensors/useSensors.ts
function useSensors(...sensors) {
	return T$1(() => [...sensors].filter((sensor) => sensor != null), [...sensors]);
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/coordinates/constants.ts
var defaultCoordinates = Object.freeze({
	x: 0,
	y: 0
});

//#endregion
//#region vendor/dnd-kit/src/core/utilities/coordinates/distanceBetweenPoints.ts
function distanceBetween(p1, p2) {
	return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/coordinates/getRelativeTransformOrigin.ts
function getRelativeTransformOrigin(event, rect) {
	const eventCoordinates = getEventCoordinates(event);
	if (!eventCoordinates) return "0 0";
	const transformOrigin = {
		x: (eventCoordinates.x - rect.left) / rect.width * 100,
		y: (eventCoordinates.y - rect.top) / rect.height * 100
	};
	return `${transformOrigin.x}% ${transformOrigin.y}%`;
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/algorithms/helpers.ts
function sortCollisionsAsc({ data: { value: a } }, { data: { value: b } }) {
	return a - b;
}
function sortCollisionsDesc({ data: { value: a } }, { data: { value: b } }) {
	return b - a;
}
function getFirstCollision(collisions, property) {
	if (!collisions || collisions.length === 0) return null;
	const [firstCollision] = collisions;
	return property ? firstCollision[property] : firstCollision;
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/algorithms/closestCenter.ts
function centerOfRectangle(rect, left = rect.left, top = rect.top) {
	return {
		x: left + rect.width * .5,
		y: top + rect.height * .5
	};
}
var closestCenter = ({ collisionRect, droppableRects, droppableContainers }) => {
	const centerRect = centerOfRectangle(collisionRect, collisionRect.left, collisionRect.top);
	const collisions = [];
	for (const droppableContainer of droppableContainers) {
		const { id } = droppableContainer;
		const rect = droppableRects.get(id);
		if (rect) {
			const distBetween = distanceBetween(centerOfRectangle(rect), centerRect);
			collisions.push({
				id,
				data: {
					droppableContainer,
					value: distBetween
				}
			});
		}
	}
	return collisions.sort(sortCollisionsAsc);
};

//#endregion
//#region vendor/dnd-kit/src/core/utilities/algorithms/rectIntersection.ts
function getIntersectionRatio(entry, target) {
	const top = Math.max(target.top, entry.top);
	const left = Math.max(target.left, entry.left);
	const right = Math.min(target.left + target.width, entry.left + entry.width);
	const bottom = Math.min(target.top + target.height, entry.top + entry.height);
	const width = right - left;
	const height = bottom - top;
	if (left < right && top < bottom) {
		const targetArea = target.width * target.height;
		const entryArea = entry.width * entry.height;
		const intersectionArea = width * height;
		const intersectionRatio = intersectionArea / (targetArea + entryArea - intersectionArea);
		return Number(intersectionRatio.toFixed(4));
	}
	return 0;
}
var rectIntersection = ({ collisionRect, droppableRects, droppableContainers }) => {
	const collisions = [];
	for (const droppableContainer of droppableContainers) {
		const { id } = droppableContainer;
		const rect = droppableRects.get(id);
		if (rect) {
			const intersectionRatio = getIntersectionRatio(rect, collisionRect);
			if (intersectionRatio > 0) collisions.push({
				id,
				data: {
					droppableContainer,
					value: intersectionRatio
				}
			});
		}
	}
	return collisions.sort(sortCollisionsDesc);
};

//#endregion
//#region vendor/dnd-kit/src/core/utilities/rect/adjustScale.ts
function adjustScale(transform, rect1, rect2) {
	return {
		...transform,
		scaleX: rect1 && rect2 ? rect1.width / rect2.width : 1,
		scaleY: rect1 && rect2 ? rect1.height / rect2.height : 1
	};
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/rect/getRectDelta.ts
function getRectDelta(rect1, rect2) {
	return rect1 && rect2 ? {
		x: rect1.left - rect2.left,
		y: rect1.top - rect2.top
	} : defaultCoordinates;
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/rect/rectAdjustment.ts
function createRectAdjustmentFn(modifier) {
	return function adjustClientRect(rect, ...adjustments) {
		return adjustments.reduce((acc, adjustment) => ({
			...acc,
			top: acc.top + modifier * adjustment.y,
			bottom: acc.bottom + modifier * adjustment.y,
			left: acc.left + modifier * adjustment.x,
			right: acc.right + modifier * adjustment.x
		}), { ...rect });
	};
}
var getAdjustedRect = createRectAdjustmentFn(1);

//#endregion
//#region vendor/dnd-kit/src/core/utilities/transform/parseTransform.ts
function parseTransform(transform) {
	if (transform.startsWith("matrix3d(")) {
		const transformArray = transform.slice(9, -1).split(/, /);
		return {
			x: +transformArray[12],
			y: +transformArray[13],
			scaleX: +transformArray[0],
			scaleY: +transformArray[5]
		};
	} else if (transform.startsWith("matrix(")) {
		const transformArray = transform.slice(7, -1).split(/, /);
		return {
			x: +transformArray[4],
			y: +transformArray[5],
			scaleX: +transformArray[0],
			scaleY: +transformArray[3]
		};
	}
	return null;
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/transform/inverseTransform.ts
function inverseTransform(rect, transform, transformOrigin) {
	const parsedTransform = parseTransform(transform);
	if (!parsedTransform) return rect;
	const { scaleX, scaleY, x: translateX, y: translateY } = parsedTransform;
	const x = rect.left - translateX - (1 - scaleX) * parseFloat(transformOrigin);
	const y = rect.top - translateY - (1 - scaleY) * parseFloat(transformOrigin.slice(transformOrigin.indexOf(" ") + 1));
	const w = scaleX ? rect.width / scaleX : rect.width;
	const h = scaleY ? rect.height / scaleY : rect.height;
	return {
		width: w,
		height: h,
		top: y,
		right: x + w,
		bottom: y + h,
		left: x
	};
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/rect/getRect.ts
var defaultOptions = { ignoreTransform: false };
function getClientRect(element, options = defaultOptions) {
	let rect = element.getBoundingClientRect();
	if (options.ignoreTransform) {
		const { transform, transformOrigin } = getWindow(element).getComputedStyle(element);
		if (transform) rect = inverseTransform(rect, transform, transformOrigin);
	}
	const { top, left, width, height, bottom, right } = rect;
	return {
		top,
		left,
		width,
		height,
		bottom,
		right
	};
}
function getTransformAgnosticClientRect(element) {
	return getClientRect(element, { ignoreTransform: true });
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/rect/getWindowClientRect.ts
function getWindowClientRect(element) {
	const width = element.innerWidth;
	const height = element.innerHeight;
	return {
		top: 0,
		left: 0,
		right: width,
		bottom: height,
		width,
		height
	};
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/scroll/isFixed.ts
function isFixed(node, computedStyle = getWindow(node).getComputedStyle(node)) {
	return computedStyle.position === "fixed";
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/scroll/isScrollable.ts
function isScrollable(element, computedStyle = getWindow(element).getComputedStyle(element)) {
	const overflowRegex = /(auto|scroll|overlay)/;
	return [
		"overflow",
		"overflowX",
		"overflowY"
	].some((property) => {
		const value = computedStyle[property];
		return typeof value === "string" ? overflowRegex.test(value) : false;
	});
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/scroll/getScrollableAncestors.ts
function getScrollableAncestors(element, limit) {
	const scrollParents = [];
	function findScrollableAncestors(node) {
		if (limit != null && scrollParents.length >= limit) return scrollParents;
		if (!node) return scrollParents;
		if (isDocument(node) && node.scrollingElement != null && !scrollParents.includes(node.scrollingElement)) {
			scrollParents.push(node.scrollingElement);
			return scrollParents;
		}
		if (!isHTMLElement(node) || isSVGElement(node)) return scrollParents;
		if (scrollParents.includes(node)) return scrollParents;
		const computedStyle = getWindow(element).getComputedStyle(node);
		if (node !== element) {
			if (isScrollable(node, computedStyle)) scrollParents.push(node);
		}
		if (isFixed(node, computedStyle)) return scrollParents;
		return findScrollableAncestors(node.parentNode);
	}
	if (!element) return scrollParents;
	return findScrollableAncestors(element);
}
function getFirstScrollableAncestor(node) {
	const [firstScrollableAncestor] = getScrollableAncestors(node, 1);
	return firstScrollableAncestor ?? null;
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/scroll/getScrollableElement.ts
function getScrollableElement(element) {
	if (!canUseDOM || !element) return null;
	if (isWindow(element)) return element;
	if (!isNode(element)) return null;
	if (isDocument(element) || element === getOwnerDocument(element).scrollingElement) return window;
	if (isHTMLElement(element)) return element;
	return null;
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/scroll/getScrollCoordinates.ts
function getScrollXCoordinate(element) {
	if (isWindow(element)) return element.scrollX;
	return element.scrollLeft;
}
function getScrollYCoordinate(element) {
	if (isWindow(element)) return element.scrollY;
	return element.scrollTop;
}
function getScrollCoordinates(element) {
	return {
		x: getScrollXCoordinate(element),
		y: getScrollYCoordinate(element)
	};
}

//#endregion
//#region vendor/dnd-kit/src/core/types/direction.ts
var Direction = /* @__PURE__ */ function(Direction) {
	Direction[Direction["Forward"] = 1] = "Forward";
	Direction[Direction["Backward"] = -1] = "Backward";
	return Direction;
}({});

//#endregion
//#region vendor/dnd-kit/src/core/utilities/scroll/documentScrollingElement.ts
function isDocumentScrollingElement(element) {
	if (!canUseDOM || !element) return false;
	return element === document.scrollingElement;
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/scroll/getScrollPosition.ts
function getScrollPosition(scrollingContainer) {
	const minScroll = {
		x: 0,
		y: 0
	};
	const dimensions = isDocumentScrollingElement(scrollingContainer) ? {
		height: window.innerHeight,
		width: window.innerWidth
	} : {
		height: scrollingContainer.clientHeight,
		width: scrollingContainer.clientWidth
	};
	const maxScroll = {
		x: scrollingContainer.scrollWidth - dimensions.width,
		y: scrollingContainer.scrollHeight - dimensions.height
	};
	return {
		isTop: scrollingContainer.scrollTop <= minScroll.y,
		isLeft: scrollingContainer.scrollLeft <= minScroll.x,
		isBottom: scrollingContainer.scrollTop >= maxScroll.y,
		isRight: scrollingContainer.scrollLeft >= maxScroll.x,
		maxScroll,
		minScroll
	};
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/scroll/getScrollDirectionAndSpeed.ts
var defaultThreshold = {
	x: .2,
	y: .2
};
function getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, { top, left, right, bottom }, acceleration = 10, thresholdPercentage = defaultThreshold) {
	const { isTop, isBottom, isLeft, isRight } = getScrollPosition(scrollContainer);
	const direction = {
		x: 0,
		y: 0
	};
	const speed = {
		x: 0,
		y: 0
	};
	const threshold = {
		height: scrollContainerRect.height * thresholdPercentage.y,
		width: scrollContainerRect.width * thresholdPercentage.x
	};
	if (!isTop && top <= scrollContainerRect.top + threshold.height) {
		direction.y = Direction.Backward;
		speed.y = acceleration * Math.abs((scrollContainerRect.top + threshold.height - top) / threshold.height);
	} else if (!isBottom && bottom >= scrollContainerRect.bottom - threshold.height) {
		direction.y = Direction.Forward;
		speed.y = acceleration * Math.abs((scrollContainerRect.bottom - threshold.height - bottom) / threshold.height);
	}
	if (!isRight && right >= scrollContainerRect.right - threshold.width) {
		direction.x = Direction.Forward;
		speed.x = acceleration * Math.abs((scrollContainerRect.right - threshold.width - right) / threshold.width);
	} else if (!isLeft && left <= scrollContainerRect.left + threshold.width) {
		direction.x = Direction.Backward;
		speed.x = acceleration * Math.abs((scrollContainerRect.left + threshold.width - left) / threshold.width);
	}
	return {
		direction,
		speed
	};
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/scroll/getScrollElementRect.ts
function getScrollElementRect(element) {
	if (element === document.scrollingElement) {
		const { innerWidth, innerHeight } = window;
		return {
			top: 0,
			left: 0,
			right: innerWidth,
			bottom: innerHeight,
			width: innerWidth,
			height: innerHeight
		};
	}
	const { top, left, right, bottom } = element.getBoundingClientRect();
	return {
		top,
		left,
		right,
		bottom,
		width: element.clientWidth,
		height: element.clientHeight
	};
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/scroll/getScrollOffsets.ts
function getScrollOffsets(scrollableAncestors) {
	return scrollableAncestors.reduce((acc, node) => {
		return add(acc, getScrollCoordinates(node));
	}, defaultCoordinates);
}
function getScrollXOffset(scrollableAncestors) {
	return scrollableAncestors.reduce((acc, node) => {
		return acc + getScrollXCoordinate(node);
	}, 0);
}
function getScrollYOffset(scrollableAncestors) {
	return scrollableAncestors.reduce((acc, node) => {
		return acc + getScrollYCoordinate(node);
	}, 0);
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/scroll/scrollIntoViewIfNeeded.ts
function scrollIntoViewIfNeeded(element, measure = getClientRect) {
	if (!element) return;
	const { top, left, bottom, right } = measure(element);
	if (!getFirstScrollableAncestor(element)) return;
	if (bottom <= 0 || right <= 0 || top >= window.innerHeight || left >= window.innerWidth) element.scrollIntoView({
		block: "center",
		inline: "center"
	});
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/rect/Rect.ts
var properties = [[
	"x",
	["left", "right"],
	getScrollXOffset
], [
	"y",
	["top", "bottom"],
	getScrollYOffset
]];
var Rect = class {
	constructor(rect, element) {
		const scrollableAncestors = getScrollableAncestors(element);
		const scrollOffsets = getScrollOffsets(scrollableAncestors);
		this.rect = { ...rect };
		this.width = rect.width;
		this.height = rect.height;
		for (const [axis, keys, getScrollOffset] of properties) for (const key of keys) Object.defineProperty(this, key, {
			get: () => {
				const currentOffsets = getScrollOffset(scrollableAncestors);
				const scrollOffsetsDeltla = scrollOffsets[axis] - currentOffsets;
				return this.rect[key] + scrollOffsetsDeltla;
			},
			enumerable: true
		});
		Object.defineProperty(this, "rect", { enumerable: false });
	}
	rect;
	width;
	height;
	top;
	bottom;
	right;
	left;
};

//#endregion
//#region vendor/dnd-kit/src/core/sensors/utilities/Listeners.ts
var Listeners = class {
	target;
	listeners = [];
	constructor(target) {
		this.target = target;
	}
	add(eventName, handler, options) {
		this.target?.addEventListener(eventName, handler, options);
		this.listeners.push([
			eventName,
			handler,
			options
		]);
	}
	removeAll = () => {
		this.listeners.forEach((listener) => this.target?.removeEventListener(...listener));
	};
};

//#endregion
//#region vendor/dnd-kit/src/core/sensors/utilities/getEventListenerTarget.ts
function getEventListenerTarget(target) {
	const { EventTarget } = getWindow(target);
	return target instanceof EventTarget ? target : getOwnerDocument(target);
}

//#endregion
//#region vendor/dnd-kit/src/core/sensors/utilities/hasExceededDistance.ts
function hasExceededDistance(delta, measurement) {
	const dx = Math.abs(delta.x);
	const dy = Math.abs(delta.y);
	if (typeof measurement === "number") return Math.sqrt(dx ** 2 + dy ** 2) > measurement;
	if ("x" in measurement && "y" in measurement) return dx > measurement.x && dy > measurement.y;
	if ("x" in measurement) return dx > measurement.x;
	if ("y" in measurement) return dy > measurement.y;
	return false;
}

//#endregion
//#region vendor/dnd-kit/src/core/sensors/events.ts
var EventName = /* @__PURE__ */ function(EventName) {
	EventName["Click"] = "click";
	EventName["DragStart"] = "dragstart";
	EventName["Keydown"] = "keydown";
	EventName["ContextMenu"] = "contextmenu";
	EventName["Resize"] = "resize";
	EventName["SelectionChange"] = "selectionchange";
	EventName["VisibilityChange"] = "visibilitychange";
	return EventName;
}({});
function preventDefault(event) {
	event.preventDefault();
}
function stopPropagation(event) {
	event.stopPropagation();
}

//#endregion
//#region vendor/dnd-kit/src/core/sensors/keyboard/types.ts
var KeyboardCode = /* @__PURE__ */ function(KeyboardCode) {
	KeyboardCode["Space"] = "Space";
	KeyboardCode["Down"] = "ArrowDown";
	KeyboardCode["Right"] = "ArrowRight";
	KeyboardCode["Left"] = "ArrowLeft";
	KeyboardCode["Up"] = "ArrowUp";
	KeyboardCode["Esc"] = "Escape";
	KeyboardCode["Enter"] = "Enter";
	KeyboardCode["Tab"] = "Tab";
	return KeyboardCode;
}({});

//#endregion
//#region vendor/dnd-kit/src/core/sensors/keyboard/defaults.ts
var defaultKeyboardCodes = {
	start: [KeyboardCode.Space, KeyboardCode.Enter],
	cancel: [KeyboardCode.Esc],
	end: [
		KeyboardCode.Space,
		KeyboardCode.Enter,
		KeyboardCode.Tab
	]
};
var defaultKeyboardCoordinateGetter = (event, { currentCoordinates }) => {
	switch (event.code) {
		case KeyboardCode.Right: return {
			...currentCoordinates,
			x: currentCoordinates.x + 25
		};
		case KeyboardCode.Left: return {
			...currentCoordinates,
			x: currentCoordinates.x - 25
		};
		case KeyboardCode.Down: return {
			...currentCoordinates,
			y: currentCoordinates.y + 25
		};
		case KeyboardCode.Up: return {
			...currentCoordinates,
			y: currentCoordinates.y - 25
		};
	}
};

//#endregion
//#region vendor/dnd-kit/src/core/sensors/keyboard/KeyboardSensor.ts
var KeyboardSensor = class {
	props;
	autoScrollEnabled = false;
	referenceCoordinates;
	listeners;
	windowListeners;
	constructor(props) {
		this.props = props;
		const { event: { target } } = props;
		this.props = props;
		this.listeners = new Listeners(getOwnerDocument(target));
		this.windowListeners = new Listeners(getWindow(target));
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.attach();
	}
	attach() {
		this.handleStart();
		this.windowListeners.add(EventName.Resize, this.handleCancel);
		this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
		setTimeout(() => this.listeners.add(EventName.Keydown, this.handleKeyDown));
	}
	handleStart() {
		const { activeNode, onStart } = this.props;
		const node = activeNode.node.current;
		if (node) scrollIntoViewIfNeeded(node);
		onStart(defaultCoordinates);
	}
	handleKeyDown(event) {
		if (isKeyboardEvent(event)) {
			const { active, context, options } = this.props;
			const { keyboardCodes = defaultKeyboardCodes, coordinateGetter = defaultKeyboardCoordinateGetter, scrollBehavior = "smooth" } = options;
			const { code } = event;
			if (keyboardCodes.end.includes(code)) {
				this.handleEnd(event);
				return;
			}
			if (keyboardCodes.cancel.includes(code)) {
				this.handleCancel(event);
				return;
			}
			const { collisionRect } = context.current;
			const currentCoordinates = collisionRect ? {
				x: collisionRect.left,
				y: collisionRect.top
			} : defaultCoordinates;
			if (!this.referenceCoordinates) this.referenceCoordinates = currentCoordinates;
			const newCoordinates = coordinateGetter(event, {
				active,
				context: context.current,
				currentCoordinates
			});
			if (newCoordinates) {
				const coordinatesDelta = subtract(newCoordinates, currentCoordinates);
				const scrollDelta = {
					x: 0,
					y: 0
				};
				const { scrollableAncestors } = context.current;
				for (const scrollContainer of scrollableAncestors) {
					const direction = event.code;
					const { isTop, isRight, isLeft, isBottom, maxScroll, minScroll } = getScrollPosition(scrollContainer);
					const scrollElementRect = getScrollElementRect(scrollContainer);
					const clampedCoordinates = {
						x: Math.min(direction === KeyboardCode.Right ? scrollElementRect.right - scrollElementRect.width / 2 : scrollElementRect.right, Math.max(direction === KeyboardCode.Right ? scrollElementRect.left : scrollElementRect.left + scrollElementRect.width / 2, newCoordinates.x)),
						y: Math.min(direction === KeyboardCode.Down ? scrollElementRect.bottom - scrollElementRect.height / 2 : scrollElementRect.bottom, Math.max(direction === KeyboardCode.Down ? scrollElementRect.top : scrollElementRect.top + scrollElementRect.height / 2, newCoordinates.y))
					};
					const canScrollX = direction === KeyboardCode.Right && !isRight || direction === KeyboardCode.Left && !isLeft;
					const canScrollY = direction === KeyboardCode.Down && !isBottom || direction === KeyboardCode.Up && !isTop;
					if (canScrollX && clampedCoordinates.x !== newCoordinates.x) {
						const newScrollCoordinates = scrollContainer.scrollLeft + coordinatesDelta.x;
						const canScrollToNewCoordinates = direction === KeyboardCode.Right && newScrollCoordinates <= maxScroll.x || direction === KeyboardCode.Left && newScrollCoordinates >= minScroll.x;
						if (canScrollToNewCoordinates && !coordinatesDelta.y) {
							scrollContainer.scrollTo({
								left: newScrollCoordinates,
								behavior: scrollBehavior
							});
							return;
						}
						if (canScrollToNewCoordinates) scrollDelta.x = scrollContainer.scrollLeft - newScrollCoordinates;
						else scrollDelta.x = direction === KeyboardCode.Right ? scrollContainer.scrollLeft - maxScroll.x : scrollContainer.scrollLeft - minScroll.x;
						if (scrollDelta.x) scrollContainer.scrollBy({
							left: -scrollDelta.x,
							behavior: scrollBehavior
						});
						break;
					} else if (canScrollY && clampedCoordinates.y !== newCoordinates.y) {
						const newScrollCoordinates = scrollContainer.scrollTop + coordinatesDelta.y;
						const canScrollToNewCoordinates = direction === KeyboardCode.Down && newScrollCoordinates <= maxScroll.y || direction === KeyboardCode.Up && newScrollCoordinates >= minScroll.y;
						if (canScrollToNewCoordinates && !coordinatesDelta.x) {
							scrollContainer.scrollTo({
								top: newScrollCoordinates,
								behavior: scrollBehavior
							});
							return;
						}
						if (canScrollToNewCoordinates) scrollDelta.y = scrollContainer.scrollTop - newScrollCoordinates;
						else scrollDelta.y = direction === KeyboardCode.Down ? scrollContainer.scrollTop - maxScroll.y : scrollContainer.scrollTop - minScroll.y;
						if (scrollDelta.y) scrollContainer.scrollBy({
							top: -scrollDelta.y,
							behavior: scrollBehavior
						});
						break;
					}
				}
				this.handleMove(event, add(subtract(newCoordinates, this.referenceCoordinates), scrollDelta));
			}
		}
	}
	handleMove(event, coordinates) {
		const { onMove } = this.props;
		event.preventDefault();
		onMove(coordinates);
	}
	handleEnd(event) {
		const { onEnd } = this.props;
		event.preventDefault();
		this.detach();
		onEnd();
	}
	handleCancel(event) {
		const { onCancel } = this.props;
		event.preventDefault();
		this.detach();
		onCancel();
	}
	detach() {
		this.listeners.removeAll();
		this.windowListeners.removeAll();
	}
	static activators = [{
		eventName: "onKeyDown",
		handler: (event, { keyboardCodes = defaultKeyboardCodes, onActivation }, { active }) => {
			const { code } = event;
			if (keyboardCodes.start.includes(code)) {
				const activator = active.activatorNode.current;
				if (activator && event.target !== activator) return false;
				event.preventDefault();
				onActivation?.({ event });
				return true;
			}
			return false;
		}
	}];
};

//#endregion
//#region vendor/dnd-kit/src/core/sensors/pointer/AbstractPointerSensor.ts
function isDistanceConstraint(constraint) {
	return Boolean(constraint && "distance" in constraint);
}
function isDelayConstraint(constraint) {
	return Boolean(constraint && "delay" in constraint);
}
var AbstractPointerSensor = class {
	props;
	events;
	autoScrollEnabled = true;
	document;
	activated = false;
	initialCoordinates;
	timeoutId = null;
	listeners;
	documentListeners;
	windowListeners;
	constructor(props, events, listenerTarget = getEventListenerTarget(props.event.target)) {
		this.props = props;
		this.events = events;
		const { event } = props;
		const { target } = event;
		this.props = props;
		this.events = events;
		this.document = getOwnerDocument(target);
		this.documentListeners = new Listeners(this.document);
		this.listeners = new Listeners(listenerTarget);
		this.windowListeners = new Listeners(getWindow(target));
		this.initialCoordinates = getEventCoordinates(event) ?? defaultCoordinates;
		this.handleStart = this.handleStart.bind(this);
		this.handleMove = this.handleMove.bind(this);
		this.handleEnd = this.handleEnd.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleKeydown = this.handleKeydown.bind(this);
		this.removeTextSelection = this.removeTextSelection.bind(this);
		this.attach();
	}
	attach() {
		const { events, props: { options: { activationConstraint, bypassActivationConstraint } } } = this;
		this.listeners.add(events.move.name, this.handleMove, { passive: false });
		this.listeners.add(events.end.name, this.handleEnd);
		if (events.cancel) this.listeners.add(events.cancel.name, this.handleCancel);
		this.windowListeners.add(EventName.Resize, this.handleCancel);
		this.windowListeners.add(EventName.DragStart, preventDefault);
		this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
		this.windowListeners.add(EventName.ContextMenu, preventDefault);
		this.documentListeners.add(EventName.Keydown, this.handleKeydown);
		if (activationConstraint) {
			if (bypassActivationConstraint?.({
				event: this.props.event,
				activeNode: this.props.activeNode,
				options: this.props.options
			})) return this.handleStart();
			if (isDelayConstraint(activationConstraint)) {
				this.timeoutId = setTimeout(this.handleStart, activationConstraint.delay);
				this.handlePending(activationConstraint);
				return;
			}
			if (isDistanceConstraint(activationConstraint)) {
				this.handlePending(activationConstraint);
				return;
			}
		}
		this.handleStart();
	}
	detach() {
		this.listeners.removeAll();
		this.windowListeners.removeAll();
		setTimeout(this.documentListeners.removeAll, 50);
		if (this.timeoutId !== null) {
			clearTimeout(this.timeoutId);
			this.timeoutId = null;
		}
	}
	handlePending(constraint, offset) {
		const { active, onPending } = this.props;
		onPending(active, constraint, this.initialCoordinates, offset);
	}
	handleStart() {
		const { initialCoordinates } = this;
		const { onStart } = this.props;
		if (initialCoordinates) {
			this.activated = true;
			this.documentListeners.add(EventName.Click, stopPropagation, { capture: true });
			this.removeTextSelection();
			this.documentListeners.add(EventName.SelectionChange, this.removeTextSelection);
			onStart(initialCoordinates);
		}
	}
	handleMove(event) {
		const { activated, initialCoordinates, props } = this;
		const { onMove, options: { activationConstraint } } = props;
		if (!initialCoordinates) return;
		const coordinates = getEventCoordinates(event) ?? defaultCoordinates;
		const delta = subtract(initialCoordinates, coordinates);
		if (!activated && activationConstraint) {
			if (isDistanceConstraint(activationConstraint)) {
				if (activationConstraint.tolerance != null && hasExceededDistance(delta, activationConstraint.tolerance)) return this.handleCancel();
				if (hasExceededDistance(delta, activationConstraint.distance)) return this.handleStart();
			}
			if (isDelayConstraint(activationConstraint)) {
				if (hasExceededDistance(delta, activationConstraint.tolerance)) return this.handleCancel();
			}
			this.handlePending(activationConstraint, delta);
			return;
		}
		if (event.cancelable) event.preventDefault();
		onMove(coordinates);
	}
	handleEnd() {
		const { onAbort, onEnd } = this.props;
		this.detach();
		if (!this.activated) onAbort(this.props.active);
		onEnd();
	}
	handleCancel() {
		const { onAbort, onCancel } = this.props;
		this.detach();
		if (!this.activated) onAbort(this.props.active);
		onCancel();
	}
	handleKeydown(event) {
		if (event.code === KeyboardCode.Esc) this.handleCancel();
	}
	removeTextSelection() {
		this.document.getSelection()?.removeAllRanges();
	}
};

//#endregion
//#region vendor/dnd-kit/src/core/sensors/pointer/PointerSensor.ts
var events = {
	cancel: { name: "pointercancel" },
	move: { name: "pointermove" },
	end: { name: "pointerup" }
};
var PointerSensor = class extends AbstractPointerSensor {
	constructor(props) {
		const { event } = props;
		const listenerTarget = getOwnerDocument(event.target);
		super(props, events, listenerTarget);
	}
	static activators = [{
		eventName: "onPointerDown",
		handler: (event, { onActivation }) => {
			if (!event.isPrimary || event.button !== 0) return false;
			onActivation?.({ event });
			return true;
		}
	}];
};

//#endregion
//#region vendor/dnd-kit/src/core/hooks/utilities/useAutoScroller.ts
function useAutoScroller({ acceleration, activator = 0, canScroll, draggingRect, enabled, interval = 5, order = 0, pointerCoordinates, scrollableAncestors, scrollableAncestorRects, delta, threshold }) {
	const scrollIntent = useScrollIntent({
		delta,
		disabled: !enabled
	});
	const [setAutoScrollInterval, clearAutoScrollInterval] = useInterval();
	const scrollSpeed = A$1({
		x: 0,
		y: 0
	});
	const scrollDirection = A$1({
		x: 0,
		y: 0
	});
	const rect = T$1(() => {
		switch (activator) {
			case 0: return pointerCoordinates ? {
				top: pointerCoordinates.y,
				bottom: pointerCoordinates.y,
				left: pointerCoordinates.x,
				right: pointerCoordinates.x
			} : null;
			case 1: return draggingRect;
		}
	}, [
		activator,
		draggingRect,
		pointerCoordinates
	]);
	const scrollContainerRef = A$1(null);
	const autoScroll = q$1(() => {
		const scrollContainer = scrollContainerRef.current;
		if (!scrollContainer) return;
		const scrollLeft = scrollSpeed.current.x * scrollDirection.current.x;
		const scrollTop = scrollSpeed.current.y * scrollDirection.current.y;
		scrollContainer.scrollBy(scrollLeft, scrollTop);
	}, []);
	const sortedScrollableAncestors = T$1(() => order === 0 ? [...scrollableAncestors].reverse() : scrollableAncestors, [order, scrollableAncestors]);
	h(() => {
		if (!enabled || !scrollableAncestors.length || !rect) {
			clearAutoScrollInterval();
			return;
		}
		for (const scrollContainer of sortedScrollableAncestors) {
			if (canScroll?.(scrollContainer) === false) continue;
			const scrollContainerRect = scrollableAncestorRects[scrollableAncestors.indexOf(scrollContainer)];
			if (!scrollContainerRect) continue;
			const { direction, speed } = getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, rect, acceleration, threshold);
			for (const axis of ["x", "y"]) if (!scrollIntent[axis][direction[axis]]) {
				speed[axis] = 0;
				direction[axis] = 0;
			}
			if (speed.x > 0 || speed.y > 0) {
				clearAutoScrollInterval();
				scrollContainerRef.current = scrollContainer;
				setAutoScrollInterval(autoScroll, interval);
				scrollSpeed.current = speed;
				scrollDirection.current = direction;
				return;
			}
		}
		scrollSpeed.current = {
			x: 0,
			y: 0
		};
		scrollDirection.current = {
			x: 0,
			y: 0
		};
		clearAutoScrollInterval();
	}, [
		acceleration,
		autoScroll,
		canScroll,
		clearAutoScrollInterval,
		enabled,
		interval,
		JSON.stringify(rect),
		JSON.stringify(scrollIntent),
		setAutoScrollInterval,
		scrollableAncestors,
		sortedScrollableAncestors,
		scrollableAncestorRects,
		JSON.stringify(threshold)
	]);
}
var defaultScrollIntent = {
	x: {
		[Direction.Backward]: false,
		[Direction.Forward]: false
	},
	y: {
		[Direction.Backward]: false,
		[Direction.Forward]: false
	}
};
function useScrollIntent({ delta, disabled }) {
	const previousDelta = usePrevious(delta);
	return useLazyMemo((previousIntent) => {
		if (disabled || !previousDelta || !previousIntent) return defaultScrollIntent;
		const direction = {
			x: Math.sign(delta.x - previousDelta.x),
			y: Math.sign(delta.y - previousDelta.y)
		};
		return {
			x: {
				[Direction.Backward]: previousIntent.x[Direction.Backward] || direction.x === -1,
				[Direction.Forward]: previousIntent.x[Direction.Forward] || direction.x === 1
			},
			y: {
				[Direction.Backward]: previousIntent.y[Direction.Backward] || direction.y === -1,
				[Direction.Forward]: previousIntent.y[Direction.Forward] || direction.y === 1
			}
		};
	}, [
		disabled,
		delta,
		previousDelta
	]);
}

//#endregion
//#region vendor/dnd-kit/src/core/hooks/utilities/useCachedNode.ts
function useCachedNode(draggableNodes, id) {
	const draggableNode = id != null ? draggableNodes.get(id) : void 0;
	const node = draggableNode ? draggableNode.node.current : null;
	return useLazyMemo((cachedNode) => {
		if (id == null) return null;
		return node ?? cachedNode ?? null;
	}, [node, id]);
}

//#endregion
//#region vendor/dnd-kit/src/core/hooks/utilities/useCombineActivators.ts
function useCombineActivators(sensors, getSyntheticHandler) {
	return T$1(() => sensors.reduce((accumulator, sensor) => {
		const { sensor: Sensor } = sensor;
		const sensorActivators = Sensor.activators.map((activator) => ({
			eventName: activator.eventName,
			handler: getSyntheticHandler(activator.handler, sensor)
		}));
		return [...accumulator, ...sensorActivators];
	}, []), [sensors, getSyntheticHandler]);
}

//#endregion
//#region vendor/dnd-kit/src/core/hooks/utilities/useDroppableMeasuring.ts
var MeasuringStrategy = /* @__PURE__ */ function(MeasuringStrategy) {
	MeasuringStrategy[MeasuringStrategy["Always"] = 0] = "Always";
	MeasuringStrategy[MeasuringStrategy["BeforeDragging"] = 1] = "BeforeDragging";
	MeasuringStrategy[MeasuringStrategy["WhileDragging"] = 2] = "WhileDragging";
	return MeasuringStrategy;
}({});
var MeasuringFrequency = /* @__PURE__ */ function(MeasuringFrequency) {
	MeasuringFrequency["Optimized"] = "optimized";
	return MeasuringFrequency;
}({});
var defaultValue$2 = /* @__PURE__ */ new Map();
function useDroppableMeasuring(containers, { dragging, dependencies, config }) {
	const [queue, setQueue] = d(null);
	const { frequency, measure, strategy } = config;
	const containersRef = A$1(containers);
	const disabled = isDisabled();
	const disabledRef = useLatestValue(disabled);
	const measureDroppableContainers = q$1((ids = []) => {
		if (disabledRef.current) return;
		setQueue((value) => {
			if (value === null) return ids;
			return value.concat(ids.filter((id) => !value.includes(id)));
		});
	}, [disabledRef]);
	const timeoutId = A$1(null);
	const droppableRects = useLazyMemo((previousValue) => {
		if (disabled && !dragging) return defaultValue$2;
		if (!previousValue || previousValue === defaultValue$2 || containersRef.current !== containers || queue != null) {
			const map = /* @__PURE__ */ new Map();
			for (let container of containers) {
				if (!container) continue;
				if (queue && queue.length > 0 && !queue.includes(container.id) && container.rect.current) {
					map.set(container.id, container.rect.current);
					continue;
				}
				const node = container.node.current;
				const rect = node ? new Rect(measure(node), node) : null;
				container.rect.current = rect;
				if (rect) map.set(container.id, rect);
			}
			return map;
		}
		return previousValue;
	}, [
		containers,
		queue,
		dragging,
		disabled,
		measure
	]);
	h(() => {
		containersRef.current = containers;
	}, [containers]);
	h(() => {
		if (disabled) return;
		measureDroppableContainers();
	}, [dragging, disabled]);
	h(() => {
		if (queue && queue.length > 0) setQueue(null);
	}, [JSON.stringify(queue)]);
	h(() => {
		if (disabled || typeof frequency !== "number" || timeoutId.current !== null) return;
		timeoutId.current = setTimeout(() => {
			measureDroppableContainers();
			timeoutId.current = null;
		}, frequency);
	}, [
		frequency,
		disabled,
		measureDroppableContainers,
		...dependencies
	]);
	return {
		droppableRects,
		measureDroppableContainers,
		measuringScheduled: queue != null
	};
	function isDisabled() {
		switch (strategy) {
			case 0: return false;
			case 1: return dragging;
			default: return !dragging;
		}
	}
}

//#endregion
//#region vendor/dnd-kit/src/core/hooks/utilities/useInitialValue.ts
function useInitialValue(value, computeFn) {
	return useLazyMemo((previousValue) => {
		if (!value) return null;
		if (previousValue) return previousValue;
		return typeof computeFn === "function" ? computeFn(value) : value;
	}, [computeFn, value]);
}

//#endregion
//#region vendor/dnd-kit/src/core/hooks/utilities/useInitialRect.ts
function useInitialRect(node, measure) {
	return useInitialValue(node, measure);
}

//#endregion
//#region vendor/dnd-kit/src/core/hooks/utilities/useMutationObserver.ts
function useMutationObserver({ callback, disabled }) {
	const handleMutations = useEvent(callback);
	const mutationObserver = T$1(() => {
		if (disabled || typeof window === "undefined" || typeof window.MutationObserver === "undefined") return;
		const { MutationObserver } = window;
		return new MutationObserver(handleMutations);
	}, [handleMutations, disabled]);
	h(() => {
		return () => mutationObserver?.disconnect();
	}, [mutationObserver]);
	return mutationObserver;
}

//#endregion
//#region vendor/dnd-kit/src/core/hooks/utilities/useResizeObserver.ts
function useResizeObserver({ callback, disabled }) {
	const handleResize = useEvent(callback);
	const resizeObserver = T$1(() => {
		if (disabled || typeof window === "undefined" || typeof window.ResizeObserver === "undefined") return;
		const { ResizeObserver } = window;
		return new ResizeObserver(handleResize);
	}, [disabled]);
	h(() => {
		return () => resizeObserver?.disconnect();
	}, [resizeObserver]);
	return resizeObserver;
}

//#endregion
//#region vendor/dnd-kit/src/core/hooks/utilities/useRect.ts
function defaultMeasure(element) {
	return new Rect(getClientRect(element), element);
}
function useRect(element, measure = defaultMeasure, fallbackRect) {
	const [rect, setRect] = d(null);
	function measureRect() {
		setRect((currentRect) => {
			if (!element) return null;
			if (element.isConnected === false) return currentRect ?? fallbackRect ?? null;
			const newRect = measure(element);
			if (JSON.stringify(currentRect) === JSON.stringify(newRect)) return currentRect;
			return newRect;
		});
	}
	const mutationObserver = useMutationObserver({ callback(records) {
		if (!element) return;
		for (const record of records) {
			const { type, target } = record;
			if (type === "childList" && target instanceof HTMLElement && target.contains(element)) {
				measureRect();
				break;
			}
		}
	} });
	const resizeObserver = useResizeObserver({ callback: measureRect });
	useIsomorphicLayoutEffect(() => {
		measureRect();
		if (element) {
			resizeObserver?.observe(element);
			mutationObserver?.observe(document.body, {
				childList: true,
				subtree: true
			});
		} else {
			resizeObserver?.disconnect();
			mutationObserver?.disconnect();
		}
	}, [element]);
	return rect;
}

//#endregion
//#region vendor/dnd-kit/src/core/hooks/utilities/useRectDelta.ts
function useRectDelta(rect) {
	return getRectDelta(rect, useInitialValue(rect));
}

//#endregion
//#region vendor/dnd-kit/src/core/hooks/utilities/useScrollableAncestors.ts
var defaultValue$1 = [];
function useScrollableAncestors(node) {
	const previousNode = A$1(node);
	const ancestors = useLazyMemo((previousValue) => {
		if (!node) return defaultValue$1;
		if (previousValue && previousValue !== defaultValue$1 && node && previousNode.current && node.parentNode === previousNode.current.parentNode) return previousValue;
		return getScrollableAncestors(node);
	}, [node]);
	h(() => {
		previousNode.current = node;
	}, [node]);
	return ancestors;
}

//#endregion
//#region vendor/dnd-kit/src/core/hooks/utilities/useScrollOffsets.ts
function useScrollOffsets(elements) {
	const [scrollCoordinates, setScrollCoordinates] = d(null);
	const prevElements = A$1(elements);
	const handleScroll = q$1((event) => {
		const scrollingElement = getScrollableElement(event.target);
		if (!scrollingElement) return;
		setScrollCoordinates((scrollCoordinates) => {
			if (!scrollCoordinates) return null;
			scrollCoordinates.set(scrollingElement, getScrollCoordinates(scrollingElement));
			return new Map(scrollCoordinates);
		});
	}, []);
	h(() => {
		const previousElements = prevElements.current;
		if (elements !== previousElements) {
			cleanup(previousElements);
			const entries = elements.map((element) => {
				const scrollableElement = getScrollableElement(element);
				if (scrollableElement) {
					scrollableElement.addEventListener("scroll", handleScroll, { passive: true });
					return [scrollableElement, getScrollCoordinates(scrollableElement)];
				}
				return null;
			}).filter((entry) => entry != null);
			setScrollCoordinates(entries.length ? new Map(entries) : null);
			prevElements.current = elements;
		}
		return () => {
			cleanup(elements);
			cleanup(previousElements);
		};
		function cleanup(elements) {
			elements.forEach((element) => {
				getScrollableElement(element)?.removeEventListener("scroll", handleScroll);
			});
		}
	}, [handleScroll, elements]);
	return T$1(() => {
		if (elements.length) return scrollCoordinates ? Array.from(scrollCoordinates.values()).reduce((acc, coordinates) => add(acc, coordinates), defaultCoordinates) : getScrollOffsets(elements);
		return defaultCoordinates;
	}, [elements, scrollCoordinates]);
}

//#endregion
//#region vendor/dnd-kit/src/core/hooks/utilities/useScrollOffsetsDelta.ts
function useScrollOffsetsDelta(scrollOffsets, dependencies = []) {
	const initialScrollOffsets = A$1(null);
	h(() => {
		initialScrollOffsets.current = null;
	}, dependencies);
	h(() => {
		const hasScrollOffsets = scrollOffsets !== defaultCoordinates;
		if (hasScrollOffsets && !initialScrollOffsets.current) initialScrollOffsets.current = scrollOffsets;
		if (!hasScrollOffsets && initialScrollOffsets.current) initialScrollOffsets.current = null;
	}, [scrollOffsets]);
	return initialScrollOffsets.current ? subtract(scrollOffsets, initialScrollOffsets.current) : defaultCoordinates;
}

//#endregion
//#region vendor/dnd-kit/src/core/hooks/utilities/useSensorSetup.ts
function useSensorSetup(sensors) {
	h(() => {
		if (!canUseDOM) return;
		const teardownFns = sensors.map(({ sensor }) => sensor.setup?.());
		return () => {
			for (const teardown of teardownFns) teardown?.();
		};
	}, sensors.map(({ sensor }) => sensor));
}

//#endregion
//#region vendor/dnd-kit/src/core/hooks/utilities/useSyntheticListeners.ts
function useSyntheticListeners(listeners, id) {
	return T$1(() => {
		return listeners.reduce((acc, { eventName, handler }) => {
			acc[eventName] = (event) => {
				handler(event, id);
			};
			return acc;
		}, {});
	}, [listeners, id]);
}

//#endregion
//#region vendor/dnd-kit/src/core/hooks/utilities/useWindowRect.ts
function useWindowRect(element) {
	return T$1(() => element ? getWindowClientRect(element) : null, [element]);
}

//#endregion
//#region vendor/dnd-kit/src/core/hooks/utilities/useRects.ts
var defaultValue = [];
function useRects(elements, measure = getClientRect) {
	const [firstElement] = elements;
	const windowRect = useWindowRect(firstElement ? getWindow(firstElement) : null);
	const [rects, setRects] = d(defaultValue);
	function measureRects() {
		setRects(() => {
			if (!elements.length) return defaultValue;
			return elements.map((element) => isDocumentScrollingElement(element) ? windowRect : new Rect(measure(element), element));
		});
	}
	const resizeObserver = useResizeObserver({ callback: measureRects });
	useIsomorphicLayoutEffect(() => {
		resizeObserver?.disconnect();
		measureRects();
		elements.forEach((element) => resizeObserver?.observe(element));
	}, [elements]);
	return rects;
}

//#endregion
//#region vendor/dnd-kit/src/core/utilities/nodes/getMeasurableNode.ts
function getMeasurableNode(node) {
	if (!node) return null;
	if (node.children.length > 1) return node;
	const firstChild = node.children[0];
	return isHTMLElement(firstChild) ? firstChild : node;
}

//#endregion
//#region vendor/dnd-kit/src/core/hooks/utilities/useDragOverlayMeasuring.ts
function useDragOverlayMeasuring({ measure }) {
	const [rect, setRect] = d(null);
	const resizeObserver = useResizeObserver({ callback: q$1((entries) => {
		for (const { target } of entries) if (isHTMLElement(target)) {
			setRect((rect) => {
				const newRect = measure(target);
				return rect ? {
					...rect,
					width: newRect.width,
					height: newRect.height
				} : newRect;
			});
			break;
		}
	}, [measure]) });
	const [nodeRef, setRef] = useNodeRef(q$1((element) => {
		const node = getMeasurableNode(element);
		resizeObserver?.disconnect();
		if (node) resizeObserver?.observe(node);
		setRect(node ? measure(node) : null);
	}, [measure, resizeObserver]));
	return T$1(() => ({
		nodeRef,
		rect,
		setRef
	}), [
		rect,
		nodeRef,
		setRef
	]);
}

//#endregion
//#region vendor/dnd-kit/src/core/components/DndContext/defaults.ts
var defaultSensors = [{
	sensor: PointerSensor,
	options: {}
}, {
	sensor: KeyboardSensor,
	options: {}
}];
var defaultData = { current: {} };
var defaultMeasuringConfiguration = {
	draggable: { measure: getTransformAgnosticClientRect },
	droppable: {
		measure: getTransformAgnosticClientRect,
		strategy: MeasuringStrategy.WhileDragging,
		frequency: MeasuringFrequency.Optimized
	},
	dragOverlay: { measure: getClientRect }
};

//#endregion
//#region vendor/dnd-kit/src/core/store/constructors.ts
var DroppableContainersMap = class extends Map {
	get(id) {
		return id != null ? super.get(id) ?? void 0 : void 0;
	}
	toArray() {
		return Array.from(this.values());
	}
	getEnabled() {
		return this.toArray().filter(({ disabled }) => !disabled);
	}
	getNodeFor(id) {
		return this.get(id)?.node.current ?? void 0;
	}
};

//#endregion
//#region vendor/dnd-kit/src/core/store/context.ts
var defaultPublicContext = {
	activatorEvent: null,
	active: null,
	activeNode: null,
	activeNodeRect: null,
	collisions: null,
	containerNodeRect: null,
	draggableNodes: /* @__PURE__ */ new Map(),
	droppableRects: /* @__PURE__ */ new Map(),
	droppableContainers: new DroppableContainersMap(),
	over: null,
	dragOverlay: {
		nodeRef: { current: null },
		rect: null,
		setRef: noop
	},
	scrollableAncestors: [],
	scrollableAncestorRects: [],
	measuringConfiguration: defaultMeasuringConfiguration,
	measureDroppableContainers: noop,
	windowRect: null,
	measuringScheduled: false
};
var defaultInternalContext = {
	activatorEvent: null,
	activators: [],
	active: null,
	activeNodeRect: null,
	ariaDescribedById: { draggable: "" },
	dispatch: noop,
	draggableNodes: /* @__PURE__ */ new Map(),
	over: null,
	measureDroppableContainers: noop
};
var InternalContext = X$1(defaultInternalContext);
var PublicContext = X$1(defaultPublicContext);

//#endregion
//#region vendor/dnd-kit/src/core/store/reducer.ts
function getInitialState() {
	return {
		draggable: {
			active: null,
			initialCoordinates: {
				x: 0,
				y: 0
			},
			nodes: /* @__PURE__ */ new Map(),
			translate: {
				x: 0,
				y: 0
			}
		},
		droppable: { containers: new DroppableContainersMap() }
	};
}
function reducer(state, action) {
	switch (action.type) {
		case Action.DragStart: return {
			...state,
			draggable: {
				...state.draggable,
				initialCoordinates: action.initialCoordinates,
				active: action.active
			}
		};
		case Action.DragMove:
			if (state.draggable.active == null) return state;
			return {
				...state,
				draggable: {
					...state.draggable,
					translate: {
						x: action.coordinates.x - state.draggable.initialCoordinates.x,
						y: action.coordinates.y - state.draggable.initialCoordinates.y
					}
				}
			};
		case Action.DragEnd:
		case Action.DragCancel: return {
			...state,
			draggable: {
				...state.draggable,
				active: null,
				initialCoordinates: {
					x: 0,
					y: 0
				},
				translate: {
					x: 0,
					y: 0
				}
			}
		};
		case Action.RegisterDroppable: {
			const { element } = action;
			const { id } = element;
			const containers = new DroppableContainersMap(state.droppable.containers);
			containers.set(id, element);
			return {
				...state,
				droppable: {
					...state.droppable,
					containers
				}
			};
		}
		case Action.SetDroppableDisabled: {
			const { id, key, disabled } = action;
			const element = state.droppable.containers.get(id);
			if (!element || key !== element.key) return state;
			const containers = new DroppableContainersMap(state.droppable.containers);
			containers.set(id, {
				...element,
				disabled
			});
			return {
				...state,
				droppable: {
					...state.droppable,
					containers
				}
			};
		}
		case Action.UnregisterDroppable: {
			const { id, key } = action;
			const element = state.droppable.containers.get(id);
			if (!element || key !== element.key) return state;
			const containers = new DroppableContainersMap(state.droppable.containers);
			containers.delete(id);
			return {
				...state,
				droppable: {
					...state.droppable,
					containers
				}
			};
		}
		default: return state;
	}
}

//#endregion
//#region vendor/dnd-kit/src/core/components/DndMonitor/context.ts
var DndMonitorContext = X$1(null);

//#endregion
//#region vendor/dnd-kit/src/core/components/DndMonitor/useDndMonitorProvider.tsx
function useDndMonitorProvider() {
	const [listeners] = d(() => /* @__PURE__ */ new Set());
	const registerListener = q$1((listener) => {
		listeners.add(listener);
		return () => listeners.delete(listener);
	}, [listeners]);
	return [q$1(({ type, event }) => {
		listeners.forEach((listener) => listener[type]?.(event));
	}, [listeners]), registerListener];
}

//#endregion
//#region vendor/dnd-kit/src/core/modifiers/applyModifiers.ts
function applyModifiers(modifiers, { transform, ...args }) {
	return modifiers?.length ? modifiers.reduce((accumulator, modifier) => {
		return modifier({
			transform: accumulator,
			...args
		});
	}, transform) : transform;
}

//#endregion
//#region vendor/dnd-kit/src/core/components/DndContext/hooks/useMeasuringConfiguration.ts
function useMeasuringConfiguration(config) {
	return T$1(() => ({
		draggable: {
			...defaultMeasuringConfiguration.draggable,
			...config?.draggable
		},
		droppable: {
			...defaultMeasuringConfiguration.droppable,
			...config?.droppable
		},
		dragOverlay: {
			...defaultMeasuringConfiguration.dragOverlay,
			...config?.dragOverlay
		}
	}), [
		config?.draggable,
		config?.droppable,
		config?.dragOverlay
	]);
}

//#endregion
//#region vendor/dnd-kit/src/core/components/DndContext/hooks/useLayoutShiftScrollCompensation.ts
function useLayoutShiftScrollCompensation({ activeNode, measure, initialRect, config = true }) {
	const initialized = A$1(false);
	const { x, y } = typeof config === "boolean" ? {
		x: config,
		y: config
	} : config;
	useIsomorphicLayoutEffect(() => {
		if (!x && !y || !activeNode) {
			initialized.current = false;
			return;
		}
		if (initialized.current || !initialRect) return;
		const node = activeNode?.node.current;
		if (!node || node.isConnected === false) return;
		const rectDelta = getRectDelta(measure(node), initialRect);
		if (!x) rectDelta.x = 0;
		if (!y) rectDelta.y = 0;
		initialized.current = true;
		if (Math.abs(rectDelta.x) > 0 || Math.abs(rectDelta.y) > 0) {
			const firstScrollableAncestor = getFirstScrollableAncestor(node);
			if (firstScrollableAncestor) firstScrollableAncestor.scrollBy({
				top: rectDelta.y,
				left: rectDelta.x
			});
		}
	}, [
		activeNode,
		x,
		y,
		initialRect,
		measure
	]);
}

//#endregion
//#region vendor/dnd-kit/src/core/components/DndContext/DndContext.tsx
var ActiveDraggableContext = X$1({
	...defaultCoordinates,
	scaleX: 1,
	scaleY: 1
});
var DndContext = N(function DndContext({ id, autoScroll = true, children, sensors = defaultSensors, collisionDetection = rectIntersection, measuring, modifiers, ...props }) {
	const [state, dispatch] = y(reducer, void 0, getInitialState);
	const [dispatchMonitorEvent, registerMonitorListener] = useDndMonitorProvider();
	const [status, setStatus] = d(0);
	const isInitialized = status === 2;
	const { draggable: { active: activeId, nodes: draggableNodes, translate }, droppable: { containers: droppableContainers } } = state;
	const node = activeId != null ? draggableNodes.get(activeId) : null;
	const activeRects = A$1({
		initial: null,
		translated: null
	});
	const active = T$1(() => activeId != null ? {
		id: activeId,
		data: node?.data ?? defaultData,
		rect: activeRects
	} : null, [activeId, node]);
	const activeRef = A$1(null);
	const [activeSensor, setActiveSensor] = d(null);
	const [activatorEvent, setActivatorEvent] = d(null);
	const latestProps = useLatestValue(props, Object.values(props));
	const draggableDescribedById = useUniqueId(`DndDescribedBy`, id);
	const enabledDroppableContainers = T$1(() => droppableContainers.getEnabled(), [droppableContainers]);
	const measuringConfiguration = useMeasuringConfiguration(measuring);
	const { droppableRects, measureDroppableContainers, measuringScheduled } = useDroppableMeasuring(enabledDroppableContainers, {
		dragging: isInitialized,
		dependencies: [translate.x, translate.y],
		config: measuringConfiguration.droppable
	});
	const activeNode = useCachedNode(draggableNodes, activeId);
	const activationCoordinates = T$1(() => activatorEvent ? getEventCoordinates(activatorEvent) : null, [activatorEvent]);
	const autoScrollOptions = getAutoScrollerOptions();
	const initialActiveNodeRect = useInitialRect(activeNode, measuringConfiguration.draggable.measure);
	useLayoutShiftScrollCompensation({
		activeNode: activeId != null ? draggableNodes.get(activeId) : null,
		config: autoScrollOptions.layoutShiftCompensation,
		initialRect: initialActiveNodeRect,
		measure: measuringConfiguration.draggable.measure
	});
	const activeNodeRect = useRect(activeNode, measuringConfiguration.draggable.measure, initialActiveNodeRect);
	const containerNodeRect = useRect(activeNode ? activeNode.parentElement : null);
	const sensorContext = A$1({
		activatorEvent: null,
		active: null,
		activeNode,
		collisionRect: null,
		collisions: null,
		droppableRects,
		draggableNodes,
		draggingNode: null,
		draggingNodeRect: null,
		droppableContainers,
		over: null,
		scrollableAncestors: [],
		scrollAdjustedTranslate: null
	});
	const overNode = droppableContainers.getNodeFor(sensorContext.current.over?.id);
	const dragOverlay = useDragOverlayMeasuring({ measure: measuringConfiguration.dragOverlay.measure });
	const draggingNode = dragOverlay.nodeRef.current ?? activeNode;
	const draggingNodeRect = isInitialized ? dragOverlay.rect ?? activeNodeRect : null;
	const usesDragOverlay = Boolean(dragOverlay.nodeRef.current && dragOverlay.rect);
	const nodeRectDelta = useRectDelta(usesDragOverlay ? null : activeNodeRect);
	const windowRect = useWindowRect(draggingNode ? getWindow(draggingNode) : null);
	const scrollableAncestors = useScrollableAncestors(isInitialized ? overNode ?? activeNode : null);
	const scrollableAncestorRects = useRects(scrollableAncestors);
	const modifiedTranslate = applyModifiers(modifiers, {
		transform: {
			x: translate.x - nodeRectDelta.x,
			y: translate.y - nodeRectDelta.y,
			scaleX: 1,
			scaleY: 1
		},
		activatorEvent,
		active,
		activeNodeRect,
		containerNodeRect,
		draggingNodeRect,
		over: sensorContext.current.over,
		overlayNodeRect: dragOverlay.rect,
		scrollableAncestors,
		scrollableAncestorRects,
		windowRect
	});
	const pointerCoordinates = activationCoordinates ? add(activationCoordinates, translate) : null;
	const scrollOffsets = useScrollOffsets(scrollableAncestors);
	const scrollAdjustment = useScrollOffsetsDelta(scrollOffsets);
	const activeNodeScrollDelta = useScrollOffsetsDelta(scrollOffsets, [activeNodeRect]);
	const scrollAdjustedTranslate = add(modifiedTranslate, scrollAdjustment);
	const collisionRect = draggingNodeRect ? getAdjustedRect(draggingNodeRect, modifiedTranslate) : null;
	const collisions = active && collisionRect ? collisionDetection({
		active,
		collisionRect,
		droppableRects,
		droppableContainers: enabledDroppableContainers,
		pointerCoordinates
	}) : null;
	const overId = getFirstCollision(collisions, "id");
	const [over, setOver] = d(null);
	const transform = adjustScale(usesDragOverlay ? modifiedTranslate : add(modifiedTranslate, activeNodeScrollDelta), over?.rect ?? null, activeNodeRect);
	const activeSensorRef = A$1(null);
	const instantiateSensor = q$1((event, { sensor: Sensor, options }) => {
		if (activeRef.current == null) return;
		const activeNode = draggableNodes.get(activeRef.current);
		if (!activeNode) return;
		const sensorInstance = new Sensor({
			active: activeRef.current,
			activeNode,
			event,
			options,
			context: sensorContext,
			onAbort(id) {
				if (!draggableNodes.get(id)) return;
				const { onDragAbort } = latestProps.current;
				const event = { id };
				onDragAbort?.(event);
				dispatchMonitorEvent({
					type: "onDragAbort",
					event
				});
			},
			onPending(id, constraint, initialCoordinates, offset) {
				if (!draggableNodes.get(id)) return;
				const { onDragPending } = latestProps.current;
				const event = {
					id,
					constraint,
					initialCoordinates,
					offset
				};
				onDragPending?.(event);
				dispatchMonitorEvent({
					type: "onDragPending",
					event
				});
			},
			onStart(initialCoordinates) {
				const id = activeRef.current;
				if (id == null) return;
				const draggableNode = draggableNodes.get(id);
				if (!draggableNode) return;
				const { onDragStart } = latestProps.current;
				const event = {
					activatorEvent,
					active: {
						id,
						data: draggableNode.data,
						rect: activeRects
					}
				};
				_n(() => {
					onDragStart?.(event);
					setStatus(1);
					dispatch({
						type: Action.DragStart,
						initialCoordinates,
						active: id
					});
					dispatchMonitorEvent({
						type: "onDragStart",
						event
					});
					setActiveSensor(activeSensorRef.current);
					setActivatorEvent(activatorEvent);
				});
			},
			onMove(coordinates) {
				dispatch({
					type: Action.DragMove,
					coordinates
				});
			},
			onEnd: createHandler(Action.DragEnd),
			onCancel: createHandler(Action.DragCancel)
		});
		activeSensorRef.current = sensorInstance;
		function createHandler(type) {
			return async function handler() {
				const { active, collisions, over, scrollAdjustedTranslate } = sensorContext.current;
				let event = null;
				if (active && scrollAdjustedTranslate) {
					const { cancelDrop } = latestProps.current;
					event = {
						activatorEvent,
						active,
						collisions,
						delta: scrollAdjustedTranslate,
						over
					};
					if (type === Action.DragEnd && typeof cancelDrop === "function") {
						if (await Promise.resolve(cancelDrop(event))) type = Action.DragCancel;
					}
				}
				activeRef.current = null;
				_n(() => {
					dispatch({ type });
					setStatus(0);
					setOver(null);
					setActiveSensor(null);
					setActivatorEvent(null);
					activeSensorRef.current = null;
					const eventName = type === Action.DragEnd ? "onDragEnd" : "onDragCancel";
					if (event) {
						const handler = latestProps.current[eventName];
						handler?.(event);
						dispatchMonitorEvent({
							type: eventName,
							event
						});
					}
				});
			};
		}
	}, [draggableNodes]);
	const activators = useCombineActivators(sensors, q$1((handler, sensor) => {
		return (event, active) => {
			const activeDraggableNode = draggableNodes.get(active);
			if (activeRef.current !== null || !activeDraggableNode || event.dndKit || event.defaultPrevented) return;
			const activationContext = { active: activeDraggableNode };
			if (handler(event, sensor.options, activationContext) === true) {
				event.dndKit = { capturedBy: sensor.sensor };
				activeRef.current = active;
				instantiateSensor(event, sensor);
			}
		};
	}, [draggableNodes, instantiateSensor]));
	useSensorSetup(sensors);
	useIsomorphicLayoutEffect(() => {
		if (activeNodeRect && status === 1) setStatus(2);
	}, [activeNodeRect, status]);
	h(() => {
		const { onDragMove } = latestProps.current;
		const { active, activatorEvent, collisions, over } = sensorContext.current;
		if (!active || !activatorEvent) return;
		const event = {
			active,
			activatorEvent,
			collisions,
			delta: {
				x: scrollAdjustedTranslate.x,
				y: scrollAdjustedTranslate.y
			},
			over
		};
		_n(() => {
			onDragMove?.(event);
			dispatchMonitorEvent({
				type: "onDragMove",
				event
			});
		});
	}, [scrollAdjustedTranslate.x, scrollAdjustedTranslate.y]);
	h(() => {
		const { active, activatorEvent, collisions, droppableContainers, scrollAdjustedTranslate } = sensorContext.current;
		if (!active || activeRef.current == null || !activatorEvent || !scrollAdjustedTranslate) return;
		const { onDragOver } = latestProps.current;
		const overContainer = droppableContainers.get(overId);
		const over = overContainer && overContainer.rect.current ? {
			id: overContainer.id,
			rect: overContainer.rect.current,
			data: overContainer.data,
			disabled: overContainer.disabled
		} : null;
		const event = {
			active,
			activatorEvent,
			collisions,
			delta: {
				x: scrollAdjustedTranslate.x,
				y: scrollAdjustedTranslate.y
			},
			over
		};
		_n(() => {
			setOver(over);
			onDragOver?.(event);
			dispatchMonitorEvent({
				type: "onDragOver",
				event
			});
		});
	}, [overId]);
	useIsomorphicLayoutEffect(() => {
		sensorContext.current = {
			activatorEvent,
			active,
			activeNode,
			collisionRect,
			collisions,
			droppableRects,
			draggableNodes,
			draggingNode,
			draggingNodeRect,
			droppableContainers,
			over,
			scrollableAncestors,
			scrollAdjustedTranslate
		};
		activeRects.current = {
			initial: draggingNodeRect,
			translated: collisionRect
		};
	}, [
		active,
		activeNode,
		collisions,
		collisionRect,
		draggableNodes,
		draggingNode,
		draggingNodeRect,
		droppableRects,
		droppableContainers,
		over,
		scrollableAncestors,
		scrollAdjustedTranslate
	]);
	useAutoScroller({
		...autoScrollOptions,
		delta: translate,
		draggingRect: collisionRect,
		pointerCoordinates,
		scrollableAncestors,
		scrollableAncestorRects
	});
	const publicContext = T$1(() => {
		return {
			active,
			activeNode,
			activeNodeRect,
			activatorEvent,
			collisions,
			containerNodeRect,
			dragOverlay,
			draggableNodes,
			droppableContainers,
			droppableRects,
			over,
			measureDroppableContainers,
			scrollableAncestors,
			scrollableAncestorRects,
			measuringConfiguration,
			measuringScheduled,
			windowRect
		};
	}, [
		active,
		activeNode,
		activeNodeRect,
		activatorEvent,
		collisions,
		containerNodeRect,
		dragOverlay,
		draggableNodes,
		droppableContainers,
		droppableRects,
		over,
		measureDroppableContainers,
		scrollableAncestors,
		scrollableAncestorRects,
		measuringConfiguration,
		measuringScheduled,
		windowRect
	]);
	const internalContext = T$1(() => {
		return {
			activatorEvent,
			activators,
			active,
			activeNodeRect,
			ariaDescribedById: { draggable: draggableDescribedById },
			dispatch,
			draggableNodes,
			over,
			measureDroppableContainers
		};
	}, [
		activatorEvent,
		activators,
		active,
		activeNodeRect,
		dispatch,
		draggableDescribedById,
		draggableNodes,
		over,
		measureDroppableContainers
	]);
	return /* @__PURE__ */ u(DndMonitorContext.Provider, {
		value: registerMonitorListener,
		children: /* @__PURE__ */ u(InternalContext.Provider, {
			value: internalContext,
			children: /* @__PURE__ */ u(PublicContext.Provider, {
				value: publicContext,
				children: /* @__PURE__ */ u(ActiveDraggableContext.Provider, {
					value: transform,
					children
				})
			})
		})
	});
	function getAutoScrollerOptions() {
		const activeSensorDisablesAutoscroll = activeSensor?.autoScrollEnabled === false;
		const autoScrollGloballyDisabled = typeof autoScroll === "object" ? autoScroll.enabled === false : autoScroll === false;
		const enabled = isInitialized && !activeSensorDisablesAutoscroll && !autoScrollGloballyDisabled;
		if (typeof autoScroll === "object") return {
			...autoScroll,
			enabled
		};
		return { enabled };
	}
});

//#endregion
//#region vendor/dnd-kit/src/core/hooks/useDraggable.ts
var NullContext = X$1(null);
var defaultRole = "button";
var ID_PREFIX$2 = "Draggable";
function useDraggable({ id, data, disabled = false, attributes }) {
	const key = useUniqueId(ID_PREFIX$2);
	const { activators, activatorEvent, active, activeNodeRect, ariaDescribedById, draggableNodes, over } = x$1(InternalContext);
	const { role = defaultRole, roleDescription = "draggable", tabIndex = 0 } = attributes ?? {};
	const isDragging = active?.id === id;
	const transform = x$1(isDragging ? ActiveDraggableContext : NullContext);
	const [node, setNodeRef] = useNodeRef();
	const [activatorNode, setActivatorNodeRef] = useNodeRef();
	const listeners = useSyntheticListeners(activators, id);
	const dataRef = useLatestValue(data);
	useIsomorphicLayoutEffect(() => {
		draggableNodes.set(id, {
			id,
			key,
			node,
			activatorNode,
			data: dataRef
		});
		return () => {
			const node = draggableNodes.get(id);
			if (node && node.key === key) draggableNodes.delete(id);
		};
	}, [draggableNodes, id]);
	return {
		active,
		activatorEvent,
		activeNodeRect,
		attributes: T$1(() => ({
			role,
			tabIndex,
			"aria-disabled": disabled,
			"aria-pressed": isDragging && role === defaultRole ? true : void 0,
			"aria-roledescription": roleDescription,
			"aria-describedby": ariaDescribedById.draggable
		}), [
			disabled,
			role,
			tabIndex,
			isDragging,
			roleDescription,
			ariaDescribedById.draggable
		]),
		isDragging,
		listeners: disabled ? void 0 : listeners,
		node,
		over,
		setNodeRef,
		setActivatorNodeRef,
		transform
	};
}

//#endregion
//#region vendor/dnd-kit/src/core/hooks/useDndContext.ts
function useDndContext() {
	return x$1(PublicContext);
}

//#endregion
//#region vendor/dnd-kit/src/core/hooks/useDroppable.ts
var ID_PREFIX$1 = "Droppable";
var defaultResizeObserverConfig = { timeout: 25 };
function useDroppable({ data, disabled = false, id, resizeObserverConfig }) {
	const key = useUniqueId(ID_PREFIX$1);
	const { active, dispatch, over, measureDroppableContainers } = x$1(InternalContext);
	const previous = A$1({ disabled });
	const resizeObserverConnected = A$1(false);
	const rect = A$1(null);
	const callbackId = A$1(null);
	const { disabled: resizeObserverDisabled, updateMeasurementsFor, timeout: resizeObserverTimeout } = {
		...defaultResizeObserverConfig,
		...resizeObserverConfig
	};
	const ids = useLatestValue(updateMeasurementsFor ?? id);
	const resizeObserver = useResizeObserver({
		callback: q$1(() => {
			if (!resizeObserverConnected.current) {
				resizeObserverConnected.current = true;
				return;
			}
			if (callbackId.current != null) clearTimeout(callbackId.current);
			callbackId.current = setTimeout(() => {
				measureDroppableContainers(Array.isArray(ids.current) ? ids.current : [ids.current]);
				callbackId.current = null;
			}, resizeObserverTimeout);
		}, [resizeObserverTimeout]),
		disabled: resizeObserverDisabled || !active
	});
	const [nodeRef, setNodeRef] = useNodeRef(q$1((newElement, previousElement) => {
		if (!resizeObserver) return;
		if (previousElement) {
			resizeObserver.unobserve(previousElement);
			resizeObserverConnected.current = false;
		}
		if (newElement) resizeObserver.observe(newElement);
	}, [resizeObserver]));
	const dataRef = useLatestValue(data);
	h(() => {
		if (!resizeObserver || !nodeRef.current) return;
		resizeObserver.disconnect();
		resizeObserverConnected.current = false;
		resizeObserver.observe(nodeRef.current);
	}, [nodeRef, resizeObserver]);
	h(() => {
		dispatch({
			type: Action.RegisterDroppable,
			element: {
				id,
				key,
				disabled,
				node: nodeRef,
				rect,
				data: dataRef
			}
		});
		return () => dispatch({
			type: Action.UnregisterDroppable,
			key,
			id
		});
	}, [id]);
	h(() => {
		if (disabled !== previous.current.disabled) {
			dispatch({
				type: Action.SetDroppableDisabled,
				id,
				key,
				disabled
			});
			previous.current.disabled = disabled;
		}
	}, [
		id,
		key,
		disabled,
		dispatch
	]);
	return {
		active,
		rect,
		isOver: over?.id === id,
		node: nodeRef,
		over,
		setNodeRef
	};
}

//#endregion
//#region vendor/dnd-kit/src/core/components/DragOverlay/components/AnimationManager/AnimationManager.tsx
function AnimationManager({ animation, children }) {
	const [clonedChildren, setClonedChildren] = d(null);
	const [element, setElement] = d(null);
	const previousChildren = usePrevious(children);
	if (!children && !clonedChildren && previousChildren) setClonedChildren(previousChildren);
	useIsomorphicLayoutEffect(() => {
		if (!element) return;
		const key = clonedChildren?.key;
		const id = clonedChildren?.props.id;
		if (key == null || id == null) {
			setClonedChildren(null);
			return;
		}
		Promise.resolve(animation(id, element)).then(() => {
			setClonedChildren(null);
		});
	}, [
		animation,
		clonedChildren,
		element
	]);
	return /* @__PURE__ */ u(S, { children: [children, clonedChildren ? mn(clonedChildren, { ref: setElement }) : null] });
}

//#endregion
//#region vendor/dnd-kit/src/core/components/DragOverlay/components/NullifiedContextProvider/NullifiedContextProvider.tsx
var defaultTransform = {
	x: 0,
	y: 0,
	scaleX: 1,
	scaleY: 1
};
function NullifiedContextProvider({ children }) {
	return /* @__PURE__ */ u(InternalContext.Provider, {
		value: defaultInternalContext,
		children: /* @__PURE__ */ u(ActiveDraggableContext.Provider, {
			value: defaultTransform,
			children
		})
	});
}

//#endregion
//#region vendor/dnd-kit/src/core/components/DragOverlay/components/PositionedOverlay/PositionedOverlay.tsx
var baseStyles = {
	position: "fixed",
	touchAction: "none"
};
var defaultTransition$1 = (activatorEvent) => {
	return isKeyboardEvent(activatorEvent) ? "transform 250ms ease" : void 0;
};
var PositionedOverlay = D(({ as, activatorEvent, adjustScale, children, className, rect, style, transform, transition = defaultTransition$1 }, ref) => {
	if (!rect) return null;
	const scaleAdjustedTransform = adjustScale ? transform : {
		...transform,
		scaleX: 1,
		scaleY: 1
	};
	const styles = {
		...baseStyles,
		width: rect.width,
		height: rect.height,
		top: rect.top,
		left: rect.left,
		transform: CSS.Transform.toString(scaleAdjustedTransform),
		transformOrigin: adjustScale && activatorEvent ? getRelativeTransformOrigin(activatorEvent, rect) : void 0,
		transition: typeof transition === "function" ? transition(activatorEvent) : transition,
		...style
	};
	return gn.createElement(as, {
		className,
		style: styles,
		ref
	}, children);
});

//#endregion
//#region vendor/dnd-kit/src/core/components/DragOverlay/hooks/useDropAnimation.ts
var defaultDropAnimationSideEffects = (options) => ({ active, dragOverlay }) => {
	const originalStyles = {};
	const { styles, className } = options;
	if (styles?.active) for (const [key, value] of Object.entries(styles.active)) {
		if (value === void 0) continue;
		originalStyles[key] = active.node.style.getPropertyValue(key);
		active.node.style.setProperty(key, value);
	}
	if (styles?.dragOverlay) for (const [key, value] of Object.entries(styles.dragOverlay)) {
		if (value === void 0) continue;
		dragOverlay.node.style.setProperty(key, value);
	}
	if (className?.active) active.node.classList.add(className.active);
	if (className?.dragOverlay) dragOverlay.node.classList.add(className.dragOverlay);
	return function cleanup() {
		for (const [key, value] of Object.entries(originalStyles)) active.node.style.setProperty(key, value);
		if (className?.active) active.node.classList.remove(className.active);
	};
};
var defaultKeyframeResolver = ({ transform: { initial, final } }) => [{ transform: CSS.Transform.toString(initial) }, { transform: CSS.Transform.toString(final) }];
var defaultDropAnimationConfiguration = {
	duration: 250,
	easing: "ease",
	keyframes: defaultKeyframeResolver,
	sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: "0" } } })
};
function useDropAnimation({ config, draggableNodes, droppableContainers, measuringConfiguration }) {
	return useEvent((id, node) => {
		if (config === null) return;
		const activeDraggable = draggableNodes.get(id);
		if (!activeDraggable) return;
		const activeNode = activeDraggable.node.current;
		if (!activeNode) return;
		const measurableNode = getMeasurableNode(node);
		if (!measurableNode) return;
		const { transform } = getWindow(node).getComputedStyle(node);
		const parsedTransform = parseTransform(transform);
		if (!parsedTransform) return;
		const animation = typeof config === "function" ? config : createDefaultDropAnimation(config);
		scrollIntoViewIfNeeded(activeNode, measuringConfiguration.draggable.measure);
		return animation({
			active: {
				id,
				data: activeDraggable.data,
				node: activeNode,
				rect: measuringConfiguration.draggable.measure(activeNode)
			},
			draggableNodes,
			dragOverlay: {
				node,
				rect: measuringConfiguration.dragOverlay.measure(measurableNode)
			},
			droppableContainers,
			measuringConfiguration,
			transform: parsedTransform
		});
	});
}
function createDefaultDropAnimation(options) {
	const { duration, easing, sideEffects, keyframes } = {
		...defaultDropAnimationConfiguration,
		...options
	};
	return ({ active, dragOverlay, transform, ...rest }) => {
		if (!duration) return;
		const delta = {
			x: dragOverlay.rect.left - active.rect.left,
			y: dragOverlay.rect.top - active.rect.top
		};
		const scale = {
			scaleX: transform.scaleX !== 1 ? active.rect.width * transform.scaleX / dragOverlay.rect.width : 1,
			scaleY: transform.scaleY !== 1 ? active.rect.height * transform.scaleY / dragOverlay.rect.height : 1
		};
		const finalTransform = {
			x: transform.x - delta.x,
			y: transform.y - delta.y,
			...scale
		};
		const animationKeyframes = keyframes({
			...rest,
			active,
			dragOverlay,
			transform: {
				initial: transform,
				final: finalTransform
			}
		});
		const [firstKeyframe] = animationKeyframes;
		const lastKeyframe = animationKeyframes[animationKeyframes.length - 1];
		if (JSON.stringify(firstKeyframe) === JSON.stringify(lastKeyframe)) return;
		const cleanup = sideEffects?.({
			active,
			dragOverlay,
			...rest
		});
		const animation = dragOverlay.node.animate(animationKeyframes, {
			duration,
			easing,
			fill: "forwards"
		});
		return new Promise((resolve) => {
			animation.onfinish = () => {
				cleanup?.();
				resolve();
			};
		});
	};
}

//#endregion
//#region vendor/dnd-kit/src/core/components/DragOverlay/hooks/useKey.ts
var key = 0;
function useKey(id) {
	return T$1(() => {
		if (id == null) return;
		key++;
		return key;
	}, [id]);
}

//#endregion
//#region vendor/dnd-kit/src/core/components/DragOverlay/DragOverlay.tsx
var DragOverlay = gn.memo(({ adjustScale = false, children, dropAnimation: dropAnimationConfig, style, transition, modifiers, wrapperElement = "div", className, zIndex = 999 }) => {
	const { activatorEvent, active, activeNodeRect, containerNodeRect, draggableNodes, droppableContainers, dragOverlay, over, measuringConfiguration, scrollableAncestors, scrollableAncestorRects, windowRect } = useDndContext();
	const transform = x$1(ActiveDraggableContext);
	const key = useKey(active?.id);
	const modifiedTransform = applyModifiers(modifiers, {
		activatorEvent,
		active,
		activeNodeRect,
		containerNodeRect,
		draggingNodeRect: dragOverlay.rect,
		over,
		overlayNodeRect: dragOverlay.rect,
		scrollableAncestors,
		scrollableAncestorRects,
		transform,
		windowRect
	});
	const initialRect = useInitialValue(activeNodeRect);
	const dropAnimation = useDropAnimation({
		config: dropAnimationConfig,
		draggableNodes,
		droppableContainers,
		measuringConfiguration
	});
	const ref = initialRect ? dragOverlay.setRef : void 0;
	return /* @__PURE__ */ u(NullifiedContextProvider, { children: /* @__PURE__ */ u(AnimationManager, {
		animation: dropAnimation,
		children: active && key ? /* @__PURE__ */ u(PositionedOverlay, {
			id: active.id,
			ref,
			as: wrapperElement,
			activatorEvent,
			adjustScale,
			className,
			transition,
			rect: initialRect,
			style: {
				zIndex,
				...style
			},
			transform: modifiedTransform,
			children
		}, key) : null
	}) });
});

//#endregion
//#region vendor/dnd-kit/src/sortable/utilities/arrayMove.ts
function arrayMove(array, from, to) {
	const newArray = array.slice();
	newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);
	return newArray;
}

//#endregion
//#region vendor/dnd-kit/src/sortable/utilities/getSortedRects.ts
function getSortedRects(items, rects) {
	return items.reduce((accumulator, id, index) => {
		const rect = rects.get(id);
		if (rect) accumulator[index] = rect;
		return accumulator;
	}, Array(items.length));
}

//#endregion
//#region vendor/dnd-kit/src/sortable/utilities/isValidIndex.ts
function isValidIndex(index) {
	return index !== null && index >= 0;
}

//#endregion
//#region vendor/dnd-kit/src/sortable/utilities/itemsEqual.ts
function itemsEqual(a, b) {
	if (a === b) return true;
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
	return true;
}

//#endregion
//#region vendor/dnd-kit/src/sortable/utilities/normalizeDisabled.ts
function normalizeDisabled(disabled) {
	if (typeof disabled === "boolean") return {
		draggable: disabled,
		droppable: disabled
	};
	return disabled;
}

//#endregion
//#region vendor/dnd-kit/src/sortable/strategies/rectSorting.ts
var rectSortingStrategy = ({ rects, activeIndex, overIndex, index }) => {
	const newRects = arrayMove(rects, overIndex, activeIndex);
	const oldRect = rects[index];
	const newRect = newRects[index];
	if (!newRect || !oldRect) return null;
	return {
		x: newRect.left - oldRect.left,
		y: newRect.top - oldRect.top,
		scaleX: newRect.width / oldRect.width,
		scaleY: newRect.height / oldRect.height
	};
};

//#endregion
//#region vendor/dnd-kit/src/sortable/strategies/verticalListSorting.ts
var defaultScale = {
	scaleX: 1,
	scaleY: 1
};
var verticalListSortingStrategy = ({ activeIndex, activeNodeRect: fallbackActiveRect, index, rects, overIndex }) => {
	const activeNodeRect = rects[activeIndex] ?? fallbackActiveRect;
	if (!activeNodeRect) return null;
	if (index === activeIndex) {
		const overIndexRect = rects[overIndex];
		if (!overIndexRect) return null;
		return {
			x: 0,
			y: activeIndex < overIndex ? overIndexRect.top + overIndexRect.height - (activeNodeRect.top + activeNodeRect.height) : overIndexRect.top - activeNodeRect.top,
			...defaultScale
		};
	}
	const itemGap = getItemGap(rects, index, activeIndex);
	if (index > activeIndex && index <= overIndex) return {
		x: 0,
		y: -activeNodeRect.height - itemGap,
		...defaultScale
	};
	if (index < activeIndex && index >= overIndex) return {
		x: 0,
		y: activeNodeRect.height + itemGap,
		...defaultScale
	};
	return {
		x: 0,
		y: 0,
		...defaultScale
	};
};
function getItemGap(clientRects, index, activeIndex) {
	const currentRect = clientRects[index];
	const previousRect = clientRects[index - 1];
	const nextRect = clientRects[index + 1];
	if (!currentRect) return 0;
	if (activeIndex < index) return previousRect ? currentRect.top - (previousRect.top + previousRect.height) : nextRect ? nextRect.top - (currentRect.top + currentRect.height) : 0;
	return nextRect ? nextRect.top - (currentRect.top + currentRect.height) : previousRect ? currentRect.top - (previousRect.top + previousRect.height) : 0;
}

//#endregion
//#region vendor/dnd-kit/src/sortable/components/SortableContext.tsx
var ID_PREFIX = "Sortable";
var Context = gn.createContext({
	activeIndex: -1,
	containerId: ID_PREFIX,
	disableTransforms: false,
	items: [],
	overIndex: -1,
	useDragOverlay: false,
	sortedRects: [],
	strategy: rectSortingStrategy,
	disabled: {
		draggable: false,
		droppable: false
	}
});
function SortableContext({ children, id, items: userDefinedItems, strategy = rectSortingStrategy, disabled: disabledProp = false }) {
	const { active, dragOverlay, droppableRects, over, measureDroppableContainers } = useDndContext();
	const containerId = useUniqueId(ID_PREFIX, id);
	const useDragOverlay = Boolean(dragOverlay.rect !== null);
	const items = T$1(() => userDefinedItems.map((item) => typeof item === "object" && "id" in item ? item.id : item), [userDefinedItems]);
	const isDragging = active != null;
	const activeIndex = active ? items.indexOf(active.id) : -1;
	const overIndex = over ? items.indexOf(over.id) : -1;
	const previousItemsRef = A$1(items);
	const itemsHaveChanged = !itemsEqual(items, previousItemsRef.current);
	const disableTransforms = overIndex !== -1 && activeIndex === -1 || itemsHaveChanged;
	const disabled = normalizeDisabled(disabledProp);
	useIsomorphicLayoutEffect(() => {
		if (itemsHaveChanged && isDragging) measureDroppableContainers(items);
	}, [
		itemsHaveChanged,
		items,
		isDragging,
		measureDroppableContainers
	]);
	h(() => {
		previousItemsRef.current = items;
	}, [items]);
	const contextValue = T$1(() => ({
		activeIndex,
		containerId,
		disabled,
		disableTransforms,
		items,
		overIndex,
		useDragOverlay,
		sortedRects: getSortedRects(items, droppableRects),
		strategy
	}), [
		activeIndex,
		containerId,
		disabled.draggable,
		disabled.droppable,
		disableTransforms,
		items,
		overIndex,
		droppableRects,
		useDragOverlay,
		strategy
	]);
	return /* @__PURE__ */ u(Context.Provider, {
		value: contextValue,
		children
	});
}

//#endregion
//#region vendor/dnd-kit/src/sortable/hooks/defaults.ts
var defaultNewIndexGetter = ({ id, items, activeIndex, overIndex }) => arrayMove(items, activeIndex, overIndex).indexOf(id);
var defaultAnimateLayoutChanges = ({ containerId, isSorting, wasDragging, index, items, newIndex, previousItems, previousContainerId, transition }) => {
	if (!transition || !wasDragging) return false;
	if (previousItems !== items && index === newIndex) return false;
	if (isSorting) return true;
	return newIndex !== index && containerId === previousContainerId;
};
var defaultTransition = {
	duration: 200,
	easing: "ease"
};
var transitionProperty = "transform";
var disabledTransition = CSS.Transition.toString({
	property: transitionProperty,
	duration: 0,
	easing: "linear"
});
var defaultAttributes = { roleDescription: "sortable" };

//#endregion
//#region vendor/dnd-kit/src/sortable/hooks/utilities/useDerivedTransform.ts
function useDerivedTransform({ disabled, index, node, rect }) {
	const [derivedTransform, setDerivedtransform] = d(null);
	const previousIndex = A$1(index);
	useIsomorphicLayoutEffect(() => {
		if (!disabled && index !== previousIndex.current && node.current) {
			const initial = rect.current;
			if (initial) {
				const current = getClientRect(node.current, { ignoreTransform: true });
				const delta = {
					x: initial.left - current.left,
					y: initial.top - current.top,
					scaleX: initial.width / current.width,
					scaleY: initial.height / current.height
				};
				if (delta.x || delta.y) setDerivedtransform(delta);
			}
		}
		if (index !== previousIndex.current) previousIndex.current = index;
	}, [
		disabled,
		index,
		node,
		rect
	]);
	h(() => {
		if (derivedTransform) setDerivedtransform(null);
	}, [derivedTransform]);
	return derivedTransform;
}

//#endregion
//#region vendor/dnd-kit/src/sortable/hooks/useSortable.ts
function useSortable({ animateLayoutChanges = defaultAnimateLayoutChanges, attributes: userDefinedAttributes, disabled: localDisabled, data: customData, getNewIndex = defaultNewIndexGetter, id, strategy: localStrategy, resizeObserverConfig, transition = defaultTransition }) {
	const { items, containerId, activeIndex, disabled: globalDisabled, disableTransforms, sortedRects, overIndex, useDragOverlay, strategy: globalStrategy } = x$1(Context);
	const disabled = normalizeLocalDisabled(localDisabled, globalDisabled);
	const index = items.indexOf(id);
	const data = T$1(() => ({
		sortable: {
			containerId,
			index,
			items
		},
		...customData
	}), [
		containerId,
		customData,
		index,
		items
	]);
	const itemsAfterCurrentSortable = T$1(() => items.slice(items.indexOf(id)), [items, id]);
	const { rect, node, isOver, setNodeRef: setDroppableNodeRef } = useDroppable({
		id,
		data,
		disabled: disabled.droppable,
		resizeObserverConfig: {
			updateMeasurementsFor: itemsAfterCurrentSortable,
			...resizeObserverConfig
		}
	});
	const { active, activatorEvent, activeNodeRect, attributes, setNodeRef: setDraggableNodeRef, listeners, isDragging, over, setActivatorNodeRef, transform } = useDraggable({
		id,
		data,
		attributes: {
			...defaultAttributes,
			...userDefinedAttributes
		},
		disabled: disabled.draggable
	});
	const setNodeRef = useCombinedRefs(setDroppableNodeRef, setDraggableNodeRef);
	const isSorting = Boolean(active);
	const displaceItem = isSorting && !disableTransforms && isValidIndex(activeIndex) && isValidIndex(overIndex);
	const shouldDisplaceDragSource = !useDragOverlay && isDragging;
	const finalTransform = displaceItem ? (shouldDisplaceDragSource && displaceItem ? transform : null) ?? (localStrategy ?? globalStrategy)({
		rects: sortedRects,
		activeNodeRect,
		activeIndex,
		overIndex,
		index
	}) : null;
	const newIndex = isValidIndex(activeIndex) && isValidIndex(overIndex) ? getNewIndex({
		id,
		items,
		activeIndex,
		overIndex
	}) : index;
	const activeId = active?.id;
	const previous = A$1({
		activeId,
		items,
		newIndex,
		containerId
	});
	const itemsHaveChanged = items !== previous.current.items;
	const shouldAnimateLayoutChanges = animateLayoutChanges({
		active,
		containerId,
		isDragging,
		isSorting,
		id,
		index,
		items,
		newIndex: previous.current.newIndex,
		previousItems: previous.current.items,
		previousContainerId: previous.current.containerId,
		transition,
		wasDragging: previous.current.activeId != null
	});
	const derivedTransform = useDerivedTransform({
		disabled: !shouldAnimateLayoutChanges,
		index,
		node,
		rect
	});
	h(() => {
		if (isSorting && previous.current.newIndex !== newIndex) previous.current.newIndex = newIndex;
		if (containerId !== previous.current.containerId) previous.current.containerId = containerId;
		if (items !== previous.current.items) previous.current.items = items;
	}, [
		isSorting,
		newIndex,
		containerId,
		items
	]);
	h(() => {
		if (activeId === previous.current.activeId) return;
		if (activeId != null && previous.current.activeId == null) {
			previous.current.activeId = activeId;
			return;
		}
		const timeoutId = setTimeout(() => {
			previous.current.activeId = activeId;
		}, 50);
		return () => clearTimeout(timeoutId);
	}, [activeId]);
	return {
		active,
		activeIndex,
		attributes,
		data,
		rect,
		index,
		newIndex,
		items,
		isOver,
		isSorting,
		isDragging,
		listeners,
		node,
		overIndex,
		over,
		setNodeRef,
		setActivatorNodeRef,
		setDroppableNodeRef,
		setDraggableNodeRef,
		transform: derivedTransform ?? finalTransform,
		transition: getTransition()
	};
	function getTransition() {
		if (derivedTransform || itemsHaveChanged && previous.current.newIndex === index) return disabledTransition;
		if (shouldDisplaceDragSource && !isKeyboardEvent(activatorEvent) || !transition) return;
		if (isSorting || shouldAnimateLayoutChanges) return CSS.Transition.toString({
			...transition,
			property: transitionProperty
		});
	}
}
function normalizeLocalDisabled(localDisabled, globalDisabled) {
	if (typeof localDisabled === "boolean") return {
		draggable: localDisabled,
		droppable: false
	};
	return {
		draggable: localDisabled?.draggable ?? globalDisabled.draggable,
		droppable: localDisabled?.droppable ?? globalDisabled.droppable
	};
}

//#endregion
//#region vendor/dnd-kit/src/sortable/sensors/keyboard/sortableKeyboardCoordinates.ts
var directions = [
	KeyboardCode.Down,
	KeyboardCode.Right,
	KeyboardCode.Up,
	KeyboardCode.Left
];

//#endregion
export { h as C, S as D, y as E, X$1 as O, d as S, x$1 as T, mn as _, PointerSensor as a, A$1 as b, useSensor as c, C as d, I as f, hn as g, gn as h, DndContext as i, k$2 as k, CSS as l, bn as m, SortableContext as n, closestCenter as o, P as p, verticalListSortingStrategy as r, useSensors as s, useSortable as t, u, nn as v, q$1 as w, P$1 as x, pn as y };
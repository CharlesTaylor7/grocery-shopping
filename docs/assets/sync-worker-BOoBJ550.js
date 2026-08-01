function e(e) {
  let t = e.target.result;
  if (
    e.oldVersion < 1 && t.createObjectStore(`actions`, { keyPath: `uuid` }),
      e.oldVersion < 2 && t.createObjectStore(`stores`, { keyPath: `id` }),
      e.oldVersion < 3 &&
      (t.deleteObjectStore(`actions`),
        t.createObjectStore(`actions`, {
          keyPath: `idb_key`,
          autoIncrement: !0,
        })),
      e.oldVersion < 4 &&
      (t.deleteObjectStore(`actions`),
        t.createObjectStore(`actions`, {
          keyPath: `idb_key`,
          autoIncrement: !0,
        }).createIndex(`actions_entity_id`, [`entity`, `id`])),
      e.oldVersion < 5 &&
      (t.deleteObjectStore(`actions`),
        t.createObjectStore(`actions`, {
          keyPath: `idb_key`,
          autoIncrement: !0,
        }).createIndex(`actions_entity_id`, [`entity.id`])),
      e.oldVersion < 6 &&
      (t.deleteObjectStore(`actions`),
        t.createObjectStore(`actions`, {
          keyPath: `idb_key`,
          autoIncrement: !0,
        }).createIndex(`actions_entity_id`, `entity.id`)),
      e.oldVersion < 7
  ) {
    t.deleteObjectStore(`actions`);
    let e = t.createObjectStore(`actions`, {
      keyPath: `idb_key`,
      autoIncrement: !0,
    });
    e.createIndex(`actions_entity_id`, `entity.id`),
      e.createIndex(`actions_entity_store_id`, `entity.store_id`);
  }
  return e.oldVersion < 8 && t.deleteObjectStore(`stores`), t;
}
function t() {
  return new Promise((t, n) => {
    let r = indexedDB.open(`groceries`, 7);
    r.onerror = (e) => {
      n(e);
    },
      r.onsuccess = (e) => {
        t(e.target.result);
      },
      r.onupgradeneeded = (n) => {
        t(e(n));
      };
  });
}
function n({ db: e, client: t, log: n }) {
  return new Promise((i, a) => {
    let o = e.transaction(`actions`, `readonly`).objectStore(`actions`)
      .openCursor();
    o.onsuccess = async (o) => {
      let s = o.target.result;
      if (!s) {
        i(!1);
        return;
      }
      let { primaryKey: c, value: l } = s;
      try {
        await r(t, l), n(`success`, l);
      } catch (e) {
        n(`error`, e), a(e);
      }
      e.transaction(`actions`, `readwrite`).objectStore(`actions`).delete(c),
        i(!0);
    };
  });
}
async function r(e, t) {
  switch (t.op) {
    case `new`: {
      let { table: n, entity: r } = t;
      return await e.post(n, r);
    }
    case `edit`: {
      let { table: n, entity: { id: r, ...i } } = t;
      return await e.patch(n, { id: `eq.${r}` }, i);
    }
    case `delete`: {
      let { table: n, entity: { id: r } } = t;
      return await e.delete(n, { id: `eq.${r}` });
    }
    default:
      console.log(`unknown op`, t.op);
  }
}
const i =
    `https://ep-red-morning-awzkc1lp.neonauth.c-12.us-east-1.aws.neon.tech/neondb/auth`,
  a =
    `https://ep-red-morning-awzkc1lp.apirest.c-12.us-east-1.aws.neon.tech/neondb/rest/v1`;
let o = 0;
function s(e, t) {
  let n = `atom${++o}`,
    r = {
      toString() {
        return n;
      },
    };
  return typeof e == `function`
    ? r.read = e
    : (r.init = e, r.read = c, r.write = l),
    t && (r.write = t),
    r;
}
function c(e) {
  return e(this);
}
function l(e, t, n) {
  return t(this, typeof n == `function` ? n(e(this)) : n);
}
const u = typeof __SENTRY_DEBUG__ > `u` || __SENTRY_DEBUG__,
  d = globalThis,
  f = `10.69.0`;
function p() {
  return m(d), d;
}
function m(e) {
  let t = e.__SENTRY__ = e.__SENTRY__ || {};
  return t.version = t.version || `10.69.0`, t[f] = t[`10.69.0`] || {};
}
function h(e, t, n = d) {
  let r = n.__SENTRY__ = n.__SENTRY__ || {}, i = r[f] = r[`10.69.0`] || {};
  return i[e] || (i[e] = t());
}
const g = {};
function ee(e) {
  if (!(`console` in d)) return e();
  let t = d.console, n = {}, r = Object.keys(g);
  r.forEach((e) => {
    let r = g[e];
    n[e] = t[e], t[e] = r;
  });
  try {
    return e();
  } finally {
    r.forEach((e) => {
      t[e] = n[e];
    });
  }
}
function te() {
  x().enabled = !0;
}
function ne() {
  x().enabled = !1;
}
function _() {
  return x().enabled;
}
function v(...e) {
  b(`log`, ...e);
}
function y(...e) {
  b(`warn`, ...e);
}
function re(...e) {
  b(`error`, ...e);
}
function b(e, ...t) {
  u && _() && ee(() => {
    d.console[e](`Sentry Logger [${e}]:`, ...t);
  });
}
function x() {
  return u ? h(`loggerSettings`, () => ({ enabled: !1 })) : { enabled: !1 };
}
const S = { enable: te, disable: ne, isEnabled: _, log: v, warn: y, error: re },
  ie = Object.prototype.toString;
function C(e, t) {
  return ie.call(e) === `[object ${t}]`;
}
function w(e) {
  return C(e, `Object`);
}
function T(e) {
  return !!(e?.then && typeof e.then == `function`);
}
function E(e, t, n) {
  try {
    Object.defineProperty(e, t, { value: n, writable: !0, configurable: !0 });
  } catch {
    u &&
      S.log(
        `Failed to add non-enumerable property "${String(t)}" to object`,
        e,
      );
  }
}
let D;
function O(e) {
  if (D !== void 0) return D ? D(e) : e();
  let t = Symbol.for(`__SENTRY_SAFE_RANDOM_ID_WRAPPER__`), n = d;
  return t in n && typeof n[t] == `function`
    ? (D = n[t], D(e))
    : (D = null, e());
}
function k() {
  return O(() => Math.random());
}
function ae() {
  return O(() => Date.now());
}
function oe(e, t = 0) {
  return typeof e != `string` || t === 0 || e.length <= t
    ? e
    : `${e.slice(0, t)}...`;
}
function se() {
  let e = d;
  return e.crypto || e.msCrypto;
}
let A;
function ce() {
  return k() * 16;
}
function j(e = se()) {
  try {
    if (e?.randomUUID) return O(() => e.randomUUID()).replace(/-/g, ``);
  } catch {}
  return A ||= `10000000100040008000100000000000`,
    A.replace(/[018]/g, (e) => (e ^ (ce() & 15) >> e / 4).toString(16));
}
const M = 1e3;
function N() {
  return ae() / M;
}
function P() {
  let { performance: e } = d;
  if (!e?.now || !e.timeOrigin) return N;
  let t = e.timeOrigin;
  return () => (t + O(() => e.now())) / M;
}
let F;
function I() {
  return (F ??= P())();
}
function L(e, t = {}) {
  if (
    t.user &&
    (!e.ipAddress && t.user.ip_address && (e.ipAddress = t.user.ip_address),
      !e.did && !t.did &&
      (e.did = t.user.id || t.user.email || t.user.username)),
      e.timestamp = t.timestamp || I(),
      t.abnormal_mechanism && (e.abnormal_mechanism = t.abnormal_mechanism),
      t.ignoreDuration && (e.ignoreDuration = t.ignoreDuration),
      t.sid && (e.sid = t.sid.length === 32 ? t.sid : j()),
      t.init !== void 0 && (e.init = t.init),
      !e.did && t.did && (e.did = `${t.did}`),
      typeof t.started == `number` && (e.started = t.started),
      e.ignoreDuration
  ) e.duration = void 0;
  else if (typeof t.duration == `number`) e.duration = t.duration;
  else {
    let t = e.timestamp - e.started;
    e.duration = t >= 0 ? t : 0;
  }
  t.release && (e.release = t.release),
    t.environment && (e.environment = t.environment),
    !e.ipAddress && t.ipAddress && (e.ipAddress = t.ipAddress),
    !e.userAgent && t.userAgent && (e.userAgent = t.userAgent),
    typeof t.errors == `number` && (e.errors = t.errors),
    t.status && (e.status = t.status);
}
function R(e, t, n = 2) {
  if (!t || typeof t != `object` || n <= 0) return t;
  if (e && Object.keys(t).length === 0) return e;
  let r = { ...e };
  for (let e in t) {
    Object.prototype.hasOwnProperty.call(t, e) && (r[e] = R(r[e], t[e], n - 1));
  }
  return r;
}
function z() {
  return j();
}
function B(e) {
  try {
    let t = d.WeakRef;
    if (typeof t == `function`) return new t(e);
  } catch {}
  return e;
}
function V(e) {
  if (e) {
    if (
      typeof e == `object` && `deref` in e && typeof e.deref == `function`
    ) {
      try {
        return e.deref();
      } catch {
        return;
      }
    }
    return e;
  }
}
const H = `_sentrySpan`;
function U(e, t) {
  t ? E(e, H, B(t)) : delete e[H];
}
function W(e) {
  return V(e[H]);
}
var G = class e {
  constructor() {
    this._notifyingListeners = !1,
      this._scopeListeners = [],
      this._eventProcessors = [],
      this._breadcrumbs = [],
      this._attachments = [],
      this._user = {},
      this._tags = {},
      this._attributes = {},
      this._extra = {},
      this._contexts = {},
      this._sdkProcessingMetadata = {},
      this._propagationContext = { traceId: z(), sampleRand: k() };
  }
  clone() {
    let t = new e();
    return t._breadcrumbs = [...this._breadcrumbs],
      t._tags = { ...this._tags },
      t._attributes = { ...this._attributes },
      t._extra = { ...this._extra },
      t._contexts = { ...this._contexts },
      this._contexts.flags &&
      (t._contexts.flags = { values: [...this._contexts.flags.values] }),
      t._user = this._user,
      t._level = this._level,
      t._session = this._session,
      t._transactionName = this._transactionName,
      t._fingerprint = this._fingerprint,
      t._eventProcessors = [...this._eventProcessors],
      t._attachments = [...this._attachments],
      t._sdkProcessingMetadata = { ...this._sdkProcessingMetadata },
      t._propagationContext = { ...this._propagationContext },
      t._client = this._client,
      t._lastEventId = this._lastEventId,
      t._conversationId = this._conversationId,
      U(t, W(this)),
      t;
  }
  setClient(e) {
    this._client = e;
  }
  setLastEventId(e) {
    this._lastEventId = e;
  }
  getClient() {
    return this._client;
  }
  lastEventId() {
    return this._lastEventId;
  }
  addScopeListener(e) {
    this._scopeListeners.push(e);
  }
  addEventProcessor(e) {
    return this._eventProcessors.push(e), this;
  }
  setUser(e) {
    return this._user = e ||
      { email: void 0, id: void 0, ip_address: void 0, username: void 0 },
      this._session && L(this._session, { user: e }),
      this._notifyScopeListeners(),
      this;
  }
  getUser() {
    return this._user;
  }
  setConversationId(e) {
    return this._conversationId = e || void 0,
      this._notifyScopeListeners(),
      this;
  }
  setTags(e) {
    return this._tags = { ...this._tags, ...e },
      this._notifyScopeListeners(),
      this;
  }
  setTag(e, t) {
    return this.setTags({ [e]: t });
  }
  setAttributes(e) {
    return this._attributes = { ...this._attributes, ...e },
      this._notifyScopeListeners(),
      this;
  }
  setAttribute(e, t) {
    return this.setAttributes({ [e]: t });
  }
  removeAttribute(e) {
    return e in this._attributes &&
      (delete this._attributes[e], this._notifyScopeListeners()),
      this;
  }
  setExtras(e) {
    return this._extra = { ...this._extra, ...e },
      this._notifyScopeListeners(),
      this;
  }
  setExtra(e, t) {
    return this._extra = { ...this._extra, [e]: t },
      this._notifyScopeListeners(),
      this;
  }
  setFingerprint(e) {
    return this._fingerprint = e, this._notifyScopeListeners(), this;
  }
  setLevel(e) {
    return this._level = e, this._notifyScopeListeners(), this;
  }
  setTransactionName(e) {
    return this._transactionName = e, this._notifyScopeListeners(), this;
  }
  setContext(e, t) {
    return t === null ? delete this._contexts[e] : this._contexts[e] = t,
      this._notifyScopeListeners(),
      this;
  }
  setSession(e) {
    return e ? this._session = e : delete this._session,
      this._notifyScopeListeners(),
      this;
  }
  getSession() {
    return this._session;
  }
  update(t) {
    if (!t) return this;
    let n = typeof t == `function` ? t(this) : t,
      {
        tags: r,
        attributes: i,
        extra: a,
        user: o,
        contexts: s,
        level: c,
        fingerprint: l = [],
        propagationContext: u,
        conversationId: d,
      } = (n instanceof e ? n.getScopeData() : w(n) ? t : void 0) || {};
    return this._tags = { ...this._tags, ...r },
      this._attributes = { ...this._attributes, ...i },
      this._extra = { ...this._extra, ...a },
      this._contexts = { ...this._contexts, ...s },
      o && Object.keys(o).length && (this._user = o),
      c && (this._level = c),
      l.length && (this._fingerprint = l),
      u && (this._propagationContext = u),
      d && (this._conversationId = d),
      this;
  }
  clear() {
    return this._breadcrumbs = [],
      this._tags = {},
      this._attributes = {},
      this._extra = {},
      this._user = {},
      this._contexts = {},
      this._level = void 0,
      this._transactionName = void 0,
      this._fingerprint = void 0,
      this._session = void 0,
      this._conversationId = void 0,
      U(this, void 0),
      this._attachments = [],
      this.setPropagationContext({ traceId: z(), sampleRand: k() }),
      this._notifyScopeListeners(),
      this;
  }
  addBreadcrumb(e, t) {
    let n = typeof t == `number` ? t : 100;
    if (n <= 0) return this;
    let r = {
      timestamp: N(),
      ...e,
      message: e.message ? oe(e.message, 2048) : e.message,
    };
    return this._breadcrumbs.push(r),
      this._breadcrumbs.length > n &&
      (this._breadcrumbs = this._breadcrumbs.slice(-n),
        this._client?.recordDroppedEvent(`buffer_overflow`, `log_item`)),
      this._notifyScopeListeners(),
      this;
  }
  getLastBreadcrumb() {
    return this._breadcrumbs[this._breadcrumbs.length - 1];
  }
  clearBreadcrumbs() {
    return this._breadcrumbs = [], this._notifyScopeListeners(), this;
  }
  addAttachment(e) {
    return this._attachments.push(e), this;
  }
  clearAttachments() {
    return this._attachments = [], this;
  }
  getScopeData() {
    return {
      breadcrumbs: this._breadcrumbs,
      attachments: this._attachments,
      contexts: this._contexts,
      tags: this._tags,
      attributes: this._attributes,
      extra: this._extra,
      user: this._user,
      level: this._level,
      fingerprint: this._fingerprint || [],
      eventProcessors: this._eventProcessors,
      propagationContext: this._propagationContext,
      sdkProcessingMetadata: this._sdkProcessingMetadata,
      transactionName: this._transactionName,
      span: W(this),
      conversationId: this._conversationId,
    };
  }
  setSDKProcessingMetadata(e) {
    return this._sdkProcessingMetadata = R(this._sdkProcessingMetadata, e, 2),
      this;
  }
  setPropagationContext(e) {
    return this._propagationContext = e, this;
  }
  getPropagationContext() {
    return this._propagationContext;
  }
  captureException(e, t) {
    let n = t?.event_id || j();
    if (!this._client) {
      return u &&
        S.warn(`No client configured on scope - will not capture exception!`),
        n;
    }
    let r = Error(`Sentry syntheticException`);
    return this._client.captureException(e, {
      originalException: e,
      syntheticException: r,
      ...t,
      event_id: n,
    }, this),
      n;
  }
  captureMessage(e, t, n) {
    let r = n?.event_id || j();
    if (!this._client) {
      return u &&
        S.warn(`No client configured on scope - will not capture message!`),
        r;
    }
    let i = n?.syntheticException ?? Error(e);
    return this._client.captureMessage(e, t, {
      originalException: e,
      syntheticException: i,
      ...n,
      event_id: r,
    }, this),
      r;
  }
  captureEvent(e, t) {
    let n = e.event_id || t?.event_id || j();
    return this._client
      ? (this._client.captureEvent(e, { ...t, event_id: n }, this), n)
      : (u && S.warn(`No client configured on scope - will not capture event!`),
        n);
  }
  _notifyScopeListeners() {
    this._notifyingListeners ||=
      (this._notifyingListeners = !0,
        this._scopeListeners.forEach((e) => {
          e(this);
        }),
        !1);
  }
};
function le() {
  return h(`defaultCurrentScope`, () => new G());
}
function ue() {
  return h(`defaultIsolationScope`, () => new G());
}
const K = (e) => e instanceof Promise && !e[q],
  q = Symbol(`chained PromiseLike`),
  de = (e, t, n) => {
    let r = e.then((e) => (t(e), e), (e) => {
      throw n(e), e;
    });
    return K(r) && K(e) ? r : fe(e, r);
  },
  fe = (e, t) => {
    if (!t) return e;
    let n = !1;
    for (let r in e) {
      if (r in t) continue;
      n = !0;
      let i = e[r];
      typeof i == `function`
        ? Object.defineProperty(t, r, {
          value: (...t) => i.apply(e, t),
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
        : t[r] = i;
    }
    return n && Object.assign(t, { [q]: !0 }), t;
  };
var pe = class {
  constructor(e, t) {
    let n;
    n = e || new G();
    let r;
    r = t || new G(), this._stack = [{ scope: n }], this._isolationScope = r;
  }
  withScope(e) {
    let t = this._pushScope(), n;
    try {
      n = e(t);
    } catch (e) {
      throw this._popScope(), e;
    }
    return T(n)
      ? de(n, () => this._popScope(), () => this._popScope())
      : (this._popScope(), n);
  }
  getClient() {
    return this.getStackTop().client;
  }
  getScope() {
    return this.getStackTop().scope;
  }
  getIsolationScope() {
    return this._isolationScope;
  }
  getStackTop() {
    return this._stack[this._stack.length - 1];
  }
  _pushScope() {
    let e = this.getScope().clone();
    return this._stack.push({ client: this.getClient(), scope: e }), e;
  }
  _popScope() {
    return this._stack.length <= 1 ? !1 : !!this._stack.pop();
  }
};
function J() {
  let e = m(p());
  return e.stack = e.stack || new pe(le(), ue());
}
function me(e) {
  return J().withScope(e);
}
function he(e, t) {
  let n = J();
  return n.withScope(() => (n.getStackTop().scope = e, t(e)));
}
function Y(e) {
  return J().withScope(() => e(J().getIsolationScope()));
}
function ge() {
  return {
    withIsolationScope: Y,
    withScope: me,
    withSetScope: he,
    withSetIsolationScope: (e, t) => Y(t),
    getCurrentScope: () => J().getScope(),
    getIsolationScope: () => J().getIsolationScope(),
  };
}
function X(e) {
  let t = m(e);
  return t.acs ? t.acs : ge();
}
function _e() {
  return X(p()).getCurrentScope();
}
function Z(e, t) {
  let n = typeof t == `string` ? t : void 0,
    r = typeof t == `string` ? void 0 : { captureContext: t };
  return _e().captureMessage(e, n, r);
}
const ve = new class {
  headers;
  constructor() {
    this.headers = new Headers({ "Content-Type": `application/json` });
  }
  useSession() {
    return { isPending: !1, error: `Not implemented` };
  }
  async getJWT() {
    let e = await fetch(`${i}/token`, {
      method: `GET`,
      headers: this.headers,
      credentials: `include`,
    });
    console.log(e.status), Z(`status: ${e.status}`);
    let t = await e.text();
    return Z(t), JSON.parse(t).token;
  }
  async getSession() {
    return await (await fetch(`${i}/get-session`, {
      method: `GET`,
      headers: this.headers,
      credentials: `include`,
    })).json();
  }
  async loginWithEmail(e) {
    return (await fetch(`${i}/sign-in/email`, {
      method: `POST`,
      headers: this.headers,
      credentials: `include`,
      body: JSON.stringify({
        email: e.email,
        password: e.password,
        rememberMe: !0,
      }),
    })).statusText;
  }
  async signupWithEmail(e) {
    return (await fetch(`${i}/sign-up/email`, {
      method: `POST`,
      headers: this.headers,
      credentials: `include`,
      body: JSON.stringify({
        name: e.name,
        email: e.email,
        password: e.password,
      }),
    })).statusText;
  }
  async resetPassword(e) {
    return (await fetch(`${i}/sign-out`, {
      method: `POST`,
      headers: this.headers,
      credentials: `include`,
      body: JSON.stringify({ newPassword: e.newPassword, token: e.token }),
    })).statusText;
  }
  async requestPasswordReset(e) {
    return (await fetch(`${i}/request-password-reset`, {
      method: `POST`,
      headers: this.headers,
      credentials: `include`,
      body: JSON.stringify({
        email: e.email,
        redirectTo: `/grocery-shopping/#/auth/password-reset`,
      }),
    })).statusText;
  }
  async signOut() {
    return (await fetch(`${i}/sign-out`, {
      method: `POST`,
      headers: this.headers,
      credentials: `include`,
      body: JSON.stringify({}),
    })).statusText;
  }
}();
async function ye() {
  let e = await ve.getJWT();
  if (!e) throw Error(`not logged in`);
  return `Bearer ${e}`;
}
var Q = class e {
  authHeader;
  constructor(e) {
    this.authHeader = e;
  }
  static new() {
    return ye().then((t) => new e(t));
  }
  async get(e, t) {
    let n = `${a}/${e}?${new URLSearchParams(t)}`;
    return await (await fetch(n, {
      method: `GET`,
      headers: { Authorization: this.authHeader },
    })).json();
  }
  async patch(e, t, n) {
    let r = `${a}/${e}?${new URLSearchParams(t)}`;
    await fetch(r, {
      method: `PATCH`,
      headers: {
        Authorization: this.authHeader,
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(n),
    });
  }
  async post(e, t) {
    let n = `${a}/${e}`;
    await fetch(n, {
      method: `POST`,
      headers: {
        Authorization: this.authHeader,
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(t),
    });
  }
  async delete(e, t) {
    let n = `${a}/${e}?${new URLSearchParams(t)}`;
    await fetch(n, {
      method: `DELETE`,
      headers: { Authorization: this.authHeader },
    });
  }
};
s(Q.new());
const $ = await Q.new(), be = { db: await t(), client: $, log: Se };
onmessage = (e) => {
  let t = e.data;
  t ? ($.authHeader = `Bearer ${t}`, xe()) : $.authHeader = ``;
};
async function xe() {
  if (!$.authHeader) return;
  let e = !0;
  for (; e;) e = await n(be);
}
function Se(...e) {
  self.postMessage(JSON.stringify(e));
}

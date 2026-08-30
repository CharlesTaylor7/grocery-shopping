//#region node_modules/.pnpm/@solidjs+signals@2.0.0-rc.4/node_modules/@solidjs/signals/dist/prod/core/error.js
var NotReadyError = class extends Error {
	source;
	constructor(r) {
		const o = Error;
		const t = o.stackTraceLimit;
		if (t !== void 0) o.stackTraceLimit = 0;
		super();
		if (t !== void 0) o.stackTraceLimit = t;
		this.source = r;
	}
};
var StatusError = class extends Error {
	source;
	constructor(r, o) {
		super(o instanceof Error ? o.message : String(o), { cause: o });
		this.source = r;
	}
};
function unwrapStatusError(r) {
	return r instanceof StatusError ? r.cause : r;
}
var NoOwnerError = class extends Error {
	constructor() {
		super("");
	}
};
var ContextNotFoundError = class extends Error {
	constructor() {
		super("");
	}
};

//#endregion
//#region node_modules/.pnpm/@solidjs+signals@2.0.0-rc.4/node_modules/@solidjs/signals/dist/prod/core/constants.js
var REACTIVE_MANUAL_WRITE = 1024;
var REACTIVE_REASK = 2048;
var REACTIVE_MISSED_WAKE = 4096;
var CONFIG_HAS_LANE = 1024;
var CONFIG_CHILD_COMPANIONS = 2048;
var CONFIG_FW_CHILDREN = 4096;
var NOT_PENDING = {};
var NO_SNAPSHOT = {};
var OVERRIDE_UNDEFINED = {};
function unwrapOverride(E) {
	return E === OVERRIDE_UNDEFINED ? void 0 : E;
}
var SUPPORTS_PROXY = typeof Proxy === "function";
var defaultContext = {};
var $REFRESH = Symbol("refresh");

//#endregion
//#region node_modules/.pnpm/@solidjs+signals@2.0.0-rc.4/node_modules/@solidjs/signals/dist/prod/core/lanes.js
var activeLanes = /* @__PURE__ */ new Set();
function findLane(n) {
	while (n.an) n = n.an;
	return n;
}
function mergeLanes(n, e) {
	n = findLane(n);
	e = findLane(e);
	if (n === e) return n;
	e.an = n;
	for (const i of e.Ae) n.Ae.add(i);
	e.Ae.clear();
	n.rn[0].push(...e.rn[0]);
	n.rn[1].push(...e.rn[1]);
	e.rn[0].length = 0;
	e.rn[1].length = 0;
	return n;
}
function resolveLane(n) {
	const e = n.o?.Be;
	if (!e) return void 0;
	const i = findLane(e);
	if (activeLanes.has(i)) return i;
	if (n.o !== null) n.o.Be = void 0;
}
function resolveTransition(n) {
	if (hasActiveOverride(n) && n.o?.Nt) {
		const e = ext(n).Nt = currentTransition(n.o?.Nt);
		if (e.fn !== true) return e;
		if (n.o !== null) n.o.Nt = null;
	}
	return resolveLane(n)?._e ?? n._e;
}
function hasActiveOverride(n) {
	const e = n.o;
	return e !== null && e.De !== void 0 && e.De !== NOT_PENDING;
}
function assignOrMergeLane(n, e) {
	const i = findLane(e);
	const t = n.o?.Be;
	if (t) {
		if (t.an) {
			ext(n).Be = e;
			n.T |= CONFIG_HAS_LANE;
			return;
		}
		const r = findLane(t);
		if (activeLanes.has(r)) {
			if (r !== i && !hasActiveOverride(n)) {
				if (i.sn && findLane(i.sn) === r) {
					ext(n).Be = e;
					n.T |= CONFIG_HAS_LANE;
				} else if (r.sn && findLane(r.sn) === i);
				else mergeLanes(i, r);
			}
			return;
		}
	}
	ext(n).Be = e;
	n.T |= CONFIG_HAS_LANE;
}

//#endregion
//#region node_modules/.pnpm/@solidjs+signals@2.0.0-rc.4/node_modules/@solidjs/signals/dist/prod/core/scheduler.js
var transitions = /* @__PURE__ */ new Set();
var dirtyQueue = {
	eE: new Array(2e3).fill(void 0),
	tE: false,
	xe: 0,
	EE: 0
};
var zombieQueue = {
	eE: new Array(2e3).fill(void 0),
	tE: false,
	xe: 0,
	EE: 0
};
function cancelZombieRecompute(e) {
	if (e.ie & 16) e.ie &= -12;
	else {
		deleteFromHeap(e, zombieQueue);
		e.ie &= -4;
	}
}
var clock = 0;
var activeTransition = null;
var scheduled = false;
var halted = false;
var haltNotified = false;
var syncDepth = 0;
var projectionWriteActive = false;
var transientStoreNodes = /* @__PURE__ */ new Set();
function canUseSimpleSyncFlush(e) {
	const t = e.m;
	return transitions.size === 0 && activeLanes.size === 0 && e.Qt.length === 0 && t.Ke.length === 0 && t.A.length === 0 && t.Tn.size === 0 && transientStoreNodes.size === 0;
}
function sweepTransientStoreNodes() {
	if (transientStoreNodes.size === 0) return;
	for (const e of transientStoreNodes) {
		if (e.u !== null) {
			transientStoreNodes.delete(e);
			continue;
		}
		if (e.Pe !== NOT_PENDING) continue;
		if (e.o?.De !== void 0 && e.o?.De !== NOT_PENDING) continue;
		if (e.o?.t) continue;
		transientStoreNodes.delete(e);
		e.o?.ft?.();
	}
}
function createBatch() {
	return {
		Te: clock,
		yt: [],
		Ne: /* @__PURE__ */ new Map(),
		Ke: [],
		A: [],
		Tn: /* @__PURE__ */ new Set(),
		ue: [],
		bt: {
			Lt: [[], []],
			Qt: []
		},
		fn: false,
		cn: /* @__PURE__ */ new Set()
	};
}
function mergeTransitionState(e, t) {
	t.fn = e;
	e.ue.push(...t.ue);
	for (const i of activeLanes) if (i._e === t) i._e = e;
	if (t.Ke.length) {
		e.Ke.push(...t.Ke);
		t.Ke.length = 0;
	}
	if (t.A.length) {
		e.A.push(...t.A);
		t.A.length = 0;
	}
	for (const i of t.Tn) e.Tn.add(i);
	const i = t.Mt;
	if (i !== void 0) {
		t.Mt = void 0;
		let n = e.Mt;
		if (n !== void 0) n.push(...i);
		else n = e.Mt = i;
		for (let e = 0; e < i.length; e++) {
			const t = i[e].pc;
			if (t !== void 0 && t.qe === i[e]) t.qa = n;
		}
	}
	for (const [i, n] of t.Ne) {
		let t = e.Ne.get(i);
		if (!t) e.Ne.set(i, t = /* @__PURE__ */ new Set());
		for (const e of n) t.add(e);
	}
	for (const i of t.cn) e.cn.add(i);
}
function schedule() {
	if (halted) {
		notifyHalted();
		return;
	}
	if (scheduled) return;
	scheduled = true;
	if (!syncDepth && !globalQueue.En && !projectionWriteActive) queueMicrotask(flush);
}
function haltReactivity(e) {
	if (halted) return;
	halted = true;
	let t = "[REACTIVITY_HALTED]";
	e === void 0 ? console.error(t) : console.error(t, e);
}
function notifyHalted() {
	if (haltNotified) return;
	haltNotified = true;
	console.error("[REACTIVITY_HALTED]");
}
var queueRunToken = 0;
var Queue = class {
	ke = null;
	Lt = [[], []];
	Qt = [];
	Vt = 0;
	created = clock;
	addChild(e) {
		this.Qt.push(e);
		e.ke = this;
	}
	removeChild(e) {
		const t = this.Qt.indexOf(e);
		if (t >= 0) {
			this.Qt.splice(t, 1);
			e.ke = null;
		}
	}
	notify(e, t, i, n) {
		if (this.ke) return this.ke.notify(e, t, i, n);
		return false;
	}
	run(e) {
		if (this.Lt[e - 1].length) {
			const t = this.Lt[e - 1];
			this.Lt[e - 1] = [];
			runQueue(t, e);
		}
		const t = this.Qt;
		const i = ++queueRunToken;
		for (let n = 0; n < t.length;) {
			const s = t[n];
			if (s.Vt !== i) {
				s.Vt = i;
				s.run?.(e);
				if (t[n] !== s) {
					n = 0;
					continue;
				}
			}
			n++;
		}
	}
	enqueue(e, t) {
		if (e) {
			if (currentOptimisticLane) findLane(currentOptimisticLane).rn[e - 1].push(t);
			else this.Lt[e - 1].push(t);
		}
		schedule();
	}
	stashQueues(e) {
		e.Lt[0].push(...this.Lt[0]);
		e.Lt[1].push(...this.Lt[1]);
		this.Lt = [[], []];
		for (let t = 0; t < this.Qt.length; t++) {
			let i = this.Qt[t];
			let n = e.Qt[t];
			if (!n) {
				n = {
					Lt: [[], []],
					Qt: []
				};
				e.Qt[t] = n;
			}
			i.stashQueues(n);
		}
	}
	restoreQueues(e) {
		this.Lt[0].push(...e.Lt[0]);
		this.Lt[1].push(...e.Lt[1]);
		for (let t = 0; t < e.Qt.length; t++) {
			const i = e.Qt[t];
			let n = this.Qt[t];
			if (n) n.restoreQueues(i);
		}
	}
};
var GlobalQueue = class GlobalQueue extends Queue {
	En = false;
	m = createBatch();
	static Ce;
	static Fe;
	static tt;
	static Bt = null;
	static p = null;
	static G = null;
	static M = null;
	static N = null;
	static Rt = null;
	static Gt = null;
	static Oe = null;
	static de = null;
	static ye = null;
	static un = null;
	static Pt = null;
	static Dt = null;
	static Ht = null;
	static Je = null;
	static k = null;
	static wt = null;
	static jt = null;
	static kt = null;
	static dn = null;
	static In = null;
	static Nn = null;
	static _n = null;
	static ln = null;
	static Ft = null;
	static ht = null;
	static gt = null;
	static je = null;
	static $e = null;
	static ze = null;
	static An = null;
	flush() {
		if (this.En) return;
		if (activeTransition === null && dirtyQueue.EE < dirtyQueue.xe && this.Lt[0].length === 0 && this.Lt[1].length === 0 && this.Qt.length === 0 && canUseSimpleSyncFlush(this)) {
			this.En = true;
			try {
				sweepDormant();
				commitPendingNodes();
			} finally {
				this.En = false;
			}
			clock++;
			scheduled = dirtyQueue.EE >= dirtyQueue.xe || this.Lt[0].length !== 0 || this.Lt[1].length !== 0 || this.m.yt.length !== 0;
			return;
		}
		this.En = true;
		try {
			sweepDormant();
			runHeap(dirtyQueue, GlobalQueue.Ce);
			if (activeTransition) {
				if (!transitionComplete(activeTransition)) {
					const e = activeTransition;
					runHeap(zombieQueue, this.m === e ? cancelZombieRecompute : GlobalQueue.Ce);
					if (this.m === e) currentBatch = this.m = createBatch();
					if (activeLanes.size) {
						GlobalQueue._n(1);
						GlobalQueue._n(2);
					}
					this.stashQueues(e.bt);
					clock++;
					scheduled = dirtyQueue.EE >= dirtyQueue.xe || this.m.yt.length > 0;
					reassignPendingTransition(e.yt);
					activeTransition = null;
					finalizePureQueue(null, true);
					return;
				}
				const t = activeTransition;
				const i = this.m;
				i !== t && i.yt.push(...t.yt);
				this.restoreQueues(t.bt);
				transitions.delete(t);
				activeTransition = null;
				reassignPendingTransition(i.yt);
				finalizePureQueue(t);
				if (i === t) {
					const e = createBatch();
					e.yt = i.yt;
					e.Ke = i.Ke;
					e.A = i.A;
					e.Tn = i.Tn;
					currentBatch = this.m = e;
				}
			} else if (canUseSimpleSyncFlush(this)) {
				commitPendingNodes();
				if (dirtyQueue.EE >= dirtyQueue.xe) {
					runHeap(dirtyQueue, GlobalQueue.Ce);
					commitPendingNodes();
				}
			} else {
				if (transitions.size) runHeap(zombieQueue, GlobalQueue.Ce);
				finalizePureQueue();
			}
			clock++;
			scheduled = dirtyQueue.EE >= dirtyQueue.xe;
			activeLanes.size && GlobalQueue._n(1);
			this.run(1);
			activeLanes.size && GlobalQueue._n(2);
			this.run(2);
		} finally {
			this.En = false;
		}
	}
	notify(e, t, i, n) {
		if (t & 1) {
			if (i & 1) {
				const t = n !== void 0 ? n : e.o?._;
				if (t?.l) return true;
				if (activeTransition && t) {
					const i = t.source;
					let n = activeTransition.Ne.get(i);
					if (!n) activeTransition.Ne.set(i, n = /* @__PURE__ */ new Set());
					const s = n.size;
					n.add(e);
					if (n.size !== s) {
						schedule();
						GlobalQueue.jt?.(activeTransition);
					}
				}
			}
			return true;
		}
		return false;
	}
	initTransition(e) {
		if (e) e = currentTransition(e);
		if (e && e === activeTransition) return;
		if (!e && activeTransition && activeTransition.Te === clock) return;
		if (!activeTransition) activeTransition = e ?? createBatch();
		else if (e) {
			const t = activeTransition;
			mergeTransitionState(e, t);
			transitions.delete(t);
			activeTransition = e;
		}
		transitions.add(activeTransition);
		activeTransition.Te = clock;
		const t = this.m;
		if (t !== activeTransition) {
			for (let e = 0; e < t.yt.length; e++) {
				const i = t.yt[e];
				i._e = activeTransition;
				activeTransition.yt.push(i);
			}
			for (let e = 0; e < t.Ke.length; e++) {
				const i = t.Ke[e];
				i._e = activeTransition;
				activeTransition.Ke.push(i);
			}
			if (t.A.length) activeTransition.A.push(...t.A);
			for (const e of t.Tn) activeTransition.Tn.add(e);
			if (t.cn.size) {
				for (const e of t.cn) activeTransition.cn.add(e);
				t.cn.clear();
			}
			currentBatch = this.m = activeTransition;
		}
		for (const e of activeLanes) if (!e._e) e._e = activeTransition;
	}
};
function queuePendingNode(e) {
	currentBatch.yt.push(e);
}
var reaskArmed = false;
var notifyEpoch = 0;
function bumpNotifyEpoch() {
	notifyEpoch++;
}
function insertSubs(e, t = false) {
	e._t = notifyEpoch;
	const i = e.T;
	const n = (i & 1024 ? e.o?.Be : void 0) || currentOptimisticLane;
	const s = (i & 512) !== 0 && e.o?.Qe !== void 0;
	const o = reaskArmed;
	for (let i = e.u; i !== null; i = i.ae) {
		const e = i.ce;
		if (o) e.ie &= ~REACTIVE_REASK;
		if (e.ie & 4 && i.nn === e.Ze && i !== e.Ye) e.ie |= REACTIVE_MISSED_WAKE;
		if (s && e.T & 8) {
			e.ie |= 256;
			continue;
		}
		if (t && n) {
			e.ie |= 128;
			assignOrMergeLane(e, n);
		} else if (t) {
			e.ie |= 128;
			if (e.o) e.o.Be = void 0;
		}
		enqueueSub(e);
	}
}
function commitPendingNode(e) {
	const t = e;
	if (!t.oe) {
		if (e.Pe !== NOT_PENDING) {
			e.be = e.Pe;
			e.Pe = NOT_PENDING;
		}
		if (e.T & 256) GlobalQueue.un(e);
		return;
	}
	if (e.Pe !== NOT_PENDING) {
		e.be = e.Pe;
		e.Pe = NOT_PENDING;
		if (e.Re && e.Re !== 3) e.Xe = true;
	}
	t.Ie = false;
	t.ie &= ~REACTIVE_MANUAL_WRITE;
	if (!(t.S & 1)) t.S &= ~4;
	if (t.o != null && (t.o.qe !== null || t.o.We !== null)) GlobalQueue.Fe(t, false, true);
	if (e.T & 256) GlobalQueue.un(e);
}
var storeCommitHook = null;
var patchCommitHook = null;
function commitPendingNodes() {
	const e = currentBatch.yt;
	for (let t = 0; t < e.length; t++) commitPendingNode(e[t]);
	e.length = 0;
	storeCommitHook?.();
	patchCommitHook?.(currentBatch);
}
function finalizePureQueue(e = null, t = false) {
	const i = !t;
	if (i) commitPendingNodes();
	if (!t && globalQueue.Qt.length) checkBoundaryChildren(globalQueue);
	const n = dirtyQueue.EE >= dirtyQueue.xe;
	if (n) runHeap(dirtyQueue, GlobalQueue.Ce);
	if (i) {
		if (n) commitPendingNodes();
		const t = e ?? globalQueue.m;
		if (t.Ke.length) GlobalQueue.dn(t.Ke);
		if (t.cn.size) {
			for (const e of t.cn) {
				if (e.ie & 64) continue;
				enqueueSub(e);
			}
			t.cn.clear();
			schedule();
		}
		if (t.A.length) {
			GlobalQueue.G(t.A);
			if (globalQueue.Qt.length) checkBoundaryChildren(globalQueue);
		}
		if (t.Tn.size) GlobalQueue.Bt(t.Tn, e);
		sweepTransientStoreNodes();
		if (activeLanes.size) GlobalQueue.Nn(e);
	}
}
function checkBoundaryChildren(e) {
	for (const t of e.Qt) {
		t.se?.();
		checkBoundaryChildren(t);
	}
}
function reassignPendingTransition(e) {
	for (let t = 0; t < e.length; t++) e[t]._e = activeTransition;
}
var globalQueue = new GlobalQueue();
var currentBatch = globalQueue.m;
function flush(e) {
	if (e) {
		syncDepth++;
		try {
			return e();
		} finally {
			try {
				flush();
			} finally {
				syncDepth--;
			}
		}
	}
	if (globalQueue.En) return;
	if (halted) return;
	while (scheduled || activeTransition) globalQueue.flush();
}
function runQueue(e, t) {
	for (let i = 0; i < e.length; i++) e[i](t);
}
function reporterBlocksSource(e, t) {
	if (e.ie & (32 | 64)) return false;
	if (e.o?.le?.has(t)) return true;
	for (let i = e.nt; i; i = i.it) {
		let e = i.ut;
		while (e) {
			if (e === t || e.lt === t) return true;
			e = e.o?.Et;
		}
	}
	return !!(e.S & 1 && e.o?._ instanceof NotReadyError && e.o?._.source === t);
}
function transitionComplete(e) {
	if (e.fn) return true;
	if (e.ue.length) return false;
	let t = true;
	for (const [i, n] of e.Ne) {
		let s = false;
		for (const e of n) {
			if (reporterBlocksSource(e, i)) {
				s = true;
				break;
			}
			n.delete(e);
		}
		if (!s) e.Ne.delete(i);
		else if (i.S & 1 && i.o?._?.source === i) {
			t = false;
			break;
		}
	}
	if (t && GlobalQueue.In?.(e)) t = false;
	t && (e.fn = true);
	return t;
}
function currentTransition(e) {
	while (e.fn && typeof e.fn === "object") e = e.fn;
	return e;
}
function runInTransition(e, t) {
	const i = activeTransition;
	try {
		activeTransition = currentTransition(e);
		return t();
	} finally {
		activeTransition = i;
	}
}

//#endregion
//#region node_modules/.pnpm/@solidjs+signals@2.0.0-rc.4/node_modules/@solidjs/signals/dist/prod/core/heap.js
function queueFor(e) {
	return e.ie & 32 ? zombieQueue : dirtyQueue;
}
function enqueueSub(e) {
	if (e.Re === 3) {
		const E = e;
		if (!E.Xe) {
			E.Xe = true;
			E.C.enqueue(2, E.Ut);
		}
		return;
	}
	const E = queueFor(e);
	if (E.xe > e.Le) E.xe = e.Le;
	insertIntoHeap(e, E);
}
function actualInsertIntoHeap(e, E) {
	const t = (e.ke?.Ct ? e.ke.Ot?.Le : e.ke?.Le) ?? -1;
	if (t >= e.Le) e.Le = t + 1;
	const n = e.Le;
	const I = E.eE[n];
	if (I === void 0) E.eE[n] = e;
	else {
		const E = I.st;
		E.ot = e;
		e.st = E;
		I.st = e;
	}
	if (n > E.EE) E.EE = n;
}
function insertIntoHeap(e, E) {
	let t = e.ie;
	if (t & (8 | 4 | 1024)) return;
	if (t & 1) e.ie = t & -4 | 2 | 8;
	else {
		e.ie = t | 8;
		if (E.tE && !(t & 2)) E.tE = false;
	}
	if (!(t & 16)) actualInsertIntoHeap(e, E);
}
function insertIntoHeapHeight(e, E) {
	let t = e.ie;
	if (t & (8 | 4 | 16 | 1024)) return;
	e.ie = t | 16;
	actualInsertIntoHeap(e, E);
}
function deleteFromHeap(e, E) {
	const t = e.ie;
	if (!(t & (8 | 16))) return;
	e.ie = t & -25;
	const n = e.Le;
	if (e.st === e) E.eE[n] = void 0;
	else {
		const t = e.ot;
		const I = E.eE[n];
		const o = t ?? I;
		if (e === I) E.eE[n] = t;
		else e.st.ot = t;
		o.st = e.st;
	}
	e.st = e;
	e.ot = void 0;
}
function markHeap(e) {
	if (e.tE) return;
	e.tE = true;
	for (let E = 0; E <= e.EE; E++) for (let t = e.eE[E]; t !== void 0; t = t.ot) if (t.ie & 8) markNode(t);
}
function markNode(e, E = 2) {
	const t = e.ie;
	if ((t & (1 | 2)) >= E) return;
	e.ie = t & -4 | E;
	for (let E = e.u; E !== null; E = E.ae) markNode(E.ce, 1);
	if (e.T & 4096) for (let E = e.o.i; E !== null; E = E.Se) for (let e = E.u; e !== null; e = e.ae) markNode(e.ce, 1);
}
function runHeap(e, E) {
	e.tE = false;
	for (e.xe = 0; e.xe <= e.EE; e.xe++) {
		let t = e.eE[e.xe];
		while (t !== void 0) {
			if (t.ie & 8) E(t);
			else adjustHeight(t, e);
			t = e.eE[e.xe];
		}
	}
	e.EE = 0;
}
function adjustHeight(e, E) {
	deleteFromHeap(e, E);
	let t = e.Le;
	for (let E = e.nt; E; E = E.it) {
		const e = E.ut;
		const n = e.lt || e;
		if (n.oe && n.Le >= t) t = n.Le + 1;
	}
	if (e.Le !== t) {
		e.Le = t;
		for (let E = e.u; E !== null; E = E.ae) insertIntoHeapHeight(E.ce, queueFor(E.ce));
	}
}

//#endregion
//#region node_modules/.pnpm/@solidjs+signals@2.0.0-rc.4/node_modules/@solidjs/signals/dist/prod/core/owner.js
function markDisposal(e) {
	let t = e.ve;
	while (t) {
		const e = t.ie;
		t.ie = e | 32;
		if (e & (8 | 16)) {
			deleteFromHeap(t, e & 32 ? zombieQueue : dirtyQueue);
			if (e & 8) insertIntoHeap(t, zombieQueue);
			else insertIntoHeapHeight(t, zombieQueue);
		}
		markDisposal(t);
		t = t.Ve;
	}
}
function disposeChildren(e, t = false, n) {
	const i = e.ie;
	if (i & 64) return;
	if (t) {
		e.ie = i | 64;
		const t = e;
		if (t.o?.Ge || t.o?.ge) GlobalQueue.un(t);
	}
	if (t && e.oe && e.o !== null) e.o.Ee = null;
	let o = n ? e.o?.qe ?? null : e.ve;
	while (o) {
		const e = o.Ve;
		const t = o;
		t.T &= ~32;
		deleteFromHeap(t, queueFor(t));
		clearDeps(t);
		disposeChildren(o, true);
		o = e;
	}
	if (n) {
		if (e.o !== null) e.o.qe = null;
	} else {
		e.ve = null;
		e.Me = 0;
	}
	if (t && !n && !(i & 32) && e.ke !== null && !(e.ke.ie & 64)) {
		const t = e.ct;
		const n = e.Ve;
		if (t !== null) t.Ve = n;
		else e.ke.ve = n;
		if (n !== null) n.ct = t;
		e.ct = null;
	}
	runDisposal(e, n);
	if (t && e.At) {
		const t = e.At;
		e.At = void 0;
		t();
	}
}
function runDisposal(e, t) {
	let n = t ? e.o?.We : e.he;
	if (!n) return;
	if (Array.isArray(n)) for (let e = 0; e < n.length; e++) {
		const t = n[e];
		t.call(t);
	}
	else n.call(n);
	if (t) {
		if (e.o !== null) e.o.We = null;
	} else e.he = null;
}
function childId(e, t) {
	let n = e;
	while (n.T & 4 && n.ke) n = n.ke;
	if (n.id != null) return formatId(n.id, t ? n.Me++ : n.Me);
	throw new Error("");
}
function getNextChildId(e) {
	return childId(e, true);
}
function inheritId(e, t, n) {
	return e?.id ?? (t ? n?.id : n?.id != null ? getNextChildId(n) : void 0);
}
function formatId(e, t) {
	const n = t.toString(36), i = n.length - 1;
	return e + (i ? String.fromCharCode(64 + i) : "") + n;
}
function getOwner() {
	return context;
}
function cleanup(e) {
	if (!context) return e;
	if (!context.he) context.he = e;
	else if (Array.isArray(context.he)) context.he.push(e);
	else context.he = [context.he, e];
	return e;
}
function disposeRootSelf(e = true) {
	disposeChildren(this, e);
}
function createOwner(e) {
	const t = context;
	const n = e?.transparent ?? false;
	const i = {
		id: inheritId(e, n, t),
		T: n ? 4 : 0,
		Ct: true,
		Ot: t?.Ct ? t.Ot : t,
		ve: null,
		Ve: null,
		ct: null,
		he: null,
		C: t?.C ?? globalQueue,
		we: t?.we || defaultContext,
		Me: 0,
		o: null,
		ke: t,
		dispose: disposeRootSelf
	};
	if (t) {
		const e = t.ve;
		if (e === null) t.ve = i;
		else {
			i.Ve = e;
			e.ct = i;
			t.ve = i;
		}
	}
	return i;
}
function createRoot(e, t) {
	const n = createOwner(t);
	return runWithOwner(n, () => e(() => n.dispose()));
}

//#endregion
//#region node_modules/.pnpm/@solidjs+signals@2.0.0-rc.4/node_modules/@solidjs/signals/dist/prod/core/graph.js
function unlinkSubs(e) {
	const n = e.ut;
	const l = e.it;
	const o = e.ae;
	const u = e.en;
	if (o !== null) o.en = u;
	else n.rt = u;
	if (u !== null) u.ae = o;
	else {
		n.u = o;
		if (o === null) {
			n.o?.ft?.();
			const e = n;
			e.oe && e.T & 32 && !(e.ie & 32) && !(e.S & 1) && unobserved(e);
		}
	}
	return l;
}
function trimStaleDeps(e) {
	const n = e.Ye;
	let l = n !== null ? n.it : e.nt;
	if (l !== null) {
		do
			l = unlinkSubs(l);
		while (l !== null);
		if (n !== null) n.it = null;
		else e.nt = null;
	}
}
function clearDeps(e) {
	let n = e.nt;
	if (!n) return;
	do
		n = unlinkSubs(n);
	while (n !== null);
	e.nt = null;
	e.Ye = null;
}
function unobserved(e) {
	deleteFromHeap(e, queueFor(e));
	clearDeps(e);
	disposeChildren(e, true);
}
var dormantNodes = /* @__PURE__ */ new Set();
function sweepDormant() {
	if (dormantNodes.size === 0) return;
	for (const e of dormantNodes) if (!e.u && e.T & 32 && !(e.S & 1) && !(e.ie & (64 | 32))) unobserved(e);
	dormantNodes.clear();
}
function link(e, n, l = false) {
	const o = n.Ye;
	if (o !== null && o.ut === e) {
		o.me &&= l;
		return;
	}
	let u = null;
	const t = n.ie & 4;
	if (t) {
		u = o !== null ? o.it : n.nt;
		if (u !== null && u.ut === e) {
			u.nn = n.Ze;
			n.Ye = u;
			u.me = l;
			return;
		}
	}
	const s = e.rt;
	if (s !== null && s.ce === n && (!t || s.nn === n.Ze)) {
		if (t) s.me &&= l;
		else s.me = l;
		return;
	}
	const r = n.Ye = e.rt = {
		ut: e,
		ce: n,
		it: u,
		en: s,
		ae: null,
		nn: n.Ze,
		me: l
	};
	if (o !== null) o.it = r;
	else n.nt = r;
	if (s !== null) s.ae = r;
	else e.u = r;
	bumpNotifyEpoch();
}

//#endregion
//#region node_modules/.pnpm/@solidjs+signals@2.0.0-rc.4/node_modules/@solidjs/signals/dist/prod/core/async.js
function addPendingSource(e, n) {
	if (e.o?.le?.has(n)) return false;
	(ext(e).le ??= /* @__PURE__ */ new Set()).add(n);
	return true;
}
function removePendingSource(e, n) {
	if (!e.o?.le?.delete(n)) return false;
	if (e.o?.le.size === 0) {
		if (e.o !== null) e.o.le = void 0;
	}
	return true;
}
function clearPendingSources(e) {
	e.o?.le?.clear();
	if (e.o !== null) e.o.le = void 0;
}
function parkLoadingWindow(e, n) {
	ext(e).fe = true;
	if (n.source) addPendingSource(e, n.source);
	if (!(e.S & 2)) setPendingError(e, n.source, n);
}
function setPendingError(e, n, t) {
	if (!n) {
		if (e.o !== null) e.o._ = null;
		return;
	}
	if (t instanceof NotReadyError && t.source === n) {
		ext(e)._ = t;
		return;
	}
	const r = e.o?._;
	if (!(r instanceof NotReadyError) || r.source !== n) ext(e)._ = new NotReadyError(n);
}
function forEachDependent(e, n) {
	for (let t = e.u; t !== null; t = t.ae) n(t.ce, t);
	for (let t = e.o?.i ?? null; t !== null; t = t.Se) for (let e = t.u; e !== null; e = e.ae) n(e.ce, e);
}
function releaseIfSettledUnobserved(e) {
	e.oe && e.T & 32 && !e.u && !(e.ie & 32) && !(e.S & 1) && unobserved(e);
}
function releaseSettledDependents(e) {
	let n;
	const t = /* @__PURE__ */ new Set();
	const visit = (e) => {
		if (t.has(e)) return;
		t.add(e);
		if (!e.u && e.T & 32) (n ??= []).push(e);
		forEachDependent(e, visit);
	};
	forEachDependent(e, visit);
	if (n) for (const e of n) releaseIfSettledUnobserved(e);
}
function settleErroredDependents(e, n) {
	let t = false;
	const r = /* @__PURE__ */ new Set();
	const visit = (e) => {
		if (r.has(e)) return;
		r.add(e);
		if (e.o?._ === n) {
			enqueueSub(e);
			t = true;
		}
		forEachDependent(e, visit);
	};
	forEachDependent(e, visit);
	if (t) schedule();
}
function settlePendingSource(e) {
	let n = false;
	let t;
	const r = /* @__PURE__ */ new Set();
	const o = GlobalQueue.de;
	const settle = (l) => {
		if (r.has(l) || !removePendingSource(l, e)) return;
		r.add(l);
		l.Te = clock;
		const i = l.o?.le?.values().next().value;
		const u = l.S & 2;
		if (i) {
			if (!u) setPendingError(l, i);
			o !== null && o(l);
		} else {
			l.S &= ~1;
			if (!u) setPendingError(l);
			o !== null && o(l);
			if (l.o?.fe) {
				enqueueSub(l);
				n = true;
			}
			if (l.o !== null) l.o.fe = false;
			if (!l.u && l.T & 32) (t ??= []).push(l);
		}
		forEachDependent(l, settle);
	};
	forEachDependent(e, settle);
	if (t) for (const e of t) releaseIfSettledUnobserved(e);
	if (n) schedule();
}
function isThenable(e) {
	return e != null && typeof e === "object" && typeof e.then === "function";
}
function handleAsync(e, n, t) {
	let r = false;
	let o = false;
	if (typeof n === "object" && n !== null) untrack(() => {
		r = n[Symbol.asyncIterator];
		o = !r && isThenable(n);
	});
	if (!o && !r) {
		if (e.o !== null) e.o.Ee = null;
		e.Ie = false;
		return n;
	}
	ext(e).Ee = n;
	let l;
	const settleTransition = () => {
		const n = resolveTransition(e);
		if (n && e.S & 4 && !currentTransition(n).Ne.has(e)) {
			e._e = null;
			return;
		}
		globalQueue.initTransition(n);
	};
	const handleError = (t) => {
		if (e.o?.Ee !== n) return;
		let r = t instanceof NotReadyError;
		if (r && e.Ie) {
			if (e.o !== null) e.o.Ee = null;
			parkLoadingWindow(e, t);
			e.Te = clock;
			return;
		}
		settleTransition();
		notifyStatus(e, r ? 1 : 2, t);
		e.Te = clock;
		if (!r) releaseSettledDependents(e);
	};
	const asyncWrite = (r, o) => {
		if (e.o?.Ee !== n) return;
		if (e.ie & (2 | 128)) return;
		settleTransition();
		const l = !!(e.S & 4);
		trimStaleDeps(e);
		clearStatus(e);
		const i = resolveLane(e);
		if (i) i.Ae.delete(e);
		if (t) {
			t(r);
			if (l) clearStatus(e, true);
		} else if (e.o?.De !== void 0) {
			if (e.Pe === NOT_PENDING) queuePendingNode(e);
			e.Pe = r;
			GlobalQueue.Oe !== null && GlobalQueue.Oe(e, r);
			if (!hasActiveOverride(e)) insertSubs(e);
			e.Te = clock;
		} else if (i) {
			const n = e.Re;
			const t = e.be;
			const o = e.Ue;
			try {
				if (!n && l || !o || !o(r, t)) {
					e.be = r;
					e.Te = clock;
					GlobalQueue.Oe !== null && GlobalQueue.Oe(e, r);
					insertSubs(e, true);
				}
			} catch (n) {
				notifyStatus(e, 2, n);
			}
		} else try {
			setSignal(e, () => r);
		} catch (n) {
			notifyStatus(e, 2, n);
		}
		if (e.Pe === NOT_PENDING) e.Ie = false;
		settlePendingSource(e);
		schedule();
		flush();
		o?.();
	};
	const settleAutodispose = () => {
		if (e.T & 32 && !e.u && !(e.S & 1)) {
			unobserved(e);
			return true;
		}
		return false;
	};
	const consumeIterator = (t, r) => {
		const o = t[Symbol.asyncIterator]();
		let i = false;
		let u = false;
		let s = !r;
		const close = () => {
			if (u) return;
			u = true;
			try {
				const e = o.return?.();
				if (isThenable(e)) e.then(void 0, () => {});
			} catch {}
		};
		r ? r(close) : cleanup(close);
		const iterateOrRelease = () => {
			if (!settleAutodispose()) iterate();
		};
		const iterate = () => {
			let t, r, f = false, a = false, c = true;
			const S = o.next();
			(isThenable(S) ? S : { then: (e) => void e(S) }).then((r) => {
				if (c && s) {
					t = r;
					f = true;
					if (r.done) u = true;
				} else if (e.o?.Ee !== n) return;
				else if (!r.done) {
					i = true;
					asyncWrite(r.value, iterateOrRelease);
				} else {
					u = true;
					if (i) {
						schedule();
						flush();
					} else asyncWrite(void 0);
					settleAutodispose();
				}
			}, (t) => {
				if (c && s) {
					r = t;
					a = true;
				} else if (e.o?.Ee === n) {
					u = true;
					handleError(t);
					settleAutodispose();
				}
			});
			c = false;
			if (a) {
				u = true;
				handleError(r);
				if (s) throw r;
				return true;
			}
			if (f && !t.done) {
				l = t.value;
				i = true;
				return iterate();
			}
			return f && t.done;
		};
		const f = iterate();
		s = false;
		return i || f;
	};
	let i = null;
	const flattenIfIterable = (e, n) => {
		let t = false;
		if (typeof e === "object" && e !== null) untrack(() => {
			t = e[Symbol.asyncIterator];
		});
		if (!t) return false;
		const r = consumeIterator(e, n);
		if (!n) i = r;
		return true;
	};
	if (o) {
		let t = false, r = false, o, i = true;
		const registerDeferredClose = (n) => {
			if (!e.he) e.he = n;
			else if (Array.isArray(e.he)) e.he.push(n);
			else e.he = [e.he, n];
		};
		n.then((r) => {
			if (i) {
				l = r;
				t = true;
			} else if (e.o?.Ee === n && !(e.ie & 64) && flattenIfIterable(r, registerDeferredClose));
			else {
				asyncWrite(r);
				settleAutodispose();
			}
		}, (e) => {
			if (i) {
				o = e;
				r = true;
			} else {
				handleError(e);
				settleAutodispose();
			}
		});
		i = false;
		if (r) {
			handleError(o);
			throw o;
		} else if (!t) {
			if (e.Ie) return e.be;
			globalQueue.initTransition(resolveTransition(e));
			throw new NotReadyError(context);
		} else if (!flattenIfIterable(l)) e.Ie = false;
	}
	if (r) flattenIfIterable(n);
	if (i !== null) {
		if (!i) {
			if (e.Ie) return e.be;
			globalQueue.initTransition(resolveTransition(e));
			throw new NotReadyError(context);
		}
		e.Ie = false;
	}
	return l;
}
function clearStatus(e, n = false) {
	if (e.o?.le) clearPendingSources(e);
	if (e.o?.fe) {
		if (e.o !== null) e.o.fe = false;
	}
	if (e.o !== null) e.o.pe = false;
	e.S = n ? 0 : e.S & 4;
	if (e.o?._) setPendingError(e);
	if (e.o?.Ge || e.o?.ge) GlobalQueue.de(e);
	if (e.o?.i && e.T & 2048 && GlobalQueue.ye !== null) GlobalQueue.ye(e);
	const t = statusNotifierOf(e);
	if (t) t.call(e);
}
function notifyStatus(e, n, t, r, o) {
	if (n === 2 && !(t instanceof StatusError) && !(t instanceof NotReadyError)) t = new StatusError(e, t);
	const l = n === 1 && t instanceof NotReadyError ? t.source : void 0;
	const i = l === e;
	const u = n === 1 && e.o?.De !== void 0 && !i;
	const s = u && hasActiveOverride(e);
	if (!r) {
		if (n === 1 && l) {
			addPendingSource(e, l);
			e.S = 1 | e.S & 4;
			setPendingError(e, l, t);
		} else {
			clearPendingSources(e);
			e.S = n | (n !== 2 ? e.S & 4 : 0);
			ext(e)._ = t;
		}
		GlobalQueue.de !== null && GlobalQueue.de(e);
		if (e.o?.i && e.T & 2048 && GlobalQueue.ye !== null) GlobalQueue.ye(e);
	}
	if (o && !r) assignOrMergeLane(e, o);
	const f = r || s;
	const a = r || u ? void 0 : o;
	const c = statusNotifierOf(e);
	if (c) {
		if (r && n === 1) return;
		if (f) c.call(e, n, t);
		else c.call(e);
		return;
	}
	forEachDependent(e, (e, r) => {
		e.Te = clock;
		if (n === 1 && l && !e.o?.le?.has(l) || n !== 1 && (e.o?._ !== t || e.o?.le)) {
			if (r.me && n !== 1 && !(t instanceof NotReadyError)) {
				enqueueSub(e);
				schedule();
				return;
			}
			if (!f && !e._e) queuePendingNode(e);
			notifyStatus(e, n, t, f, a);
		}
	});
}

//#endregion
//#region node_modules/.pnpm/@solidjs+signals@2.0.0-rc.4/node_modules/@solidjs/signals/dist/prod/core/core.js
GlobalQueue.Ce = recompute;
GlobalQueue.Fe = disposeChildren;
var tracking = false;
var stale = false;
var pendingCheckActive = false;
var latestReadActive = false;
var context = null;
var currentOptimisticLane = null;
var snapshotCaptureActive = false;
var snapshotSources = null;
function ownerInSnapshotScope(e) {
	while (e) {
		if (e.He) return true;
		e = e.ke;
	}
	return false;
}
function recompute(e, t = false) {
	bumpNotifyEpoch();
	const n = e.Re;
	if (!t) {
		if (e._e && (!n || activeTransition) && activeTransition !== e._e) globalQueue.initTransition(e._e);
		deleteFromHeap(e, queueFor(e));
		if (e.o !== null) e.o.Ee = null;
		if (e._e || n === 3) disposeChildren(e);
		else if (e.ve !== null || e.he !== null) {
			markDisposal(e);
			const t = ext(e);
			t.We = e.he;
			t.qe = e.ve;
			e.he = null;
			e.ve = null;
			e.Me = 0;
		}
	}
	let i = !!(e.ie & 128);
	const u = (e.T & 128) !== 0 && e.o?.De !== NOT_PENDING && e.o?.De !== void 0;
	const l = !!(e.S & 4);
	const o = e.S & 2 ? e.o?._ : void 0;
	const s = (e.ie & REACTIVE_REASK) !== 0;
	const a = e.Ie;
	const r = context;
	context = e;
	e.Ye = null;
	e.Ze++;
	e.ie = 4;
	e.Te = clock;
	let c = e.Pe === NOT_PENDING ? e.be : e.Pe;
	let _ = e.Le;
	let f = false;
	let N = tracking;
	let E = currentOptimisticLane;
	tracking = true;
	const I = latestReadActive;
	latestReadActive = false;
	if (i) {
		const t = GlobalQueue.je(e, true);
		if (t) currentOptimisticLane = t;
		else if (t === false) i = false;
	} else if (activeTransition && !t && activeTransition.Ke.length) {
		const t = GlobalQueue.je(e, false);
		if (t) {
			i = true;
			currentOptimisticLane = t;
		}
	}
	const d = n && n !== 2;
	const T = stale;
	if (d) stale = true;
	try {
		if (e.T & 64) {
			c = e.oe(c);
			if (e.o !== null) e.o.Ee = null;
			e.Ie = false;
		} else {
			const t = e.o?.Ee;
			const n = e.oe(c);
			const i = typeof n === "object" && n !== null;
			const u = e.o?.Ee !== t;
			c = u || !i ? n : handleAsync(e, n);
			if (!u && !i) {
				if (e.o !== null) e.o.Ee = null;
				e.Ie = false;
			}
		}
		if (e.S !== 0 || e.o !== null) clearStatus(e, t);
		if (e.T & 1024 && e.o?.Be) GlobalQueue.ze(e);
	} catch (t) {
		const n = t instanceof NotReadyError;
		if (n && e.Ie) parkLoadingWindow(e, t);
		else {
			if (n && currentOptimisticLane) GlobalQueue.$e(e);
			let i = false;
			if (n) {
				ext(e).fe = true;
				if (GlobalQueue.Je !== null) i = GlobalQueue.Je(e, s);
			}
			notifyStatus(e, n ? 1 : 2, t, void 0, n ? e.o?.Be : void 0);
			if (i) GlobalQueue.k(e);
		}
	} finally {
		tracking = N;
		latestReadActive = I;
		if (d) stale = T;
		f = (e.ie & REACTIVE_MISSED_WAKE) !== 0;
		e.ie = 0 | (t ? e.ie & 256 : 0);
		context = r;
	}
	if (!e.o?._) {
		trimStaleDeps(e);
		const s = u ? unwrapOverride(e.o?.De) : e.Pe === NOT_PENDING ? e.be : e.Pe;
		let r = false;
		try {
			r = !n && l || !e.Ue || !e.Ue(s, c);
		} catch (t) {
			notifyStatus(e, 2, t);
		}
		if (n && r) {
			e.Xe = !e.o?._;
			if (!t) e.C.enqueue(n, e.et ??= GlobalQueue.tt.bind(null, e));
		}
		if (e.o?._);
		else if (r) {
			const l = u ? e.o?.De : void 0;
			if (t || n && (activeTransition !== e._e || activeTransition === null) || i) {
				e.be = c;
				if (u && i) {
					ext(e).De = c === void 0 ? OVERRIDE_UNDEFINED : c;
					e.Pe = NOT_PENDING;
				}
			} else {
				e.Pe = c;
				if (a) e.Ie = true;
				if ((activeTransition || e._e) && GlobalQueue.Oe !== null) GlobalQueue.Oe(e, c);
			}
			if (e.u !== null && (!u || i || e.o?.De !== l)) insertSubs(e, i || u);
		} else if (u) {
			if (e.Pe === NOT_PENDING) queuePendingNode(e);
			e.Pe = c;
			if (a) e.Ie = true;
		} else if (e.Le != _) for (let t = e.u; t !== null; t = t.ae) insertIntoHeapHeight(t.ce, queueFor(t.ce));
		if (o !== void 0 && !r && !e.o?._) settleErroredDependents(e, o);
	}
	currentOptimisticLane = E;
	(e.Pe !== NOT_PENDING || e.o !== null && (e.o.qe !== null || e.o.We !== null) || (e.S & (1 | 4)) !== 0) && (!t || e.S & 1) && (!e._e || u) && queuePendingNode(e);
	e._e && n && activeTransition !== e._e && runInTransition(e._e, () => recompute(e));
	if (f) {
		enqueueSub(e);
		schedule();
	}
}
function updateIfNecessary(e) {
	if (e.ie & 4) return;
	if (e.ie & 1) for (let t = e.nt; t; t = t.it) {
		const n = t.ut;
		const i = n.lt || n;
		if (i.oe) updateIfNecessary(i);
		if (e.ie & 2) break;
	}
	if (e.ie & (2 | 128) || e.o?._ && e.Te < clock && !e.o?.Ee) recompute(e);
	e.ie = e.ie & (256 | 8 | 16);
}
function computed(e, t) {
	const n = t?.transparent ?? false;
	const i = t !== null && typeof t === "object" && "loadingValue" in t;
	const u = {
		id: inheritId(t, n, context),
		T: (n ? 4 : 0) | (t?.ownedWrite ? 1 : 0) | (!context || t?.lazy ? 32 : 0) | (t?.sync ? 64 : 0) | (t?.H ? 2 : 0) | (snapshotCaptureActive && ownerInSnapshotScope(context) ? 8 : 0),
		Ue: t?.equals != null ? t.equals : isEqual,
		he: null,
		C: context?.C ?? globalQueue,
		we: context?.we ?? defaultContext,
		Me: 0,
		oe: e,
		be: i ? t.loadingValue : void 0,
		Le: 0,
		ot: void 0,
		st: null,
		nt: null,
		Ye: null,
		Ze: 0,
		u: null,
		rt: null,
		ke: context,
		Ve: null,
		ct: null,
		ve: null,
		ie: t?.lazy ? 512 : 0,
		S: i ? 0 : 4,
		Te: clock,
		Pe: NOT_PENDING,
		_e: null,
		_t: -1,
		Ie: i,
		o: null
	};
	if (t?.unobserved) ext(u).ft = t.unobserved;
	setupComputedNode(u, t);
	return u;
}
function ext(e) {
	return e.o ??= {
		De: void 0,
		Nt: void 0,
		Be: void 0,
		Ge: void 0,
		ge: void 0,
		Et: void 0,
		t: 0,
		Ee: null,
		_: void 0,
		fe: void 0,
		le: void 0,
		h: void 0,
		pe: false,
		i: null,
		ft: void 0,
		Qe: void 0,
		We: null,
		qe: null,
		It: void 0
	};
}
function createEffectNode(e, t, n, i, u) {
	const l = u?.transparent ?? false;
	const o = {
		id: inheritId(u, l, context),
		T: (l ? 4 : 0) | (u?.ownedWrite ? 1 : 0) | (u?.sync ? 64 : 0) | (snapshotCaptureActive && ownerInSnapshotScope(context) ? 8 : 0),
		Ue: false,
		he: null,
		C: context?.C ?? globalQueue,
		we: context?.we ?? defaultContext,
		Me: 0,
		oe: e,
		be: void 0,
		Le: 0,
		ot: void 0,
		st: null,
		nt: null,
		Ye: null,
		Ze: 0,
		u: null,
		rt: null,
		ke: context,
		Ve: null,
		ct: null,
		ve: null,
		ie: 512,
		S: 4,
		Te: clock,
		Pe: NOT_PENDING,
		_e: null,
		_t: -1,
		Ie: false,
		Xe: false,
		dt: void 0,
		Tt: t,
		St: n,
		At: void 0,
		Re: i,
		o: null
	};
	if (u?.unobserved) ext(o).ft = u.unobserved;
	setupComputedNode(o, lazyOptions);
	return o;
}
var effectStatusNotify = null;
function setEffectStatusNotify(e) {
	effectStatusNotify = e;
}
function statusNotifierOf(e) {
	const t = e.o;
	const n = t !== null && t !== void 0 ? t.h : void 0;
	if (n !== void 0) return n;
	return e.Re ? effectStatusNotify ?? void 0 : void 0;
}
var lazyOptions = { lazy: true };
function setupComputedNode(e, t) {
	e.st = e;
	const n = context?.Ct ? context.Ot : context;
	if (context) {
		const t = context.ve;
		if (t === null) context.ve = e;
		else {
			e.Ve = t;
			t.ct = e;
			context.ve = e;
		}
	}
	if (n) e.Le = n.Le + 1;
	if (GlobalQueue.Rt !== null) GlobalQueue.Rt(e);
	!t?.lazy && recompute(e, true);
	if (snapshotCaptureActive && !t?.lazy) {
		if (!(e.S & 1) && !(e.T & 2)) {
			ext(e).Qe = e.be === void 0 ? NO_SNAPSHOT : e.be;
			e.T |= 512;
			snapshotSources.add(e);
		}
	}
}
function signal(e, t, n = null) {
	const i = {
		Ue: t?.equals != null ? t.equals : isEqual,
		T: (t?.ownedWrite ? 1 : 0) | (t?.H ? 2 : 0),
		be: e,
		u: null,
		rt: null,
		Te: clock,
		lt: n,
		Se: n?.o?.i || null,
		Pe: NOT_PENDING,
		_e: null,
		_t: -1,
		o: null
	};
	if (t?.unobserved) ext(i).ft = t.unobserved;
	if (n) {
		ext(n).i = i;
		n.T |= CONFIG_FW_CHILDREN;
	}
	if (snapshotCaptureActive && !(i.T & 2) && !((n?.S ?? 0) & 1)) {
		ext(i).Qe = e === void 0 ? NO_SNAPSHOT : e;
		i.T |= 512;
		snapshotSources.add(i);
	}
	return i;
}
function isEqual(e, t) {
	return e === t;
}
function untrack(e, t) {
	if (GlobalQueue.Gt === null && !tracking && true) return e();
	const n = tracking;
	tracking = false;
	try {
		if (GlobalQueue.Gt !== null) return GlobalQueue.Gt(e);
		return e();
	} finally {
		tracking = n;
	}
}
function prepareComputed(e, t) {
	if (e.ie & 512) {
		e.ie &= ~512;
		recompute(e, true);
	} else if (e.ie & 64) {
		if (e.T & 32) recompute(e, true);
	} else if (t) updateIfNecessary(e);
}
function read(e) {
	if (latestReadActive) return GlobalQueue.Pt(e);
	let t = context;
	if (t?.Ct) t = t.Ot;
	const n = e;
	const i = e.lt;
	const u = i || e;
	if (pendingCheckActive) GlobalQueue.Dt(e, t, u, i);
	else if (typeof n.oe === "function") prepareComputed(e, false);
	if (!n.oe && u === e && e.o?.De === void 0 && e.o?.Qe === void 0 && activeTransition === null && currentOptimisticLane === null && !snapshotCaptureActive && true) {
		if (t && tracking) link(e, t);
		return !t || e.Pe === NOT_PENDING || t.T & 16 ? e.be : e.Pe;
	}
	if (t && tracking) {
		link(e, t, pendingCheckActive);
		if (u.oe) {
			const n = queueFor(e);
			if (u.Le >= n.xe) {
				markNode(t);
				markHeap(n);
				updateIfNecessary(u);
			}
			const i = u.Le;
			if (i >= t.Le && e.ke !== t) t.Le = i + 1;
		}
	}
	if (u.S & 1) {
		if (t && !(stale && u._e && activeTransition !== u._e)) {
			if (currentOptimisticLane === null || GlobalQueue.ht(u)) {
				if (!tracking && e !== t) link(e, t);
				throw u.o?._;
			}
		} else if (t && u.S & 4) {
			if (!tracking && e !== t) link(e, t);
			throw u.o?._;
		} else if (!t && u.S & 4) throw u.o?._;
	}
	if (u.oe && u.S & 2) {
		if (tracking && !pendingCheckActive && u.Te < clock) {
			recompute(u);
			return read(e);
		} else throw u.o?._;
	}
	if (snapshotCaptureActive && t && t.T & 8) {
		const n = e.o?.Qe;
		if (n !== void 0) {
			const i = n === NO_SNAPSHOT ? void 0 : n;
			if ((e.Pe !== NOT_PENDING ? e.Pe : e.be) !== i) t.ie |= 256;
			return i;
		}
	}
	if (e.o?.De !== void 0 && e.o?.De !== NOT_PENDING) return unwrapOverride(e.o?.De);
	if (currentOptimisticLane !== null && activeTransition !== null && t !== null && GlobalQueue.Ft(e, u, t)) return e.be;
	const l = !t || currentOptimisticLane !== null && GlobalQueue.gt(e, u, t) || e.Pe === NOT_PENDING || t.T & 16 || stale && e._e && activeTransition !== e._e ? e.be : e.Pe;
	if (pendingCheckActive) GlobalQueue.Ht(e, l);
	if (!t && u === e && typeof n.oe === "function" && e.T & 32 && !(u.S & 1) && !e.u) {
		dormantNodes.add(e);
		schedule();
	}
	return l;
}
function setSignal(e, t) {
	if (e._e && activeTransition !== e._e) globalQueue.initTransition(e._e);
	if (e.T & 128 && !projectionWriteActive) return GlobalQueue.kt(e, t);
	const n = e.Pe === NOT_PENDING ? e.be : e.Pe;
	if (typeof t === "function") t = t(n);
	if (!(!!(e.S & 4) || !e.Ue || !e.Ue(n, t))) return t;
	const u = e.Pe !== NOT_PENDING;
	if (!u) queuePendingNode(e);
	e.Pe = t;
	e.T & 256 && GlobalQueue.Oe !== null && GlobalQueue.Oe(e, t);
	if (e.oe !== void 0) e.Te = clock;
	if (u && e._t === notifyEpoch && currentOptimisticLane === null && !reaskArmed) return t;
	insertSubs(e);
	schedule();
	return t;
}
function suppressComputedRecompute(e) {
	deleteFromHeap(e, queueFor(e));
	if (!(e.ie & 1024) && e.Pe === NOT_PENDING) {
		queuePendingNode(e);
		schedule();
	}
	e.ie = e.ie & -4 | REACTIVE_MANUAL_WRITE;
	e.vt = clock;
}
function setMemo(e, t) {
	const n = setSignal(e, t);
	suppressComputedRecompute(e);
	return n;
}
function runWithOwner(e, t) {
	const n = context;
	const i = tracking;
	context = e;
	tracking = false;
	try {
		return t();
	} finally {
		context = n;
		tracking = i;
	}
}
function staleValues(e, t = true) {
	const n = stale;
	stale = t;
	try {
		return e();
	} finally {
		stale = n;
	}
}

//#endregion
//#region node_modules/.pnpm/@solidjs+signals@2.0.0-rc.4/node_modules/@solidjs/signals/dist/prod/core/context.js
function createContext(e, t) {
	return {
		id: Symbol(t),
		defaultValue: e
	};
}
function getContext(e, t = getOwner()) {
	if (!t) throw new NoOwnerError();
	const n = hasContext(e, t) ? t.we[e.id] : e.defaultValue;
	if (isUndefined(n)) throw new ContextNotFoundError();
	return n;
}
function setContext(e, t, n = getOwner()) {
	if (!n) throw new NoOwnerError();
	n.we = {
		...n.we,
		[e.id]: isUndefined(t) ? e.defaultValue : t
	};
}
function hasContext(e, t) {
	return !isUndefined(t?.we[e.id]);
}
function isUndefined(e) {
	return typeof e === "undefined";
}

//#endregion
//#region node_modules/.pnpm/@solidjs+signals@2.0.0-rc.4/node_modules/@solidjs/signals/dist/prod/core/effect.js
function effect(t, e, E, f) {
	const r = !!f?.user;
	const R = createEffectNode(t, e, E, r ? 2 : 1, f);
	recompute(R, true);
	!f?.defer && (R.Re === 2 || f?.schedule ? R.C.enqueue(R.Re, runEffect.bind(null, R)) : runEffect(R));
}
function notifyEffectStatus(t, e) {
	const E = t !== void 0 ? t : this.S;
	const f = e !== void 0 ? e : this.o?._;
	if (E & 2) {
		this.C.notify(this, 1, 0);
		if (this.Re === 2) {
			if (this.S & 2) {
				this.Xe = true;
				this.C.enqueue(this.Re, this.et ??= runEffect.bind(null, this));
			}
			return;
		}
		if (!this.C.notify(this, 2, 2)) {
			haltReactivity(unwrapStatusError(f));
			throw f;
		}
	} else if (this.Re === 1) this.C.notify(this, 1 | 2, E, f);
}
function runEffect(t) {
	if (!t.Xe || t.ie & 64) return;
	if (t.S & 2 && t.Re === 2) {
		const e = unwrapStatusError(t.o?._);
		t.dt = t.be;
		t.Xe = false;
		try {
			t.St ? t.St(e, () => {
				const e = t.At;
				t.At = void 0;
				e?.();
			}) : console.error(e);
		} catch (e) {
			if (!t.C.notify(t, 2, 2)) {
				haltReactivity(e);
				throw e;
			}
		}
		return;
	}
	const e = t.At;
	t.At = void 0;
	try {
		e?.();
		t.At = t.Tt(t.be, t.dt);
	} catch (e) {
		ext(t)._ = new StatusError(t, e);
		t.S |= 2;
		if (!t.C.notify(t, 2, 2)) {
			haltReactivity(e);
			throw e;
		}
	} finally {
		t.dt = t.be;
		t.Xe = false;
	}
}
GlobalQueue.tt = runEffect;
function trackedEffect(t, e) {
	const run = () => {
		if (!E.Xe || E.ie & 64) return;
		try {
			E.Xe = false;
			recompute(E);
		} finally {}
	};
	const E = computed(() => {
		const e = E.At;
		E.At = void 0;
		e?.();
		const f = staleValues(t);
		E.At = f;
	}, {
		...e,
		lazy: true
	});
	E.At = void 0;
	E.T = E.T & ~32 | 16;
	E.Xe = true;
	E.Re = 3;
	E.Ut = run;
	E.C.enqueue(2, run);
}
setEffectStatusNotify(notifyEffectStatus);

//#endregion
//#region node_modules/.pnpm/@solidjs+signals@2.0.0-rc.4/node_modules/@solidjs/signals/dist/prod/signals.js
function onCleanup(e) {
	return cleanup(e);
}
function accessor(e) {
	const t = read.bind(null, e);
	t[$REFRESH] = e;
	return t;
}
function createSignal(e, t) {
	if (typeof e === "function") {
		const n = computed(e, t);
		n.T &= ~32;
		return [accessor(n), setMemo.bind(null, n)];
	}
	const n = signal(e, t);
	return [accessor(n), setSignal.bind(null, n)];
}
function createMemo(e, t) {
	return accessor(computed(e, t));
}
function createEffect(e, t, n) {
	effect(e, t.effect || t, t.error, {
		user: true,
		...n
	});
}
function createRenderEffect(e, t, n) {
	effect(e, t, void 0, n);
}
function createTrackedEffect(e, t) {
	trackedEffect(e, t);
}
function onSettled(e) {
	const t = getOwner();
	t && !(t.T & 16) ? createTrackedEffect(() => untrack(e), void 0) : globalQueue.enqueue(2, () => {
		e();
	});
}

//#endregion
//#region node_modules/.pnpm/@solidjs+signals@2.0.0-rc.4/node_modules/@solidjs/signals/dist/prod/store/store.js
var $TRACK = Symbol(0);
var $PROXY = Symbol(0);
function ownEnumerableKeys(e) {
	return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}

//#endregion
//#region node_modules/.pnpm/@solidjs+signals@2.0.0-rc.4/node_modules/@solidjs/signals/dist/prod/map.js
function mapArray(t, s, i) {
	const e = typeof i?.keyed === "function" ? i.keyed : void 0;
	const r = s.length > 1;
	const n = s;
	const h = {
		Wt: createOwner(),
		xt: 0,
		Kt: t,
		$t: [],
		qt: n,
		zt: [],
		Jt: [],
		Xt: e,
		Yt: e || i?.keyed === false ? [] : void 0,
		Zt: r && i?.keyed !== false ? [] : void 0,
		ts: i?.keyed === false,
		ss: i?.fallback
	};
	const o = computed(updateKeyedMap.bind(h));
	h.Wt.Ot = o;
	o.T &= ~32;
	return accessor(o);
}
var pureOptions = { ownedWrite: true };
function updateKeyedMap() {
	const t = this.Kt() || [], s = t.length;
	t[$TRACK];
	runWithOwner(this.Wt, () => {
		let i, e, r, n, h = this.Yt ? this.ts ? () => {
			r[e] = signal(t[e], pureOptions);
			return this.qt(accessor(r[e]), e);
		} : () => {
			r[e] = signal(t[e], pureOptions);
			n && (n[e] = signal(e, pureOptions));
			return this.qt(accessor(r[e]), n ? accessor(n[e]) : void 0);
		} : this.Zt ? () => {
			const s = t[e];
			n[e] = signal(e, pureOptions);
			return this.qt(s, accessor(n[e]));
		} : () => {
			const s = t[e];
			return this.qt(s);
		};
		if (s === 0) {
			if (this.xt !== 0) {
				this.Wt.dispose(false);
				this.Jt = [];
				this.$t = [];
				this.zt = [];
				this.xt = 0;
				this.Yt && (this.Yt = []);
				this.Zt && (this.Zt = []);
			}
			if (this.ss && !this.zt[0]) {
				this.Jt[0]?.dispose();
				this.zt[0] = runWithOwner(this.Jt[0] = createOwner(), this.ss);
			}
		} else if (this.xt === 0) {
			const o = new Array(s);
			const c = new Array(s);
			r = this.Yt && new Array(s);
			n = this.Zt && new Array(s);
			try {
				for (e = 0; e < s; e++) o[e] = runWithOwner(c[e] = createOwner(), h);
			} catch (t) {
				for (i = 0; i <= e; i++) c[i]?.dispose();
				throw t;
			}
			if (this.Jt[0]) this.Jt[0].dispose();
			this.zt = o;
			this.Jt = c;
			r && (this.Yt = r);
			n && (this.Zt = n);
			this.$t = t.slice(0);
			this.xt = s;
		} else {
			let o, c, a, f, u, p, w, l, d;
			for (o = 0, c = Math.min(this.xt, s); o < c && (this.$t[o] === t[o] || this.Yt && compare(this.Xt, this.$t[o], t[o])); o++) if (this.Yt) setSignal(this.Yt[o], t[o]);
			for (c = this.xt - 1, a = s - 1; c >= o && a >= o && (this.$t[c] === t[a] || this.Yt && compare(this.Xt, this.$t[c], t[a])); c--, a--);
			if (o === s && this.xt === s) {
				this.$t = t.slice(0);
				return;
			}
			const O = s - this.xt;
			const m = new Array(s);
			const _ = new Array(s);
			r = this.Yt ? new Array(s) : void 0;
			n = this.Zt ? new Array(s) : void 0;
			p = /* @__PURE__ */ new Map();
			w = new Array(a + 1);
			for (e = a; e >= o; e--) {
				f = t[e];
				u = this.Xt ? this.Xt(f) : f;
				i = p.get(u);
				w[e] = i === void 0 ? -1 : i;
				p.set(u, e);
			}
			for (i = o; i <= c; i++) {
				f = this.$t[i];
				u = this.Xt ? this.Xt(f) : f;
				e = p.get(u);
				if (e !== void 0 && e !== -1) {
					m[e] = this.zt[i];
					_[e] = this.Jt[i];
					r && (r[e] = this.Yt[i]);
					n && (n[e] = this.Zt[i]);
					e = w[e];
					p.set(u, e);
				} else (l ??= []).push(this.Jt[i]);
			}
			try {
				for (e = o; e <= a; e++) {
					if (_[e] !== void 0) continue;
					(d ??= []).push(_[e] = createOwner());
					m[e] = runWithOwner(_[e], h);
				}
			} catch (t) {
				if (d) for (i = 0; i < d.length; i++) d[i].dispose();
				throw t;
			}
			for (i = 0; i < o; i++) {
				m[i] = this.zt[i];
				_[i] = this.Jt[i];
				r && (r[i] = this.Yt[i]);
				n && (n[i] = this.Zt[i]);
			}
			for (e = o; e <= a; e++) {
				if (r) setSignal(r[e], t[e]);
				if (n) setSignal(n[e], e);
			}
			for (e = a + 1; e < s; e++) {
				m[e] = this.zt[e - O];
				_[e] = this.Jt[e - O];
				if (r) {
					r[e] = this.Yt[e - O];
					setSignal(r[e], t[e]);
				}
				if (n) {
					n[e] = this.Zt[e - O];
					if (O !== 0) setSignal(n[e], e);
				}
			}
			this.zt = m;
			this.Jt = _;
			r && (this.Yt = r);
			n && (this.Zt = n);
			this.xt = s;
			this.$t = t.slice(0);
			if (l) for (i = 0; i < l.length; i++) l[i].dispose();
		}
	});
	return this.zt;
}
function compare(t, s, i) {
	return t ? t(s) === t(i) : true;
}

//#endregion
//#region node_modules/.pnpm/@solidjs+signals@2.0.0-rc.4/node_modules/@solidjs/signals/dist/prod/boundaries.js
function boundaryComputed(e, t) {
	const r = computed(e, { lazy: true });
	ext(r).h = (e, t) => {
		const n = e !== void 0 ? e : r.S;
		const s = t !== void 0 ? t : r.o?._;
		r.S &= ~r.R;
		const i = r.C.notify(r, 1 | 2, n, s);
		const o = n & ~r.R & (1 | 2);
		if (o) {
			r.S &= ~o;
			if (r.o?._ === s && !(r.S & (1 | 2))) {
				if (r.o !== null) r.o._ = void 0;
			}
		}
		if (!i && n & 2) {
			haltReactivity(unwrapStatusError(s));
			throw s;
		}
	};
	r.R = t;
	r.T &= ~32;
	recompute(r, true);
	return r;
}
function createBoundChildren(e, t, r, n) {
	const s = e.C;
	s.addChild(e.C = r);
	cleanup(() => s.removeChild(e.C));
	return runWithOwner(e, () => {
		const e = computed(t);
		return boundaryComputed(() => flatten(read(e)), n);
	});
}
var ON_INIT = Symbol();
var RevealControllerContext = /* @__PURE__ */ createContext(null);
var _revealUsed = false;
var CollectionQueue = class extends Queue {
	ee;
	v = /* @__PURE__ */ new Set();
	te;
	U = true;
	D = signal(false, {
		ownedWrite: true,
		H: true
	});
	_;
	P = signal(false, {
		ownedWrite: true,
		H: true
	});
	W;
	L = false;
	re;
	ne = ON_INIT;
	constructor(e) {
		super();
		this.ee = e;
	}
	run(e) {
		if (!e || read(this.D) && (!_revealUsed || read(this.P))) return;
		return super.run(e);
	}
	notify(e, t, r, n) {
		if (!(t & this.ee)) return super.notify(e, t, r, n);
		if (this.L && this.re) {
			const e = untrack(() => {
				try {
					return this.re();
				} catch {
					return ON_INIT;
				}
			});
			if (e !== this.ne) {
				this.ne = e;
				this.L = false;
				this.v.clear();
			}
		}
		if (this.ee & 1 && this.L) return super.notify(e, t, r, n);
		if (r & this.ee) {
			this.U = true;
			const t = n?.source || e.o?._?.source;
			if (t) {
				const e = this.v.size === 0;
				this.v.add(t);
				if (e) setSignal(this.D, true);
				if (this.ee & 2) setSignal(this._, unwrapStatusError(t.o?._));
			}
		}
		t &= ~this.ee;
		return t ? super.notify(e, t, r, n) : true;
	}
	se() {
		for (const e of this.v) if (e.ie & 64 || !e.o?.t && !(e.S & this.ee) && !(this.ee & 2 && e.S & 1)) this.v.delete(e);
		if (!this.v.size) {
			if (this.ee & 1 && this.U && !this.L && this.te) this.U = !!(this.te.S & this.ee);
			else this.U = false;
			if (!this.U) {
				setSignal(this.D, false);
				if (this.re) try {
					this.ne = untrack(() => this.re());
				} catch {}
			}
		}
		if (_revealUsed) this.W?.B();
	}
};
function createCollectionBoundary(e, t, r, n) {
	const s = createOwner();
	if (_revealUsed) setContext(RevealControllerContext, null, s);
	const i = new CollectionQueue(e);
	if (e === 2) i._ = signal(void 0, {
		ownedWrite: true,
		H: true
	});
	if (n) i.re = n;
	const o = i.te = createBoundChildren(s, t, i, e);
	untrack(() => {
		let t = false;
		try {
			read(o);
		} catch (e) {
			if (e instanceof NotReadyError) t = true;
			else throw e;
		}
		i.U = t || !!(o.S & e) || o.o?._ instanceof NotReadyError;
	});
	const l = _revealUsed && e === 1 ? getContext(RevealControllerContext) : null;
	if (l) {
		i.W = l;
		l.Z(i);
		cleanup(() => l.$(i));
	}
	return accessor(computed(() => {
		if (!read(i.D)) {
			const e = read(o);
			if (!untrack(() => read(i.D))) return i.L = true, e;
		}
		if (_revealUsed && read(i.P)) return void 0;
		return r(i);
	}, { H: true }));
}
function createLoadingBoundary(e, t, r) {
	return createCollectionBoundary(1, e, () => t(), r?.on);
}
function createErrorBoundary(e, t) {
	return createCollectionBoundary(2, e, (e) => t(accessor(e._), () => {
		for (const t of e.v) if (t.oe !== void 0) recompute(t);
		schedule();
	}));
}
function flatten(e, t) {
	if (typeof e === "function" && !e.length) {
		if (t?.doNotUnwrap) return e;
		do
			e = e();
		while (typeof e === "function" && !e.length);
	}
	if (t?.skipNonRendered && (e == null || e === true || e === false || e === "")) return;
	if (Array.isArray(e)) {
		let r = [];
		if (flattenArray(e, r, t)) return () => {
			let e = [];
			flattenArray(r, e, {
				...t,
				doNotUnwrap: false
			});
			return e;
		};
		return r;
	}
	return e;
}
function flattenArray(e, t = [], r) {
	let n = null;
	let s = false;
	for (let i = 0; i < e.length; i++) try {
		let n = e[i];
		if (typeof n === "function" && !n.length) {
			if (r?.doNotUnwrap) {
				t.push(n);
				s = true;
				continue;
			}
			do
				n = n();
			while (typeof n === "function" && !n.length);
		}
		if (Array.isArray(n)) s = flattenArray(n, t, r);
		else if (r?.skipNonRendered && (n == null || n === true || n === false || n === "")) {} else t.push(n);
	} catch (e) {
		if (!(e instanceof NotReadyError)) throw e;
		n = e;
	}
	if (n) throw n;
	return s;
}

//#endregion
//#region node_modules/.pnpm/@solidjs+signals@2.0.0-rc.4/node_modules/@solidjs/signals/dist/prod/store/utils.js
function trueFn() {
	return true;
}
var propTraps = {
	get(e, r, t) {
		if (r === $PROXY) return t;
		return e.get(r);
	},
	has(e, r) {
		if (r === $PROXY) return true;
		return e.has(r);
	},
	set: trueFn,
	deleteProperty: trueFn,
	getOwnPropertyDescriptor(e, r) {
		return {
			configurable: true,
			enumerable: true,
			get() {
				return e.get(r);
			},
			set: trueFn,
			deleteProperty: trueFn
		};
	},
	ownKeys(e) {
		return e.keys();
	}
};
function resolveSource(e) {
	return !(e = typeof e === "function" ? e() : e) ? {} : e;
}
var $SOURCES = Symbol(0);
function merge(...e) {
	if (e.length === 1 && typeof e[0] !== "function") return e[0];
	let r = false;
	const t = [];
	for (let n = 0; n < e.length; n++) {
		const o = e[n];
		r = r || !!o && $PROXY in o;
		const s = !!o && o[$SOURCES];
		if (s) for (let e = 0; e < s.length; e++) t.push(s[e]);
		else t.push(typeof o === "function" ? (r = true, createMemo(o)) : o);
	}
	if (SUPPORTS_PROXY && r) return new Proxy({
		get(e) {
			if (e === $SOURCES) return t;
			for (let r = t.length - 1; r >= 0; r--) {
				const n = resolveSource(t[r]);
				if (e in n) return n[e];
			}
		},
		has(e) {
			for (let r = t.length - 1; r >= 0; r--) if (e in resolveSource(t[r])) return true;
			return false;
		},
		keys() {
			const e = /* @__PURE__ */ new Set();
			for (let r = 0; r < t.length; r++) {
				const n = ownEnumerableKeys(resolveSource(t[r]));
				for (let r = 0; r < n.length; r++) e.add(n[r]);
			}
			return [...e];
		}
	}, propTraps);
	const n = Object.create(null);
	let o = false;
	let s = t.length - 1;
	for (let e = s; e >= 0; e--) {
		const r = t[e];
		if (!r) {
			e === s && s--;
			continue;
		}
		const u = Object.getOwnPropertyNames(r);
		for (let t = u.length - 1; t >= 0; t--) {
			const c = u[t];
			if (c === "__proto__" || c === "constructor") continue;
			if (!n[c]) {
				o = o || e !== s;
				const t = Object.getOwnPropertyDescriptor(r, c);
				n[c] = t.get ? {
					enumerable: true,
					configurable: true,
					get: t.get.bind(r)
				} : t;
			}
		}
	}
	if (!o) return t[s];
	const u = {};
	const c = Object.keys(n);
	for (let e = c.length - 1; e >= 0; e--) {
		const r = c[e], t = n[r];
		if (t.get) Object.defineProperty(u, r, t);
		else u[r] = t.value;
	}
	u[$SOURCES] = t;
	return u;
}
function omit(e, ...r) {
	if (SUPPORTS_PROXY && $PROXY in e) return new Proxy({
		get(t) {
			return t === $SOURCES || r.includes(t) ? void 0 : e[t];
		},
		has(t) {
			return t !== $SOURCES && !r.includes(t) && t in e;
		},
		keys() {
			return ownEnumerableKeys(e).filter((e) => !r.includes(e));
		}
	}, propTraps);
	const t = {};
	const n = Object.getOwnPropertyNames(e);
	const o = r.length > 4 && n.length > r.length ? new Set(r) : void 0;
	for (const s of n) if (o ? !o.has(s) : !r.includes(s)) {
		const r = Object.getOwnPropertyDescriptor(e, s);
		!r.get && !r.set && r.enumerable && r.writable && r.configurable ? t[s] = r.value : Object.defineProperty(t, s, r);
	}
	return t;
}

//#endregion
export { createRoot as _, flatten as a, createMemo as c, onCleanup as d, onSettled as f, untrack as g, runWithOwner as h, createLoadingBoundary as i, createRenderEffect as l, setContext as m, omit as n, mapArray as o, getContext as p, createErrorBoundary as r, createEffect as s, merge as t, createSignal as u, getOwner as v, flush as y };
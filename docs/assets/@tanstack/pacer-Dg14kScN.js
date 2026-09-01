import { t as EventClient } from "./devtools-event-client-BIrJRyn0.js";

//#region node_modules/.pnpm/@tanstack+pacer@0.22.0/node_modules/@tanstack/pacer/dist/utils.js
function isFunction(value) {
	return typeof value === "function";
}
function parseFunctionOrValue(value, ...args) {
	return isFunction(value) ? value(...args) : value;
}

//#endregion
//#region node_modules/.pnpm/@tanstack+store@0.11.1/node_modules/@tanstack/store/dist/alien.js
/* @__NO_SIDE_EFFECTS__ */
function createReactiveSystem({ update, notify, unwatched }) {
	return {
		link,
		unlink,
		propagate,
		checkDirty,
		shallowPropagate
	};
	function link(dep, sub, version) {
		const prevDep = sub.depsTail;
		if (prevDep !== void 0 && prevDep.dep === dep) return;
		const nextDep = prevDep !== void 0 ? prevDep.nextDep : sub.deps;
		if (nextDep !== void 0 && nextDep.dep === dep) {
			nextDep.version = version;
			sub.depsTail = nextDep;
			return;
		}
		const prevSub = dep.subsTail;
		if (prevSub !== void 0 && prevSub.version === version && prevSub.sub === sub) return;
		const newLink = sub.depsTail = dep.subsTail = {
			version,
			dep,
			sub,
			prevDep,
			nextDep,
			prevSub,
			nextSub: void 0
		};
		if (nextDep !== void 0) nextDep.prevDep = newLink;
		if (prevDep !== void 0) prevDep.nextDep = newLink;
		else sub.deps = newLink;
		if (prevSub !== void 0) prevSub.nextSub = newLink;
		else dep.subs = newLink;
	}
	function unlink(link, sub = link.sub) {
		const dep = link.dep;
		const prevDep = link.prevDep;
		const nextDep = link.nextDep;
		const nextSub = link.nextSub;
		const prevSub = link.prevSub;
		if (nextDep !== void 0) nextDep.prevDep = prevDep;
		else sub.depsTail = prevDep;
		if (prevDep !== void 0) prevDep.nextDep = nextDep;
		else sub.deps = nextDep;
		if (nextSub !== void 0) nextSub.prevSub = prevSub;
		else dep.subsTail = prevSub;
		if (prevSub !== void 0) prevSub.nextSub = nextSub;
		else if ((dep.subs = nextSub) === void 0) unwatched(dep);
		return nextDep;
	}
	function propagate(link) {
		let next = link.nextSub;
		let stack;
		top: do {
			const sub = link.sub;
			let flags = sub.flags;
			if (!(flags & 60)) sub.flags = flags | 32;
			else if (!(flags & 12)) flags = 0;
			else if (!(flags & 4)) sub.flags = flags & -9 | 32;
			else if (!(flags & 48) && isValidLink(link, sub)) {
				sub.flags = flags | 40;
				flags &= 1;
			} else flags = 0;
			if (flags & 2) notify(sub);
			if (flags & 1) {
				const subSubs = sub.subs;
				if (subSubs !== void 0) {
					const nextSub = (link = subSubs).nextSub;
					if (nextSub !== void 0) {
						stack = {
							value: next,
							prev: stack
						};
						next = nextSub;
					}
					continue;
				}
			}
			if ((link = next) !== void 0) {
				next = link.nextSub;
				continue;
			}
			while (stack !== void 0) {
				link = stack.value;
				stack = stack.prev;
				if (link !== void 0) {
					next = link.nextSub;
					continue top;
				}
			}
			break;
		} while (true);
	}
	function checkDirty(link, sub) {
		let stack;
		let checkDepth = 0;
		let dirty = false;
		top: do {
			const dep = link.dep;
			const flags = dep.flags;
			if (sub.flags & 16) dirty = true;
			else if ((flags & 17) === 17) {
				if (update(dep)) {
					const subs = dep.subs;
					if (subs.nextSub !== void 0) shallowPropagate(subs);
					dirty = true;
				}
			} else if ((flags & 33) === 33) {
				if (link.nextSub !== void 0 || link.prevSub !== void 0) stack = {
					value: link,
					prev: stack
				};
				link = dep.deps;
				sub = dep;
				++checkDepth;
				continue;
			}
			if (!dirty) {
				const nextDep = link.nextDep;
				if (nextDep !== void 0) {
					link = nextDep;
					continue;
				}
			}
			while (checkDepth--) {
				const firstSub = sub.subs;
				const hasMultipleSubs = firstSub.nextSub !== void 0;
				if (hasMultipleSubs) {
					link = stack.value;
					stack = stack.prev;
				} else link = firstSub;
				if (dirty) {
					if (update(sub)) {
						if (hasMultipleSubs) shallowPropagate(firstSub);
						sub = link.sub;
						continue;
					}
					dirty = false;
				} else sub.flags &= -33;
				sub = link.sub;
				const nextDep = link.nextDep;
				if (nextDep !== void 0) {
					link = nextDep;
					continue top;
				}
			}
			return dirty;
		} while (true);
	}
	function shallowPropagate(link) {
		do {
			const sub = link.sub;
			const flags = sub.flags;
			if ((flags & 48) === 32) {
				sub.flags = flags | 16;
				if ((flags & 6) === 2) notify(sub);
			}
		} while ((link = link.nextSub) !== void 0);
	}
	function isValidLink(checkLink, sub) {
		let link = sub.depsTail;
		while (link !== void 0) {
			if (link === checkLink) return true;
			link = link.prevDep;
		}
		return false;
	}
}

//#endregion
//#region node_modules/.pnpm/@tanstack+store@0.11.1/node_modules/@tanstack/store/dist/atom.js
function toObserver(nextHandler, errorHandler, completionHandler) {
	const isObserver = typeof nextHandler === "object";
	const self = isObserver ? nextHandler : void 0;
	return {
		next: (isObserver ? nextHandler.next : nextHandler)?.bind(self),
		error: (isObserver ? nextHandler.error : errorHandler)?.bind(self),
		complete: (isObserver ? nextHandler.complete : completionHandler)?.bind(self)
	};
}
var queuedEffects = [];
var cycle = 0;
var { link, unlink, propagate, checkDirty, shallowPropagate } = /* @__PURE__ */ createReactiveSystem({
	update(atom) {
		return atom._update();
	},
	notify(effect) {
		queuedEffects[queuedEffectsLength++] = effect;
		effect.flags &= -3;
	},
	unwatched(atom) {
		if (atom.depsTail !== void 0) {
			atom.depsTail = void 0;
			atom.flags = 17;
			purgeDeps(atom);
		}
	}
});
var notifyIndex = 0;
var queuedEffectsLength = 0;
var activeSub;
var batchDepth = 0;
function purgeDeps(sub) {
	const depsTail = sub.depsTail;
	let dep = depsTail !== void 0 ? depsTail.nextDep : sub.deps;
	while (dep !== void 0) dep = unlink(dep, sub);
}
function flush() {
	if (batchDepth > 0) return;
	while (notifyIndex < queuedEffectsLength) {
		const effect = queuedEffects[notifyIndex];
		queuedEffects[notifyIndex++] = void 0;
		effect.notify();
	}
	notifyIndex = 0;
	queuedEffectsLength = 0;
}
function createAtom(valueOrFn, options) {
	const isComputed = typeof valueOrFn === "function";
	const getter = valueOrFn;
	const atom = {
		_snapshot: isComputed ? void 0 : valueOrFn,
		subs: void 0,
		subsTail: void 0,
		deps: void 0,
		depsTail: void 0,
		flags: isComputed ? 0 : 1,
		get() {
			if (activeSub !== void 0) link(atom, activeSub, cycle);
			return atom._snapshot;
		},
		subscribe(observerOrFn) {
			const obs = toObserver(observerOrFn);
			const observed = { current: false };
			const e = effect(() => {
				atom.get();
				if (!observed.current) observed.current = true;
				else obs.next?.(atom._snapshot);
			});
			return { unsubscribe: () => {
				e.stop();
			} };
		},
		_update(getValue) {
			const prevSub = activeSub;
			const compare = options?.compare ?? Object.is;
			if (isComputed) {
				activeSub = atom;
				++cycle;
				atom.depsTail = void 0;
			} else if (getValue === void 0) return false;
			if (isComputed) atom.flags = 5;
			try {
				const oldValue = atom._snapshot;
				const newValue = typeof getValue === "function" ? getValue(oldValue) : getValue === void 0 && isComputed ? getter(oldValue) : getValue;
				if (oldValue === void 0 || !compare(oldValue, newValue)) {
					atom._snapshot = newValue;
					return true;
				}
				return false;
			} finally {
				activeSub = prevSub;
				if (isComputed) atom.flags &= -5;
				purgeDeps(atom);
			}
		}
	};
	if (isComputed) {
		atom.flags = 17;
		atom.get = function() {
			const flags = atom.flags;
			if (flags & 16 || flags & 32 && checkDirty(atom.deps, atom)) {
				if (atom._update()) {
					const subs = atom.subs;
					if (subs !== void 0) shallowPropagate(subs);
				}
			} else if (flags & 32) atom.flags = flags & -33;
			if (activeSub !== void 0) link(atom, activeSub, cycle);
			return atom._snapshot;
		};
	} else atom.set = function(valueOrFn) {
		if (atom._update(valueOrFn)) {
			const subs = atom.subs;
			if (subs !== void 0) {
				propagate(subs);
				shallowPropagate(subs);
				flush();
			}
		}
	};
	return atom;
}
function effect(fn) {
	const run = () => {
		const prevSub = activeSub;
		activeSub = effectObj;
		++cycle;
		effectObj.depsTail = void 0;
		effectObj.flags = 6;
		try {
			return fn();
		} finally {
			activeSub = prevSub;
			effectObj.flags &= -5;
			purgeDeps(effectObj);
		}
	};
	const effectObj = {
		deps: void 0,
		depsTail: void 0,
		subs: void 0,
		subsTail: void 0,
		flags: 6,
		notify() {
			const flags = this.flags;
			if (flags & 16 || flags & 32 && checkDirty(this.deps, this)) run();
			else this.flags = 2;
		},
		stop() {
			this.flags = 0;
			this.depsTail = void 0;
			purgeDeps(this);
		}
	};
	run();
	return effectObj;
}

//#endregion
//#region node_modules/.pnpm/@tanstack+store@0.11.1/node_modules/@tanstack/store/dist/store.js
var Store = class {
	constructor(valueOrFn, actionsFactory) {
		this.atom = createAtom(valueOrFn);
		this.get = this.get.bind(this);
		this.setState = this.setState.bind(this);
		this.subscribe = this.subscribe.bind(this);
		if (actionsFactory) this.actions = actionsFactory(this);
	}
	setState(updater) {
		this.atom.set(updater);
	}
	get state() {
		return this.atom.get();
	}
	get() {
		return this.state;
	}
	subscribe(observerOrFn) {
		return this.atom.subscribe(toObserver(observerOrFn));
	}
};

//#endregion
//#region node_modules/.pnpm/@tanstack+pacer@0.22.0/node_modules/@tanstack/pacer/dist/event-client.js
var pacerDevtoolsInstancesByKey = /* @__PURE__ */ new Map();
function registerPacerDevtoolsInstance(key, instance) {
	pacerDevtoolsInstancesByKey.set(key, instance);
}
function cloneJsonSafe(value) {
	if (value === void 0) return;
	try {
		return JSON.parse(JSON.stringify(value));
	} catch {
		return null;
	}
}
function readStoreSnapshot(store) {
	if (typeof store.get === "function") return store.get();
	return store.state;
}
function toPacerDevtoolsWirePayload(instance) {
	return {
		key: instance.key,
		store: { state: cloneJsonSafe(readStoreSnapshot(instance.store)) },
		options: cloneJsonSafe(instance.options)
	};
}
var PacerEventClient = class extends EventClient {
	constructor(props) {
		super({
			pluginId: "pacer",
			debug: props?.debug,
			reconnectEveryMs: 1e3
		});
	}
};
var emitChange = (event, instance) => {
	const key = instance.key;
	if (!key) return;
	registerPacerDevtoolsInstance(key, instance);
	pacerEventClient.emit(event, toPacerDevtoolsWirePayload({
		...instance,
		key
	}));
};
var pacerEventClient = new PacerEventClient();

//#endregion
//#region node_modules/.pnpm/@tanstack+pacer@0.22.0/node_modules/@tanstack/pacer/dist/debouncer.js
function getDefaultDebouncerState() {
	return {
		canLeadingExecute: true,
		executionCount: 0,
		isPending: false,
		lastArgs: void 0,
		status: "idle",
		maybeExecuteCount: 0
	};
}
var defaultOptions = {
	enabled: true,
	leading: false,
	trailing: true,
	wait: 0
};
var Debouncer = class {
	#timeoutId;
	constructor(fn, initialOptions) {
		this.fn = fn;
		this.store = new Store(getDefaultDebouncerState());
		this.setOptions = (newOptions) => {
			this.options = {
				...this.options,
				...newOptions
			};
			if (!this.#getEnabled()) this.cancel();
		};
		this.#setState = (newState) => {
			this.store.setState((state) => {
				const combinedState = {
					...state,
					...newState
				};
				const { isPending } = combinedState;
				return {
					...combinedState,
					status: !this.#getEnabled() ? "disabled" : isPending ? "pending" : "idle"
				};
			});
			emitChange("Debouncer", this);
		};
		this.#getEnabled = () => {
			return !!parseFunctionOrValue(this.options.enabled, this);
		};
		this.#getWait = () => {
			return parseFunctionOrValue(this.options.wait, this);
		};
		this.maybeExecute = (...args) => {
			if (!this.#getEnabled()) return void 0;
			this.#setState({ maybeExecuteCount: this.store.state.maybeExecuteCount + 1 });
			let _didLeadingExecute = false;
			if (this.options.leading && this.store.state.canLeadingExecute) {
				this.#setState({ canLeadingExecute: false });
				_didLeadingExecute = true;
				this.#execute(...args);
			}
			if (this.options.trailing) this.#setState({
				isPending: true,
				lastArgs: args
			});
			if (this.#timeoutId) clearTimeout(this.#timeoutId);
			this.#timeoutId = setTimeout(() => {
				this.#setState({ canLeadingExecute: true });
				if (this.options.trailing && !_didLeadingExecute) this.#execute(...args);
			}, this.#getWait());
		};
		this.#execute = (...args) => {
			if (!this.#getEnabled()) return void 0;
			this.fn(...args);
			this.#setState({
				executionCount: this.store.state.executionCount + 1,
				isPending: false,
				lastArgs: void 0
			});
			this.options.onExecute?.(args, this);
		};
		this.flush = () => {
			if (this.store.state.isPending && this.store.state.lastArgs) {
				this.#clearTimeout();
				this.#execute(...this.store.state.lastArgs);
			}
		};
		this.#clearTimeout = () => {
			if (this.#timeoutId) {
				clearTimeout(this.#timeoutId);
				this.#timeoutId = void 0;
			}
		};
		this.cancel = () => {
			this.#clearTimeout();
			this.#setState({
				canLeadingExecute: true,
				isPending: false
			});
		};
		this.reset = () => {
			this.#setState(getDefaultDebouncerState());
		};
		this.key = initialOptions.key;
		this.options = {
			...defaultOptions,
			...initialOptions
		};
		this.#setState(this.options.initialState ?? {});
		if (this.key) pacerEventClient.on("d-Debouncer", (event) => {
			if (event.payload.key !== this.key) return;
			this.#setState(event.payload.store.state);
			this.setOptions(event.payload.options);
		});
	}
	#setState;
	#getEnabled;
	#getWait;
	#execute;
	#clearTimeout;
};
function debounce(fn, initialOptions) {
	return new Debouncer(fn, initialOptions).maybeExecute;
}

//#endregion
export { debounce as t };
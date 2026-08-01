import { C as h, D as S, S as d, a as PointerSensor, b as A, c as useSensor, i as DndContext, l as CSS, m as bn, n as SortableContext, o as closestCenter, p as P, r as verticalListSortingStrategy, s as useSensors, t as useSortable, u } from "./dnd-kit-8Wt4G7bK.js";
import { t as createRoot } from "./preact-B4lw9r7u.js";
import { n as toast$1, t as Toaster$1 } from "./sonner-CjpyPqcO.js";
import { t as init } from "./@sentry/browser-BsaWfxAA.js";
import { t as info } from "./@sentry/core-D0Q1u8BA.js";
import { a as Switch, c as useParams, i as Router, l as useSearchParams, n as Redirect, o as useLocation, r as Route, s as useNavigate, t as Link, u as useHashLocation } from "./wouter-Cljq2E-q.js";
import { a as atom, i as useSetAtom, n as useAtom, o as createStore, r as useAtomValue, t as Provider } from "./jotai-NDHPqWcD.js";
import { t as v4 } from "./uuid-BtdgrrNB.js";
import { t as atomWithImmer } from "./jotai-immer-CWhJIYQw.js";

//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();

//#endregion
//#region src/components/Toaster.tsx
function Toaster() {
	return /* @__PURE__ */ u("div", {
		className: "bottom-0 sticky",
		children: /* @__PURE__ */ u(Toaster$1, {})
	});
}

//#endregion
//#region src/config.ts
var SENTRY_DSN = "https://fa9d710195c2565a103aad3fd04bed54@o4511832287674368.ingest.us.sentry.io/4511832294817792";
var NEON_AUTH_URL = "https://ep-red-morning-awzkc1lp.neonauth.c-12.us-east-1.aws.neon.tech/neondb/auth";
var NEON_DATA_URL = "https://ep-red-morning-awzkc1lp.apirest.c-12.us-east-1.aws.neon.tech/neondb/rest/v1";
var SYNC_MODE = "main-loop";
var ENABLE_SERVICE_WORKER = false;
var AUTH_GUARD = false;

//#endregion
//#region src/auth.ts
async function getAccessToken() {
	return await authClient.getJWT();
}
var AuthClient = class {
	headers;
	constructor() {
		this.headers = new Headers({ "Content-Type": "application/json" });
	}
	useSession() {
		return {
			isPending: false,
			error: "Not implemented"
		};
	}
	async getJWT() {
		const url = `${NEON_AUTH_URL}/token`;
		const response = await fetch(url, {
			method: "GET",
			headers: this.headers,
			credentials: "include"
		});
		console.log(response.status);
		info(response.statusText);
		const body = await response.text();
		info(body);
		return JSON.parse(body).token;
	}
	async getSession() {
		const url = `${NEON_AUTH_URL}/get-session`;
		return await (await fetch(url, {
			method: "GET",
			headers: this.headers,
			credentials: "include"
		})).json();
	}
	async loginWithEmail(args) {
		const url = `${NEON_AUTH_URL}/sign-in/email`;
		return (await fetch(url, {
			method: "POST",
			headers: this.headers,
			credentials: "include",
			body: JSON.stringify({
				email: args.email,
				password: args.password,
				rememberMe: true
			})
		})).statusText;
	}
	async signupWithEmail(args) {
		const url = `${NEON_AUTH_URL}/sign-up/email`;
		return (await fetch(url, {
			method: "POST",
			headers: this.headers,
			credentials: "include",
			body: JSON.stringify({
				name: args.name,
				email: args.email,
				password: args.password
			})
		})).statusText;
	}
	async resetPassword(args) {
		const url = `${NEON_AUTH_URL}/sign-out`;
		return (await fetch(url, {
			method: "POST",
			headers: this.headers,
			credentials: "include",
			body: JSON.stringify({
				newPassword: args.newPassword,
				token: args.token
			})
		})).statusText;
	}
	async requestPasswordReset(args) {
		const url = `${NEON_AUTH_URL}/request-password-reset`;
		return (await fetch(url, {
			method: "POST",
			headers: this.headers,
			credentials: "include",
			body: JSON.stringify({
				email: args.email,
				redirectTo: "/grocery-shopping/#/auth/password-reset"
			})
		})).statusText;
	}
	async signOut() {
		const url = `${NEON_AUTH_URL}/sign-out`;
		return (await fetch(url, {
			method: "POST",
			headers: this.headers,
			credentials: "include",
			body: JSON.stringify({})
		})).statusText;
	}
};
var authClient = new AuthClient();

//#endregion
//#region src/components/LoginPrompt.tsx
function LoginPrompt() {
	const location = useLocation();
	const navigate = useNavigate();
	const session = authClient.useSession();
	function logout() {
		authClient.signOut();
		navigate("/auth/login");
	}
	if (session.data) return /* @__PURE__ */ u("div", {
		className: "flex gap-2",
		children: [/* @__PURE__ */ u("div", { children: [
			"Hello ",
			session.data.user.name,
			"!"
		] }), /* @__PURE__ */ u("button", {
			type: "button",
			onClick: logout,
			className: "underline",
			children: "Log out"
		})]
	});
	else if (session.isPending || location.startsWith("/auth") || location.endsWith("/")) return null;
	else return /* @__PURE__ */ u("div", {
		className: "flex flex-row gap-3",
		children: [/* @__PURE__ */ u(Link, {
			to: "/auth/login",
			className: "underline",
			children: "Log in"
		}), /* @__PURE__ */ u(Link, {
			to: "/auth/signup",
			className: "underline",
			children: "Sign up"
		})]
	});
}

//#endregion
//#region src/neon.ts
async function authHeader() {
	const token = await authClient.getJWT();
	if (!token) throw new Error("not logged in");
	return `Bearer ${token}`;
}
var DataClient = class DataClient {
	authHeader;
	constructor(authHeader) {
		this.authHeader = authHeader;
	}
	static new() {
		return authHeader().then((header) => new DataClient(header));
	}
	async get(table, query) {
		const url = `${NEON_DATA_URL}/${table}?${new URLSearchParams(query)}`;
		return await (await fetch(url, {
			method: "GET",
			headers: { "Authorization": this.authHeader }
		})).json();
	}
	async patch(table, query, data) {
		const url = `${NEON_DATA_URL}/${table}?${new URLSearchParams(query)}`;
		await fetch(url, {
			method: "PATCH",
			headers: {
				"Authorization": this.authHeader,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
	}
	async post(table, data) {
		const url = `${NEON_DATA_URL}/${table}`;
		await fetch(url, {
			method: "POST",
			headers: {
				"Authorization": this.authHeader,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
	}
	async delete(table, query) {
		const url = `${NEON_DATA_URL}/${table}?${new URLSearchParams(query)}`;
		await fetch(url, {
			method: "DELETE",
			headers: { "Authorization": this.authHeader }
		});
	}
};
var dataClientAtom = atom(DataClient.new());

//#endregion
//#region src/migrate.ts
var VERSION = 7;
function migrate(event) {
	const db = event.target.result;
	if (event.oldVersion < 1) db.createObjectStore("actions", { keyPath: "uuid" });
	if (event.oldVersion < 2) db.createObjectStore("stores", { keyPath: "id" });
	if (event.oldVersion < 3) {
		db.deleteObjectStore("actions");
		db.createObjectStore("actions", {
			keyPath: "idb_key",
			autoIncrement: true
		});
	}
	if (event.oldVersion < 4) {
		db.deleteObjectStore("actions");
		db.createObjectStore("actions", {
			keyPath: "idb_key",
			autoIncrement: true
		}).createIndex("actions_entity_id", ["entity", "id"]);
	}
	if (event.oldVersion < 5) {
		db.deleteObjectStore("actions");
		db.createObjectStore("actions", {
			keyPath: "idb_key",
			autoIncrement: true
		}).createIndex("actions_entity_id", ["entity.id"]);
	}
	if (event.oldVersion < 6) {
		db.deleteObjectStore("actions");
		db.createObjectStore("actions", {
			keyPath: "idb_key",
			autoIncrement: true
		}).createIndex("actions_entity_id", "entity.id");
	}
	if (event.oldVersion < 7) {
		db.deleteObjectStore("actions");
		const actions = db.createObjectStore("actions", {
			keyPath: "idb_key",
			autoIncrement: true
		});
		actions.createIndex("actions_entity_id", "entity.id");
		actions.createIndex("actions_entity_store_id", "entity.store_id");
	}
	if (event.oldVersion < 8) db.deleteObjectStore("stores");
	return db;
}

//#endregion
//#region src/indexed-db.ts
function openIndexedDB() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open("groceries", VERSION);
		request.onerror = (event) => {
			reject(event);
		};
		request.onsuccess = (event) => {
			resolve(event.target.result);
		};
		request.onupgradeneeded = (event) => {
			resolve(migrate(event));
		};
	});
}
function promisify(request) {
	return new Promise((resolve, reject) => {
		request.onsuccess = () => resolve(request.result);
		request.onerror = reject;
	});
}

//#endregion
//#region src/sync.ts
function syncNextAction({ db, client, log }) {
	return new Promise((resolve, reject) => {
		const request = db.transaction("actions", "readonly").objectStore("actions").openCursor();
		request.onsuccess = async (event) => {
			const cursor = event.target.result;
			if (!cursor) {
				resolve(false);
				return;
			}
			const { primaryKey, value } = cursor;
			try {
				await pushToPostgrest(client, value);
				log("success", value);
			} catch (e) {
				log("error", e);
				reject(e);
			}
			db.transaction("actions", "readwrite").objectStore("actions").delete(primaryKey);
			resolve(true);
		};
	});
}
async function pushToPostgrest(client, action) {
	switch (action.op) {
		case "new": {
			const { table, entity } = action;
			return await client.post(table, entity);
		}
		case "edit": {
			const { table, entity: { id, ...data } } = action;
			return await client.patch(table, { id: `eq.${id}` }, data);
		}
		case "delete": {
			const { table, entity: { id } } = action;
			return await client.delete(table, { id: `eq.${id}` });
		}
		default: console.log("unknown op", action.op);
	}
}

//#endregion
//#region src/model.ts
var SyncModel = class SyncModel {
	db;
	client;
	constructor(db, client) {
		this.db = db;
		this.client = client;
	}
	static async new(opts) {
		if (opts.useIndexedDB) {
			const db = await openIndexedDB();
			return new SyncModel(db);
		} else {
			const client = await DataClient.new();
			return new SyncModel(void 0, client);
		}
	}
	async send(action) {
		if (this.db) return await promisify(this.db.transaction("actions", "readwrite").objectStore("actions").put(action));
		else if (this.client) return await pushToPostgrest(this.client, action);
	}
};
var syncAtom = atom(SyncModel.new({ useIndexedDB: false }));

//#endregion
//#region src/sync-worker.ts?worker
function WorkerWrapper(options) {
	return new Worker("/grocery-shopping/assets/sync-worker-tKjf15bB.js", {
		type: "module",
		name: options?.name
	});
}

//#endregion
//#region src/components/SyncActionProvider.tsx
function SyncActionProvider(props) {
	const [store, _] = d(createStore);
	h(() => {
		if (props.mode === "web-worker") return runOnWorkerThread();
		else if (props.mode === "main-loop") return runOnMainThread();
		store.set(syncAtom, SyncModel.new({ useIndexedDB: props.mode !== "immediate" }));
	}, [props.mode, store]);
	return /* @__PURE__ */ u(Provider, {
		store,
		children: props.children
	});
}
function runOnWorkerThread() {
	const worker = new WorkerWrapper();
	worker.addEventListener("message", (ev) => {
		console.log("from worker", ev.data);
	});
	getAccessToken().then((token) => {
		worker.postMessage(token);
	});
	return () => worker.terminate();
}
function runOnMainThread() {
	const worker = new MainThreadWorker();
	worker.run();
	return () => worker.terminate();
}
var MainThreadWorker = class {
	terminated = false;
	constructor() {}
	terminate() {
		this.terminated = true;
	}
	async run() {
		const db = await openIndexedDB();
		const client = await DataClient.new();
		while (!this.terminated) {
			if (!navigator.onLine) {
				await sleep(5e3);
				continue;
			}
			if (!await syncNextAction({
				db,
				client,
				log: console.log
			})) await sleep(5e3);
		}
		function sleep(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		}
	}
};

//#endregion
//#region src/components/LastVisitSave.tsx
function LastVisitSave() {
	const route = useLocation();
	h(() => {
		if (route.endsWith("/") || route.startsWith("/auth")) return;
		localStorage.setItem("last_visited_url", route);
	}, [route]);
	return null;
}

//#endregion
//#region src/components/HashRouter.tsx
function HashRouter({ children }) {
	return /* @__PURE__ */ u(Router, {
		hook: useHashLocation,
		children
	});
}

//#endregion
//#region src/last-visited-url.ts
function lastVisitedUrl() {
	return localStorage.getItem("last_visited_url") ?? "/store";
}

//#endregion
//#region src/pages/index.tsx
function Index() {
	const session = authClient.useSession();
	const navigate = useNavigate();
	h(() => {
		if (session.isPending) return;
		if (session.data) navigate(lastVisitedUrl());
		else navigate("/auth/login");
	}, [navigate, session]);
	if (session.isPending) return "Logging in...";
	return "Redirecting...";
}

//#endregion
//#region src/toast.tsx
function toast(render) {
	toast$1.custom((id) => /* @__PURE__ */ u(S, { children: render(() => toast$1.dismiss(id)) }));
}

//#endregion
//#region src/pages/auth/login.tsx
function Login() {
	const navigate = useNavigate();
	const formRef = A(null);
	async function handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const payload = {
			email: data.get("email")?.toString(),
			password: data.get("password")?.toString(),
			rememberMe: true
		};
		try {
			await authClient.loginWithEmail(payload);
			navigate(lastVisitedUrl());
		} catch (e) {
			console.error(e);
			toast(() => {
				return e.message;
			});
		}
	}
	async function resetPassword() {
		const email = new FormData(formRef.current).get("email")?.toString();
		await authClient.requestPasswordReset({ email });
		toast(() => {
			return /* @__PURE__ */ u(S, { children: ["Password reset sent to ", /* @__PURE__ */ u("span", {
				className: "underline",
				children: email
			})] });
		});
	}
	return /* @__PURE__ */ u("form", {
		ref: formRef,
		className: "flex flex-col gap-2 items-start p-2",
		onSubmit: handleSubmit,
		children: [
			/* @__PURE__ */ u("input", {
				type: "email",
				placeholder: "Email",
				name: "email",
				required: true
			}),
			/* @__PURE__ */ u("div", { children: [/* @__PURE__ */ u("input", {
				type: "password",
				placeholder: "Password",
				name: "password",
				required: true
			}), /* @__PURE__ */ u("button", {
				type: "button",
				className: "btn btn-ghost btn-sm",
				onClick: resetPassword,
				children: "💀 I forgor (reset password)"
			})] }),
			/* @__PURE__ */ u("button", {
				type: "submit",
				className: "btn btn-primary",
				children: "Login"
			})
		]
	});
}

//#endregion
//#region src/pages/auth/signup.tsx
function Signup() {
	const navigate = useNavigate();
	async function handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const payload = {
			name: data.get("username")?.toString(),
			email: data.get("email")?.toString(),
			password: data.get("password")?.toString()
		};
		try {
			await authClient.signupWithEmail(payload);
			navigate(lastVisitedUrl());
		} catch (e) {
			toast(() => {
				return e.message;
			});
		}
	}
	return /* @__PURE__ */ u("form", {
		className: "flex flex-col gap-2 items-start p-2",
		onSubmit: handleSubmit,
		children: [
			/* @__PURE__ */ u("input", {
				type: "text",
				placeholder: "Username",
				name: "username",
				required: true
			}),
			/* @__PURE__ */ u("input", {
				type: "email",
				placeholder: "Email",
				name: "email",
				required: true
			}),
			/* @__PURE__ */ u("input", {
				type: "password",
				placeholder: "Password",
				name: "password",
				required: true
			}),
			/* @__PURE__ */ u("button", {
				type: "submit",
				className: "btn btn-primary",
				children: "Sign up"
			})
		]
	});
}

//#endregion
//#region src/pages/auth/password-reset.tsx
function PasswordReset() {
	const [params, _] = useSearchParams();
	const token = params.get("token");
	const navigate = useNavigate();
	h(() => {
		if (!token) navigate("/auth/login");
	});
	const formRef = A(null);
	async function handleSubmit(e) {
		e.preventDefault();
		const payload = {
			newPassword: new FormData(e.currentTarget).get("password")?.toString(),
			token
		};
		await authClient.resetPassword(payload);
		navigate("/auth/login");
	}
	return /* @__PURE__ */ u("form", {
		ref: formRef,
		className: "flex flex-col gap-2 items-start p-2",
		onSubmit: handleSubmit,
		children: [/* @__PURE__ */ u("div", { children: /* @__PURE__ */ u("input", {
			type: "password",
			placeholder: "New Password",
			name: "password",
			required: true
		}) }), /* @__PURE__ */ u("button", {
			type: "submit",
			className: "btn btn-primary",
			children: "Confirm"
		})]
	});
}

//#endregion
//#region src/pages/Version.tsx
function Version() {
	return /* @__PURE__ */ u("ul", { children: [/* @__PURE__ */ u("li", { children: ["Version: ", "2026-07-31_0"] }), /* @__PURE__ */ u("li", { children: ["Git Commit: ", "3e768d5"] })] });
}

//#endregion
//#region src/components/Input.tsx
function Input({ focus, ...props }) {
	const ref = A(null);
	h(() => {
		if (focus && ref.current) ref.current.focus();
	}, [focus]);
	return /* @__PURE__ */ u("input", {
		ref,
		...props
	});
}

//#endregion
//#region src/pages/store/actions.ts
var storeAtom = atom({
	id: "",
	name: ""
});
var focusIndexAtom = atom(-1);
var storeItemsAtom = atomWithImmer({});
var itemsInOrderAtom = atom((get) => {
	return Object.values(get(storeItemsAtom)).sort((a, b) => a.order - b.order);
});
var lastInOrderAtom = atom((get) => {
	const array = get(itemsInOrderAtom);
	return array[array.length - 1];
});
var needItemsAtom = atom((get) => {
	return get(itemsInOrderAtom).filter((item) => !item.got);
});
var gotItemsAtom = atom((get) => {
	return Object.values(get(storeItemsAtom)).filter((item) => item.got).sort((a, b) => b.last_got_at.valueOf() - a.last_got_at.valueOf());
});
var loadStoreAtom = atom(null, async (get, set, storeId) => {
	const stores = await (await get(dataClientAtom)).get("stores", {
		"select": "name,items:store_items(id, description, got, order, last_got_at)",
		"id": `eq.${storeId}`,
		"store_items.order": "order.asc"
	});
	if (stores.length) {
		const store = stores[0];
		set(storeAtom, {
			id: storeId,
			name: store.name
		});
		const items = {};
		for (const item of store.items) {
			item.last_got_at = item.last_got_at ? new Date(item.last_got_at) : null;
			item.store_id = storeId;
			items[item.id] = item;
		}
		set(storeItemsAtom, items);
	}
	const actions = await promisify((await openIndexedDB()).transaction("actions").objectStore("actions").index("actions_entity_store_id").getAll(storeId));
	for (const action of actions) set(applyActionAtom, action);
});
var applyActionAtom = atom(null, (_get, set, action) => {
	if (action.table !== "store_items") return;
	switch (action.op) {
		case "new":
			set(storeItemsAtom, (draft) => {
				draft[action.entity.id] = action.entity;
			});
			break;
		case "edit":
			set(storeItemsAtom, (draft) => {
				const item = draft[action.entity.id];
				if (item) Object.assign(item, action.entity);
			});
			break;
		case "delete":
			set(storeItemsAtom, (draft) => {
				delete draft[action.entity.id];
			});
			break;
	}
});
var applyAndSyncAtom = atom(null, (get, set, action) => {
	action.entity.store_id = get(storeAtom).id;
	set(applyActionAtom, action);
	get(syncAtom).then((sync) => sync.send(action));
});
var appendNewItemAtom = atom(null, (get, set) => {
	const lastOrder = get(lastInOrderAtom)?.order ?? 0;
	const item = {
		id: v4(),
		got: false,
		description: "",
		order: lastOrder + 1e3
	};
	set(applyAndSyncAtom, {
		op: "new",
		table: "store_items",
		entity: item
	});
});
var handleKeydownAtom = atom(null, (get, set, event) => {
	const focusIndex = get(focusIndexAtom);
	const needItems = get(needItemsAtom);
	if (event.code == "Enter") {
		if (focusIndex === -1 || focusIndex === needItems.length - 1) set(appendNewItemAtom);
		else if (needItems[focusIndex + 1]?.description) {
			const order = (needItems[focusIndex].order + needItems[focusIndex + 1].order) / 2;
			set(applyAndSyncAtom, {
				op: "new",
				table: "store_items",
				entity: {
					id: v4(),
					got: false,
					description: "",
					order
				}
			});
		}
		set(focusIndexAtom, (i) => i + 1);
	} else if (event.code == "Backspace") {
		const val = event.currentTarget.value;
		const id = event.currentTarget.dataset.id;
		if (!val) {
			event.preventDefault();
			set(applyAndSyncAtom, {
				op: "delete",
				table: "store_items",
				entity: { id }
			});
			set(focusIndexAtom, (i) => i - 1);
		}
	} else if (event.code === "ArrowUp") set(focusIndexAtom, (i) => Math.max(0, i - 1));
	else if (event.code === "ArrowDown") set(focusIndexAtom, (i) => Math.min(get(needItemsAtom).length - 1, i + 1));
	else console.log(event);
});
var handleDragStartAtom = atom(null, (_get, set) => {
	set(focusIndexAtom, -1);
});
var handleDragEndAtom = atom(null, (get, set, event) => {
	const { active, over } = event;
	if (!over || active.id === over.id) return;
	const activeItem = get(storeItemsAtom)[active.id];
	if (!activeItem) return;
	const items = get(itemsInOrderAtom);
	const oldIndex = items.findIndex((i) => i.id === active.id);
	const newIndex = items.findIndex((i) => i.id === over.id);
	let newOrder;
	if (newIndex === 0) newOrder = items[0].order - 1e3;
	else if (newIndex === items.length - 1) newOrder = items[items.length - 1].order + 1e3;
	else if (newIndex > oldIndex) {
		const adjacentItem = items[newIndex + 1];
		newOrder = Math.floor((items[newIndex].order + adjacentItem.order) / 2);
		if (newOrder == adjacentItem.order) console.warn("panick");
	} else {
		const adjacentItem = items[newIndex - 1];
		newOrder = Math.floor((items[newIndex].order + adjacentItem.order) / 2);
		if (newOrder == adjacentItem.order) console.warn("panick");
	}
	set(applyAndSyncAtom, {
		op: "edit",
		table: "store_items",
		entity: {
			id: activeItem.id,
			order: newOrder
		}
	});
});
var handleCheckboxAtom = atom(null, (_get, set, event) => {
	const action = {
		op: "edit",
		table: "store_items",
		entity: {
			id: event.currentTarget.dataset.id,
			got: event.currentTarget.checked,
			last_got_at: /* @__PURE__ */ new Date()
		}
	};
	document.startViewTransition(() => {
		bn(() => {
			set(applyAndSyncAtom, action);
		});
	});
});
var handleTextboxAtom = atom(null, (_get, set, event) => {
	set(applyAndSyncAtom, {
		op: "edit",
		table: "store_items",
		entity: {
			id: event.currentTarget.dataset.id,
			description: event.currentTarget.value
		}
	});
});

//#endregion
//#region src/pages/store/Store.tsx
function Store() {
	const storeId = useParams().id;
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
	const navigate = useNavigate();
	const load = useSetAtom(loadStoreAtom);
	const store = useAtomValue(storeAtom);
	const handleDragStart = useSetAtom(handleDragStartAtom);
	const handleDragEnd = useSetAtom(handleDragEndAtom);
	const need = useAtomValue(needItemsAtom);
	const gots = useAtomValue(gotItemsAtom);
	const [focusIndex, setFocusIndex] = useAtom(focusIndexAtom);
	const handleKeydown = useSetAtom(handleKeydownAtom);
	const handleTextbox = useSetAtom(handleTextboxAtom);
	const handleCheckbox = useSetAtom(handleCheckboxAtom);
	const addNewItem = useSetAtom(appendNewItemAtom);
	h(() => {
		if (!storeId) {
			navigate("/store");
			return;
		}
		load(storeId);
	}, [
		load,
		storeId,
		navigate
	]);
	return /* @__PURE__ */ u("div", { children: [
		/* @__PURE__ */ u("h2", {
			id: storeId,
			className: "text-center underline",
			children: store.name
		}),
		/* @__PURE__ */ u("div", { children: [
			/* @__PURE__ */ u(DndContext, {
				sensors,
				collisionDetection: closestCenter,
				onDragStart: handleDragStart,
				onDragEnd: handleDragEnd,
				children: /* @__PURE__ */ u(SortableContext, {
					items: need.map((item) => item.id),
					strategy: verticalListSortingStrategy,
					children: need.map((item, index) => /* @__PURE__ */ u(Sortable, {
						id: item.id,
						children: /* @__PURE__ */ u("div", {
							id: item.id,
							className: "flex flex-row m-2",
							children: [
								/* @__PURE__ */ u("input", {
									"data-id": item.id,
									tabIndex: -1,
									type: "checkbox",
									className: "checkbox p-2",
									checked: item.got,
									onChange: handleCheckbox
								}),
								/* @__PURE__ */ u(Input, {
									"data-id": item.id,
									focus: index === focusIndex,
									type: "text",
									className: "w-80 mx-4 outline-hidden",
									onFocus: () => setFocusIndex(index),
									onKeyDown: handleKeydown,
									value: item.description,
									onChange: handleTextbox
								}),
								/* @__PURE__ */ u(Grip, { id: item.id })
							]
						})
					}, item.id))
				})
			}),
			gots.length ? /* @__PURE__ */ u("h3", {
				className: "my-3",
				children: "GOT"
			}) : null,
			/* @__PURE__ */ u("div", { children: gots.map((item) => /* @__PURE__ */ u("div", {
				id: item.id,
				className: "flex flex-row m-2",
				children: [/* @__PURE__ */ u("input", {
					"data-id": item.id,
					tabIndex: -1,
					type: "checkbox",
					className: "checkbox p-2",
					checked: item.got,
					onChange: handleCheckbox
				}), /* @__PURE__ */ u("input", {
					"data-id": item.id,
					type: "text",
					className: "w-80 mx-4 outline-hidden",
					value: item.description,
					readOnly: true
				})]
			}, item.id)) })
		] }),
		/* @__PURE__ */ u("button", {
			type: "button",
			className: "btn btn-ghost w-screen",
			onClick: addNewItem,
			children: "+"
		})
	] });
}
function Grip(props) {
	const { listeners, isDragging, attributes } = useSortable({ id: props.id });
	return /* @__PURE__ */ u("div", {
		...listeners,
		...attributes,
		className: `px-2 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`,
		style: { touchAction: "none" },
		children: /* @__PURE__ */ u("img", { src: "/grocery-shopping/grip-bars.svg" })
	});
}
function Sortable(props) {
	const { setNodeRef, transform, transition } = useSortable({ id: props.id });
	return /* @__PURE__ */ u("div", {
		ref: setNodeRef,
		style: {
			transform: CSS.Transform.toString(transform),
			transition
		},
		children: props.children
	});
}

//#endregion
//#region src/pages/store-list/StoreList.tsx
function StoreList() {
	const [stores, setStores] = d([]);
	function sortStores() {
		setStores((stores) => stores.toSorted((a, b) => a.name.localeCompare(b.name)));
	}
	function applyAction(action) {
		if (action.table != "stores") return;
		switch (action.op) {
			case "new":
				setStores((stores) => [...stores, action.entity]);
				break;
			case "edit": break;
			case "delete": break;
		}
	}
	h(() => {
		(async function() {
			const result = await (await DataClient.new()).get("stores", { select: "id,name" });
			setStores(result);
			const db = await openIndexedDB();
			db.transaction("actions", "readonly").objectStore("actions").getAll().onsuccess = (event) => {
				for (const action of event.target.result) applyAction(action);
			};
			sortStores();
		})();
	}, []);
	const sync = useAtomValue(syncAtom);
	const [name, setName] = d("");
	function onNewStore() {
		const action = {
			table: "stores",
			op: "new",
			entity: {
				id: v4(),
				name
			}
		};
		setName("");
		sync.send(action);
		applyAction(action);
		sortStores();
	}
	return /* @__PURE__ */ u(S, { children: [
		/* @__PURE__ */ u("input", {
			type: "text",
			name: "name",
			id: "name",
			placeholder: "Store Name",
			value: name,
			onChange: (e) => void setName(e.currentTarget.value),
			onKeyDown: (e) => void (e.code === "Enter" ? onNewStore() : null)
		}),
		/* @__PURE__ */ u("button", {
			type: "button",
			className: "btn btn-primary",
			onClick: onNewStore,
			children: "+ New Store"
		}),
		/* @__PURE__ */ u("div", {
			className: "flex flex-col p-2 px-2 ",
			children: stores.filter((s) => s.name).map((s) => /* @__PURE__ */ u(Link, {
				className: "py-2 underline cursor-pointer",
				to: `/store/${s.id}`,
				children: /* @__PURE__ */ u("h2", {
					id: s.id,
					children: s.name
				})
			}, s.id))
		})
	] });
}

//#endregion
//#region src/pages/trip/index.tsx
function TripList() {
	return /* @__PURE__ */ u("div", { children: "Trips List" });
}

//#endregion
//#region src/pages/trip/[id].tsx
function Trip() {
	return /* @__PURE__ */ u("div", { children: ["Trip: ", useParams().id] });
}

//#endregion
//#region src/pages/nav.tsx
function Nav() {
	return /* @__PURE__ */ u("nav", { children: /* @__PURE__ */ u("ul", {
		className: "flex flex-col gap-3 p-4",
		children: [/* @__PURE__ */ u("li", { children: /* @__PURE__ */ u(Link, {
			className: "underline",
			to: "/store",
			children: "Stores"
		}) }), /* @__PURE__ */ u("li", { children: /* @__PURE__ */ u(Link, {
			className: "underline",
			to: "/trip",
			children: "Trips"
		}) })]
	}) });
}

//#endregion
//#region src/components/AuthGuard.tsx
function AuthGuard(props) {
	const session = authClient.useSession();
	const navigate = useNavigate();
	h(() => {
		if (AUTH_GUARD && !session.isPending && !session.data) navigate("/auth/login");
	}, [navigate, session]);
	if (!AUTH_GUARD || session.data) return props.children;
	if (session.isPending) return "Logging in...";
	return "Redirecting...";
}

//#endregion
//#region src/components/RouteTree.tsx
function RouteTree() {
	return /* @__PURE__ */ u(S, { children: [
		/* @__PURE__ */ u(Route, {
			path: "/",
			component: Index
		}),
		/* @__PURE__ */ u(Route, {
			path: "nav",
			component: Nav
		}),
		/* @__PURE__ */ u(Route, {
			path: "version",
			component: Version
		}),
		/* @__PURE__ */ u(Route, {
			nest: true,
			path: "auth",
			children: [
				/* @__PURE__ */ u(Route, {
					path: "/",
					children: /* @__PURE__ */ u(Redirect, { to: "/login" })
				}),
				/* @__PURE__ */ u(Route, {
					path: "login",
					component: Login
				}),
				/* @__PURE__ */ u(Route, {
					path: "signup",
					component: Signup
				}),
				/* @__PURE__ */ u(Route, {
					path: "password-reset",
					component: PasswordReset
				})
			]
		}),
		/* @__PURE__ */ u(AuthGuard, { children: [/* @__PURE__ */ u(Switch, { children: [/* @__PURE__ */ u(Route, {
			path: "/store/:id",
			component: Store
		}), /* @__PURE__ */ u(Route, {
			path: "/store",
			component: StoreList
		})] }), /* @__PURE__ */ u(Switch, { children: [/* @__PURE__ */ u(Route, {
			path: "/trip/:id",
			component: TripList
		}), /* @__PURE__ */ u(Route, {
			path: "/trip",
			component: Trip
		})] })] })
	] });
}

//#endregion
//#region src/components/App.tsx
function App() {
	return /* @__PURE__ */ u(SyncActionProvider, {
		mode: SYNC_MODE,
		children: /* @__PURE__ */ u(HashRouter, { children: /* @__PURE__ */ u("div", {
			className: "h-screen flex flex-col ",
			"data-theme": "dark",
			children: [/* @__PURE__ */ u("h1", {
				className: "w-full bg-base-200 p-3 grid grid-cols-3 items-center",
				children: [
					/* @__PURE__ */ u("div", { children: /* @__PURE__ */ u(LoginPrompt, {}) }),
					/* @__PURE__ */ u("div", {
						className: "text-center",
						children: /* @__PURE__ */ u("button", {
							className: "btn btn-accent",
							onClick: () => toast(() => /* @__PURE__ */ u("div", {
								className: "p-3 bg-base-300 rounded-full",
								children: "greetings traveler"
							})),
							children: "Click Me"
						})
					}),
					/* @__PURE__ */ u("div", {
						className: "text-right",
						children: /* @__PURE__ */ u(Link, {
							to: "/nav",
							children: "Nav"
						})
					})
				]
			}), /* @__PURE__ */ u("div", {
				className: "p-3 flex-1 overflow-y-scroll overflow-x-hidden",
				children: [
					/* @__PURE__ */ u(P, {
						fallback: "the suspense is killing me",
						children: /* @__PURE__ */ u(RouteTree, {})
					}),
					/* @__PURE__ */ u(LastVisitSave, {}),
					/* @__PURE__ */ u(Toaster, {})
				]
			})]
		}) })
	});
}

//#endregion
//#region src/main.tsx
init({
	dsn: SENTRY_DSN,
	release: "2026-07-31_0",
	initialScope: { tags: { git_commit: "3e768d5" } }
});
if (ENABLE_SERVICE_WORKER) navigator.serviceWorker.register("/grocery-shopping/service-worker.js").catch(console.error);
createRoot(document.getElementById("root")).render(/* @__PURE__ */ u(S, { children: /* @__PURE__ */ u(App, {}) }));

//#endregion
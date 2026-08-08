import { r as __toESM } from "./rolldown-runtime-BBzN7mU7.js";
import { i as require_react } from "./@dnd-kit/accessibility-Cp455YLW.js";
import { t as require_client } from "./react-dom-CTl4TmXd.js";
import { d as CSS, g as require_react_dom, i as closestCenter, l as useSensor, r as PointerSensor, t as DndContext, u as useSensors } from "./@dnd-kit/core-CsMv1_OU.js";
import { a as createFileRoute, c as useNavigate, i as Outlet, l as ErrorComponent, n as RouterProvider, o as createRootRoute, r as createRouter, s as Link, t as useLocation } from "./@tanstack/react-router-B9cjwm3j.js";
import { n as createHashHistory } from "./@tanstack/history-uEhFT_8-.js";
import { n as require_jsx_runtime, t as QueryClientProvider } from "./@tanstack/react-query-BY6ydLyl.js";
import { t as require_compiler_runtime } from "./react-PEUjiTgh.js";
import { a as atom, i as useSetAtom, n as useAtom, o as createStore, r as useAtomValue, t as Provider } from "./jotai-BBxBeiW-.js";
import { n as toast$1, t as Toaster$1 } from "./sonner-CTp0qRmA.js";
import { t as createAuthClient } from "./@neondatabase/auth-BT8gROfT.js";
import { t as TanStackRouterDevtools } from "./@tanstack/react-router-devtools-BvTBnZI7.js";
import { t as QueryClient } from "./@tanstack/query-core-Ckdck6tV.js";
import { t as ReactQueryDevtools2 } from "./@tanstack/react-query-devtools-wFDCXlfO.js";
import { t as v4 } from "./uuid-BtdgrrNB.js";
import { n as useSortable, r as verticalListSortingStrategy, t as SortableContext } from "./@dnd-kit/sortable-CX16qnHs.js";
import { t as atomWithImmer } from "./jotai-immer-heCAeLnc.js";
import { t as Temporal } from "./temporal-polyfill-Dsm9fIVe.js";

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
//#region src/config.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_client = require_client();
var NEON_AUTH_URL = "https://ep-red-morning-awzkc1lp.neonauth.c-12.us-east-1.aws.neon.tech/neondb/auth";
var NEON_DATA_URL = "https://ep-red-morning-awzkc1lp.apirest.c-12.us-east-1.aws.neon.tech/neondb/rest/v1";
var SYNC_MODE = "immediate";

//#endregion
//#region src/components/JotaiProvider.tsx
var import_compiler_runtime = require_compiler_runtime();
var import_jsx_runtime = require_jsx_runtime();
var JotaiStore = createStore();
function JotaiProvider(props) {
	const $ = (0, import_compiler_runtime.c)(2);
	let t0;
	if ($[0] !== props.children) {
		t0 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
			store: JotaiStore,
			children: props.children
		});
		$[0] = props.children;
		$[1] = t0;
	} else t0 = $[1];
	return t0;
}

//#endregion
//#region src/components/Toaster.tsx
function Toaster() {
	const $ = (0, import_compiler_runtime.c)(1);
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bottom-0 sticky",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
		});
		$[0] = t0;
	} else t0 = $[0];
	return t0;
}

//#endregion
//#region src/auth.ts
var authClient = createAuthClient(NEON_AUTH_URL, { allowAnonymous: true });

//#endregion
//#region src/neon.ts
var DataClient = class DataClient {
	token;
	constructor(token) {
		this.token = token;
	}
	static async new() {
		const token = await authClient.getAnonymousToken();
		return new DataClient(token.data.token);
	}
	headers() {
		return {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${this.token}`
		};
	}
	async get(table, query, signal) {
		const queryString = new URLSearchParams(query);
		const url = `${NEON_DATA_URL}/${table}?${queryString}`;
		return await (await fetch(url, {
			method: "GET",
			headers: this.headers(),
			signal
		})).json();
	}
	async patch(table, query, data) {
		const queryString = new URLSearchParams(query);
		const url = `${NEON_DATA_URL}/${table}?${queryString}`;
		await fetch(url, {
			method: "PATCH",
			headers: this.headers(),
			body: JSON.stringify(data)
		});
	}
	async post(table, data) {
		const url = `${NEON_DATA_URL}/${table}`;
		await fetch(url, {
			method: "POST",
			headers: this.headers(),
			body: JSON.stringify(data)
		});
	}
	async delete(table, query) {
		const queryString = new URLSearchParams(query);
		const url = `${NEON_DATA_URL}/${table}?${queryString}`;
		await fetch(url, {
			method: "DELETE",
			headers: this.headers()
		});
	}
};
var dataClientAtom = atom(DataClient.new());

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
//#region src/migrate.ts
var DB_NAME = "groceries";
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
function readTransaction(db, store) {
	return db.transaction(store, "readonly").objectStore(store);
}
function writeTransaction(db, store) {
	return db.transaction(store, "readwrite").objectStore(store);
}
function openIndexedDb() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, 7);
		request.onerror = (event) => {
			reject(event);
		};
		request.onsuccess = () => {
			resolve(request.result);
		};
		request.onupgradeneeded = (event) => {
			migrate(event);
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
//#region src/sync-worker.ts?worker
function WorkerWrapper(options) {
	return new Worker("/grocery-shopping/assets/sync-worker-B2ef81oP.js", {
		type: "module",
		name: options?.name
	});
}

//#endregion
//#region src/components/SyncActionRunner.tsx
function SyncActionRunner(props) {
	const $ = (0, import_compiler_runtime.c)(3);
	let t0;
	let t1;
	if ($[0] !== props.mode) {
		t0 = () => {
			if (props.mode === "web-worker") return runOnWorkerThread();
			else if (props.mode === "main-loop") return runOnMainThread();
		};
		t1 = [props.mode];
		$[0] = props.mode;
		$[1] = t0;
		$[2] = t1;
	} else {
		t0 = $[1];
		t1 = $[2];
	}
	(0, import_react.useEffect)(t0, t1);
	return null;
}
function runOnWorkerThread() {
	const worker = new WorkerWrapper();
	worker.addEventListener("message", (ev) => {
		console.log("from worker", ev.data);
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
		const db = await openIndexedDb();
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
	const $ = (0, import_compiler_runtime.c)(3);
	const { pathname: route } = useLocation();
	let t0;
	let t1;
	if ($[0] !== route) {
		t0 = () => {
			if (route.endsWith("/") || route.startsWith("/auth")) return;
			localStorage.setItem("last_visited_url", route);
		};
		t1 = [route];
		$[0] = route;
		$[1] = t0;
		$[2] = t1;
	} else {
		t0 = $[1];
		t1 = $[2];
	}
	(0, import_react.useEffect)(t0, t1);
	return null;
}

//#endregion
//#region src/query-client.ts
var query_client_default = new QueryClient({});

//#endregion
//#region src/model.ts
var SyncModel = class SyncModel {
	db;
	client;
	constructor(db, client) {
		this.db = db;
		this.client = client;
	}
	static async new(mode) {
		if (mode === "immediate") return new SyncModel(void 0, await DataClient.new());
		else return new SyncModel(await openIndexedDb());
	}
	async send(action) {
		if (this.db) return await promisify(writeTransaction(this.db, "actions").put(action));
		else if (this.client) return await pushToPostgrest(this.client, action);
		console.warn("dropping", action);
	}
};
var syncAtom = atom(new SyncModel());

//#endregion
//#region src/routes/__root.tsx
var Route$8 = createRootRoute({
	component: RootComponent,
	loader: async () => {
		JotaiStore.set(syncAtom, await SyncModel.new(SYNC_MODE));
		return await authClient.getSession();
	}
});
function RootComponent() {
	const $ = (0, import_compiler_runtime.c)(21);
	const { data } = Route$8.useLoaderData();
	const t0 = data?.user?.name ?? "Guest";
	let t1;
	if ($[0] !== t0) {
		t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Hello, ", t0] });
		$[0] = t0;
		$[1] = t1;
	} else t1 = $[1];
	let t2;
	let t3;
	let t4;
	if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "tab",
			children: "Home"
		});
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/stores",
			className: "tab",
			children: "Stores"
		});
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/trips",
			className: "tab",
			children: "Trips"
		});
		$[2] = t2;
		$[3] = t3;
		$[4] = t4;
	} else {
		t2 = $[2];
		t3 = $[3];
		t4 = $[4];
	}
	let t5;
	if ($[5] !== data?.user) {
		t5 = data?.user != null ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/auth/login",
			className: "tab",
			children: "Login"
		});
		$[5] = data?.user;
		$[6] = t5;
	} else t5 = $[6];
	let t6;
	if ($[7] !== data?.user) {
		t6 = data?.user == null ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "btn btn-error btn-xs mr-3",
			onClick: _temp$3,
			children: "Log out"
		});
		$[7] = data?.user;
		$[8] = t6;
	} else t6 = $[8];
	let t7;
	if ($[9] !== t5 || $[10] !== t6) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "tabs items-center",
			children: [
				t2,
				t3,
				t4,
				t5,
				t6
			]
		});
		$[9] = t5;
		$[10] = t6;
		$[11] = t7;
	} else t7 = $[11];
	let t8;
	if ($[12] !== t1 || $[13] !== t7) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "bg-base-300 p-3 text-sm flex flex-row justify-between w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between w-full",
				children: [t1, t7]
			})
		});
		$[12] = t1;
		$[13] = t7;
		$[14] = t8;
	} else t8 = $[14];
	let t10;
	let t11;
	let t12;
	let t9;
	if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
		t9 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "p-3 overflow-y-scroll overflow-x-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LastVisitSave, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {})
			]
		});
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TanStackRouterDevtools, {});
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReactQueryDevtools2, {});
		t12 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncActionRunner, { mode: SYNC_MODE });
		$[15] = t10;
		$[16] = t11;
		$[17] = t12;
		$[18] = t9;
	} else {
		t10 = $[15];
		t11 = $[16];
		t12 = $[17];
		t9 = $[18];
	}
	let t13;
	if ($[19] !== t8) {
		t13 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
			client: query_client_default,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(JotaiProvider, { children: [
				t8,
				t9,
				t10,
				t11,
				t12
			] })
		});
		$[19] = t8;
		$[20] = t13;
	} else t13 = $[20];
	return t13;
}
function _temp$3() {
	return authClient.signOut;
}

//#endregion
//#region src/components/toast.tsx
function toast(render) {
	toast$1.custom((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: render(() => toast$1.dismiss(id)) }));
}

//#endregion
//#region src/components/bits/NyanCatButton.tsx
function NyanCatButton() {
	const $ = (0, import_compiler_runtime.c)(1);
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "btn btn-accent btn-xs",
			onClick: _temp2$1,
			children: "Click Me"
		});
		$[0] = t0;
	} else t0 = $[0];
	return t0;
}
function _temp2$1() {
	return toast(_temp$2);
}
function _temp$2() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: "/grocery-shopping/nyan.gif" });
}

//#endregion
//#region src/routes/index.tsx
var Route$7 = createFileRoute("/")({ component: RouteComponent$7 });
function RouteComponent$7() {
	const $ = (0, import_compiler_runtime.c)(5);
	let t0;
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Welcome to my web zone!" });
		t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NyanCatButton, {});
		$[0] = t0;
		$[1] = t1;
	} else {
		t0 = $[0];
		t1 = $[1];
	}
	let t2;
	if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Release info" });
		$[2] = t2;
	} else t2 = $[2];
	let t3;
	if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Last Released: ", "2026-08-08 at  5:08pm"] });
		$[3] = t3;
	} else t3 = $[3];
	let t4;
	if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4 items-start",
			children: [
				t0,
				t1,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "mt-10 cursor-pointer",
					children: [t2, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "italic",
						children: [t3, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `https://github.com/charlestaylor7/grocery-shopping/commit/1103465}`,
							children: ["Git Commit: ", "1103465"]
						})]
					})]
				})
			]
		});
		$[4] = t4;
	} else t4 = $[4];
	return t4;
}

//#endregion
//#region src/routes/auth.tsx
var Route$6 = createFileRoute("/auth")({ component: RouteComponent$6 });
function RouteComponent$6() {
	const $ = (0, import_compiler_runtime.c)(1);
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "tablist",
			className: "tabs tabs-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "./login",
					from: Route$6.to,
					className: "tab",
					children: "Login"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "./signup",
					from: Route$6.to,
					className: "tab",
					children: "Signup"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "./forgor",
					from: Route$6.to,
					className: "tab",
					children: "Forgor"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})] });
		$[0] = t0;
	} else t0 = $[0];
	return t0;
}

//#endregion
//#region src/routes/stores.tsx
var storesAtom = atom([]);
var sortedStoresAtom = atom((get) => get(storesAtom).toSorted((a, b) => a.name.localeCompare(b.name)));
var Route$5 = createFileRoute("/stores")({
	component: RouteComponent$5,
	loader: async () => {
		const result = await (await DataClient.new()).get("stores", {
			select: "id,name",
			order: "name.asc"
		});
		JotaiStore.set(storesAtom, result);
		const db = await openIndexedDb();
		const actions = await promisify(readTransaction(db, "actions").getAll());
		for (const action of actions) applyAction(action);
	}
});
function applyAction(action) {
	if (action.table != "stores") return;
	switch (action.op) {
		case "new": JotaiStore.set(storesAtom, (stores) => [...stores, action.entity]);
	}
}
function RouteComponent$5() {
	const $ = (0, import_compiler_runtime.c)(20);
	const sync = useAtomValue(syncAtom);
	const stores = useAtomValue(sortedStoresAtom);
	const [name, setName] = (0, import_react.useState)("");
	let t0;
	if ($[0] !== name || $[1] !== sync) {
		t0 = function onNewStore() {
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
		};
		$[0] = name;
		$[1] = sync;
		$[2] = t0;
	} else t0 = $[2];
	const onNewStore = t0;
	let t1;
	if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = (e) => void setName(e.currentTarget.value);
		$[3] = t1;
	} else t1 = $[3];
	let t2;
	if ($[4] !== onNewStore) {
		t2 = (e_0) => void (e_0.code === "Enter" ? onNewStore() : null);
		$[4] = onNewStore;
		$[5] = t2;
	} else t2 = $[5];
	let t3;
	if ($[6] !== name || $[7] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "text",
			name: "name",
			id: "name",
			placeholder: "Store Name",
			value: name,
			onChange: t1,
			onKeyDown: t2
		});
		$[6] = name;
		$[7] = t2;
		$[8] = t3;
	} else t3 = $[8];
	const t4 = !name;
	let t5;
	if ($[9] !== onNewStore || $[10] !== t4) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			disabled: t4,
			type: "button",
			className: "btn btn-primary",
			onClick: onNewStore,
			children: "+ New Store"
		});
		$[9] = onNewStore;
		$[10] = t4;
		$[11] = t5;
	} else t5 = $[11];
	let t6;
	if ($[12] !== stores) {
		t6 = stores.filter(_temp$1).map(_temp2);
		$[12] = stores;
		$[13] = t6;
	} else t6 = $[13];
	let t7;
	if ($[14] !== t6) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col items-start",
			children: t6
		});
		$[14] = t6;
		$[15] = t7;
	} else t7 = $[15];
	let t8;
	if ($[16] !== t3 || $[17] !== t5 || $[18] !== t7) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			t3,
			t5,
			t7
		] });
		$[16] = t3;
		$[17] = t5;
		$[18] = t7;
		$[19] = t8;
	} else t8 = $[19];
	return t8;
}
function _temp2(s_0) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		className: "btn btn-ghost",
		to: `/store/${s_0.id}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			id: s_0.id,
			children: s_0.name
		})
	}, s_0.id);
}
function _temp$1(s) {
	return s.name;
}

//#endregion
//#region src/routes/auth/forgor.tsx
var Route$4 = createFileRoute("/auth/forgor")({ component: RouteComponent$4 });
function RouteComponent$4() {
	const $ = (0, import_compiler_runtime.c)(2);
	const formRef = (0, import_react.useRef)(null);
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = async function resetPassword() {
			const email = new FormData(formRef.current).get("email")?.toString();
			await authClient.requestPasswordReset({ email });
			toast(() => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Password reset sent to ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "underline",
				children: email
			})] }));
		};
		$[0] = t0;
	} else t0 = $[0];
	const resetPassword = t0;
	let t1;
	if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			ref: formRef,
			className: "flex flex-col gap-2 items-start p-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "email",
				placeholder: "Email",
				name: "email",
				required: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn btn-primary",
				onClick: resetPassword,
				children: "Send Password Reset Email"
			})]
		});
		$[1] = t1;
	} else t1 = $[1];
	return t1;
}

//#endregion
//#region src/last-visited-url.ts
function lastVisitedUrl() {
	return localStorage.getItem("last_visited_url") ?? "/store";
}

//#endregion
//#region src/routes/auth/login.tsx
var Route$3 = createFileRoute("/auth/login")({ component: RouteComponent$3 });
function RouteComponent$3() {
	const navigate = useNavigate();
	const formRef = (0, import_react.useRef)(null);
	async function handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const payload = {
			email: data.get("email")?.toString(),
			password: data.get("password")?.toString(),
			rememberMe: true
		};
		try {
			await authClient.signIn.email(payload);
			navigate({ to: lastVisitedUrl() });
		} catch (e) {
			console.error(e);
			toast(() => {
				return e.message;
			});
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		ref: formRef,
		className: "flex flex-col gap-2 items-start p-2",
		onSubmit: handleSubmit,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "email",
				placeholder: "Email",
				name: "email",
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "password",
				placeholder: "Password",
				name: "password",
				required: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				type: "button",
				className: "btn btn-ghost btn-sm",
				to: "/auth/forgor",
				children: "💀 I forgor (reset password)"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				className: "btn btn-primary",
				children: "Login"
			})
		]
	});
}

//#endregion
//#region src/routes/auth/password-reset.tsx
var Route$2 = createFileRoute("/auth/password-reset")({
	component: RouteComponent$2,
	validateSearch: (search) => {
		return { token: search["token"] };
	}
});
function RouteComponent$2() {
	const $ = (0, import_compiler_runtime.c)(10);
	const params = Route$2.useSearch();
	const navigate = useNavigate();
	let t0;
	if ($[0] !== navigate || $[1] !== params.token) {
		t0 = () => {
			if (!params.token) navigate({ to: "/auth/login" });
		};
		$[0] = navigate;
		$[1] = params.token;
		$[2] = t0;
	} else t0 = $[2];
	(0, import_react.useEffect)(t0);
	const formRef = (0, import_react.useRef)(null);
	let t1;
	if ($[3] !== navigate || $[4] !== params.token) {
		t1 = async function handleSubmit(e) {
			e.preventDefault();
			const payload = {
				newPassword: new FormData(e.currentTarget).get("password")?.toString(),
				token: params.token
			};
			await authClient.resetPassword(payload);
			navigate({ to: "/auth/login" });
		};
		$[3] = navigate;
		$[4] = params.token;
		$[5] = t1;
	} else t1 = $[5];
	const handleSubmit = t1;
	let t2;
	let t3;
	if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "password",
			placeholder: "New Password",
			name: "password",
			required: true
		}) });
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "submit",
			className: "btn btn-primary",
			children: "Confirm"
		});
		$[6] = t2;
		$[7] = t3;
	} else {
		t2 = $[6];
		t3 = $[7];
	}
	let t4;
	if ($[8] !== handleSubmit) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			ref: formRef,
			className: "flex flex-col gap-2 items-start p-2",
			onSubmit: handleSubmit,
			children: [t2, t3]
		});
		$[8] = handleSubmit;
		$[9] = t4;
	} else t4 = $[9];
	return t4;
}

//#endregion
//#region src/routes/auth/signup.tsx
var Route$1 = createFileRoute("/auth/signup")({ component: RouteComponent$1 });
function RouteComponent$1() {
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
			await authClient.signUp.email(payload);
			navigate({ to: lastVisitedUrl() });
		} catch (e) {
			toast(() => {
				return e.message;
			});
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "flex flex-col gap-2 items-start p-2",
		onSubmit: handleSubmit,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				placeholder: "Username",
				name: "username",
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "email",
				placeholder: "Email",
				name: "email",
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "password",
				placeholder: "Password",
				name: "password",
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				className: "btn btn-primary",
				children: "Sign up"
			})
		]
	});
}

//#endregion
//#region src/components/Input.tsx
function Input(t0) {
	const $ = (0, import_compiler_runtime.c)(8);
	let focus;
	let props;
	if ($[0] !== t0) {
		({focus, ...props} = t0);
		$[0] = t0;
		$[1] = focus;
		$[2] = props;
	} else {
		focus = $[1];
		props = $[2];
	}
	const ref = (0, import_react.useRef)(null);
	let t1;
	let t2;
	if ($[3] !== focus) {
		t1 = () => {
			if (focus && ref.current) ref.current.focus();
		};
		t2 = [focus];
		$[3] = focus;
		$[4] = t1;
		$[5] = t2;
	} else {
		t1 = $[4];
		t2 = $[5];
	}
	(0, import_react.useEffect)(t1, t2);
	let t3;
	if ($[6] !== props) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref,
			...props
		});
		$[6] = props;
		$[7] = t3;
	} else t3 = $[7];
	return t3;
}

//#endregion
//#region src/pages/store/atoms.ts
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var storeIdAtom = atom("");
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
		case "delete": set(storeItemsAtom, (draft) => {
			delete draft[action.entity.id];
		});
	}
});
var applyAndSyncAtom = atom(null, (_get, set, action) => {
	set(applyActionAtom, action);
	set(syncActionAtom, action);
});
var syncActionAtom = atom(null, (get, _set, action) => {
	const storeId = get(storeIdAtom);
	get(syncAtom).send({
		...action,
		entity: {
			...action.entity,
			store_id: storeId
		}
	});
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
	if (newIndex === 0) {
		const order = items[0].order - 1e3;
		set(applyAndSyncAtom, {
			op: "edit",
			table: "store_items",
			entity: {
				id: activeItem.id,
				order
			}
		});
		return;
	} else if (newIndex === items.length - 1) {
		const order = items[items.length - 1].order + 1e3;
		set(applyAndSyncAtom, {
			op: "edit",
			table: "store_items",
			entity: {
				id: activeItem.id,
				order
			}
		});
		return;
	}
	const edits = [];
	if (newIndex > oldIndex) {
		const adjacentIndex = newIndex + 1;
		const targetOrder = items[newIndex].order;
		const adjacentOrder = items[adjacentIndex].order;
		let order = Math.ceil((targetOrder + adjacentOrder) / 2);
		edits.push({
			id: activeItem.id,
			order
		});
		if (order === adjacentOrder) for (let i = adjacentIndex; i < items.length; i++) if (items[i].order - order < 1e3) {
			order += 1e3;
			edits.push({
				id: items[i].id,
				order
			});
		} else break;
	}
	if (newIndex < oldIndex) {
		const adjacentIndex = newIndex - 1;
		const targetOrder = items[newIndex].order;
		const adjacentOrder = items[adjacentIndex].order;
		let order = Math.floor((targetOrder + adjacentOrder) / 2);
		edits.push({
			id: activeItem.id,
			order
		});
		if (order === adjacentOrder) for (let i = adjacentIndex; i >= 0; i--) if (order - items[i].order < 1e3) {
			order -= 1e3;
			edits.push({
				id: items[i].id,
				order
			});
		} else break;
	}
	set(batchDndUpdateAtom, edits);
});
var batchDndUpdateAtom = atom(null, (get, set, edits) => {
	set(storeItemsAtom, (draft) => {
		for (const edit of edits) draft[edit.id].order = edit.order;
	});
	for (const edit of edits) set(syncActionAtom, {
		op: "edit",
		table: "store_items",
		entity: edit
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
		(0, import_react_dom.flushSync)(() => {
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
//#region src/routes/store/$storeId.tsx
var nowAtom = atom(toPlainDate(/* @__PURE__ */ new Date()));
var Route = createFileRoute("/store/$storeId")({
	component: RouteComponent,
	loader: async ({ params: { storeId }, abortController }) => {
		const stores = await (await DataClient.new()).get("stores", {
			"select": "name,items:store_items(id, description, got, order, last_got_at)",
			"id": `eq.${storeId}`,
			"store_items.order": "order.asc"
		}, abortController.signal);
		const items = {};
		if (!stores.length) return {
			id: storeId,
			name: "",
			items
		};
		const store = stores[0];
		const result = {
			id: storeId,
			name: store.name,
			items
		};
		for (const item of store.items) {
			item.last_got_at = item.last_got_at ? new Date(item.last_got_at) : null;
			item.store_id = storeId;
			result.items[item.id] = item;
		}
		JotaiStore.set(storeIdAtom, storeId);
		JotaiStore.set(storeItemsAtom, items);
		JotaiStore.set(nowAtom, toPlainDate(/* @__PURE__ */ new Date()));
		const db = await openIndexedDb();
		const actions = await promisify(readTransaction(db, "actions").getAll());
		for (const action of actions) JotaiStore.set(applyActionAtom, action);
		return { name: store.name };
	}
});
function toPlainDate(date) {
	return new Temporal.PlainDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
}
function ago(item, now) {
	if (typeof item.last_got_at !== "object") return "?";
	const duration = now.since(toPlainDate(item.last_got_at));
	if (duration.days === 0) return "today";
	return `${duration.days}d ago`;
}
function RouteComponent() {
	const $ = (0, import_compiler_runtime.c)(55);
	const { name } = Route.useLoaderData();
	const id = useAtomValue(storeIdAtom);
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = { activationConstraint: { distance: 5 } };
		$[0] = t0;
	} else t0 = $[0];
	const sensors = useSensors(useSensor(PointerSensor, t0));
	const now = useAtomValue(nowAtom);
	const handleDragStart = useSetAtom(handleDragStartAtom);
	const handleDragEnd = useSetAtom(handleDragEndAtom);
	const need = useAtomValue(needItemsAtom);
	const gots = useAtomValue(gotItemsAtom);
	const [focusIndex, setFocusIndex] = useAtom(focusIndexAtom);
	const handleKeydown = useSetAtom(handleKeydownAtom);
	const handleTextbox = useSetAtom(handleTextboxAtom);
	const handleCheckbox = useSetAtom(handleCheckboxAtom);
	const addNewItem = useSetAtom(appendNewItemAtom);
	const navigate = useNavigate();
	const sync = useAtomValue(syncAtom);
	let t1;
	if ($[1] !== id || $[2] !== name) {
		t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			id,
			className: "text-center underline",
			children: name
		});
		$[1] = id;
		$[2] = name;
		$[3] = t1;
	} else t1 = $[3];
	let t2;
	if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
			className: "btn m-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/grocery-shopping/wrench.svg",
				alt: "settings"
			})
		});
		$[4] = t2;
	} else t2 = $[4];
	let t3;
	if ($[5] !== id || $[6] !== navigate || $[7] !== sync) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			className: "dropdown dropdown-end absolute right-0",
			children: [t2, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-error",
					onClick: () => {
						sync.send({
							table: "stores",
							op: "delete",
							entity: { id }
						}).then(() => navigate({ to: "/store" }));
					},
					children: "delete"
				}) })
			})]
		});
		$[5] = id;
		$[6] = navigate;
		$[7] = sync;
		$[8] = t3;
	} else t3 = $[8];
	let t4;
	if ($[9] !== t1 || $[10] !== t3) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "relative flex items-center justify-center w-full",
			children: [t1, t3]
		});
		$[9] = t1;
		$[10] = t3;
		$[11] = t4;
	} else t4 = $[11];
	let t5;
	if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "my-3 text-xl",
			children: "Need"
		});
		$[12] = t5;
	} else t5 = $[12];
	let t6;
	if ($[13] !== need) {
		t6 = need.map(_temp);
		$[13] = need;
		$[14] = t6;
	} else t6 = $[14];
	let t7;
	if ($[15] !== focusIndex || $[16] !== handleCheckbox || $[17] !== handleKeydown || $[18] !== handleTextbox || $[19] !== need || $[20] !== setFocusIndex) {
		let t8;
		if ($[22] !== focusIndex || $[23] !== handleCheckbox || $[24] !== handleKeydown || $[25] !== handleTextbox || $[26] !== setFocusIndex) {
			t8 = (item_0, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sortable, {
				id: item_0.id,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: item_0.id,
					className: "flex flex-row m-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							"data-id": item_0.id,
							tabIndex: -1,
							type: "checkbox",
							className: "checkbox p-2",
							checked: item_0.got,
							onChange: handleCheckbox
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-id": item_0.id,
							focus: index === focusIndex,
							type: "text",
							className: "w-80 mx-2 outline-hidden",
							onFocus: () => setFocusIndex(index),
							onKeyDown: handleKeydown,
							onChange: handleTextbox,
							value: item_0.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grip, { id: item_0.id })
					]
				})
			}, item_0.id);
			$[22] = focusIndex;
			$[23] = handleCheckbox;
			$[24] = handleKeydown;
			$[25] = handleTextbox;
			$[26] = setFocusIndex;
			$[27] = t8;
		} else t8 = $[27];
		t7 = need.map(t8);
		$[15] = focusIndex;
		$[16] = handleCheckbox;
		$[17] = handleKeydown;
		$[18] = handleTextbox;
		$[19] = need;
		$[20] = setFocusIndex;
		$[21] = t7;
	} else t7 = $[21];
	let t8;
	if ($[28] !== t6 || $[29] !== t7) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, {
			items: t6,
			strategy: verticalListSortingStrategy,
			children: t7
		});
		$[28] = t6;
		$[29] = t7;
		$[30] = t8;
	} else t8 = $[30];
	let t9;
	if ($[31] !== handleDragEnd || $[32] !== handleDragStart || $[33] !== sensors || $[34] !== t8) {
		t9 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DndContext, {
			sensors,
			collisionDetection: closestCenter,
			onDragStart: handleDragStart,
			onDragEnd: handleDragEnd,
			children: t8
		});
		$[31] = handleDragEnd;
		$[32] = handleDragStart;
		$[33] = sensors;
		$[34] = t8;
		$[35] = t9;
	} else t9 = $[35];
	let t10;
	if ($[36] !== addNewItem) {
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "btn btn-ghost w-100",
			onClick: addNewItem,
			children: "+"
		});
		$[36] = addNewItem;
		$[37] = t10;
	} else t10 = $[37];
	let t11;
	if ($[38] !== gots.length) {
		t11 = gots.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "my-3 text-xl",
			children: "Got"
		}) : null;
		$[38] = gots.length;
		$[39] = t11;
	} else t11 = $[39];
	let t12;
	if ($[40] !== gots || $[41] !== handleCheckbox || $[42] !== now) {
		let t13;
		if ($[44] !== handleCheckbox || $[45] !== now) {
			t13 = (item_1) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id: item_1.id,
				className: "flex flex-row m-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						"data-id": item_1.id,
						tabIndex: -1,
						type: "checkbox",
						className: "checkbox p-2 ",
						checked: item_1.got,
						onChange: handleCheckbox
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						"data-id": item_1.id,
						type: "text",
						className: "mx-2 flex-1 outline-hidden overflow-x-hidden",
						value: item_1.description,
						readOnly: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "italic text-nowrap",
						children: ago(item_1, now)
					})
				]
			}, item_1.id);
			$[44] = handleCheckbox;
			$[45] = now;
			$[46] = t13;
		} else t13 = $[46];
		t12 = gots.map(t13);
		$[40] = gots;
		$[41] = handleCheckbox;
		$[42] = now;
		$[43] = t12;
	} else t12 = $[43];
	let t13;
	if ($[47] !== t12) {
		t13 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: t12 });
		$[47] = t12;
		$[48] = t13;
	} else t13 = $[48];
	let t14;
	if ($[49] !== t10 || $[50] !== t11 || $[51] !== t13 || $[52] !== t4 || $[53] !== t9) {
		t14 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			t4,
			t5,
			t9,
			t10,
			t11,
			t13
		] });
		$[49] = t10;
		$[50] = t11;
		$[51] = t13;
		$[52] = t4;
		$[53] = t9;
		$[54] = t14;
	} else t14 = $[54];
	return t14;
}
function _temp(item) {
	return item.id;
}
function Grip(props) {
	const $ = (0, import_compiler_runtime.c)(8);
	let t0;
	if ($[0] !== props.id) {
		t0 = { id: props.id };
		$[0] = props.id;
		$[1] = t0;
	} else t0 = $[1];
	const { listeners, isDragging, attributes } = useSortable(t0);
	const t1 = `px-4 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`;
	let t2;
	let t3;
	if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = { touchAction: "none" };
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: "/grocery-shopping/grip-bars.svg" });
		$[2] = t2;
		$[3] = t3;
	} else {
		t2 = $[2];
		t3 = $[3];
	}
	let t4;
	if ($[4] !== attributes || $[5] !== listeners || $[6] !== t1) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			...listeners,
			...attributes,
			className: t1,
			style: t2,
			children: t3
		});
		$[4] = attributes;
		$[5] = listeners;
		$[6] = t1;
		$[7] = t4;
	} else t4 = $[7];
	return t4;
}
function Sortable(props) {
	const $ = (0, import_compiler_runtime.c)(11);
	let t0;
	if ($[0] !== props.id) {
		t0 = { id: props.id };
		$[0] = props.id;
		$[1] = t0;
	} else t0 = $[1];
	const { setNodeRef, transform, transition } = useSortable(t0);
	let t1;
	if ($[2] !== transform) {
		t1 = CSS.Transform.toString(transform);
		$[2] = transform;
		$[3] = t1;
	} else t1 = $[3];
	let t2;
	if ($[4] !== t1 || $[5] !== transition) {
		t2 = {
			transform: t1,
			transition
		};
		$[4] = t1;
		$[5] = transition;
		$[6] = t2;
	} else t2 = $[6];
	let t3;
	if ($[7] !== props.children || $[8] !== setNodeRef || $[9] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: setNodeRef,
			style: t2,
			children: props.children
		});
		$[7] = props.children;
		$[8] = setNodeRef;
		$[9] = t2;
		$[10] = t3;
	} else t3 = $[10];
	return t3;
}

//#endregion
//#region src/routeTree.gen.ts
var IndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$8
});
var AuthRoute = Route$6.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$8
});
var StoresRoute = Route$5.update({
	id: "/stores",
	path: "/stores",
	getParentRoute: () => Route$8
});
var AuthForgorRoute = Route$4.update({
	id: "/forgor",
	path: "/forgor",
	getParentRoute: () => AuthRoute
});
var AuthLoginRoute = Route$3.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => AuthRoute
});
var AuthPasswordResetRoute = Route$2.update({
	id: "/password-reset",
	path: "/password-reset",
	getParentRoute: () => AuthRoute
});
var AuthSignupRoute = Route$1.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => AuthRoute
});
var StoreStoreIdRoute = Route.update({
	id: "/store/$storeId",
	path: "/store/$storeId",
	getParentRoute: () => Route$8
});
var AuthRouteChildren = {
	AuthForgorRoute,
	AuthLoginRoute,
	AuthPasswordResetRoute,
	AuthSignupRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthRoute: AuthRoute._addFileChildren(AuthRouteChildren),
	StoresRoute,
	StoreStoreIdRoute
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();

//#endregion
//#region src/router.ts
var router = createRouter({
	routeTree,
	history: createHashHistory(),
	scrollRestoration: false,
	defaultViewTransition: true,
	defaultErrorComponent: ErrorComponent,
	defaultPendingComponent: () => "the suspense is killing me...",
	defaultPendingMs: 200,
	defaultPendingMinMs: 400
});

//#endregion
//#region src/main.tsx
if (true) navigator.serviceWorker.register("/grocery-shopping/service-worker.js");
(0, import_client.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouterProvider, { router }) }));

//#endregion
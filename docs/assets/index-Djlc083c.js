import { n as __toESM } from "./rolldown-runtime-DBMA93yC.js";
import { i as require_react } from "./@dnd-kit/accessibility-BX73M05g.js";
import { t as require_client } from "./react-dom-BfQNMHPu.js";
import { d as CSS, g as require_react_dom, i as closestCenter, l as useSensor, r as PointerSensor, t as DndContext, u as useSensors } from "./@dnd-kit/core-HCsU9H8M.js";
import { a as createFileRoute, c as useNavigate, i as Outlet, l as require_jsx_runtime, n as RouterProvider, o as createRootRoute, r as createRouter, s as Link, t as useLocation } from "./@tanstack/react-router-0MzEfOEg.js";
import { n as createHashHistory } from "./@tanstack/history-uEhFT_8-.js";
import { t as require_compiler_runtime } from "./react-3z6xboo-.js";
import { n as toast$1, t as Toaster$1 } from "./sonner-BaknPY3F.js";
import { a as atom, i as useSetAtom, n as useAtom, o as createStore, r as useAtomValue, t as Provider } from "./jotai-lp-HJVUG.js";
import { t as TanStackRouterDevtools } from "./@tanstack/react-router-devtools-CN5wzfIQ.js";
import { t as v4 } from "./uuid-BtdgrrNB.js";
import { n as useSortable, r as verticalListSortingStrategy, t as SortableContext } from "./@dnd-kit/sortable-CiIM32Fl.js";
import { t as atomWithImmer } from "./jotai-immer-7dVJZR8_.js";
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
var SYNC_MODE = "main-loop";

//#endregion
//#region src/components/Toaster.tsx
var import_compiler_runtime = require_compiler_runtime();
var import_jsx_runtime = require_jsx_runtime();
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
		const body = await response.text();
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
		const queryString = new URLSearchParams(query);
		const url = `${NEON_DATA_URL}/${table}?${queryString}`;
		return await (await fetch(url, {
			method: "GET",
			headers: { "Authorization": this.authHeader }
		})).json();
	}
	async patch(table, query, data) {
		const queryString = new URLSearchParams(query);
		const url = `${NEON_DATA_URL}/${table}?${queryString}`;
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
		const queryString = new URLSearchParams(query);
		const url = `${NEON_DATA_URL}/${table}?${queryString}`;
		await fetch(url, {
			method: "DELETE",
			headers: { "Authorization": this.authHeader }
		});
	}
};
var dataClientAtom = atom(DataClient.new());

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
function openIndexedDB() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, 7);
		request.onerror = (event) => {
			reject(event);
		};
		request.onsuccess = (event) => {
			resolve(event.target.result);
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
	return new Worker("/grocery-shopping/assets/sync-worker-Cf0z_O5O.js", {
		type: "module",
		name: options?.name
	});
}

//#endregion
//#region src/components/SyncActionProvider.tsx
function SyncActionProvider(props) {
	const $ = (0, import_compiler_runtime.c)(7);
	const [store] = (0, import_react.useState)(createStore);
	let t0;
	let t1;
	if ($[0] !== props.mode || $[1] !== store) {
		t0 = () => {
			if (props.mode === "web-worker") return runOnWorkerThread();
			else if (props.mode === "main-loop") return runOnMainThread();
			store.set(syncAtom, SyncModel.new({ useIndexedDB: props.mode !== "immediate" }));
		};
		t1 = [props.mode, store];
		$[0] = props.mode;
		$[1] = store;
		$[2] = t0;
		$[3] = t1;
	} else {
		t0 = $[2];
		t1 = $[3];
	}
	(0, import_react.useEffect)(t0, t1);
	let t2;
	if ($[4] !== props.children || $[5] !== store) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
			store,
			children: props.children
		});
		$[4] = props.children;
		$[5] = store;
		$[6] = t2;
	} else t2 = $[6];
	return t2;
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
//#region src/components/toast.tsx
function toast(render) {
	toast$1.custom((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: render(() => toast$1.dismiss(id)) }));
}

//#endregion
//#region src/components/ClickMe.tsx
function ClickMe_default() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: "btn btn-accent",
		onClick: () => toast(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-3 bg-base-300 rounded-full",
			children: "greetings traveler"
		})),
		children: "Click Me"
	});
}

//#endregion
//#region src/routes/__root.tsx
var Route$8 = createRootRoute({
	component: RootComponent,
	errorComponent: ErrorComponent
});
function ErrorComponent(props) {
	const $ = (0, import_compiler_runtime.c)(4);
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {});
		$[0] = t0;
	} else t0 = $[0];
	let t1;
	if ($[1] !== props.error.message || $[2] !== props.error.stack) {
		t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", {
				className: "italic",
				children: [
					props.error.message,
					t0,
					props.error.stack
				]
			})
		});
		$[1] = props.error.message;
		$[2] = props.error.stack;
		$[3] = t1;
	} else t1 = $[3];
	return t1;
}
function RootComponent() {
	const $ = (0, import_compiler_runtime.c)(3);
	let t0;
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between items-center p-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/store",
						className: "[&.active]:font-bold",
						children: "Stores"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth/login",
						className: "[&.active]:font-bold",
						children: "Login"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth/signup",
						className: "[&.active]:font-bold",
						children: "Signup"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth/signout",
						className: "[&.active]:font-bold",
						children: "Logout"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClickMe_default, { class: true })]
		});
		t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {});
		$[0] = t0;
		$[1] = t1;
	} else {
		t0 = $[0];
		t1 = $[1];
	}
	let t2;
	if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SyncActionProvider, {
			mode: SYNC_MODE,
			children: [
				t0,
				t1,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 flex-1 overflow-y-scroll overflow-x-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LastVisitSave, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TanStackRouterDevtools, {})
			]
		});
		$[2] = t2;
	} else t2 = $[2];
	return t2;
}

//#endregion
//#region src/routes/nav.tsx
var Route$7 = createFileRoute("/nav")({ component: RouteComponent$7 });
function RouteComponent$7() {
	const $ = (0, import_compiler_runtime.c)(1);
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Hello \"/nav\"!" });
		$[0] = t0;
	} else t0 = $[0];
	return t0;
}

//#endregion
//#region src/routes/version.tsx
var Route$6 = createFileRoute("/version")({ component: RouteComponent$6 });
function RouteComponent$6() {
	const $ = (0, import_compiler_runtime.c)(1);
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Version: ", "2026-08-02_1"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Git Commit: ", "687d89a"] })] });
		$[0] = t0;
	} else t0 = $[0];
	return t0;
}

//#endregion
//#region src/routes/auth/forgor.tsx
var Route$5 = createFileRoute("/auth/forgor")({ component: RouteComponent$5 });
function RouteComponent$5() {
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
var Route$4 = createFileRoute("/auth/login")({ component: RouteComponent$4 });
function RouteComponent$4() {
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
			await authClient.loginWithEmail(payload);
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
var Route$3 = createFileRoute("/auth/password-reset")({ component: RouteComponent$3 });
function RouteComponent$3() {
	const $ = (0, import_compiler_runtime.c)(10);
	const params = Route$3.useSearch();
	console.log(params);
	const token = params.token;
	const navigate = useNavigate();
	let t0;
	if ($[0] !== navigate || $[1] !== token) {
		t0 = () => {
			if (!token) navigate({ to: "/auth/login" });
		};
		$[0] = navigate;
		$[1] = token;
		$[2] = t0;
	} else t0 = $[2];
	(0, import_react.useEffect)(t0);
	const formRef = (0, import_react.useRef)(null);
	let t1;
	if ($[3] !== navigate || $[4] !== token) {
		t1 = async function handleSubmit(e) {
			e.preventDefault();
			const payload = {
				newPassword: new FormData(e.currentTarget).get("password")?.toString(),
				token
			};
			await authClient.resetPassword(payload);
			navigate({ to: "/auth/login" });
		};
		$[3] = navigate;
		$[4] = token;
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
var Route$2 = createFileRoute("/auth/signup")({ component: RouteComponent$2 });
function RouteComponent$2() {
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
//#region src/routes/store/index.tsx
createStore();
var Route$1 = createFileRoute("/store/")({
	component: RouteComponent$1,
	loader: async () => {
		return await (await DataClient.new()).get("stores", {
			select: "id,name",
			order: "name.asc"
		});
	}
});
function RouteComponent$1() {
	const $ = (0, import_compiler_runtime.c)(19);
	const sync = useAtomValue(syncAtom);
	const stores = Route$1.useLoaderData();
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
	let t4;
	if ($[9] !== onNewStore) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "btn btn-primary",
			onClick: onNewStore,
			children: "+ New Store"
		});
		$[9] = onNewStore;
		$[10] = t4;
	} else t4 = $[10];
	let t5;
	if ($[11] !== stores) {
		t5 = stores.filter(_temp$1).map(_temp2);
		$[11] = stores;
		$[12] = t5;
	} else t5 = $[12];
	let t6;
	if ($[13] !== t5) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col p-2 px-2 ",
			children: t5
		});
		$[13] = t5;
		$[14] = t6;
	} else t6 = $[14];
	let t7;
	if ($[15] !== t3 || $[16] !== t4 || $[17] !== t6) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			t3,
			t4,
			t6
		] });
		$[15] = t3;
		$[16] = t4;
		$[17] = t6;
		$[18] = t7;
	} else t7 = $[18];
	return t7;
}
function _temp2(s_0) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		className: "py-2 underline cursor-pointer",
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
	action.entity.store_id = get(storeIdAtom);
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
var jotaiStore = createStore();
var Route = createFileRoute("/store/$storeId")({
	component: RouteComponent,
	loader: async ({ params: { storeId }, abortController }) => {
		const stores = await (await DataClient.new()).get("stores", {
			"select": "name,items:store_items(id, description, got, order, last_got_at)",
			"id": `eq.${storeId}`,
			"store_items.order": "order.asc"
		});
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
		return result;
	}
});
var nowAtom = atom(toPlainDate(/* @__PURE__ */ new Date()));
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
	const $ = (0, import_compiler_runtime.c)(6);
	const { id, items } = Route.useLoaderData();
	let t0;
	if ($[0] !== id || $[1] !== items) {
		t0 = () => {
			console.log(items);
			jotaiStore.set(storeIdAtom, id);
			jotaiStore.set(storeItemsAtom, items);
		};
		$[0] = id;
		$[1] = items;
		$[2] = t0;
	} else t0 = $[2];
	let t1;
	if ($[3] !== id) {
		t1 = [id];
		$[3] = id;
		$[4] = t1;
	} else t1 = $[4];
	(0, import_react.useEffect)(t0, t1);
	let t2;
	if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
			store: jotaiStore,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreItems, {})
		});
		$[5] = t2;
	} else t2 = $[5];
	return t2;
}
function StoreItems() {
	const $ = (0, import_compiler_runtime.c)(47);
	const { name, id } = Route.useLoaderData();
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
	let t1;
	if ($[1] !== id || $[2] !== name) {
		t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			id,
			className: "text-center underline w-100",
			children: name
		});
		$[1] = id;
		$[2] = name;
		$[3] = t1;
	} else t1 = $[3];
	let t2;
	if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "my-3 text-xl",
			children: "Need"
		});
		$[4] = t2;
	} else t2 = $[4];
	let t3;
	if ($[5] !== need) {
		t3 = need.map(_temp);
		$[5] = need;
		$[6] = t3;
	} else t3 = $[6];
	let t4;
	if ($[7] !== focusIndex || $[8] !== handleCheckbox || $[9] !== handleKeydown || $[10] !== handleTextbox || $[11] !== need || $[12] !== setFocusIndex) {
		let t5;
		if ($[14] !== focusIndex || $[15] !== handleCheckbox || $[16] !== handleKeydown || $[17] !== handleTextbox || $[18] !== setFocusIndex) {
			t5 = (item_0, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sortable, {
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
							className: "w-80 ml-4 outline-hidden",
							onFocus: () => setFocusIndex(index),
							onKeyDown: handleKeydown,
							onChange: handleTextbox,
							value: item_0.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grip, { id: item_0.id })
					]
				})
			}, item_0.id);
			$[14] = focusIndex;
			$[15] = handleCheckbox;
			$[16] = handleKeydown;
			$[17] = handleTextbox;
			$[18] = setFocusIndex;
			$[19] = t5;
		} else t5 = $[19];
		t4 = need.map(t5);
		$[7] = focusIndex;
		$[8] = handleCheckbox;
		$[9] = handleKeydown;
		$[10] = handleTextbox;
		$[11] = need;
		$[12] = setFocusIndex;
		$[13] = t4;
	} else t4 = $[13];
	let t5;
	if ($[20] !== t3 || $[21] !== t4) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, {
			items: t3,
			strategy: verticalListSortingStrategy,
			children: t4
		});
		$[20] = t3;
		$[21] = t4;
		$[22] = t5;
	} else t5 = $[22];
	let t6;
	if ($[23] !== handleDragEnd || $[24] !== handleDragStart || $[25] !== sensors || $[26] !== t5) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DndContext, {
			sensors,
			collisionDetection: closestCenter,
			onDragStart: handleDragStart,
			onDragEnd: handleDragEnd,
			children: t5
		});
		$[23] = handleDragEnd;
		$[24] = handleDragStart;
		$[25] = sensors;
		$[26] = t5;
		$[27] = t6;
	} else t6 = $[27];
	let t7;
	if ($[28] !== addNewItem) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "btn btn-ghost w-100",
			onClick: addNewItem,
			children: "+"
		});
		$[28] = addNewItem;
		$[29] = t7;
	} else t7 = $[29];
	let t8;
	if ($[30] !== gots.length) {
		t8 = gots.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "my-3 text-xl",
			children: "Got"
		}) : null;
		$[30] = gots.length;
		$[31] = t8;
	} else t8 = $[31];
	let t9;
	if ($[32] !== gots || $[33] !== handleCheckbox || $[34] !== now) {
		let t10;
		if ($[36] !== handleCheckbox || $[37] !== now) {
			t10 = (item_1) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id: item_1.id,
				className: "flex flex-row m-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						"data-id": item_1.id,
						tabIndex: -1,
						type: "checkbox",
						className: "checkbox p-2",
						checked: item_1.got,
						onChange: handleCheckbox
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						"data-id": item_1.id,
						type: "text",
						className: "w-80 mx-4 outline-hidden",
						value: item_1.description,
						readOnly: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "italic",
						children: ago(item_1, now)
					})
				]
			}, item_1.id);
			$[36] = handleCheckbox;
			$[37] = now;
			$[38] = t10;
		} else t10 = $[38];
		t9 = gots.map(t10);
		$[32] = gots;
		$[33] = handleCheckbox;
		$[34] = now;
		$[35] = t9;
	} else t9 = $[35];
	let t10;
	if ($[39] !== t9) {
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: t9 });
		$[39] = t9;
		$[40] = t10;
	} else t10 = $[40];
	let t11;
	if ($[41] !== t1 || $[42] !== t10 || $[43] !== t6 || $[44] !== t7 || $[45] !== t8) {
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			t1,
			t2,
			t6,
			t7,
			t8,
			t10
		] });
		$[41] = t1;
		$[42] = t10;
		$[43] = t6;
		$[44] = t7;
		$[45] = t8;
		$[46] = t11;
	} else t11 = $[46];
	return t11;
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
var NavRoute = Route$7.update({
	id: "/nav",
	path: "/nav",
	getParentRoute: () => Route$8
});
var VersionRoute = Route$6.update({
	id: "/version",
	path: "/version",
	getParentRoute: () => Route$8
});
var AuthForgorRoute = Route$5.update({
	id: "/auth/forgor",
	path: "/auth/forgor",
	getParentRoute: () => Route$8
});
var AuthLoginRoute = Route$4.update({
	id: "/auth/login",
	path: "/auth/login",
	getParentRoute: () => Route$8
});
var AuthPasswordResetRoute = Route$3.update({
	id: "/auth/password-reset",
	path: "/auth/password-reset",
	getParentRoute: () => Route$8
});
var AuthSignupRoute = Route$2.update({
	id: "/auth/signup",
	path: "/auth/signup",
	getParentRoute: () => Route$8
});
var StoreIndexRoute = Route$1.update({
	id: "/store/",
	path: "/store/",
	getParentRoute: () => Route$8
});
var rootRouteChildren = {
	NavRoute,
	VersionRoute,
	AuthForgorRoute,
	AuthLoginRoute,
	AuthPasswordResetRoute,
	AuthSignupRoute,
	StoreStoreIdRoute: Route.update({
		id: "/store/$storeId",
		path: "/store/$storeId",
		getParentRoute: () => Route$8
	}),
	StoreIndexRoute
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();

//#endregion
//#region src/main.tsx
var hashHistory = createHashHistory();
var router = createRouter({
	routeTree,
	history: hashHistory
});
if (false) navigator.serviceWorker.register("/grocery-shopping/service-worker.js").catch(console.error);
(0, import_client.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouterProvider, { router }) }));

//#endregion
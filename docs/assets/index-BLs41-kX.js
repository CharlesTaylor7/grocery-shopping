import { t as createAuthClient } from "./@neondatabase/auth-1P38V69J.js";
import { d as onCleanup, f as onSettled, g as untrack } from "./@solidjs/signals-Ckwt8Og4.js";
import { C as createMemo, S as createEffect, a as effect, b as createComponent, c as ref, f as template, i as delegateEvents, l as render, m as For, n as addEvent, o as insert, r as claimElement, s as memo, u as setAttribute, w as createSignal } from "./@solidjs/web-tMMZ5uIY.js";
import { n as createHashHistory } from "./@tanstack/history-Dlc5q7Fh.js";
import { a as createRootRoute, c as Link, i as createFileRoute, l as useRouter, n as createRouter, o as useRouteContext, r as Outlet, s as useNavigate, t as RouterProvider } from "./@tanstack/solid-router-pdioD-jW.js";
import { t as Notyf } from "./notyf-nqSa4uZf.js";
import { i as DragDropManager, n as Sortable2, r as isSortable, t as OptimisticSortingPlugin } from "./@dnd-kit/dom-DNsmXVvQ.js";
import { t as debounce } from "./@tanstack/pacer-Dg14kScN.js";

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
//#region src/migrate.ts
var SCHEMA = "grocery-shopping";
function migrate(event, db, tx, neon) {
	if (event.oldVersion < 1) {
		indexedDB.deleteDatabase("groceries");
		const stores = db.createObjectStore("stores", {
			keyPath: "id",
			autoIncrement: true
		});
		stores.createIndex("name", "name");
		const store_items = db.createObjectStore("store_items", {
			keyPath: "id",
			autoIncrement: true
		});
		store_items.createIndex("store_id", "store_id");
		for (const store of neon.stores) stores.add(store);
		for (const item of neon.items) store_items.add(item);
	}
}
async function exportNeonData() {
	const token = await createAuthClient(NEON_AUTH_URL, { allowAnonymous: true }).getAnonymousToken();
	const queryResult = await new DataClient(token.data.token).get("stores", { "select": "name,items:store_items(description, got, order, last_got_at)" });
	let store_id = 1;
	let item_id = 1;
	const stores = [];
	const items = [];
	for (const store of queryResult) {
		if (!store.name) continue;
		for (const item of store.items) {
			if (!item.description) continue;
			items.push({
				id: item_id++,
				store_id,
				description: item.description,
				order: item.order,
				last_got_at: importDate(item.last_got_at)
			});
		}
		stores.push({
			id: store_id++,
			name: store.name
		});
	}
	return {
		stores,
		items
	};
}
function importDate(str) {
	if (!str) return null;
	return new Date(str);
}
var NEON_AUTH_URL = "https://ep-red-morning-awzkc1lp.neonauth.c-12.us-east-1.aws.neon.tech/neondb/auth";
var NEON_DATA_URL = "https://ep-red-morning-awzkc1lp.apirest.c-12.us-east-1.aws.neon.tech/neondb/rest/v1";
var DataClient = class {
	token;
	constructor(token) {
		this.token = token;
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
};

//#endregion
//#region src/indexed-db.ts
function readTransaction(db, store) {
	return db.transaction(store, "readonly").objectStore(store);
}
function writeTransaction(db, store) {
	return db.transaction(store, "readwrite").objectStore(store);
}
function openIndexedDb(neon) {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(SCHEMA, 1);
		request.onerror = () => {
			reject(request.error);
		};
		request.onsuccess = () => {
			const db = request.result;
			db.onversionchange = () => {
				db.close();
			};
			resolve(db);
		};
		request.onupgradeneeded = (event) => {
			migrate(event, request.result, request.transaction, neon);
		};
	});
}
function promisify(request) {
	return new Promise((resolve, reject) => {
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

//#endregion
//#region src/routes/__root.tsx
var _tmpl$$5 = /* @__PURE__ */ template(`<div><header class="bg-base-200 p-3 text-sm flex flex-row justify-between w-full"><div class="flex items-center justify-between w-full"><nav class="tabs items-center"><!><!></nav><span>Greetings Traveler</span></div></header><main class="p-3 overflow-y-scroll overflow-x-hidden">`);
var Route$3 = createRootRoute({
	component: RootComponent,
	async beforeLoad() {
		const neon = await exportNeonData();
		return { db: await openIndexedDb(neon) };
	},
	context() {
		return { notyf: new Notyf({
			duration: 3e3,
			position: {
				x: "right",
				y: "bottom"
			},
			types: [{
				type: "warning",
				background: "orange",
				icon: {
					className: "material-icons",
					tagName: "i",
					text: "warning"
				}
			}, {
				type: "error",
				background: "indianred",
				duration: 2e3,
				dismissible: true
			}]
		}) };
	}
});
function RootComponent() {
	var _el$ = _tmpl$$5();
	var _el$2 = _el$.firstChild;
	var _el$4 = _el$2.firstChild.firstChild;
	var _el$5 = _el$4.firstChild;
	var _el$6 = _el$5.nextSibling;
	var _el$7 = _el$2.nextSibling;
	insert(_el$4, createComponent(Link, {
		viewTransition: true,
		to: "/stores",
		class: "tab",
		children: "Stores"
	}), _el$5);
	insert(_el$4, createComponent(Link, {
		viewTransition: true,
		to: "/",
		class: "tab",
		children: "Home"
	}), _el$6);
	insert(_el$7, createComponent(Outlet, {}));
	return _el$;
}

//#endregion
//#region src/components/bits/NyanCatButton.tsx
var _tmpl$$4 = /* @__PURE__ */ template(`<button class="btn btn-accent">Click Me`);
function NyanCatButton() {
	const ctx = useRouteContext({ from: "__root__" });
	var _el$ = _tmpl$$4();
	_el$.$$click = () => ctx().notyf.open({
		message: `<img src="/grocery-shopping/nyan.gif" />`,
		duration: 2e3
	});
	return _el$;
}
delegateEvents(["click"]);

//#endregion
//#region src/routes/index.tsx
var _tmpl$$3 = /* @__PURE__ */ template(`<div class="flex flex-col gap-4 items-start"><div>Welcome to my web zone!</div><details class="mt-10 cursor-pointer"><summary>Release info</summary><div class=italic><div>Last Released: </div><a>Git Commit: `);
var Route$2 = createFileRoute("/")({ component: RouteComponent$2 });
function RouteComponent$2() {
	var _el$ = _tmpl$$3();
	var _el$2 = _el$.firstChild;
	var _el$6 = _el$2.nextSibling.firstChild.nextSibling.firstChild;
	_el$6.firstChild;
	var _el$8 = _el$6.nextSibling;
	_el$8.firstChild;
	insert(_el$, createComponent(NyanCatButton, {}), _el$2.nextSibling);
	insert(_el$6, () => {
		return "2026-09-01 at  9:49am";
	}, null);
	claimElement(_el$8);
	insert(_el$8, () => {
		return "\x1B[38;5;4m82b076436c6c\x1B[39m";
	}, null);
	effect(() => `https://github.com/charlestaylor7/grocery-shopping/commit/[38;5;4m82b076436c6c[39m}`, (_v$) => {
		setAttribute(_el$8, "href", _v$);
	});
	return _el$;
}

//#endregion
//#region src/routes/stores.tsx
var _tmpl$$2 = /* @__PURE__ */ template(`<div><input type=text name=name id=name placeholder="Store Name"><button type=button class="btn btn-primary">+ New Store</button><div class="flex flex-col items-start">`);
var _tmpl$2$1 = /* @__PURE__ */ template(`<h2>`);
var Route$1 = createFileRoute("/stores")({
	component: RouteComponent$1,
	async loader({ context }) {
		return { stores: await promisify(readTransaction(context.db, "stores").index("name").getAll()) };
	}
});
function RouteComponent$1() {
	const context = Route$1.useRouteContext();
	const loader = Route$1.useLoaderData();
	const router = useRouter();
	const [getName, setName] = createSignal("");
	async function createStore() {
		const name = getName();
		setName("");
		await promisify(writeTransaction(context().db, "stores").add({ name }));
		router.invalidate();
	}
	var _el$ = _tmpl$$2();
	var _el$2 = _el$.firstChild;
	var _el$3 = _el$2.nextSibling;
	var _el$4 = _el$3.nextSibling;
	_el$2.$$keydown = (e) => e.code === "Enter" && getName() ? createStore() : null;
	_el$2.$$input = (e) => void setName(e.currentTarget.value);
	_el$3.$$click = createStore;
	insert(_el$4, createComponent(For, {
		get each() {
			return loader().stores;
		},
		children: (s) => createComponent(Link, {
			class: "btn btn-ghost",
			viewTransition: true,
			to: "/store/$storeId",
			get params() {
				return { storeId: s.id.toString() };
			},
			get children() {
				var _el$5 = _tmpl$2$1();
				insert(_el$5, () => {
					return s.name;
				});
				return _el$5;
			}
		})
	}));
	effect(() => {
		return {
			e: getName(),
			t: !getName()
		};
	}, ({ e, t }, _p$) => {
		_el$2.value = e ?? "";
		t !== _p$?.t && setAttribute(_el$3, "disabled", t);
	});
	return _el$;
}
delegateEvents([
	"input",
	"keydown",
	"click"
]);

//#endregion
//#region src/lib/dates.ts
function toStartOfDay(date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
var MS_PER_DAY = 864e5;
function ago(time) {
	if (!(time instanceof Date)) return "?";
	const startOfItemDate = toStartOfDay(time);
	const startOfNow = toStartOfDay(/* @__PURE__ */ new Date());
	const diffInDays = Math.round((startOfNow.getTime() - startOfItemDate.getTime()) / MS_PER_DAY);
	if (diffInDays <= 0) return "today";
	return `${diffInDays}d ago`;
}

//#endregion
//#region src/routes/store/$storeId.tsx
var _tmpl$$1 = /* @__PURE__ */ template(`<div><header class="relative flex items-center justify-center w-full"><h2 class="text-center underline"></h2><details class="dropdown dropdown-end absolute right-0"><summary class="btn m-1"><img alt=settings></summary><ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"><li><button class="btn btn-error">Delete</button></li></ul></details></header><h3 class="my-3 text-xl">Need</h3><button type=button class="btn btn-ghost w-100">+</button><!><!>`);
var _tmpl$2 = /* @__PURE__ */ template(`<div class="flex flex-row m-2"><input tabindex=-1 type=checkbox class="checkbox p-2"><input type=text class="w-80 mx-2 outline-hidden"><div data-role=grip class="px-4 cursor-grab"style=touch-action:none><img>`);
var _tmpl$3 = /* @__PURE__ */ template(`<h3 class="my-3 text-xl">Got`);
var _tmpl$4 = /* @__PURE__ */ template(`<div class="flex flex-row m-2"><input tabindex=-1 type=checkbox class="checkbox p-2 "><input type=text class="mx-2 flex-1 outline-hidden overflow-x-hidden"readonly><div class="italic text-nowrap">`);
var Route = createFileRoute("/store/$storeId")({
	component: RouteComponent,
	remountDeps: ({ params }) => params.storeId,
	async loader({ params, context }) {
		const storeId = Number(params.storeId);
		return {
			store: await promisify(readTransaction(context.db, "stores").get(storeId)),
			items: await promisify(readTransaction(context.db, "store_items").index("store_id").getAll(Number(params.storeId)))
		};
	}
});
function RouteComponent() {
	const context = Route.useRouteContext();
	const loader = Route.useLoaderData();
	const db = untrack(context).db;
	const navigate = useNavigate();
	const router = useRouter();
	const focus = useFocus();
	const reload = debounce(() => document.startViewTransition(() => router.invalidate()), { wait: 1e3 });
	const getItemMap = createMemo(() => Object.fromEntries(loader().items.map((item) => [item.id, item])));
	const getNeeded = createMemo(() => loader().items.filter((item) => !item.last_got_at).toSorted((a, b) => a.order - b.order));
	const getGot = createMemo(() => loader().items.filter((item) => item.last_got_at).toSorted((a, b) => a.description.toLowerCase().localeCompare(b.description.toLowerCase())));
	async function onDelete() {
		const storeId = loader().store.id;
		await promisify(writeTransaction(db, "stores").delete(storeId));
		navigate({ to: "/stores" });
	}
	async function handleCheckbox(e) {
		const el = e.currentTarget;
		const id = Number(el.dataset.id);
		const item = untrack(getItemMap)[id];
		item.last_got_at = item.last_got_at ? null : /* @__PURE__ */ new Date();
		await promisify(writeTransaction(db, "store_items").put(item));
		reload();
	}
	async function handleTextbox(e) {
		const el = e.currentTarget;
		const id = Number(el.dataset.id);
		const item = untrack(getItemMap)[id];
		item.description = el.value;
		await promisify(writeTransaction(db, "store_items").put(item));
		reload();
	}
	async function handleKeydown(e) {
		const el = e.currentTarget;
		const index = Number(el.dataset.index);
		const needed = untrack(getNeeded);
		if (e.code === "Enter") {
			if (index === needed.length - 1) addNewItem();
			else if (!needed[index + 1].description) focus.set((f) => f + 1);
			else {
				focus.set(index + 1);
				const current = needed[index];
				const next = needed[index + 1];
				const newItem = {
					description: "",
					order: Math.floor((current.order + next.order) / 2),
					store_id: loader().store.id
				};
				await promisify(writeTransaction(db, "store_items").add(newItem));
				reload();
			}
		} else if (e.code === "Backspace") {
			if (!el.value) {
				e.preventDefault();
				const id = Number(el.dataset.id);
				focus.set((f) => f - 1);
				await promisify(writeTransaction(db, "store_items").delete(id));
				reload();
			}
		} else if (e.code === "ArrowUp") focus.set((f) => f - 1);
		else if (e.code === "ArrowDown") focus.set((f) => f + 1);
	}
	async function addNewItem() {
		const lastOrder = getNeeded().at(-1)?.order ?? 0;
		const item = {
			store_id: loader().store.id,
			order: lastOrder + 1e3,
			description: ""
		};
		focus.set(untrack(getNeeded).length);
		await promisify(writeTransaction(db, "store_items").add(item));
		reload();
	}
	const manager = new DragDropManager();
	manager.monitor.addEventListener("dragend", (event) => {
		if (!isSortable(event.operation.source)) return;
		const { initialIndex: oldIndex, index: newIndex } = event.operation.source;
		const edits = [];
		const needed = untrack(getNeeded);
		const activeItem = needed[oldIndex];
		const targetItem = needed.at(newIndex);
		if (newIndex === 0) {
			const order = needed[0].order - 1e3;
			edits.push({
				item: activeItem,
				order
			});
		} else if (newIndex === needed.length - 1) {
			const order = needed.at(-1).order + 1e3;
			edits.push({
				item: activeItem,
				order
			});
		} else if (newIndex > oldIndex) {
			if (!targetItem) {
				console.warn("newIndex doesn't exist", {
					oldIndex,
					newIndex
				});
				return;
			}
			const adjacentIndex = newIndex + 1;
			const targetOrder = targetItem.order;
			const adjacentOrder = needed[adjacentIndex].order;
			let order = Math.ceil((targetOrder + adjacentOrder) / 2);
			edits.push({
				item: activeItem,
				order
			});
			if (order === adjacentOrder) for (let i = adjacentIndex; i < needed.length; i++) if (needed[i].order - order < 1e3) {
				order += 1e3;
				edits.push({
					item: needed[i],
					order
				});
			} else break;
		} else if (newIndex < oldIndex) {
			if (!targetItem) {
				console.warn("newIndex doesn't exist", {
					oldIndex,
					newIndex
				});
				return;
			}
			const adjacentIndex = newIndex - 1;
			const targetOrder = targetItem.order;
			const adjacentOrder = needed[adjacentIndex].order;
			let order = Math.floor((targetOrder + adjacentOrder) / 2);
			edits.push({
				item: activeItem,
				order
			});
			if (order === adjacentOrder) for (let i = adjacentIndex; i >= 0; i--) if (order - needed[i].order < 1e3) {
				order -= 1e3;
				edits.push({
					item: needed[i],
					order
				});
			} else break;
		}
		batchDndEdit(db, edits).catch((e) => {
			console.error(e);
		}).finally(() => {
			reload();
		});
	});
	onCleanup(() => manager.destroy());
	function registerDndRef(element) {
		onSettled(() => {
			const index = Number(element.dataset.index);
			const item = untrack(getNeeded)[index];
			new Sortable2({
				id: item.id,
				index,
				element,
				plugins: [OptimisticSortingPlugin],
				handle: element.querySelector("[data-role=\"grip\"]")
			}, manager);
		});
	}
	var _el$ = _tmpl$$1();
	var _el$2 = _el$.firstChild;
	var _el$3 = _el$2.firstChild;
	var _el$5 = _el$3.nextSibling.firstChild;
	var _el$6 = _el$5.firstChild;
	var _el$9 = _el$5.nextSibling.firstChild.firstChild;
	var _el$10 = _el$2.nextSibling;
	var _el$11 = _el$10.nextSibling;
	var _el$12 = _el$11.nextSibling;
	var _el$13 = _el$12.nextSibling;
	insert(_el$3, () => {
		return loader().store.name;
	});
	_el$9.$$click = onDelete;
	insert(_el$, createComponent(For, {
		get each() {
			return getNeeded();
		},
		children: (item, getIndex) => (() => {
			var _el$14 = _tmpl$2();
			var _el$15 = _el$14.firstChild;
			var _el$16 = _el$15.nextSibling;
			var _el$18 = _el$16.nextSibling.firstChild;
			var _ref$ = registerDndRef;
			typeof _ref$ === "function" || Array.isArray(_ref$) ? ref(() => {
				return _ref$;
			}, _el$14) : registerDndRef = _el$14;
			_el$15.addEventListener("change", handleCheckbox);
			_el$16.addEventListener("change", handleTextbox);
			_el$16.$$keydown = handleKeydown;
			addEvent(_el$16, "focus", focus.eventHandler);
			var _ref$2 = focus.callbackRef;
			typeof _ref$2 === "function" || Array.isArray(_ref$2) ? ref(() => {
				return _ref$2;
			}, _el$16) : focus.callbackRef = _el$16;
			effect(() => {
				return {
					e: getIndex(),
					t: item.id,
					a: !!item.last_got_at,
					o: item.id,
					i: getIndex(),
					n: item.description,
					s: `/grocery-shopping/grip-bars.svg`
				};
			}, ({ e, t, a, o, i, n, s }, _p$) => {
				e !== _p$?.e && setAttribute(_el$14, "data-index", e);
				t !== _p$?.t && setAttribute(_el$15, "data-id", t);
				_el$15.checked = a;
				o !== _p$?.o && setAttribute(_el$16, "data-id", o);
				i !== _p$?.i && setAttribute(_el$16, "data-index", i);
				_el$16.value = n ?? "";
				s !== _p$?.s && setAttribute(_el$18, "src", s);
			});
			return _el$14;
		})()
	}), _el$10.nextSibling);
	_el$11.$$click = addNewItem;
	insert(_el$, (() => {
		var _c$ = memo(() => {
			return !!getGot().length;
		});
		return () => {
			return _c$() ? _tmpl$3() : null;
		};
	})(), _el$12);
	insert(_el$, createComponent(For, {
		get each() {
			return getGot();
		},
		children: (item) => (() => {
			var _el$20 = _tmpl$4();
			var _el$21 = _el$20.firstChild;
			var _el$22 = _el$21.nextSibling;
			var _el$23 = _el$22.nextSibling;
			_el$21.addEventListener("change", handleCheckbox);
			insert(_el$23, () => {
				return ago(item.last_got_at);
			});
			effect(() => {
				return {
					e: item.id,
					t: !!item.last_got_at,
					a: item.id,
					o: item.description
				};
			}, ({ e, t, a, o }, _p$) => {
				e !== _p$?.e && setAttribute(_el$21, "data-id", e);
				_el$21.checked = t;
				a !== _p$?.a && setAttribute(_el$22, "data-id", a);
				_el$22.value = o ?? "";
			});
			return _el$20;
		})()
	}), _el$13);
	effect(() => `/grocery-shopping/wrench.svg`, (_v$) => {
		setAttribute(_el$6, "src", _v$);
	});
	return _el$;
}
function useFocus() {
	const [getFocus, setFocus] = createSignal(-1);
	function callbackRef(el) {
		const focus = untrack(getFocus);
		onSettled(() => {
			if (focus.toString() === el.dataset.index) el.focus();
		});
	}
	createEffect(getFocus, (focus) => {
		const el = document.querySelector(`[data-index="${focus}"][type="text"`);
		if (el) el.focus();
	});
	function eventHandler(e) {
		const el = e.currentTarget;
		const index = Number(el.dataset.index);
		setFocus(index);
	}
	return {
		callbackRef,
		eventHandler,
		set: setFocus
	};
}
function batchDndEdit(db, edits) {
	const tx = db.transaction("store_items", "readwrite");
	const table = tx.objectStore("store_items");
	for (const edit of edits) table.put({
		...edit.item,
		order: edit.order
	});
	return new Promise((resolve, reject) => {
		tx.onerror = () => {
			reject(tx.error);
		};
		tx.oncomplete = () => {
			resolve();
		};
	});
}
delegateEvents(["click", "keydown"]);

//#endregion
//#region src/routeTree.gen.ts
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	StoresRoute: Route$1.update({
		id: "/stores",
		path: "/stores",
		getParentRoute: () => Route$3
	}),
	StoreStoreIdRoute: Route.update({
		id: "/store/$storeId",
		path: "/store/$storeId",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();

//#endregion
//#region src/components/ErrorComponent.tsx
var _tmpl$ = /* @__PURE__ */ template(`<code>`);
function ErrorComponent(props) {
	console.error(props.error.cause);
	console.error(props.error.stack);
	props.reset();
	var _el$ = _tmpl$();
	insert(_el$, () => {
		return props.error.message;
	});
	return _el$;
}

//#endregion
//#region src/router.ts
var router = createRouter({
	routeTree,
	history: createHashHistory(),
	scrollRestoration: true,
	defaultErrorComponent: ErrorComponent,
	defaultPendingComponent: () => "the suspense is killing me...",
	defaultPendingMs: 200,
	defaultPendingMinMs: 400
});

//#endregion
//#region src/main.tsx
render(() => createComponent(RouterProvider, { router }), document.getElementById("root"));

//#endregion
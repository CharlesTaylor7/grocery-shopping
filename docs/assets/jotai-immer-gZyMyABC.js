import { a as atom } from "./jotai-eXqhNh6v.js";
import { n as produce, t as NOTHING } from "./immer-Rk5y0iVd.js";

//#region node_modules/.pnpm/jotai-immer@0.4.3_immer@11.1.18_jotai@2.20.3_@babel+core@7.29.7_@babel+template@7.29.7__ee02dfe7bdf2a6ef94e7f026a2d2ba9c/node_modules/jotai-immer/dist/atomWithImmer.js
function atomWithImmer(initialValue) {
	const anAtom = atom(initialValue, (get, set, fn) => set(anAtom, produce(get(anAtom), typeof fn === "function" ? fn : () => fn === void 0 ? NOTHING : fn)));
	return anAtom;
}

//#endregion
export { atomWithImmer as t };
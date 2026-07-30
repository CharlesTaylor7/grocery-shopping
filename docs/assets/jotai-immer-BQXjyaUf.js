import { a as atom } from "./jotai-Bop2fZUf.js";
import { n as produce, t as NOTHING } from "./immer-JNGqp3rM.js";

//#region node_modules/.pnpm/jotai-immer@0.4.3_immer@11.1.15_jotai@2.20.2_@babel+core@7.29.7_@babel+template@7.29.7__80a9f5135b9aa08360de69c2cdec96ad/node_modules/jotai-immer/dist/atomWithImmer.js
function atomWithImmer(initialValue) {
	const anAtom = atom(initialValue, (get, set, fn) => set(anAtom, produce(get(anAtom), typeof fn === "function" ? fn : () => fn === void 0 ? NOTHING : fn)));
	return anAtom;
}

//#endregion
export { atomWithImmer as t };
import { v as nn, y as pn } from "./dnd-kit-8Wt4G7bK.js";

//#region node_modules/.pnpm/preact@10.29.7/node_modules/preact/compat/client.mjs
function createRoot(container) {
	return {
		render: function(children) {
			nn(children, container);
		},
		unmount: function() {
			pn(container);
		}
	};
}

//#endregion
export { createRoot as t };
import { g as init_compat_module, v as nn, y as pn } from "../@dnd-kit/accessibility-CY2E8eFF.js";

//#region node_modules/.pnpm/preact@10.29.7/node_modules/preact/compat/client.mjs
init_compat_module();
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
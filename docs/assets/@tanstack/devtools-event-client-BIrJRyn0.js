//#region node_modules/.pnpm/@tanstack+devtools-event-client@0.5.0/node_modules/@tanstack/devtools-event-client/dist/esm/noop.js
var EventClientNoOp = class {
	#pluginId;
	constructor({ pluginId }) {
		this.#pluginId = pluginId;
	}
	getPluginId() {
		return this.#pluginId;
	}
	createEventPayload(eventSuffix, payload) {
		return {
			type: `${this.#pluginId}:${eventSuffix}`,
			payload,
			pluginId: this.#pluginId
		};
	}
	emit(_eventSuffix, _payload) {}
	on(_eventSuffix, _cb, _options) {
		return () => {};
	}
	onAll(_cb) {
		return () => {};
	}
	onAllPluginEvents(_cb) {
		return () => {};
	}
};

//#endregion
//#region node_modules/.pnpm/@tanstack+devtools-event-client@0.5.0/node_modules/@tanstack/devtools-event-client/dist/esm/index.js
var EventClient = EventClientNoOp;

//#endregion
export { EventClient as t };
import { n as _INTERNAL_captureLog } from "./browser-BsaWfxAA.js";

//#region node_modules/.pnpm/@sentry+core@10.69.0/node_modules/@sentry/core/build/esm/logs/public-api.js
function captureLog(level, message, attributes, scope, severityNumber) {
	_INTERNAL_captureLog({
		level,
		message,
		attributes,
		severityNumber
	}, scope);
}
function info(message, attributes, { scope } = {}) {
	captureLog("info", message, attributes, scope);
}

//#endregion
export { info as t };
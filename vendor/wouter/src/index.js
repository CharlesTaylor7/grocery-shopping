import "./monkey-patch.js";
import {
  useBrowserLocation,
  useBrowserSearch,
} from "./use-browser-location.js";

// BEGIN PUBLIC API

export { useBrowserLocation, useBrowserSearch };
export { useHashLocation } from "./use-hash-location.js";

export { Link, Redirect, Route, Router, Switch } from "./components.js";

export { useLocation, useNavigate, useParams, useSearchParams } from "./hooks";
// END PUBLIC API

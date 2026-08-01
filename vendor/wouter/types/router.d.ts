import {
  BaseLocationHook,
  BaseSearchHook,
  HrefsFormatter,
  Path,
  SearchString,
} from "./location-hook.js";

export type Parser = (
  route: Path,
  loose?: boolean,
) => { pattern: RegExp; keys: string[] };

// Standard navigation options supported by all built-in location hooks
export type NavigateOptions<S = any> = {
  replace?: boolean;
  state?: S;
  /** Enable view transitions for this navigation (used with aroundNav) */
  transition?: boolean;
};

// Function that wraps navigate calls, useful for view transitions
export type AroundNavHandler = (
  navigate: (to: Path, options?: NavigateOptions) => void,
  to: Path,
  options?: NavigateOptions,
) => void;

// the object returned from `useRouter`
export interface RouterObject {
  readonly hook: BaseLocationHook;
  readonly hrefs: HrefsFormatter;
  readonly parser: Parser;
  readonly base: Path;
  readonly ownBase: Path;
}

// configure by providing a hook
export type RouterOptions = Pick<RouterObject, "hook">;

import { useEffect, type EffectCallback } from "react";

type EffectCleanup = undefined | EffectCallback;

// TODO: cancellation with abort signal

interface Args {
  abortSignal: AbortSignal
}

export function useAsyncEffect(effect: () => Promise<EffectCleanup>, deps: Array<any>) {
  useEffect(() => {
    let cleanup: EffectCleanup;
    effect().then(result => cleanup = result);
    return () => {
      if (cleanup) {
        cleanup();
      }
    }
    // oxlint-disable-next-line
  }, deps)
}

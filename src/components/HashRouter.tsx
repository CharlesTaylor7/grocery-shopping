// @ts-nocheck
// oxlint-disable
import { flushSync } from "react-dom";
import { Router, useHashLocation } from "wouter";


export default function HashRouter({ children }) {
  return <Router
    hook={useHashLocation}

    aroundNav={navigateWithViewTransition}
  >
    {children}
  </Router>
}

function navigateWithViewTransition(navigate, to, options) {
  // Check if View Transitions API is supported
  if (!document.startViewTransition) {
    navigate(to, options);
    return;
  }

  document.startViewTransition(() => {
    flushSync(() => {
      navigate(to, options);
    });
  });
};

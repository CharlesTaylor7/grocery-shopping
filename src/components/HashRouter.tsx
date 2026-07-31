// @ts-nocheck
// oxlint-disable
import { flushSync } from "react-dom";
import { Router, useHashLocation } from "wouter";


export default function HashRouter({ children }) {
  return <Router
    hook={useHashLocation}
  >
    {children}
  </Router>
}


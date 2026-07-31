// @ts-nocheck
// oxlint-disable
import { Router, useHashLocation } from "wouter";

export default function HashRouter({ children }) {
  return <Router hook={useHashLocation}>{children}</Router>
}


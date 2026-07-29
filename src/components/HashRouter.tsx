import { createElement, type ComponentProps, type ReactNode } from "react";
import { Router } from "wouter"
import { useHashLocation } from "wouter/use-hash-location";

export default function HashRouter(props: { children: ReactNode }) {
  // @ts-ignore
  return createElement(Router, { hook: useHashLocation }, props.children);
}

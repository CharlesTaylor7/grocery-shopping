import { SyncContext, SyncModel } from "@/client/model.ts";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const model = new SyncModel({ useIndexedDB: true });

export default function SyncContextProvider(props: Props) {
  return <SyncContext.Provider value={model}>{props.children}</SyncContext.Provider>;
}

import { type SyncApi, SyncContext, SyncModel } from "@/client/model.ts";
import { useEffect, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default function SyncContextProvider(props: Props) {
  const [model, setModel] = useState<SyncApi>(new SyncModel({ useIndexedDB: false }));
  useEffect(() => {
    setModel(new SyncModel({ useIndexedDB: true }));
  }, []);

  return (
    <SyncContext.Provider value={model}>
      {props.children}
    </SyncContext.Provider>
  );
}

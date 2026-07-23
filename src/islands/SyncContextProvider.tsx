import { ReactNode } from "preact/compat";
import { SyncApi, SyncContext, SyncModel } from "@/client/model.ts";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

interface Props {
  children: ReactNode;
}
export default function SyncContextProvider(props: Props) {
  const model = useSignal<SyncApi>(new SyncModel({ useIndexedDB: false }));
  useEffect(() => {
    model.value = new SyncModel({ useIndexedDB: true });
  }, []);

  return (
    <SyncContext.Provider value={model.value}>
      {props.children}
    </SyncContext.Provider>
  );
}

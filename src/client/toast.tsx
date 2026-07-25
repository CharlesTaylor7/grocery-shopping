import { toast as sonnerToast } from "sonner";
import type { ReactNode } from "react";

type Dismiss = () => void;
type Render = (cb: Dismiss) => ReactNode;

export function toast(render: Render) {
  sonnerToast.custom((id) => (<>
    {render(() => sonnerToast.dismiss(id))}
  </>));
}

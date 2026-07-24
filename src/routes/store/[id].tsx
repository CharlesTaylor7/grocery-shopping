import { define } from "@/server/define.ts";
import Store from "@/islands/pages/Store.tsx";

export default define.page(async function (ctx) {
  return <Store id={ctx.params.id} />;
});

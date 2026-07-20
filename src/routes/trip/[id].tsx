import { define } from "@/server/define.ts";
export default define.page(async function (ctx) {
  return <div>Trip: {ctx.params.id}</div>;
});

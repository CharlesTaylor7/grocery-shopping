import { define } from "@/server/define.ts";
import StoreList from "@/islands/pages/StoreList.tsx";
import { v4 } from "uuid";

export default define.page(async function (ctx) {
  const rootId = v4();
  const stores = await ctx.state.sql`
    select * from stores
  `;
  console.log(stores.length);
  return (
    <>
      <StoreList dataRoot={rootId} />
      <ul data-root={rootId}>
        {stores.map((s: any) => <li key={s.id} data-id={s.id}>{s.name}</li>)}
      </ul>
    </>
  );
});

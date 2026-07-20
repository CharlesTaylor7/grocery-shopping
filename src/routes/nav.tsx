import { define } from "@/server/define.ts";

export default define.page(function () {
  return (
    <nav>
      <ul class="flex flex-col gap-2">
        <li>
          <a href="/lists">Lists</a>
        </li>
        <li>
          <a href="/trips">Trips</a>
        </li>
      </ul>
    </nav>
  );
});

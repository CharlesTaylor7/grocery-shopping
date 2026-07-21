import { define } from "@/server/define.ts";

export default define.page(function () {
  return (
    <nav>
      <ul class="flex flex-col gap-2">
        <li>
          <a href="/list">Lists</a>
        </li>
        <li>
          <a href="/trip">Trips</a>
        </li>

        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
});

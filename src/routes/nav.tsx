import { define } from "@/server/define.ts";

export default define.page(function () {
  return (
    <nav>
      <ul class="flex flex-col gap-2">
        <li>
          <a href="/store">Stores</a>
        </li>
        <li>
          <a href="/trip">Trips</a>
        </li>

        <li>
          <a href="/auth/login">Login</a>
        </li>
      </ul>
    </nav>
  );
});

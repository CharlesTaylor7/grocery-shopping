import { useRouteContext } from "@tanstack/solid-router";
import 'notyf/notyf.min.css';

export default function NyanCatButton() {
  const ctx = useRouteContext({ from: '__root__' });
  return (
    <button
      class="btn btn-accent"
      onClick={() =>
        ctx().notyf.open({
          message: `<img src="${import.meta.env.BASE_URL}nyan.gif" />`,
          duration: 2000
        })
      }
    >
      Click Me
    </button >
  );
}

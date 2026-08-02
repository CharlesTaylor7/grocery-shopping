import { authClient } from "@/auth";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useSearch } from "@tanstack/react-router";


export const Route = createFileRoute('/auth/password-reset')({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useSearch();
  console.log(params);
  const token = params["token"];
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate({ to: "/auth/login" });
    }
  });
  const formRef = useRef<HTMLFormElement>(null);
  async function handleSubmit(e: any) {
    e.preventDefault();

    const data = new FormData(e.currentTarget as HTMLFormElement);

    const payload = {
      newPassword: data.get("password")?.toString()!,
      token: token!,
    };
    await authClient.resetPassword(payload);

    navigate({ to: "/auth/login" });
  }

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-2 items-start p-2"
      onSubmit={handleSubmit}
    >
      <div>
        <input
          type="password"
          placeholder="New Password"
          name="password"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Confirm
      </button>
    </form>
  );
}

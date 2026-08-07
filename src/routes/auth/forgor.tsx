import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/auth";
import { toast } from "@/components/toast";
import { useRef } from "react";

export const Route = createFileRoute("/auth/forgor")({
  component: RouteComponent,
});

function RouteComponent() {
  const formRef = useRef<HTMLFormElement>(null);
  async function resetPassword() {
    const data = new FormData(formRef.current!);
    const email = data.get("email")?.toString()!;
    await authClient.requestPasswordReset({ email });
    toast(() => {
      return (
        <>
          Password reset sent to <span className="underline">{email}</span>
        </>
      );
    });
  }

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-2 items-start p-2"
    >
      <input type="email" placeholder="Email" name="email" required />

      <button
        type="button"
        className="btn btn-primary"
        onClick={resetPassword}
      >
        Send Password Reset Email
      </button>
    </form>
  );
}

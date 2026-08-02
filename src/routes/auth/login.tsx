import { createFileRoute } from '@tanstack/react-router'
import { authClient } from "@/auth";
import { toast } from "@/components/toast";
import { useRef } from "react";
import { lastVisitedUrl } from "@/last-visited-url";
import { useNavigate, Link } from "@tanstack/react-router";

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  async function handleSubmit(event: Event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget as HTMLFormElement);

    const payload = {
      email: data.get("email")?.toString()!,
      password: data.get("password")?.toString()!,
      rememberMe: true,
    };
    try {
      await authClient.loginWithEmail(payload);
      navigate({ to: lastVisitedUrl() });
    } catch (e) {
      console.error(e);
      toast(() => {
        const error = e as { message: string };
        return error.message;
      });
    }
  }
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
      // @ts-ignore
      onSubmit={handleSubmit}
    >
      <input type="email" placeholder="Email" name="email" required />
      <div>
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <Link
          type="button"
          className="btn btn-ghost btn-sm"
          to="/auth/forgor"
        >
          💀 I forgor (reset password)
        </Link>
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}


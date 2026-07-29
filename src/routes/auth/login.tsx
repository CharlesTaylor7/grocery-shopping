import { authClient } from "@/client/neon.ts";
import type { SubmitEventHandler } from "react";
import { toast } from "@/client/toast";
import { useRef } from "react";
import { AuthApiError } from "@neondatabase/auth";
import { lastVisitedUrl } from "@/client/redirect.ts";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget as HTMLFormElement);

    const payload = {
      email: data.get("email")?.toString()!,
      password: data.get("password")?.toString()!,
      rememberMe: true,
    };
    try {
      const result = await authClient.signIn.email(payload);

      if (result.error) {
        toast(() => <>wrong password</>);
        return;
      }

      navigate(lastVisitedUrl());
    } catch (e) {
      console.error(e);
      toast(() => {
        const error = e as AuthApiError;
        return error.message;
      });
    }
  };
  async function resetPassword() {
    const data = new FormData(formRef.current!);

    const email = data.get("email")?.toString()!;
    await authClient.requestPasswordReset({
      email,
      // github pages
      redirectTo: "/grocery-shopping/#/auth/password-reset",
    });
    toast(() => {
      return (
        <>
          Password reset sent to <span className="underline">{email}</span>
        </>
      );
    });
  }

  return (
    <form ref={formRef} className="flex flex-col gap-2 items-start p-2" onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" name="email" required />
      <div>
        <input type="password" placeholder="Password" name="password" required />
        <button type="button" className="btn btn-ghost btn-sm" onClick={resetPassword}>
          💀 I forgor (reset password)
        </button>
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}

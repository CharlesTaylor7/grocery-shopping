import { authClient } from "@/client/auth.ts";
import { SubmitEventHandler } from "preact";
import { toast } from "@/client/toast.ts";
import { useRef } from "preact/hooks";

export default function Login() {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget as HTMLFormElement);

    const payload = {
      email: data.get("username")?.toString()!,
      password: data.get("password")?.toString()!,
      rememberMe: true,
      callbackUrl: "",
    };
    try {
      const result = await authClient.signIn.email(payload);

      if (result.error) {
        toast(() => "wrong password");
        return;
      }
    } catch {
      toast(() => "wrong password");
    }
  };
  async function resetPassword() {
    const data = new FormData(formRef.current!);

    const email = data.get("email")?.toString()!;
    await authClient.requestPasswordReset({
      email,
      redirectTo: "/password-reset",
    });
    toast(() => {
      return (
        <>
          Password reset sent to <span class="underline">{email}</span>
        </>
      );
    });
  }

  return (
    <form
      ref={formRef}
      class="flex flex-col gap-2 items-start p-2"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder="Email"
        name="email"
        required
      />
      <div>
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <button
          type="button"
          class="btn btn-ghost btn-sm"
          onClick={resetPassword}
        >
          💀 I forgor (reset password)
        </button>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  );
}

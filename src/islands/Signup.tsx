import { authClient } from "@/client/auth.ts";
import { SubmitEventHandler } from "preact";
import { toast } from "@/client/toast.ts";
import { AuthApiError } from "@neondatabase/neon-js/auth";

export default function Signup() {
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);

    const payload = {
      name: data.get("username")?.toString()!,
      email: data.get("email")?.toString()!,
      password: data.get("password")?.toString()!,
    };
    try {
      const result = await authClient.signUp.email(payload);

      if (result.error) {
        toast(() => "wrong password");
        return;
      } else {
        location.assign("/");
      }
    } catch (e) {
      const error = e as AuthApiError;
      console.error(error);
      toast(() => error.message);
    }
  };

  return (
    <form class="flex flex-col gap-2 items-start p-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        name="username"
        required
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        required
      />

      <input
        type="password"
        placeholder="Password"
        name="password"
        required
      />
      <button type="submit" class="btn btn-primary">Sign up</button>
    </form>
  );
}

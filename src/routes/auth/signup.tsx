import { authClient } from "@/client/neon.ts";
import type { SubmitEventHandler } from "react";
import { toast } from "@/client/toast";
import { AuthApiError } from "@neondatabase/neon-js/auth";
import { useNavigate } from "react-router";

export default function Signup() {
  const navigate = useNavigate()
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
        navigate("/");
      }
    } catch (e) {
      const error = e as AuthApiError;
      console.error(error);
      toast(() => error.message);
    }
  };

  return (
    <form className="flex flex-col gap-2 items-start p-2" onSubmit={handleSubmit}>
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
      <button type="submit" className="btn btn-primary">Sign up</button>
    </form>
  );
}

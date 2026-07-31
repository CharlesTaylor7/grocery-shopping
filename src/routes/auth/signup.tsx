import { authClient } from "@/client/auth";
import { toast } from "@/client/toast";
import { lastVisitedUrl } from "@/client/redirect";
import {useNavigate} from "wouter";

export default function Signup() {
  const navigate = useNavigate();
  async function handleSubmit(event: any) {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);

    const payload = {
      name: data.get("username")?.toString()!,
      email: data.get("email")?.toString()!,
      password: data.get("password")?.toString()!,
    };
    try {
      await authClient.signupWithEmail(payload);

      navigate(lastVisitedUrl());
    } catch (e) {
      toast(() => {
        const error = e as { message: string };
        return error.message;
      });
    }
  }

  return (
    <form className="flex flex-col gap-2 items-start p-2" onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" name="username" required />
      <input type="email" placeholder="Email" name="email" required />

      <input type="password" placeholder="Password" name="password" required />
      <button type="submit" className="btn btn-primary">
        Sign up
      </button>
    </form>
  );
}

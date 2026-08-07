import { createFileRoute } from '@tanstack/react-router'
import { authClient } from "@/auth";
import { toast } from "@/components/toast";
import { lastVisitedUrl } from "@/last-visited-url";
import { useNavigate } from "@tanstack/react-router";


export const Route = createFileRoute('/auth/signup')({
  component: RouteComponent,
})

function RouteComponent() {
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
      await authClient.signUp.email(payload);

      navigate({ to: lastVisitedUrl() });
    } catch (e) {
      toast(() => {
        const error = e as { message: string };
        return error.message;
      });
    }
  }

  return (
    <form
      className="flex flex-col gap-2 items-start p-2"
      onSubmit={handleSubmit}
    >
      <input type="text" placeholder="Username" name="username" required />
      <input type="email" placeholder="Email" name="email" required />

      <input type="password" placeholder="Password" name="password" required />
      <button type="submit" className="btn btn-primary">
        Sign up
      </button>
    </form>
  );
}

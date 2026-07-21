import { useEffect, useState } from "preact/hooks";
import { authClient } from "@/client/auth.ts";
import { SubmitEventHandler } from "preact";

export default function Login() {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authClient.getSession().then((result) => {
      if (result.data?.session && result.data?.user) {
        setSession(result.data.session);
        setUser(result.data.user);
      }
      setLoading(false);
    });
  }, []);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget as HTMLFormElement);
    const result = await authClient.signUp.email({
      name: data.get("name")?.toString()!,
      email: data.get("email")?.toString()!,
      password: data.get("password")?.toString()!,
    });

    if (result.error) {
      console.error(result.error.message);
      return;
    }

    const sessionResult = await authClient.getSession();
    if (sessionResult.data?.session && sessionResult.data?.user) {
      setSession(sessionResult.data.session);
      setUser(sessionResult.data.user);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    setSession(null);
    setUser(null);
  };

  if (loading) return <div>Loading...</div>;

  if (session && user) {
    return (
      <div>
        <h1>Logged in as {user.email}</h1>
        <button type="button" onClick={handleSignOut}>Sign Out</button>
      </div>
    );
  }

  return (
    <form class="flex flex-col gap-2" onSubmit={handleSubmit}>
      <h1>Login</h1>

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
        name="email"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

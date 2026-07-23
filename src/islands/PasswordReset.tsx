import { authClient } from "@/client/neon.ts";
import { SubmitEventHandler } from "preact";
import { toast } from "@/client/toast.ts";
import { useEffect, useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";

export default function PasswordReset() {
  const tokenSignal = useSignal<string | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    tokenSignal.value = params.get("token");
    if (!tokenSignal.value) {
      location.assign("/login");
    }
  }, []);
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget as HTMLFormElement);

    const payload = {
      newPassword: data.get("password")?.toString()!,
      token: "",
    };
    const result = await authClient.resetPassword(payload);

    if (result.error) {
      console.error(result.error.message);
      return;
    }

    location.assign("/login");
  };

  return (
    <form
      ref={formRef}
      class="flex flex-col gap-2 items-start p-2"
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
      <button type="submit" class="btn btn-primary">Confirm</button>
    </form>
  );
}

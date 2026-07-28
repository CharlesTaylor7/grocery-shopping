import { authClient } from "@/client/neon.ts";
import type { SubmitEventHandler } from "react";
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function PasswordReset() {
  const [params, _] = useSearchParams();
  const token = params.get('token');
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  });
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget as HTMLFormElement);

    const payload = {
      newPassword: data.get("password")?.toString()!,
      token: token!,
    };
    const result = await authClient.resetPassword(payload);

    if (result.error) {
      console.error(result.error.message);
      return;
    }

    navigate("/auth/login");
  };

  return (
    <form ref={formRef} className="flex flex-col gap-2 items-start p-2" onSubmit={handleSubmit}>
      <div>
        <input type="password" placeholder="New Password" name="password" required />
      </div>
      <button type="submit" className="btn btn-primary">
        Confirm
      </button>
    </form>
  );
}

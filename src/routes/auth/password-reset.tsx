import { authClient } from "@/client/auth";
import useNavigate from "@/useNavigate";
import { useEffect, useRef } from "react";
import { useSearchParams } from "wouter";

export default function PasswordReset() {
  const [params, _] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  });
  const formRef = useRef<HTMLFormElement>(null);
  async function handleSubmit(e: any) {
    e.preventDefault();

    const data = new FormData(e.currentTarget as HTMLFormElement);

    const payload = {
      newPassword: data.get("password")?.toString()!,
      token: token!,
    };
    await authClient.resetPassword(payload);

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

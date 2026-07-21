import { define } from "@/server/define.ts";
import SignUp from "@/islands/Signup.tsx";
// import { SignUp } from "@/islands/shadcn/components/auth/sign-up.tsx";

export default define.page(function (ctx) {
  return <SignUp />;
});

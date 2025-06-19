import LoginForm from "@/components/auth/LoginForm";
import { pageMeta } from "@/constants/pageMeta";
import React from "react";

function LoginPage() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;

LoginPage.title = pageMeta.login.title;

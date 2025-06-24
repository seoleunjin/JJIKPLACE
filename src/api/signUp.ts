import { SignUpType } from "@/types/api";
import { authInstance } from "./apiClient";

const SignUpAPI = (body: SignUpType) => {
  return authInstance.post("/auth/signup", body);
};

const checkEmailAPI = (email: string) => {
  return authInstance.post(
    `/auth/signup/check-email?email=${encodeURIComponent(email)}`,
  );
};

export { SignUpAPI, checkEmailAPI };

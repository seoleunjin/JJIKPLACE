import { SignUpType } from "@/types/api";
import { instance } from "./apiClient";

const SignUpAPI = (body: SignUpType) => {
  return instance.post("/auth/signup", body);
};

const checkEmailAPI = (email: string) => {
  return instance.post(
    `/auth/signup/check-email?email=${encodeURIComponent(email)}`,
  );
};

export { SignUpAPI, checkEmailAPI };

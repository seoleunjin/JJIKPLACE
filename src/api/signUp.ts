import { SignUpType } from "@/types/api";
import { authInstance } from "./apiClient";

const SignUpAPI = (body: SignUpType) => {
  return authInstance.post("/auth/signup", body);
};

export { SignUpAPI };

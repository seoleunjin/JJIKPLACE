import { SignUpType } from "@/types/api";
import { instance } from "./apiClient";

const SignUpAPI = (body: SignUpType) => {
  return instance.post("/auth/signup", body);
};

export { SignUpAPI };

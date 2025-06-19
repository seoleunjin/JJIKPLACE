import { authInstance } from "@/api/apiClient";
import { LoginType } from "@/types/api";

const LoginApi = (body: LoginType) => {
  return authInstance.post("/auth/login", body);
};

export { LoginApi };

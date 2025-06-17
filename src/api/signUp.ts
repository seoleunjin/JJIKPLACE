import { instance } from "./apiClient";

interface SignUpType {
  email: string;
  password: string;
  nick_name: string;
}

const SignUpAPI = (body: SignUpType) => {
  return instance.post("/auth/signup", body);
};

export { SignUpAPI };

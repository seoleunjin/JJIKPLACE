import { authInstance } from "./apiClient";

const fetchProfile = () => {
  return authInstance.get("/profile/me");
};

export { fetchProfile };

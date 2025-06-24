import { userInstance } from "./apiClient";

const fetchProfile = () => {
  return userInstance.get("/profile/me");
};

export { fetchProfile };

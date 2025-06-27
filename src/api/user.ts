import { authInstance } from "./apiClient";

const fetchProfile = () => {
  return authInstance.get("/profile/me");
};

const fetchMyReviews = () => {
  return authInstance.get("/profile/my-reviews");
};

const patchProfileImage = (imageFile: File) => {
  const formData = new FormData();
  formData.append("image_file", imageFile);

  return authInstance.patch("/profile/image", formData);
};
export { fetchProfile, fetchMyReviews, patchProfileImage };

import { authInstance, userInstance } from "./apiClient";

const fetchProfile = () => {
  return authInstance.get("/profile/me");
};

const fetchMyReviews = () => {
  return authInstance.get("/profile/my-reviews");
};

const patchProfileImage = (image_file: File) => {
  const formData = new FormData();
  formData.append("image_file", image_file);

  return userInstance.patch("/profile/image", formData);
};

const fetchReviewDetail = () => {
  return authInstance.get("/profile/my-reviews/detail");
};

export { fetchProfile, fetchMyReviews, patchProfileImage, fetchReviewDetail };

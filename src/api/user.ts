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

const fetchReviewDetail = ({ page, size }: { page: number; size: number }) => {
  return authInstance.get(
    `/profile/my-reviews/detail?page=${page}&size=${size}`,
  );
};

const deleteReview = (reviewId: number) => {
  return authInstance.delete(`/profile/reviews/${reviewId}`);
};

export {
  fetchProfile,
  fetchMyReviews,
  patchProfileImage,
  fetchReviewDetail,
  deleteReview,
};

import { authInstance, instanceBase, userInstance } from "./apiClient";

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

// 리뷰등록
const createReview = (body: FormData) => {
  const token = localStorage.getItem("accessToken");
  return instanceBase.post(`/review`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};

export {
  fetchProfile,
  fetchMyReviews,
  patchProfileImage,
  fetchReviewDetail,
  deleteReview,
  createReview,
};

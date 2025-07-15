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
      "Content-Type": "multipart/form-data", //Content-Type 때문에
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};
// 닉네임 변경
const nicknameUpdateAPI = (body: { nickname: string }) => {
  return authInstance.patch("/profile/me/nickname", body);
};
// 비밀번호 확인
const passwordVerifyAPI = (currentPassword: string) => {
  return authInstance.post("/profile/me/password/verify", null, {
    params: {
      current_password: currentPassword,
    },
  });
};
// 비밀번호 변경
const passwordChangeAPI = (body: {
  new_password: string;
  new_password_check: string;
}) => {
  return authInstance.patch("/profile/me/password", body);
};

// 찜 목록
const FavoriteListAPI = (offset: number, size: number) => {
  return authInstance.get(
    `/profile/my-favorites?offset=${offset}&size=${size}`,
  );
};

// 찜 삭제
const FavoriteDelAPI = (ps_id: number) => {
  return authInstance.delete(`/favorite/${ps_id}`);
};

export {
  fetchProfile,
  fetchMyReviews,
  patchProfileImage,
  fetchReviewDetail,
  deleteReview,
  createReview,
  nicknameUpdateAPI,
  passwordVerifyAPI,
  passwordChangeAPI,
  FavoriteListAPI,
  FavoriteDelAPI,
};

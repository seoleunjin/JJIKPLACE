import { instance } from "./apiClient";

const StudioReviewList = (ps_id: number, offset: number) => {
  return instance.get(`/studios/${ps_id}/reviews/?offset=${offset}`);
};

const ReviewDetaile = (ps_id: number, review_id: number) => {
  return instance.get(`/studios/${ps_id}/reviews/${review_id}`);
};

export { StudioReviewList, ReviewDetaile };

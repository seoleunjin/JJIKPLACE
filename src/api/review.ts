import { instance } from "./apiClient";

const StudioReviewList = (ps_id: number, offset: number, limit: number) => {
  return instance.get(`/studios/${ps_id}/reviews`, {
    params: { offset, limit },
  });
};

const ReviewDetaile = (ps_id: number, review_id: number) => {
  return instance.get(`/studios/${ps_id}/reviews/${review_id}`);
};

export { StudioReviewList, ReviewDetaile };

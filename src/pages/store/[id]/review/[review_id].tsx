import { ReviewDetaile } from "@/api/review";
import { pageMeta } from "@/constants/pageMeta";
import { ReviewDetaileType } from "@/types/review";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function ReviewDetailePage() {
  const router = useRouter();
  const { id, review_id } = router.query;
  const [review, setReview] = useState<ReviewDetaileType | null>(null);

  const storeId = Number(id);
  const reviewId = Number(review_id);

  useEffect(() => {
    if (isNaN(storeId) || isNaN(reviewId)) return;

    const getStoreDetail = async () => {
      try {
        const { data } = await ReviewDetaile(storeId, reviewId);
        console.log("리뷰 사진 상세", data);
        setReview(data);
      } catch (error) {
        console.error("리뷰 상세 요청 실패", error);
      }
    };

    getStoreDetail();
  }, [storeId, reviewId]);

  return (
    <div style={{ paddingTop: "200px" }}>
      <div>
        {review ? (
          <div>
            <p>{review.content}</p>
            <p>{review.name}</p>
            <p>{review.user_nickname}</p>
            <p>{review.rating}</p>
            <p>{review.created_at}</p>
          </div>
        ) : (
          <div>로딩중</div>
        )}
      </div>
    </div>
  );
}

export default ReviewDetailePage;

ReviewDetailePage.title = pageMeta.reviewDetaile.title;

import styles from "@/styles/reviewDetail.module.css";
import { ReviewDetaile } from "@/api/review";
import { pageMeta } from "@/constants/pageMeta";
import { ReviewDetaileType } from "@/types/review";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ReviewStar from "@/components/common/ReviewStar";

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
    <div className={styles.reviewBox}>
      {review ? (
        <div className={styles.reviewItem}>
          <div className={styles.reviewerInfo}>
            <h6>{review.user_nickname}</h6>
            <ReviewStar rating={review.rating} />
          </div>
          <Image
            src={review.image_url || "/images/common/NoImage.png"}
            alt="리뷰 썸네일 이미지"
            width={150}
            height={150}
          />
          <div className={styles.reviewerContent}>
            <p>{review.content}</p>
            <span>{review.created_at}</span>
          </div>
        </div>
      ) : (
        <div>로딩중</div>
      )}
    </div>
  );
}

export default ReviewDetailePage;

ReviewDetailePage.title = pageMeta.reviewDetaile.title;

import { deleteReview, fetchReviewDetail } from "@/api/user";
import ReviewStar from "@/components/common/ReviewStar";
import { pageMeta } from "@/constants/pageMeta";
import layoutStyles from "@/styles/layout.module.css";
import { MyReviewitem } from "@/types/user";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "@/styles/myReviewDetail.module.css";
import commonStyles from "@/styles/common.module.css";
import { useRouter } from "next/router";

function WriteReview() {
  const [reviews, setReviews] = useState<MyReviewitem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const queryPage = parseInt(router.query.page as string) || 1;

  useEffect(() => {
    const myReviewDetail = async () => {
      try {
        const { data } = await fetchReviewDetail({ page: queryPage, size: 5 });
        setReviews(data.items);
        setHasMore(data.has_more);
        setTotal(data.total);
        console.log(data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          router.replace("/auth/login");
        } else {
          console.error("리뷰 불러오기 실패", err);
        }
      }
    };

    if (router.isReady) {
      myReviewDetail();
    }
  }, [queryPage, router]);

  const changePage = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  const handleNextBtn = () => {
    if (hasMore) changePage(queryPage + 1);
  };

  const handlePrevBtn = () => {
    if (queryPage > 1) changePage(queryPage - 1);
  };

  const handleDeleteReview = async (review_id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteReview(review_id);

      // 성공 후 목록에서 제거
      setReviews((prev) =>
        prev.filter((review) => review.review_id !== review_id),
      );
      setTotal((prev) => prev - 1);

      // 마지막 항목 삭제 시 이전 페이지로
      if (reviews.length === 1 && queryPage > 1) {
        changePage(queryPage - 1);
      }
    } catch (error) {
      console.error("리뷰 삭제 실패", error);
      alert("리뷰 삭제에 실패했습니다.");
    }
  };

  return (
    <div className={layoutStyles.width}>
      <div className={layoutStyles.py_space}>
        <ul className={styles.reviewGallery}>
          {reviews.map((review, index) => (
            <li key={index}>
              <div className={styles.imageWrap}>
                <Image
                  src={"/images/common/NoImage.png"}
                  width={200}
                  height={200}
                  alt="리뷰 이미지"
                />
              </div>
              <div className={styles.reviewContent}>
                <div className={styles.reviewHeader}>
                  <div>
                    <h6>{review.name}</h6>
                  </div>
                  <button
                    onClick={() => handleDeleteReview(review.review_id)}
                    type="button"
                    className={commonStyles.btnBase}
                  >
                    삭제
                  </button>
                </div>
                <ReviewStar rating={review.rating} />
                <p>{review.content}</p>
                <span>{review.created_at}</span>
              </div>
            </li>
          ))}
        </ul>
        {/* 페이지네이션 */}
        <div className={styles.pagination}>
          <button
            className={styles.prevBtn}
            type="button"
            onClick={handlePrevBtn}
            disabled={queryPage <= 1}
          >
            이전
          </button>
          <div>
            <span className={styles.currentPage}>{queryPage}</span>
            <span className={styles.rastPage}> / {Math.ceil(total / 5)}</span>
          </div>
          <button
            className={styles.nextBtn}
            type="button"
            onClick={handleNextBtn}
            disabled={!hasMore}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default WriteReview;
WriteReview.title = pageMeta.writeDetail.title;

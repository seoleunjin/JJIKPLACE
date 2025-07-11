import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import layoutStyles from "@/styles/layout.module.css";
import styles from "@/styles/myPageReview.module.css";
import MyPageStyles from "@/styles/myPage.module.css";
import commonStyles from "@/styles/common.module.css";
import { fetchMyReviews } from "@/api/user";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MyReviewType } from "@/types/user";
import ReviewStar from "../common/ReviewStar";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

function MyPageReview() {
  const router = useRouter();
  const [reviews, setReviews] = useState<MyReviewType[]>([]);
  useEffect(() => {
    const getMyReviews = async () => {
      try {
        const { data } = await fetchMyReviews();
        setReviews(data);
      } catch (err) {
        const axiosError = err as AxiosError;
        if (axiosError.response?.status === 401) {
          router.replace("/auth/login");
        } else {
          console.error("리뷰 불러오기 실패", err);
        }
      }
    };
    getMyReviews();
  }, []);

  return (
    <div>
      {reviews.length === 0 ? (
        <div className={layoutStyles.width}>
          <div className={styles.NoReviewBox}>
            <Image
              src={"/images/user/NoReview.png"}
              width={120}
              height={120}
              alt="작성 리뷰 없음"
            />
            <div className={styles.TextBox}>
              <p>아직 작성한 리뷰가 없어요</p>
              <span>이용한 매장의 리뷰로 남겨보세요!</span>
            </div>
            <Link href={"/write-review"} className={styles.reviewLink}>
              작성하기
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className={layoutStyles.width}>
            <div className={MyPageStyles.title}>
              <h2>내 리뷰</h2>
              <Link href={"/user/myReview"} className={commonStyles.btnBase}>
                관리
              </Link>
            </div>
          </div>
          <div className={styles.reviewSwiper}>
            <Swiper spaceBetween={10} slidesPerView={3.5}>
              {reviews.map((review, index) => (
                <SwiperSlide key={index}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={review?.image_url || "/images/common/NoImage.png"}
                      width={200}
                      height={200}
                      alt="리뷰 이미지"
                    />
                  </div>
                  <div className={styles.reviewContent}>
                    <h6>{review.name}</h6>
                    <div className={styles.ratingWrap}>
                      <ReviewStar rating={review.rating} />
                    </div>
                    <p>{review.content}</p>
                    <span>{review.created_at}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPageReview;

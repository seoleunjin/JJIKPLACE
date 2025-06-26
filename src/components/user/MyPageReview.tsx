import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import layoutStyles from "@/styles/layout.module.css";
import styles from "@/styles/myPageReview.module.css";
import MyPageStyles from "@/styles/myPage.module.css";
import commonStyles from "@/styles/common.module.css";
import { fetchMyReviews } from "@/api/user";
import { useEffect } from "react";

const reviews = [
  {
    review_id: 1,
    rating: 5,
    content: "정말 만족스러워요! 다음에 또 구매할게요.",
    image_url: "/images/reviews/review1.jpg",
    created_at: "2025-06-25T12:45:00.000Z",
    updated_at: "2025-06-26T05:24:37.734Z",
    ps_id: 2124973472,
    name: "맑은뷰티",
  },
  {
    review_id: 2,
    rating: 4,
    content: "전반적으로 괜찮아요. 배송이 조금 느렸어요.",
    image_url: "/images/reviews/review2.jpg",
    created_at: "2025-06-20T10:15:30.000Z",
    updated_at: "2025-06-26T05:24:37.734Z",
    ps_id: 2124973472,
    name: "뷰티플러스",
  },
  {
    review_id: 3,
    rating: 3,
    content: "보통이에요. 특별히 좋지도 나쁘지도 않아요.",
    image_url: "/images/reviews/review3.jpg",
    created_at: "2025-06-22T08:10:00.000Z",
    updated_at: "2025-06-26T05:24:37.734Z",
    ps_id: 2124973472,
    name: "스킨코드",
  },
  {
    review_id: 4,
    rating: 2,
    content: "생각보다 별로였어요. 재구매는 안 할 듯.",
    image_url: "/images/reviews/review4.jpg",
    created_at: "2025-06-18T14:00:00.000Z",
    updated_at: "2025-06-26T05:24:37.734Z",
    ps_id: 2124973472,
    name: "에코클렌즈",
  },
];

function MyPageReview() {
  useEffect(() => {
    const getMyReviews = async () => {
      try {
        const { data } = await fetchMyReviews();
        console.log("리뷰 응답", data);
      } catch (err) {
        console.error("응답에러", err);
      }
    };
    getMyReviews();
  }, []);
  return (
    <div>
      <div className={layoutStyles.width}>
        <div className={MyPageStyles.title}>
          <h2>내 리뷰</h2>
          <button type="button" className={commonStyles.btnBase}>
            관리
          </button>
        </div>
      </div>
      <div className={styles.reviewSwiper}>
        <Swiper spaceBetween={10} slidesPerView={3.5}>
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className={styles.imageWrap}>
                <Image
                  src={"/images/common/NoImage.png"}
                  width={200}
                  height={200}
                  alt="리뷰 이미지"
                />
              </div>
              <div className={styles.reviewContent}>
                <h6>{review.name}</h6>
                <div>{review.rating}</div>
                <p>{review.content}</p>
                <span>{review.created_at}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MyPageReview;

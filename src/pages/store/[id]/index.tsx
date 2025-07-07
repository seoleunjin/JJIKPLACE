import { StudioReviewList } from "@/api/review";
import { ImageGalleryApi, StoreDetailApi } from "@/api/store";
import { pageMeta } from "@/constants/pageMeta";
import { ReviewType } from "@/types/review";
import { ImageItem, StoreType } from "@/types/store";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function StorePage() {
  const router = useRouter();
  const { id } = router.query;
  const storeId = Number(id);
  const [store, setStore] = useState<StoreType | undefined>(undefined);
  const [reviews, setReviews] = useState<ReviewType[] | undefined>(undefined);
  const [images, setImages] = useState<ImageItem[]>([]);
  useEffect(() => {
    if (isNaN(storeId)) return;
    const getStoreDetail = async () => {
      try {
        const review = await StudioReviewList(storeId);
        const Images = await ImageGalleryApi(storeId);
        const { data } = await StoreDetailApi(storeId);
        setStore(data);
        console.log("리뷰 사진 갤러리", Images);
        setImages(Images.data.images);
        setReviews(review.data.items);
      } catch {}
    };
    getStoreDetail();
  }, [storeId]);

  const handleOnClick = (reviewId: number) => {
    router.push(`/store/${storeId}/review/${reviewId}`);
  };

  return (
    <div style={{ paddingTop: "200px" }}>
      <div>
        {store ? (
          <div>
            {store.categories.map((cat, i) => (
              <span key={i}>{cat}</span>
            ))}
            <h6>{store.name}</h6>
            <p>{store.avg_rating}</p>
            <p>{store.review_count}개 리뷰</p>
          </div>
        ) : (
          <div>로딩중</div>
        )}
        <div>
          {reviews?.map((review) => (
            <div key={review.review_id}>
              <p>{review.content}</p>
              <p>{review.rating}점</p>
              <p>{review.created_at}</p>
              <Image
                src={review.image_url || "/images/common/NoImage.png"}
                alt="리뷰 썸네일 이미지"
                width={80}
                height={80}
              />
              <button onClick={() => handleOnClick(review.review_id)}>
                리뷰 상세
              </button>
            </div>
          ))}
        </div>
        <div>
          {images.length > 0 ? (
            images.map((img, index) => (
              <Image
                key={index}
                src={img.review_image}
                alt={"리뷰"}
                width={80}
                height={80}
              />
            ))
          ) : (
            <p>이미지가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StorePage;

StorePage.title = pageMeta.store.title;

// components/StorePage.tsx
import layoutStyles from "@/styles/layout.module.css";
import styles from "@/styles/storeDetail.module.css";
import { StudioReviewList } from "@/api/review";
import { ImageGalleryApi, StoreDetailApi } from "@/api/store";
import { pageMeta } from "@/constants/pageMeta";
import { ReviewType } from "@/types/review";
import { ImageItem, StoreType } from "@/types/store";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ReviewList, ReviewPhoto, StoreListStar } from "@/assets/icons";
import ReviewStar from "@/components/common/ReviewStar";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

// 리뷰 리스트
const useStoreList = (storeId: number, enabled: boolean) => {
  return useInfiniteQuery({
    queryKey: ["storeListItems", storeId],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await StudioReviewList(storeId, pageParam);
      return response.data;
    },
    getNextPageParam: (last) => {
      const nextPage = last.offset + 4;
      if (nextPage < last.total) {
        return nextPage;
      }
      return undefined;
    },
    initialPageParam: 0,
    enabled,
  });
};

// 리뷰 갤러리
const useStorePhoto = (storeId: number, enabled: boolean) => {
  return useInfiniteQuery({
    queryKey: ["storePhoto", storeId],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await ImageGalleryApi(storeId, pageParam);
      return res.data;
    },
    getNextPageParam: (last) => {
      const nextPage = last.page + 1;
      if (nextPage <= last.total) {
        return nextPage;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled,
  });
};

function StorePage() {
  const router = useRouter();
  const isReady = router.isReady;
  const storeId = isReady ? Number(router.query.id) : NaN;
  const [store, setStore] = useState<StoreType | undefined>(undefined);

  // 상세 정보 불러오기
  useEffect(() => {
    if (isNaN(storeId)) return;

    const getStoreDetail = async () => {
      try {
        const { data } = await StoreDetailApi(storeId);
        setStore(data);
      } catch (error) {
        console.error("상세 정보 로딩 오류:", error);
      }
    };

    getStoreDetail();
  }, [storeId]);

  // 탭
  const [currentTab, setCurrentTab] = useState(0);
  const menuArr = [
    { name: "list", component: <ReviewList /> },
    { name: "photo", component: <ReviewPhoto /> },
  ];
  const handleSelectMenu = (index: number) => {
    setCurrentTab(index);
  };

  // 리뷰 리스트
  const {
    data: reviewData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useStoreList(storeId, isReady && !isNaN(storeId));
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  // 리뷰 이미지
  const {
    data: photoData,
    fetchNextPage: fetchNextPhoto,
    hasNextPage: hasNextPhoto,
    isFetchingNextPage: isFetchingPhoto,
  } = useStorePhoto(storeId, isReady && !isNaN(storeId));

  useEffect(() => {
    if (inView && hasNextPhoto && !isFetchingPhoto) {
      fetchNextPhoto();
    }
  }, [inView]);

  return (
    <div className={layoutStyles.py_space}>
      <div className={styles.storeInfo}>
        <div className={layoutStyles.width}>
          {store ? (
            <div>
              {store.categories.map((category, i) => (
                <span className={styles.categories} key={i}>
                  {category}
                </span>
              ))}
              <h6>{store.name}</h6>
              <div className={styles.ratingInfo}>
                <div className={styles.rating}>
                  <StoreListStar />
                  {Number(store.avg_rating).toFixed(1)}
                </div>
                <p className={styles.reviewCount}>
                  {store.review_count}개 리뷰
                </p>
              </div>
            </div>
          ) : (
            <div>로딩중</div>
          )}
        </div>
      </div>

      <div className={styles.tabBox}>
        <div className={layoutStyles.width}>
          <div className={styles.tabWrap}>
            {menuArr.map((menu, index) => (
              <li
                key={index}
                onClick={() => handleSelectMenu(index)}
                className={`${styles.menu} ${
                  index === currentTab ? styles.menuAc : ""
                }`}
              >
                {menu.component}
              </li>
            ))}
          </div>
        </div>
      </div>

      {currentTab === 0 && (
        <div className={styles.listBox}>
          <div className={layoutStyles.width}>
            <ul>
              {reviewData?.pages.map((page) =>
                page.items.map((item: ReviewType) => (
                  <li key={item.review_id}>
                    <div className={styles.imageBox}>
                      <Image
                        src={item.image_url || "/images/common/NoImage.png"}
                        alt="리뷰 썸네일 이미지"
                        width={150}
                        height={150}
                      />
                    </div>
                    <Link
                      href={`/store/${storeId}/review/${item.review_id}`}
                      className={styles.contentBox}
                    >
                      <h6>{item.user_nickname}</h6>
                      <p>{item.content}</p>
                      <div className={styles.reviewMeta}>
                        <ReviewStar rating={item.rating} />
                        <span>{item.created_at}</span>
                      </div>
                    </Link>
                  </li>
                )),
              )}
            </ul>
            <div ref={ref} />
          </div>
        </div>
      )}

      {currentTab === 1 && (
        <div className={layoutStyles.width}>
          <ul className={styles.imageGallery}>
            {photoData?.pages.map((page) =>
              page.images.map((image: ImageItem) => (
                <li key={image.review_id}>
                  <Link href={`/store/${storeId}/review/${image.review_id}`}>
                    <Image
                      src={image.review_image}
                      alt="리뷰"
                      width={80}
                      height={80}
                    />
                  </Link>
                </li>
              )),
            )}
            <li ref={ref}></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default StorePage;

StorePage.title = pageMeta.store.title;

"use client";

import styles from "@/styles/storeCard.module.css";
import { useAppSelector } from "@/hooks/storeMap";
import { useEffect, useState } from "react";
import { getNearbyStudios } from "@/api/map";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { StoreNearbyItems } from "@/types/store";
import { useInView } from "react-intersection-observer";
import { StoreListStar } from "@/assets/icons";
import Link from "next/link";
import { ImageGalleryApiss } from "@/api/store";
import Image from "next/image";

export default function StoreCard() {
  const [imagesMap, setImagesMap] = useState<Record<string, string[]>>({});
  const { selectedPosition } = useAppSelector((state) => state.map);

  const lat = selectedPosition?.lat;
  const lng = selectedPosition?.lng;

  const useGetNearbyItems = () => {
    return useInfiniteQuery({
      queryKey: ["nearbyStore", lat, lng],
      queryFn: async ({ pageParam = 0 }) => {
        const res = await getNearbyStudios({
          offset: pageParam,
          lat: lat!,
          lng: lng!,
        });
        return res.data;
      },
      getNextPageParam: (last) => {
        const nextPage = last.offset + 3;
        if (nextPage < last.total) return nextPage;
      },
      initialPageParam: 0,
    });
  };

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetNearbyItems();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (!data) return;

    const fetchImages = async () => {
      try {
        const allItems = data.pages.flatMap((page) => page.items);

        const results = await Promise.allSettled(
          allItems.map(async (item) => {
            const res = await ImageGalleryApiss(item.ps_id);
            return {
              ps_id: item.ps_id,
              images: res.data.images.map(
                (img: { review_image: string }) => img.review_image,
              ),
            };
          }),
        );

        const newImagesMap: Record<string, string[]> = {};
        results.forEach((result) => {
          if (result.status === "fulfilled") {
            const { ps_id, images } = result.value;
            newImagesMap[ps_id] = images;
          }
        });

        setImagesMap((prev) => ({
          ...prev,
          ...newImagesMap,
        }));
      } catch (e) {
        console.error("리뷰 이미지 로딩 실패", e);
      }
    };

    fetchImages();
  }, [data]);

  return (
    <div className={styles.storeCardPage}>
      <Swiper spaceBetween={10} centeredSlides={true} slidesPerView={1.5}>
        {data?.pages.map((page, pageIndex) =>
          page.items.map((item: StoreNearbyItems) => {
            const ps_id = item.ps_id;
            const reviewImages = imagesMap[ps_id] || [];

            return (
              <SwiperSlide key={`${pageIndex}-${ps_id}`}>
                <div className={styles.storeCard}>
                  <div className={styles.contentBox}>
                    <div className={styles.storeHeader}>
                      <h6>{item.name}</h6>
                      <p>{item.categories}</p>
                    </div>
                    <div className={styles.distanceTag}>
                      <p>{Math.round(Number(item.distance_km) * 1000)}m</p>
                    </div>
                    <div className={styles.reviewStats}>
                      <span className={styles.rating}>
                        <StoreListStar />
                        {Number(item.review_avg_score).toFixed(1)}
                      </span>
                      <Link
                        className={styles.storeLink}
                        href={`/store/${item.ps_id}`}
                      >
                        {item.review_cnt}개 리뷰
                      </Link>
                    </div>

                    <div className={styles.reviewImage}>
                      {reviewImages.length > 0 ? (
                        <ul className={styles.thumbnailWrapper}>
                          {reviewImages.slice(0, 5).map((img, index) => (
                            <li key={index} className={styles.imageItem}>
                              <div className={styles.imageWrapper}>
                                <Image
                                  src={img}
                                  alt={`리뷰 이미지 ${index + 1}`}
                                  fill
                                  className={styles.thumbnail}
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "리뷰 사진 없음"
                      )}
                    </div>
                  </div>

                  <div className={styles.storeActionButtons}>
                    찜이 필요해~~
                    <div className={styles.routeLabels}>
                      <p>출발</p>
                      <p>도착</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          }),
        )}
        {hasNextPage && (
          <SwiperSlide key="load-more">
            <h1 ref={ref}>불러오는중</h1>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}

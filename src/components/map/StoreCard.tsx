"use client";

import styles from "@/styles/storeCard.module.css";
import { useAppSelector } from "@/hooks/storeMap";
import { useEffect } from "react";
import { getNearbyStudios } from "@/api/map";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { StoreNearbyItems } from "@/types/store";
import { useInView } from "react-intersection-observer";
import { StoreListStar } from "@/assets/icons";
import Link from "next/link";

export default function StoreCard() {
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
        if (nextPage < last.total) {
          return nextPage;
        }
      },
      initialPageParam: 0,
    });
  };
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetNearbyItems();
  console.log(data);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className={styles.storeCardPage}>
      <Swiper spaceBetween={10} centeredSlides={true} slidesPerView={1.5}>
        {data?.pages.map((page, pageIndex) =>
          page.items.map((item: StoreNearbyItems) => (
            <SwiperSlide key={`${pageIndex}-${item.ps_id}`}>
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
                  <div className={styles.reviewImage}>리뷰 사진이 필요해~</div>
                </div>
                <div className={styles.storeActionButtons}>
                  {/* <FavoriteButton marker={item} /> */}찜이 필요해~~
                  <div className={styles.routeLabels}>
                    <p>출발</p>
                    <p>도착</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )),
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

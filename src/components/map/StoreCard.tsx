"use client";

import { useAppSelector } from "@/hooks/storeMap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getNearbyStudios } from "@/api/map";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { StoreNearbyItems } from "@/types/store";
import { useInView } from "react-intersection-observer";

export default function StoreCard() {
  const selectedPosition = useAppSelector(
    (state) => state.map.selectedPosition,
  );

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
    <div className="store-card">
      <Swiper spaceBetween={10} slidesPerView={3.5}>
        {data?.pages.map((page, pageIndex) =>
          page.items.map((item: StoreNearbyItems) => (
            <SwiperSlide key={`${pageIndex}-${item.ps_id}`}>
              <p>{item.name}</p>
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

import { FavoriteDelAPI, FavoriteListAPI } from "@/api/user";
import layoutStyles from "@/styles/layout.module.css";
import myPageReview from "@/styles/myPageReview.module.css";
import styles from "@/styles/favoriteList.module.css";
import MyPageStyles from "@/styles/myPage.module.css";
import { FavoriteListResponse } from "@/types/user";
import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useInView } from "react-intersection-observer";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { Heart } from "@/assets/icons";

const useGetTopRateItems = () => {
  const router = useRouter();
  const size = 5;
  return useInfiniteQuery<FavoriteListResponse, Error>({
    queryKey: ["topRatedItems"],
    queryFn: async ({ pageParam = 0 }: QueryFunctionContext) => {
      try {
        const offset = pageParam as number;
        const res = await FavoriteListAPI(offset, size);
        return res.data;
      } catch (err) {
        const axiosError = err as AxiosError;
        if (axiosError.response?.status === 401) {
          router.replace("/auth/login");
        } else {
          console.error("리뷰 불러오기 실패", err);
        }
      }
    },
    getNextPageParam: (last) => {
      const nextOffset = last.offset + size;
      return nextOffset < last.total ? nextOffset : undefined;
    },
    initialPageParam: 0,
  });
};

function FavoriteList() {
  const queryClient = useQueryClient();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetTopRateItems();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRemoveItem = async (id: number) => {
    try {
      await FavoriteDelAPI(id);
      queryClient.invalidateQueries({ queryKey: ["topRatedItems"] });
    } catch (err) {
      console.error("찜 해제 실패", err);
    }
  };

  return (
    <div className={layoutStyles.width}>
      <div className={MyPageStyles.title}>
        <h2>찜 목록</h2>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={2.2}
        breakpoints={{
          768: {
            slidesPerView: 3.5,
          },
        }}
      >
        {data?.pages.map((page, pageIndex) =>
          page.items.map((item) => (
            <SwiperSlide key={`${pageIndex}-${item.ps_id}`}>
              <div className={myPageReview.imageWrap}>
                <Image
                  src={item.thumbnail_url || "/images/common/NoImage.png"}
                  fill
                  alt="찜한 상점"
                />
                <button
                  className={styles.heartBtn}
                  onClick={() => handleRemoveItem(item.ps_id)}
                >
                  <Heart />
                </button>
              </div>
              <Link
                className={myPageReview.reviewContent}
                href={`/store/${item.ps_id}`}
              >
                <h6>{item.name}</h6>
              </Link>
            </SwiperSlide>
          )),
        )}
        {hasNextPage && (
          <SwiperSlide className={styles.loading} key="load-more">
            <h1 ref={ref}>불러오는중</h1>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}

export default FavoriteList;

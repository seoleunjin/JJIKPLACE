import { FavoriteDelAPI, FavoriteListAPI } from "@/api/user";
import layoutStyles from "@/styles/layout.module.css";
import MyPageStyles from "@/styles/myPage.module.css";
import { FavoriteItemType } from "@/types/user";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useInView } from "react-intersection-observer";

interface FavoriteListResponse {
  page: number;
  total: number;
  items: FavoriteItemType[];
}
function FavoriteList() {
  // const [items, setItems] = useState<FavoriteItemType[] | null>(null);
  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const res = await FavoriteListAPI();
  //       const { items } = res.data;
  //       setItems(items);
  //       console.log("찜 목록", res);
  //     } catch (err) {
  //       console.error("찜 목록 로딩 실패", err);
  //     }
  //   };

  //   fetch();
  // }, []);

  const useGetTopRateItems = () => {
    return useInfiniteQuery<FavoriteListResponse, Error>({
      queryKey: ["topRatedItems"],
      queryFn: async ({ pageParam }: QueryFunctionContext) => {
        const page = pageParam as number;
        const res = await FavoriteListAPI(page);
        return {
          ...res.data,
          page,
        };
      },
      getNextPageParam: (last) => {
        const totalPages = Math.ceil(last.total / last.size);
        return last.page < totalPages ? last.page + 1 : undefined;
      },
      initialPageParam: 1,
    });
  };
  useGetTopRateItems();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetTopRateItems();
  console.log("데이터", data);

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    console.log("화면에 있습니까?", inView);
  }, [inView]);

  // setItems(data.pages.items);

  // const handleRemoveItem = async (id: number) => {
  //   try {
  //     await FavoriteDelAPI(id);
  //     setItems((prev) => prev?.filter((item) => item.ps_id !== id) || null);
  //   } catch (err) {
  //     console.error("찜 해제 실패", err);
  //   }
  // };

  return (
    <div className={layoutStyles.width}>
      {/* <div className={MyPageStyles.title}>
        <h2>찜 목록</h2>
      </div>
      {items ? (
        <Swiper spaceBetween={10} slidesPerView={3.5}>
          {items.map((item) => (
            <SwiperSlide key={item.ps_id}>
              <div>
                <Image
                  src={item?.thumbnail_url || "/images/common/NoImage.png"}
                  width={200}
                  height={200}
                  alt="찜한 상점"
                />
                <button onClick={() => handleRemoveItem(item.ps_id)}>
                  찜 삭제
                </button>
              </div>
              <Link href={`/store/${item.ps_id}`}>
                <p>{item.name}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div>로딩중</div>
      )} */}
      <div className={MyPageStyles.title}>
        <h2>찜 목록</h2>
      </div>
      {data?.pages.map((page, index) => (
        <div key={index}>
          {page.items?.map((item) => (
            <div key={item.ps_id}>
              <Image
                src={item.thumbnail_url || "/images/common/NoImage.png"}
                width={200}
                height={200}
                alt={item.name || "찜한 상점"}
              />
              <Link href={`/store/${item.ps_id}`}>
                <p>{item.name}</p>
              </Link>
            </div>
          ))}
        </div>
      ))}
      <h1 ref={ref}>Load more</h1>
    </div>
  );
}

export default FavoriteList;

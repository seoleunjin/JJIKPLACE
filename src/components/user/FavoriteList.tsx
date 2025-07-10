import { FavoriteDelAPI, FavoriteListAPI } from "@/api/user";
import layoutStyles from "@/styles/layout.module.css";
import MyPageStyles from "@/styles/myPage.module.css";
import { FavoriteItemType } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

function FavoriteList() {
  const [items, setItems] = useState<FavoriteItemType[] | null>(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await FavoriteListAPI();
        const { items } = res.data;
        setItems(items);
        console.log("찜 목록", res);
      } catch (err) {
        console.error("찜 목록 로딩 실패", err);
      }
    };

    fetch();
  }, []);
  const handleRemoveItem = async (id: number) => {
    try {
      await FavoriteDelAPI(id);
      setItems((prev) => prev?.filter((item) => item.ps_id !== id) || null);
    } catch (err) {
      console.error("찜 해제 실패", err);
    }
  };
  return (
    <div className={layoutStyles.width}>
      <div className={MyPageStyles.title}>
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
      )}
    </div>
  );
}

export default FavoriteList;

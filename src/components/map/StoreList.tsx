import { useAppDispatch, useAppSelector } from "@/hooks/storeMap";
import Image from "next/image";
import styles from "@/styles/storeList.module.css";
import Link from "next/link";
import { Heart, StoreListStar } from "@/assets/icons";
import { toggleFavorite } from "@/api/map";
import { MarkerType } from "@/types/map";
import { setMarkers } from "@/features/map/mapSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

function StoreList() {
  const route = useRouter();
  const { markers } = useAppSelector((state) => state.map);
  const dispatch = useAppDispatch();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      setAccessToken(token);
    }
  }, []);

  const handleFavoriteClick = async (marker: MarkerType) => {
    const currentFavorite = marker.is_favorite;
    const newFavorite = !currentFavorite;
    try {
      await toggleFavorite(marker.id, newFavorite);

      const updatedMarkers = markers.map((m) =>
        m.id === marker.id ? { ...m, is_favorite: newFavorite } : m,
      );
      dispatch(setMarkers(updatedMarkers));
    } catch (e) {
      const axiosError = e as AxiosError;
      console.error("찜 토글 실패", axiosError);
      if (accessToken === null) {
        alert("로그인 후 이용해주세요");
        route.replace("/auth/login");
      }
    }
  };

  return (
    <div className={styles.storeList}>
      <div className={styles.barWrap}>
        <button></button>
      </div>
      <ul className={styles.listBox}>
        {markers.slice(0, 6).map((marker) => (
          <li key={marker.id}>
            <div className={styles.imageBox}>
              <Image
                src={marker.thumbnail_url || "/images/common/NoImage.png"}
                alt="리뷰 썸네일 이미지"
                width={127}
                height={143}
              />
            </div>
            <div className={styles.contextBox}>
              <div className={styles.header}>
                <h6>{marker.name}</h6>
                {accessToken && (
                  <button
                    className={
                      marker.is_favorite ? styles.heartBtnAc : styles.heartBtn
                    }
                    onClick={() => handleFavoriteClick(marker)}
                  >
                    <Heart />
                  </button>
                )}
              </div>
              <div className={styles.reviewStats}>
                <span className={styles.rating}>
                  <StoreListStar />
                  {Number(marker.review_avg_score).toFixed(1)}
                </span>
                <Link className={styles.storeLink} href={`/store/${marker.id}`}>
                  {marker.review_cnt}개 리뷰
                </Link>
              </div>
              <div className={styles.categoryTags}>
                <span>{marker.categories}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoreList;

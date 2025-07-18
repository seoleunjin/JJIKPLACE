import { useAppSelector } from "@/hooks/storeMap";
import Image from "next/image";
import styles from "@/styles/storeList.module.css";
import Link from "next/link";
import { StoreListStar } from "@/assets/icons";
import FavoriteButton from "../common/FavoriteButton";
import { useState } from "react";

function StoreList() {
  const { markers } = useAppSelector((state) => state.map);
  const [showAll, setShowAll] = useState(false);

  if (!markers || markers.length === 0) return null;

  const handleToggle = () => {
    setShowAll((prev) => !prev);
  };

  const displayedMarker = showAll ? markers.slice(0, 6) : markers.slice(0, 2);

  return (
    <div className={styles.storeList}>
      <div className={styles.barWrap}>
        <button onClick={handleToggle}></button>
      </div>
      <ul className={styles.listBox}>
        {displayedMarker.map((marker) => {
          const {
            id,
            is_favorite,
            categories,
            review_cnt,
            review_avg_score,
            name,
            thumbnail_url,
          } = marker;
          return (
            <li key={id}>
              <div className={styles.imageBox}>
                <Image
                  src={thumbnail_url || "/images/common/NoImage.png"}
                  alt="리뷰 썸네일 이미지"
                  width={127}
                  height={143}
                />
              </div>
              <div className={styles.contextBox}>
                <div className={styles.header}>
                  <h6>{name}</h6>
                  <FavoriteButton
                    favorite={{
                      id: id,
                      is_favorite: is_favorite,
                    }}
                  />
                </div>
                <div className={styles.reviewStats}>
                  <span className={styles.rating}>
                    <StoreListStar />
                    {Number(review_avg_score).toFixed(1)}
                  </span>
                  <Link className={styles.storeLink} href={`/store/${id}`}>
                    {review_cnt}개 리뷰
                  </Link>
                </div>
                <div className={styles.categoryTags}>
                  <span>{categories}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default StoreList;

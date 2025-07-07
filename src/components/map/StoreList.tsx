import { useAppSelector } from "@/hooks/storeMap";
import Image from "next/image";
import styles from "@/styles/storeList.module.css";
import Link from "next/link";
import { Heart, StoreListStar } from "@/assets/icons";

function StoreList() {
  const { markers } = useAppSelector((state) => state.map);
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
                <button className={styles.heartBtn}>
                  <Heart />
                </button>
              </div>
              <div className={styles.storeDistance}>
                <p>-</p>
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

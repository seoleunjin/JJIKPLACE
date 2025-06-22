"use client";
import layoutStyles from "@/styles/layout.module.css";
import { pageMeta } from "@/constants/pageMeta";
import KakaoMap from "@/components/map/KakaoMap";
// import MapSearch from "@/components/map/Search";
import MapCategory from "@/components/map/Category";
import styles from "@/styles/map.module.css";

export default function MapPage() {
  return (
    <div className={styles.mapPage}>
      <div className={layoutStyles.layout_wrapper}>
        <div className={styles.contentsWrap}>
          <div className={styles.mapWrap}>
            <KakaoMap></KakaoMap>
          </div>
          <div className={styles.mapTop}>
            <MapCategory></MapCategory>
            {/* <MapSearch></MapSearch> */}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

MapPage.title = pageMeta.map.title;

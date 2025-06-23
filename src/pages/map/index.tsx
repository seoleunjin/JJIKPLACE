"use client";
import layoutStyles from "@/styles/layout.module.css";
import { pageMeta } from "@/constants/pageMeta";
import KakaoMap from "@/components/map/KakaoMap";
import MapSearch from "@/components/map/Search";
import MapCategory from "@/components/map/Category";
import styles from "@/styles/map.module.css";
import { useState } from "react";

export default function MapPage() {
  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  console.log("선택된 마커", selectedPosition);
  return (
    <div className={styles.mapPage}>
      <div className={layoutStyles.layout_wrapper}>
        <div className={styles.contentsWrap}>
          <div className={styles.mapWrap}>
            <KakaoMap selectedPosition={selectedPosition} />
          </div>
          <div className={styles.mapTop}>
            <MapSearch onSelectPosition={setSelectedPosition} />
            <MapCategory />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

MapPage.title = pageMeta.map.title;

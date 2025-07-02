"use client";
import { pageMeta } from "@/constants/pageMeta";
import KakaoMap from "@/components/map/KakaoMap";
import MapSearch from "@/components/map/Search";
import MapCategory from "@/components/map/Category";
import styles from "@/styles/map.module.css";
import { useState } from "react";
import StoreList from "@/components/map/StoreList";

export default function MapPage() {
  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  console.log("선택된 마커", selectedPosition);
  return (
    <div className={styles.mapPage}>
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
  );
}

MapPage.title = pageMeta.map.title;

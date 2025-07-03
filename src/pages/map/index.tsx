"use client";
import { pageMeta } from "@/constants/pageMeta";
import KakaoMap from "@/components/map/KakaoMap";
import MapSearch from "@/components/map/Search";
import MapCategory from "@/components/map/Category";
import styles from "@/styles/map.module.css";
import StoreList from "@/components/map/StoreList";
import Link from "next/link";

export default function MapPage() {
  return (
    <div className={styles.mapPage}>
      <div className={styles.contentsWrap}>
        <div className={styles.mapWrap}>
          <KakaoMap></KakaoMap>
        </div>
        <div className={styles.mapTop}>
          <MapCategory></MapCategory>
          <div>
            <Link href={"/map/searchLocation"}>
              <input type="text" />
            </Link>
            <Link href={"/"}></Link>
          </div>
          {/* <MapSearch></MapSearch> */}
        </div>
        <div className={styles.listWrap}>
          <StoreList></StoreList>
        </div>
      </div>
    </div>
  );
}

MapPage.title = pageMeta.map.title;

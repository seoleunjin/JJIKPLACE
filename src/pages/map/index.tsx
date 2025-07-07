"use client";
import { pageMeta } from "@/constants/pageMeta";
import KakaoMap from "@/components/map/KakaoMap";
import MapCategory from "@/components/map/Category";
import styles from "@/styles/map.module.css";
import StoreList from "@/components/map/StoreList";
import Link from "next/link";
import Image from "next/image";
import StoreCard from "@/components/map/StoreCard";
import { useAppSelector } from "@/hooks/storeMap";
// import MapSearch from "@/components/map/Search";

export default function MapPage() {
  const selectedPosition = useAppSelector(
    (state) => state.map.selectedPosition,
  );
  return (
    <div className={styles.mapPage}>
      <div className={styles.contentsWrap}>
        <div className={styles.mapWrap}>
          <KakaoMap></KakaoMap>
        </div>
        <div className={styles.mapTop}>
          {/* 동 검색 개발 필요 공공데이터로 연동해서 */}
          <div className={styles.searchWrap}>
            <Link className={styles.searchBox} href={"/map/searchLocation"}>
              <input type="text" placeholder="지역이나 상점을 검색해보세요." />
            </Link>
            {/* <div className={styles.searchBox}>
              <MapSearch />
            </div> */}
            <Link href={"/"}>
              <Image
                src="/images/map/Navigation.png"
                width="50"
                height="50"
                alt="길찾기"
              />
            </Link>
          </div>
          <MapCategory></MapCategory>
        </div>
        <div className={styles.listWrap}>
          {!selectedPosition && <StoreList />}
        </div>
        <div>
          <StoreCard />
        </div>
      </div>
    </div>
  );
}

MapPage.title = pageMeta.map.title;

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
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function MapPage() {
  const router = useRouter();
  const selectedPosition = useAppSelector(
    (state) => state.map.selectedPosition,
  );

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      router.replace(router.pathname, undefined, { shallow: true });
    }
  }, []);

  return (
    <div className={styles.mapPage}>
      <div className={styles.contentsWrap}>
        <div className={styles.mapWrap}>
          <KakaoMap></KakaoMap>
        </div>
        <div className={styles.mapTop}>
          <div className={styles.searchWrap}>
            <Link className={styles.searchBox} href={"/map/searchLocation"}>
              <input type="text" placeholder="지역이나 상점을 검색해보세요." />
            </Link>
            <Link href={"/map/navigation"}>
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
        {selectedPosition ? (
          <div className={styles.cardWrap}>
            <StoreCard />
          </div>
        ) : (
          <div className={styles.listWrap}>
            <StoreList />
          </div>
        )}
      </div>
    </div>
  );
}

MapPage.title = pageMeta.map.title;

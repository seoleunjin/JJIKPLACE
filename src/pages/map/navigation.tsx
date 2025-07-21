"use client";
import { pageMeta } from "@/constants/pageMeta";
import { useCallback, useEffect, useState } from "react";
import layoutStyles from "@/styles/layout.module.css";
import commonStyles from "@/styles/common.module.css";
import styles from "@/styles/searchLocation.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/storeMap";
import { setStartPoint, setEndPoint } from "@/features/map/mapSlice";
import { useRouter } from "next/router";
import Image from "next/image";
import { MapSearch } from "@/assets/icons";

function Navigation() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [results, setResults] = useState<
    kakao.maps.services.PlacesSearchResultItem[]
  >([]);
  const [searchTarget, setSearchTarget] = useState<"start" | "end" | null>(
    null,
  );
  const { startPoint, endPoint } = useAppSelector((state) => state.map);

  useEffect(() => {
    dispatch(setStartPoint(null));
    dispatch(setEndPoint(null));
  }, [dispatch]);

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clientValue = e.target.value;
    setStartValue(clientValue);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clientValue = e.target.value;
    setEndValue(clientValue);
  };

  const handleSearch = useCallback(
    (target: "start" | "end") => {
      const keyword = (target === "start" ? startValue : endValue)
        .trim()
        .toLowerCase();
      if (!keyword) {
        alert("검색어를 입력해주세요");
        return;
      }
      setSearchTarget(target);

      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(
        keyword,
        (data: kakao.maps.services.PlacesSearchResultItem[], status) => {
          if (status === kakao.maps.services.Status.OK) {
            setResults(data);
          }
        },
      );
    },
    [startValue, endValue],
  );

  const handleSelect = (result: kakao.maps.services.PlacesSearchResultItem) => {
    const lat = parseFloat(result.y);
    const lng = parseFloat(result.x);
    const name = result.place_name || "";
    const position = { lat, lng, name };

    if (searchTarget === "start") {
      dispatch(setStartPoint(position));
      setStartValue(result.place_name || "");
    } else if (searchTarget === "end") {
      dispatch(setEndPoint(position));
      setEndValue(result.place_name || "");
    }

    setResults([]);
    setSearchTarget(null);
    setTimeout(() => {
      const updatedStart = searchTarget === "start" ? position : startPoint;
      const updatedEnd = searchTarget === "end" ? position : endPoint;

      if (updatedStart && updatedEnd) {
        router.push({
          pathname: "/map",
          query: {
            startLat: updatedStart.lat.toString(),
            startLng: updatedStart.lng.toString(),
            endLat: updatedEnd.lat.toString(),
            endLng: updatedEnd.lng.toString(),
          },
        });
      }
    }, 0);
  };

  useEffect(() => {
    const { startLat, startLng, startName } = router.query;
    if (startLat && startLng && startName) {
      const lat = parseFloat(startLat as string);
      const lng = parseFloat(startLng as string);
      const name = startName as string;

      const position = { lat, lng, name };
      dispatch(setStartPoint(position));
      setStartValue(name);
    }
  }, [router.query, dispatch]);

  useEffect(() => {
    const { endLat, endLng, endName } = router.query;
    if (endLat && endLng && endName) {
      const lat = parseFloat(endLat as string);
      const lng = parseFloat(endLng as string);
      const name = endName as string;

      const position = { lat, lng, name };
      dispatch(setEndPoint(position));
      setEndValue(name);
    }
  }, [router.query, dispatch]);

  return (
    <div className={styles.searchPage}>
      <div className={styles.searchBox}>
        <div className={layoutStyles.width}>
          <div className={styles.routeWrapper}>
            <div className={styles.routeImage}>
              <Image
                src={"/images/map/NavigationSearch.png"}
                alt={"길찾기 아이템 이미지"}
                width={16}
                height={60}
              />
            </div>
            <div className={styles.routeInputs}>
              <div className={`${styles.inputGroup} ${styles.startInputGroup}`}>
                <input
                  type="text"
                  placeholder="출발지를 입력해주세요."
                  value={startValue}
                  onChange={handleStartChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch("start");
                  }}
                />
                <button onClick={() => handleSearch("start")}>
                  <MapSearch />
                </button>
              </div>
              <div className={`${styles.inputGroup} ${styles.endInputGroup}`}>
                <input
                  type="text"
                  placeholder="도착지를 입력해주세요."
                  value={endValue}
                  onChange={handleEndChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch("end");
                  }}
                />
                <button onClick={() => handleSearch("end")}>
                  <MapSearch />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.listBox}>
        <div className={layoutStyles.width}>
          <span>검색결과</span>
        </div>
        <ul>
          {results.map((result) => (
            <li key={result.id}>
              <div className={styles.itemBox}>
                <div>
                  <h6>{result.place_name}</h6>
                  <p>
                    {result.address_name} | {result.road_address_name}
                  </p>
                </div>
                <button
                  className={commonStyles.btnBase}
                  onClick={() => handleSelect(result)}
                >
                  선택
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navigation;

Navigation.title = pageMeta.navigation.title;

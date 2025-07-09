import { getMapSearch } from "@/api/map";
import { pageMeta } from "@/constants/pageMeta";
import { MarkerType } from "@/types/map";
import { useState } from "react";
import layoutStyles from "@/styles/layout.module.css";
import commonStyles from "@/styles/common.module.css";
import styles from "@/styles/searchLocation.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/storeMap";
import { setStartPoint, setEndPoint } from "@/features/map/mapSlice";
import { useRouter } from "next/router";

function Navigation() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // 출발지 / 도착지 입력값과 결과 상태 분리
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");

  const [filteredMarkers, setFilteredMarkers] = useState<MarkerType[]>([]);
  const [searchTarget, setSearchTarget] = useState<"start" | "end" | null>(
    null,
  );
  const { startPoint, endPoint } = useAppSelector((state) => state.map);

  // 입력값 변경 핸들러
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartValue(e.target.value);
  };
  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndValue(e.target.value);
  };

  // 검색 함수
  const handleSearch = async (target: "start" | "end") => {
    const keyword = (target === "start" ? startValue : endValue)
      .trim()
      .toLowerCase();
    if (!keyword) {
      alert("검색어를 입력해주세요");
      return;
    }

    const bounds = {
      swLat: 33.0,
      swLng: 124.0,
      neLat: 39.5,
      neLng: 132.0,
    };

    try {
      const response = await getMapSearch(bounds);
      const markers = response.data.markers;

      const filtered = markers.filter((marker: MarkerType) => {
        const name = marker.name?.toLowerCase() || "";
        const addr = marker.road_addr?.toLowerCase() || "";
        return name.includes(keyword) || addr.includes(keyword);
      });
      setFilteredMarkers(filtered);
      setSearchTarget(target);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  // 선택 핸들러
  const handleSelect = (marker: MarkerType) => {
    const position = { lat: marker.lat, lng: marker.lng };

    if (searchTarget === "start") {
      dispatch(setStartPoint(position));
      setStartValue(marker.name || "");
    } else if (searchTarget === "end") {
      dispatch(setEndPoint(position));
      setEndValue(marker.name || "");

      setTimeout(() => {
        router.push("/map");
      }, 0.1);
    }
    // 검색 결과 초기화(선택 후 목록 숨기기)
    setFilteredMarkers([]);
    setSearchTarget(null);
  };

  console.log("출발", startPoint);
  console.log("도착", endPoint);
  return (
    <div className={styles.searchPage}>
      <div className={styles.searchBox}>
        <div className={layoutStyles.width}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="출발지를 입력해주세요."
              value={startValue}
              onChange={handleStartChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch("start");
              }}
            />
            <button onClick={() => handleSearch("start")}>검색</button>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="도착지를 입력해주세요."
              value={endValue}
              onChange={handleEndChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch("end");
              }}
            />
            <button onClick={() => handleSearch("end")}>검색</button>
          </div>
        </div>
      </div>

      {/* 검색 결과 리스트 (검색 대상이 있을 때만 노출) */}
      {searchTarget && filteredMarkers.length > 0 && (
        <div className={styles.listBox}>
          <div className={layoutStyles.width}>
            <span>검색결과</span>
          </div>
          <ul>
            {filteredMarkers.map((marker) => (
              <li key={marker.id}>
                <div className={styles.itemBox}>
                  <div>
                    <h6>{marker.name}</h6>
                    <p>{marker.road_addr}</p>
                  </div>
                  <button
                    className={commonStyles.btnBase}
                    onClick={() => handleSelect(marker)}
                  >
                    선택
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navigation;

Navigation.title = pageMeta.navigation.title;

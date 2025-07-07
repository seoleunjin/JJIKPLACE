import React from "react";
import { getMapSearch } from "@/api/map";
import { MarkerType } from "@/types/map";
import { useRouter } from "next/router";
import { useState } from "react";
import layoutStyles from "@/styles/layout.module.css";
import commonStyles from "@/styles/common.module.css";
import styles from "@/styles/searchLocation.module.css";

function SearchStore() {
  const [value, setValue] = useState("");
  const [filteredMarkers, setFilteredMarkers] = useState<MarkerType[]>([]);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = async () => {
    const keyword = value.trim().toLowerCase();
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
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  const handleSelect = (marker: MarkerType) => {
    console.log(marker);
    router.push({
      pathname: "/write-review/form",
      query: {
        store: marker.id,
        name: encodeURIComponent(marker.name),
      },
    });
  };
  return (
    <div className={styles.searchPage}>
      <div className={styles.searchBox}>
        <div className={layoutStyles.width}>
          <div className={styles.searchWrap}>
            <input
              type="text"
              placeholder="지역이나 상점을 검색해보세요."
              value={value}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button onClick={handleSearch}>검색</button>
          </div>
        </div>
      </div>
      <div className={styles.listBox}>
        <div className={layoutStyles.width}>
          <span>검색결과</span>
        </div>
        {filteredMarkers.length > 0 && (
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
        )}
      </div>
    </div>
  );
}

export default SearchStore;

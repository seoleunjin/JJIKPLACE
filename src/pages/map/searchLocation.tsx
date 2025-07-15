import { getMapSearch } from "@/api/map";
import { pageMeta } from "@/constants/pageMeta";
import { MarkerType } from "@/types/map";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import layoutStyles from "@/styles/layout.module.css";
import commonStyles from "@/styles/common.module.css";
import styles from "@/styles/searchLocation.module.css";

function SearchLocation() {
  const [value, setValue] = useState("");
  const [filteredMarkers, setFilteredMarkers] = useState<MarkerType[]>([]);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSearch = useCallback(
    async (searchValue?: string) => {
      const keyword = (searchValue ?? value).trim().toLowerCase();
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
    },
    [value],
  );

  useEffect(() => {
    const keyword = sessionStorage.getItem("searchKeyword");
    if (keyword) {
      setValue(keyword);
      sessionStorage.removeItem("searchKeyword");
      handleSearch(keyword);
    }
  }, [handleSearch]);

  const handleSelect = (marker: MarkerType) => {
    router.push({
      pathname: "/map",
      query: {
        id: marker.id,
        lat: marker.lat.toString(),
        lng: marker.lng.toString(),
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
            <button onClick={() => handleSearch()}>검색</button>
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

export default SearchLocation;

SearchLocation.title = pageMeta.search.title;

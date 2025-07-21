"use client";
import { pageMeta } from "@/constants/pageMeta";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import layoutStyles from "@/styles/layout.module.css";
import commonStyles from "@/styles/common.module.css";
import styles from "@/styles/searchLocation.module.css";
import { useAppDispatch } from "@/hooks/storeMap";
import { setSearchPosition } from "@/features/map/mapSlice";
import { MapSearch } from "@/assets/icons";

function SearchLocation() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [results, setResults] = useState<
    kakao.maps.services.PlacesSearchResultItem[]
  >([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clientValue = e.target.value;
    setValue(clientValue);
  };

  const handleSearch = (searchValue?: string) => {
    const rawKeyword = typeof searchValue === "string" ? searchValue : value;
    const keyword = rawKeyword.trim().toLowerCase();

    if (!keyword) {
      alert("검색어를 입력해주세요");
      return;
    }
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(
      value,
      (data: kakao.maps.services.PlacesSearchResultItem[], status) => {
        if (status === kakao.maps.services.Status.OK) {
          setResults(data);
        }
      },
    );
  };

  useEffect(() => {
    const keyword = sessionStorage.getItem("searchKeyword");
    if (keyword) {
      setValue(keyword);
      sessionStorage.removeItem("searchKeyword");
      handleSearch(keyword);
    }
  }, []);

  const handleSelect = (result: kakao.maps.services.PlacesSearchResultItem) => {
    const lat = parseFloat(result.y);
    const lng = parseFloat(result.x);

    dispatch(
      setSearchPosition({
        lat,
        lng,
      }),
    );

    router.push({
      pathname: "/map",
      query: { lat: lat.toString(), lng: lng.toString() },
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
            <button onClick={() => handleSearch()}>
              <MapSearch />
            </button>
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

export default SearchLocation;

SearchLocation.title = pageMeta.search.title;

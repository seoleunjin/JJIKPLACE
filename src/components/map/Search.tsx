"use client";

import { useState, useEffect } from "react";
import { useAppDispatch } from "@/hooks/storeMap";
import { setSearchPosition } from "@/features/map/mapSlice";

type AddressResult = {
  address_name: string;
  y: string;
  x: string;
};

function MapSearch() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<AddressResult[]>([]);
  const dispatch = useAppDispatch();

  const handleSearchClick = async (address: string) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK && result.length > 0) {
        const { y, x } = result[0];
        dispatch(setSearchPosition({ lat: parseFloat(y), lng: parseFloat(x) }));
      } else {
        alert("주소 변환 실패");
      }
    });
  };

  useEffect(() => {
    if (!value.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      const ps = new kakao.maps.services.Places();

      ps.keywordSearch(value, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const seen = new Set<string>();
          const filtered = data.filter((d) => {
            const addr = d.address_name;
            // "동" 또는 "면" 포함 && 숫자 없는 주소 && 중복 제거
            const isValid =
              (addr.includes("동") || addr.includes("면")) && !/\d/.test(addr);
            if (isValid && !seen.has(addr)) {
              seen.add(addr);
              return true;
            }
            return false;
          });

          setResults(filtered); // 전체 결과 보여주기
        } else {
          setResults([]);
        }
      });
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="동이나 면 이름을 입력하세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: "100%", padding: "8px" }}
      />
      {results.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "40px",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            zIndex: 1000,
            maxHeight: "300px", // 결과 많을 경우 스크롤
            overflowY: "auto",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {results.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleSearchClick(item.address_name)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {item.address_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MapSearch;

"use client";

import { ChangeEvent, useState } from "react";

export default function AddressSearch() {
  const [coord, setCoord] = useState<{ x: string; y: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value;
    setValue(target);
  };

  const handleOnClick = async () => {
    try {
      const res = await fetch(
        `/api/geocode?address=${encodeURIComponent(value)}`,
      );
      const data = await res.json();
      console.log("응답 데이터:", data);

      setCoord(data.response.result.point);
    } catch (err) {
      setError("요청 실패");
      console.error(err);
    }
  };

  return (
    <div style={{ paddingTop: "200px" }}>
      <input
        value={value}
        type="text"
        onChange={handleOnChange}
        placeholder="도로명 또는 상점명을 검색해주세요"
      />
      <button onClick={handleOnClick}>클릭</button>
      <h1>주소 → 좌표 변환 결과</h1>
      {coord ? (
        <p>
          위도: {coord.y}, 경도: {coord.x}
        </p>
      ) : (
        <p>{error || "불러오는 중..."}</p>
      )}
    </div>
  );
}

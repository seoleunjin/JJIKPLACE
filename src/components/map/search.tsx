import React, { useEffect, useState } from "react";
import { getMapSearch } from "@/api/map";

function MapSearch() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const swLat = 33.0;
        const swLng = 124.0;
        const neLat = 43.0;
        const neLng = 132.0;

        const response = await getMapSearch(swLat, swLng, neLat, neLng);
        console.log("📌 API 응답 데이터:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("❌ API 호출 실패:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>MapSearch</h2>
      <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>
    </div>
  );
}

export default MapSearch;

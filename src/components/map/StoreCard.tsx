"use client";

import { useAppSelector } from "@/hooks/storeMap";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import { getNearbyStudios } from "@/api/map";

export default function StoreCard() {
  const selectedPosition = useAppSelector(
    (state) => state.map.selectedPosition,
  );
  const { markers } = useAppSelector((state) => state.map);
  const router = useRouter();

  const id = parseInt(router.query.id as string, 10);
  const selectedStore = markers.find((marker) => marker.id === id);

  // ✅ selectedPosition 기반 API 호출
  useEffect(() => {
    if (!selectedPosition) return;

    const fetchNearbyStores = async () => {
      try {
        const response = await getNearbyStudios({
          lat: selectedPosition.lat,
          lng: selectedPosition.lng,
        });
        console.log("✅ 주변 스튜디오 목록:", response.data);
      } catch (error) {
        console.error("❌ 주변 스튜디오 API 호출 실패:", error);
      }
    };

    fetchNearbyStores();
  }, [selectedPosition]);

  if (!selectedStore) return null;

  return (
    <div className="store-card">
      <h3>{selectedStore.name}</h3>
      <p>{selectedStore.road_addr}</p>
      <p>리뷰 수: {selectedStore.review_cnt}</p>
      <p>평점: {selectedStore.review_avg_score}</p>

      {/* ✅ 주변 스튜디오 목록 출력 */}
      {markers.length > 0 && (
        <div className="nearby-stores">
          <h4>📍 주변 스튜디오</h4>
          <ul>
            {markers.map((marker) => (
              <li key={marker.id}>
                {marker.name} - {marker.road_addr}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

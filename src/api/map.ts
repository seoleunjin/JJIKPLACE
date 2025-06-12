import { MapBounds } from "@/types/api";
import { instance } from "./apiClient";

function fetchClusterData(path: string, bounds: MapBounds) {
  const { swLat, swLng, neLat, neLng } = bounds;
  return instance.get(path, {
    params: {
      sw_lat: swLat,
      sw_lng: swLng,
      ne_lat: neLat,
      ne_lng: neLng,
    },
  });
}

// 함수 내보내기
export { fetchClusterData };

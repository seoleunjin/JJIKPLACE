// api/map.ts
import { MapBounds } from "@/types/api";
import { instance } from "./apiClient";

function fetchClusterData(path: string, bounds: MapBounds, category?: string) {
  const { swLat, swLng, neLat, neLng } = bounds;
  return instance.get(path, {
    params: {
      sw_lat: swLat,
      sw_lng: swLng,
      ne_lat: neLat,
      ne_lng: neLng,
      ...(category ? { category } : {}),
    },
  });
}

const getMapSearch = (bounds: MapBounds) => {
  const { swLat, swLng, neLat, neLng } = bounds;
  return instance.get("/cluster/dongmyeon", {
    params: {
      sw_lat: swLat,
      sw_lng: swLng,
      ne_lat: neLat,
      ne_lng: neLng,
    },
  });
};

export { fetchClusterData, getMapSearch };

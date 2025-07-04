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
  return instance.get("/cluster/marker", {
    params: {
      sw_lat: swLat,
      sw_lng: swLng,
      ne_lat: neLat,
      ne_lng: neLng,
    },
  });
};

const getNearbyStudios = async ({
  lat,
  lng,
  offset = 0,
  limit = 3,
  category = "",
}: {
  lat: number;
  lng: number;
  offset?: number;
  limit?: number;
  category?: string;
}) => {
  return instance.get("/studios/nearby", {
    params: {
      lat,
      lng,
      offset,
      limit,
      category,
    },
  });
};

export { fetchClusterData, getMapSearch, getNearbyStudios };

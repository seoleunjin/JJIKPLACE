// api/map.ts
import { MapBounds } from "@/types/api";
import { instance, userInstance } from "./apiClient";

function fetchClusterData(path: string, bounds: MapBounds, category?: string) {
  const { swLat, swLng, neLat, neLng } = bounds;
  const token = localStorage.getItem("accessToken");
  const apiClient = token ? userInstance : instance;
  return apiClient.get(path, {
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

async function toggleFavorite(ps_id: number, currentFavorite: boolean) {
  if (currentFavorite) {
    return userInstance.post(`/favorite/${ps_id}`);
  } else {
    return userInstance.delete(`/favorite/${ps_id}`);
  }
}
export { fetchClusterData, getMapSearch, getNearbyStudios, toggleFavorite };

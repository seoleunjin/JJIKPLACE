interface StoreType {
  avg_rating: number;
  categories: string[];
  name: string;
  ps_id: number;
  review_count: number;
}
interface ImageItem {
  review_id: number;
  review_image: string;
}
interface StoreNearbyItems {
  categories: string[];
  distance_km: number;
  lat: number;
  lng: number;
  name: string;
  ps_id: number;
  review_avg_score: number;
  review_cnt: number;
  road_addr: string;
  thumbnail_url: string | null;
  is_favorite: boolean;
}
export type { StoreType, ImageItem, StoreNearbyItems };

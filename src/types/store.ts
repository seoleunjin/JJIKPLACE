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

export type { StoreType, ImageItem };

interface ReviewType {
  review_id: number;
  rating: number;
  content: string;
  image_url: string | null;
  created_at: string;
  thumbnail_url: string | null;
  user_nickname: string;
}

interface ReviewList {
  has_more: boolean;
  items: ReviewType[];
  limit: number;
  offset: number;
  total: number;
}

interface ReviewDetaileType {
  content: string;
  created_at: string;
  image_url: string | null;
  name: string;
  ps_id: number;
  rating: number;
  review_id: number;
  updated_at: string;
  user_id: number;
  user_nickname: string;
  user_profile: string;
}
export type { ReviewType, ReviewList, ReviewDetaileType };

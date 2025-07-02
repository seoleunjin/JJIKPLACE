// 랭킹 파라미터 타입
interface RankingType {
  days: number;
  m: number;
  limit: number;
}
// 랭킹반환 타입
interface RankingItem {
  ps_id: number;
  name: string;
  avg_rating: number;
  review_cnt: number;
  weighted_rating: number;
  image_url: string;
  rank: number;
}

export type { RankingItem, RankingType };

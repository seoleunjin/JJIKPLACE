import { RankingType } from "@/types/homeType";
import { instance } from "./apiClient";

// 실시간 랭킹
const liveRankingAPI = async (params: RankingType) => {
  const res = await instance.get("/studios/ranking", {
    params: params,
  });
  return res.data;
};

export { liveRankingAPI };

import React, { useEffect, useState } from "react";
import HomeStyles from "@/styles/home.module.css";
import { RankingItem, RankingType } from "@/types/homeType";
import { liveRankingAPI } from "@/api/homeApi";
import { useRouter } from "next/router";

function LiveRanking() {
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const liveRanking = useCallback(async () => {
    const params: RankingType = {
      days: 30,
      m: 1,
      limit: 10,
    };
    try {
      const res: RankingItem[] = await liveRankingAPI(params);
      console.log(res, "랭킹");
      setRanking(res);
    } catch (err) {
      console.error(err);
    } finally {
      console.log(ranking, "랭킹 결과값");
    }
  }, []);

  useEffect(() => {
    liveRanking();
  }, [liveRanking]);

  // 해당 가게로 이동
  const router = useRouter();
  const storeMark = (id: number) => {
    router.push({
      pathname: "/map",
      query: { id: id },
      // lat, lng 값이 필요
    });
  };

  return (
    <article>
      <div>
        <p className={HomeStyles.home_title}>실시간 인기 랭킹 확인하기</p>
        <p className={HomeStyles.home_sub_title}>
          가장 많은 리뷰를 받은 순으로 정리했어요!
        </p>
      </div>
      <div
        className={`${HomeStyles.live_rank_thumnail} ${HomeStyles.thumbnail_box}`}
      >
        <ul className={HomeStyles.high_ranking}>
          {ranking.slice(0, 3).map((item, index) => (
            <li
              onClick={() => storeMark(item.ps_id)}
              key={item.ps_id}
              className={
                index === 0
                  ? HomeStyles.rank1
                  : index === 1
                    ? HomeStyles.rank0
                    : HomeStyles.rank2
              }
            >
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/home/rank_${index + 1}st.svg`}
                  alt={`${index + 1}st rank badge`}
                  className={HomeStyles.rank_crown_image}
                />
                <p className={HomeStyles.high_ranking_title}>
                  {item.name.split(" ").map((word, idx) => (
                    <React.Fragment key={idx}>
                      {word}
                      {idx !== item.name.split(" ").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
                <p className={HomeStyles.high_ranking_count}>
                  {item.review_cnt}건
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ul className={HomeStyles.row_ranking}>
        {ranking.slice(3).map((item, index) => (
          <li key={item.ps_id} onClick={() => storeMark(item.ps_id)}>
            <div>
              <span className={HomeStyles.lg_fonts}>{index + 4}</span>
              <span>{item.name}</span>
            </div>
            <p className={HomeStyles.lg_fonts}>{item.review_cnt}건</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default LiveRanking;

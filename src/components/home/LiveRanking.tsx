import React from "react";
import HomeStyles from "@/styles/home.module.css";

function LiveRanking() {
  const data = [
    {
      idx: 1,
      title: "인생네컷 동대구",
      count: 100,
    },
    {
      idx: 2,
      title: "인생네컷 중앙로",
      count: 95,
    },
    {
      idx: 3,
      title: "인생네컷 교동",
      count: 92,
    },
    {
      idx: 4,
      title: "인생네컷 서대구역",
      count: 90,
    },
    {
      idx: 5,
      title: "인생네컷 북구청",
      count: 80,
    },
    {
      idx: 6,
      title: "인생네컷 중앙로2",
      count: 70,
    },
    {
      idx: 7,
      title: "인생네컷 대구역",
      count: 60,
    },
    {
      idx: 8,
      title: "인생네컷 동구청점",
      count: 50,
    },
    {
      idx: 9,
      title: "인생네컷 상인역",
      count: 50,
    },
    {
      idx: 10,
      title: "인생네컷 팔거역",
      count: 50,
    },
  ];

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
          {data.slice(0, 3).map((item, index) => (
            <li
              key={item.idx}
              className={
                index === 0
                  ? HomeStyles.rank1
                  : index === 1
                    ? HomeStyles.rank0
                    : HomeStyles.rank2
              }
            >
              <div>
                <p className={HomeStyles.high_ranking_title}>
                  {item.title.split(" ").map((word, idx) => (
                    <React.Fragment key={idx}>
                      {word}
                      {idx !== item.title.split(" ").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
                <p className={HomeStyles.high_ranking_count}>{item.count}건</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ul className={HomeStyles.row_ranking}>
        {data.slice(3).map((item, index) => (
          <li key={item.idx}>
            <div>
              <span className={HomeStyles.lg_fonts}>{index + 4}</span>
              <span>{item.title}</span>
            </div>
            <p className={HomeStyles.lg_fonts}>{item.count}건</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default LiveRanking;

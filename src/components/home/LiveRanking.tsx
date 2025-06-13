import React from "react";
import HomeStyles from "@/styles/home.module.css";

function LiveRanking() {
  return (
    <article>
      <div>
        <p className={HomeStyles.home_title}>실시간 인기 랭킹 확인하기</p>
        <p className={HomeStyles.home_sub_title}>
          가장 많은 리뷰를 받은 순으로 정리했어요!
        </p>
      </div>
      <div className={HomeStyles.thumbnail_box}></div>
    </article>
  );
}

export default LiveRanking;

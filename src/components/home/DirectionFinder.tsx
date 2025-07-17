import React from "react";
import HomeStyles from "@/styles/home.module.css";
import Image from "next/image";

function DirectionFinder() {
  return (
    <article>
      <div>
        <p className={HomeStyles.home_title}>길찾기 서비스</p>
        <p className={HomeStyles.home_sub_title}>
          목적지까지 편하게 찾아가실 수 있어요.
        </p>
      </div>
      <div className={HomeStyles.thumbnail_box}>
        <Image
          src="/images/home/home_direction_thumbnail.svg"
          alt="길찾기 썸네일"
          width={340}
          height={194}
        />
      </div>
    </article>
  );
}

export default DirectionFinder;

import React from "react";
import layoutStyles from "@/styles/layout.module.css";
import HomeStyles from "@/styles/home.module.css";

function HomeBanner() {
  return (
    <article
      className={`${HomeStyles.home_banner_wrapper} ${layoutStyles.layout_wrapper}`}
    >
      <div className={HomeStyles.banner_text_box}>
        <p className={HomeStyles.banner_text01}>
          지금, <br />
          <span>이 순간</span>을 <br />
          프레임에 쏙!
        </p>
        <p className={HomeStyles.banner_text02}>
          귀엽게, 멋지게, 아무렇게나 찰칵 <br /> 가장 가까운 셀프사진관 보기
        </p>
      </div>
    </article>
  );
}

export default HomeBanner;

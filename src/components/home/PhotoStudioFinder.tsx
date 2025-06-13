import React from "react";
import layoutStyles from "@/styles/layout.module.css";
import HomeStyles from "@/styles/home.module.css";
import KakaoMap from "../map/kakaoMap";
import PhotoStudioList from "./PhotoStudioList";
import { useRouter } from "next/router";

function PhotoStudioFinder() {
  const router = useRouter();
  const pushMap = () => {
    router.push("/map");
  };

  return (
    <article className={layoutStyles.layout_wrapper}>
      <div className={HomeStyles.photostudio_text_box}>
        <p className={HomeStyles.home_title}>
          셀프사진관 찾기, 지금 시작하세요!
        </p>
        <p className={HomeStyles.home_sub_title}>
          원하는 지역을 검색하고 가까운 셀프사진관을 찾아보세요.
        </p>
        <input
          className={HomeStyles.search_input}
          type="search"
          placeholder="원하는 지역을 검색해보세요."
        />
      </div>
      <div className={HomeStyles.photostudio_map_wrapper}>
        <div className={HomeStyles.photostudio_kakao_map}>
          <KakaoMap />
        </div>
        <div className={HomeStyles.photostudio_photo_list}>
          <PhotoStudioList />
        </div>
      </div>
      <p onClick={pushMap} className={HomeStyles.photostudio_more_btn}>
        더 많은 사진관 보러가기
      </p>
    </article>
  );
}

export default PhotoStudioFinder;

import React, { useState } from "react";
import layoutStyles from "@/styles/layout.module.css";
import HomeStyles from "@/styles/home.module.css";
import KakaoMap from "../map/KakaoMap";
import PhotoStudioList from "./PhotoStudioList";
import { useRouter } from "next/router";
import Search from "@/assets/icons/search.svg";
import Link from "next/link";

function PhotoStudioFinder() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const searching = () => {
    // alert(`${search} 검색`);
    const trimmedSearch = search.trim();

    if (!trimmedSearch) {
      alert("검색어를 입력해주세요");
    } else {
      sessionStorage.setItem("searchKeyword", search);
      router.push({
        pathname: "/map/searchLocation",
      });
    }
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
        <div className={HomeStyles.search_box}>
          <input
            className={HomeStyles.search_input}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                searching();
              }
            }}
            type="search"
            placeholder="원하는 지역을 검색해보세요."
          />
          <Search onClick={searching} className={HomeStyles.search_icon} />
        </div>
      </div>
      <div className={HomeStyles.photostudio_map_wrapper}>
        <div className={HomeStyles.photostudio_kakao_map}>
          <KakaoMap />
        </div>
        <div className={HomeStyles.photostudio_photo_list}>
          <PhotoStudioList />
        </div>
      </div>
      <Link href={"/map"} className={HomeStyles.photostudio_more_btn}>
        더 많은 사진관 보러가기
      </Link>
    </article>
  );
}

export default PhotoStudioFinder;

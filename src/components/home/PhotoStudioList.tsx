// import { BackIcon } from "@/assets/icons";
import { BackIcon } from "@/assets/icons";
import HomeStyles from "@/styles/home.module.css";
import { useRouter } from "next/router";
import React from "react";

type NearStoreType = {
  ps_id: number;
  name: string;
  road_addr: string;
  lat: number;
  lng: number;
  categories: string[];
  distance_km: number;
  review_avg_score: number;
  review_cnt: number;
  is_favorite: boolean;
  thumbnail_url: string | null;
};

function PhotoStudioList({ nearStore }: { nearStore: NearStoreType[] }) {
  // console.log(nearStore, "전달 받은 가게");

  // 해당 가게로 이동
  const router = useRouter();
  const storeMark = (id: number, lat: number, lng: number) => {
    router.push({
      pathname: "/map",
      query: { id, lat, lng },
    });
  };

  return (
    <article className={HomeStyles.top}>
      {nearStore.map((item, index) => {
        return (
          <div
            key={item?.ps_id}
            className={HomeStyles.photo_studio_list_wrapper}
            onClick={() => storeMark(item.ps_id, item.lat, item.lng)}
          >
            <div className={HomeStyles.psl_number_box}>
              {/* <p>{item.time}분</p> */}
              <p>
                {index === 0
                  ? "현재"
                  : `${(item?.distance_km * 100).toFixed()}M`}
              </p>
            </div>
            <div className={HomeStyles.psl_text_box01}>
              <div className={HomeStyles.psl_text_box02}>
                <p>{item?.name}</p>
                <p>{item?.categories?.join("")?.replace(/#/g, " #")}</p>
              </div>
              <p>
                <BackIcon
                  style={{ fill: "#000", transform: "rotate(180deg)" }}
                />
              </p>
            </div>
          </div>
        );
      })}
    </article>
  );
}

export default PhotoStudioList;

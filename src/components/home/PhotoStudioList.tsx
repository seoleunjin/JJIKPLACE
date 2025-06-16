// import { BackIcon } from "@/assets/icons";
import { BackIcon } from "@/assets/icons";
import HomeStyles from "@/styles/home.module.css";
import React from "react";

function PhotoStudioList() {
  const data = [
    {
      idx: 1,
      time: 5,
      distance: 300,
      name: "인생네컷-동성로점",
      tag: "#캐릭터",
    },
    {
      idx: 2,
      time: 7,
      distance: 500,
      name: "인생네컷-교동점",
      tag: "#복고",
    },
    {
      idx: 3,
      time: 10,
      distance: 600,
      name: "인생네컷-반월당점",
      tag: "#캐릭터",
    },
  ];

  return (
    <article className={HomeStyles.top}>
      {data.map((item) => {
        return (
          <div key={item.idx} className={HomeStyles.photo_studio_list_wrapper}>
            <div className={HomeStyles.psl_number_box}>
              <p>{item.time}분</p>
              <p>{item.distance}M</p>
            </div>
            <div className={HomeStyles.psl_text_box01}>
              <div className={HomeStyles.psl_text_box02}>
                <p>{item.name}</p>
                <p>{item.tag}</p>
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

import { pageMeta } from "@/constants/pageMeta";
import { useRouter } from "next/router";
import React, { useState } from "react";
import layoutStyles from "@/styles/layout.module.css";
import posecss from "@/styles/pose.module.css";
import { poseImages } from "@/api/poseData";
import Image from "next/image";

function PosePage() {
  const router = useRouter();
  // 포즈선택
  const [selectPose, setSelectPose] = useState<number[]>([]);
  const select = (id: number) => {
    if (selectPose.includes(id)) {
      setSelectPose(selectPose.filter((item) => item !== id));
    } else {
      if (selectPose.length >= 4) {
        alert("최대 4개 선택 가능합니다.");
        return;
      }
      setSelectPose([...selectPose, id]);
    }
  };

  // 프레임 선택 이동
  const frameSelect = () => {
    if (selectPose.length < 4) {
      alert("포즈를 4개 선택해 주세요.");
      return;
    }
    router.push({
      pathname: "/pose/frame",
      query: {
        pose: selectPose.join(","),
      },
    });
  };

  return (
    <article style={{ paddingTop: "60px" }} className={`${layoutStyles.width}`}>
      <div className={posecss.pose_list}>
        {poseImages.map((img) => (
          <div
            key={img.id}
            className={selectPose?.includes(img.id) ? posecss.selectImg : ""}
            onClick={() => select(img.id)}
          >
            <Image
              src={img.src}
              alt={`포즈 ${img.id}`}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
            {selectPose?.includes(img.id) ? (
              <p className={posecss.selectNumber}>
                {selectPose.indexOf(img.id) + 1}
              </p>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <div className={posecss.frame_btn} onClick={frameSelect}>
        <div></div>
        <p>프레임 넣기</p>
      </div>
    </article>
  );
}

export default PosePage;
PosePage.title = pageMeta.pose.title;

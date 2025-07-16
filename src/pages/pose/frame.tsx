import { pageMeta } from "@/constants/pageMeta";
import { useRouter } from "next/router";
import React, { useState } from "react";
import layoutStyles from "@/styles/layout.module.css";
import posecss from "@/styles/pose.module.css";
import { frameImages } from "@/api/poseData";
import HashTag from "@/assets/icons/hashtag.svg";
import Image from "next/image";

function PosePage() {
  const router = useRouter();
  const [selectPose, setSelectPose] = useState<number[]>([]);
  const select = (id: number) => {
    if (selectPose.includes(id)) {
      setSelectPose(selectPose.filter((item) => item !== id));
    } else {
      setSelectPose([id]);
    }
  };

  const photoPreview = () => {
    if (selectPose.length < 1) {
      alert("프레임을 선택해 주세요.");
      return;
    }
    router.push({
      pathname: "/pose/pose",
      query: {
        frame: selectPose[0],
      },
    });
  };

  return (
    <article style={{ paddingTop: "60px" }} className={`${layoutStyles.width}`}>
      <h2 className={posecss.pose_title}>마음에 드는 프레임를 선택해보세요.</h2>
      <div className={posecss.pose_list}>
        {frameImages.map((img) => (
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
              <p className={posecss.selectNumber}>✓</p>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <div className={posecss.frame_btn} onClick={photoPreview}>
        <div>
          <HashTag className={posecss.hashTag}></HashTag>
        </div>
        <p>포즈 선택</p>
      </div>
    </article>
  );
}

export default PosePage;
PosePage.title = pageMeta.pose.title;

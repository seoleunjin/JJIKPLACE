import { useRouter } from "next/router";
import React, { useState } from "react";
import layoutStyles from "@/styles/layout.module.css";
import posecss from "@/styles/pose.module.css";
import { pageMeta } from "@/constants/pageMeta";
import { poseImages } from "@/api/poseData";
import Image from "next/image";

// import poseCss from "@/styles/pose.module.css";

function FramePage() {
  const router = useRouter();
  const frameId = parseInt(router.query.frame as string, 10);

  // 포즈선택
  const maxSelectable = frameId === 4 ? 6 : 4;
  const [selectPose, setSelectPose] = useState<number[]>([]);
  const select = (id: number) => {
    if (selectPose.includes(id)) {
      setSelectPose(selectPose.filter((item) => item !== id));
    } else {
      if (selectPose.length >= maxSelectable) {
        alert(`최대 ${maxSelectable}개 선택 가능합니다.`);
        return;
      }
      setSelectPose([...selectPose, id]);
    }
  };

  //  미리보기 이동
  const photoPreview = () => {
    if (selectPose.length < maxSelectable) {
      alert(`포즈를 ${maxSelectable}개 선택해 주세요.`);
      return;
    }
    router.push({
      pathname: "/pose/preview",
      query: {
        pose: selectPose.join(","),
        frame: frameId,
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
      <div className={posecss.frame_btn} onClick={photoPreview}>
        <div></div>
        <p>미리 보기</p>
      </div>
    </article>
  );
}

export default FramePage;
FramePage.title = pageMeta.pose.title;

import { useRouter } from "next/router";
import React, { useState } from "react";
import layoutStyles from "@/styles/layout.module.css";
import posecss from "@/styles/pose.module.css";
import { pageMeta } from "@/constants/pageMeta";
import { frameImages } from "@/api/poseData";
import Image from "next/image";

// import poseCss from "@/styles/pose.module.css";

function FramePage() {
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
    router.push("/pose/preview");
  };

  return (
    <article style={{ paddingTop: "60px" }} className={`${layoutStyles.width}`}>
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
        <div></div>
        <p>미리보기</p>
      </div>
    </article>
  );
}

export default FramePage;
FramePage.title = pageMeta.pose.title;

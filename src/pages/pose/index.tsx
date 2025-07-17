import React from "react";
import layoutStyles from "@/styles/layout.module.css";
import { pageMeta } from "@/constants/pageMeta";
import posecss from "@/styles/pose.module.css";
import { poseImages } from "@/api/poseData";
import HashTag from "@/assets/icons/hashtag.svg";
// import Image from "next/image";
import Link from "next/link";
import ImageWithSkeleton from "@/components/common/ImageWithSkeleton";

function PoseIndex() {
  return (
    <article style={{ paddingTop: "60px" }} className={`${layoutStyles.width}`}>
      <div className={posecss.pose_list}>
        {/* {poseImages.map((img) => (
          <div key={img.id}>
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
          </div>
        ))} */}
        {poseImages.map((img) => (
          <ImageWithSkeleton
            key={img.id}
            src={img.src}
            alt={`포즈 ${img.id}`}
          />
        ))}
      </div>

      <Link href={"/pose/frame"} className={posecss.frame_btn}>
        <div>
          <HashTag className={posecss.hashTag}></HashTag>
        </div>
        <p>프레임 넣기</p>
      </Link>
    </article>
  );
}

export default PoseIndex;
PoseIndex.title = pageMeta.pose.title;

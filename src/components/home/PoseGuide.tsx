import React from "react";
import HomeStyles from "@/styles/home.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

function PoseGuide() {
  const router = useRouter();
  const pushPoseGuide = () => {
    router.push("/pose");
  };

  return (
    <article onClick={pushPoseGuide}>
      <div>
        <p className={HomeStyles.home_title}>포즈 고민 끝!</p>
        <p className={HomeStyles.home_sub_title}>
          찍기 전, 포즈를 프레임에 쏙 담아보세요.
        </p>
      </div>
      <div className={HomeStyles.thumbnail_box}>
        <Image
          src="/images/home/home_pose_thumbnail.svg"
          alt="길찾기 썸네일"
          width={340}
          height={194}
        />
      </div>
    </article>
  );
}

export default PoseGuide;

import React, { useEffect, useRef } from "react";
import layoutStyles from "@/styles/layout.module.css";
import { pageMeta } from "@/constants/pageMeta";
import { useRouter } from "next/router";
// import poseCss from "@/styles/pose.module.css";

const Preview = () => {
  const router = useRouter();
  const poseIds = (router.query.pose as string)?.split(",").map(Number) || [];
  const frameId = parseInt(router.query.frame as string, 10);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 쿼리에서 포즈/프레임 정보 받아오기
  const poseImages = poseIds.map(
    (id) => `/images/pose/pose/pose${String(id).padStart(2, "0")}.png`,
  );

  const frameImage = "/images/pose/realframe/realframe01.png";
  // const frameImage = `/images/pose/frame/frame${String(frameId).padStart(2, "0")}.png`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = 800;
    const canvasHeight = 800;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // 이미지를 모두 불러오고 그리기
    const images = [
      ...poseImages.map((src) => loadImage(src)),
      loadImage(frameImage),
    ];

    Promise.all(images).then(([pose1, pose2, pose3, pose4, frame]) => {
      // 배경색
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // 포즈 4개를 2x2로 배치
      const halfW = canvasWidth / 2;
      const halfH = canvasHeight / 2;
      ctx.drawImage(pose1, 0, 0, halfW, halfH);
      ctx.drawImage(pose2, halfW, 0, halfW, halfH);
      ctx.drawImage(pose3, 0, halfH, halfW, halfH);
      ctx.drawImage(pose4, halfW, halfH, halfW, halfH);
      // 프레임을 맨 위에 전체 덮어 씌움
      ctx.drawImage(frame, 0, 0, canvasWidth, canvasHeight);

      // const innerPadding = 40; // 프레임 두께를 고려한 여백
      // const halfW = (canvasWidth - innerPadding * 2) / 2;
      // const halfH = (canvasHeight - innerPadding * 2) / 2;
      // const offsetX = innerPadding;
      // const offsetY = innerPadding;
      // // 사진 그리기 (프레임 안에 위치하게)
      // ctx.drawImage(pose1, offsetX + 0, offsetY + 0, halfW, halfH);
      // ctx.drawImage(pose2, offsetX + halfW, offsetY + 0, halfW, halfH);
      // ctx.drawImage(pose3, offsetX + 0, offsetY + halfH, halfW, halfH);
      // ctx.drawImage(pose4, offsetX + halfW, offsetY + halfH, halfW, halfH);
      // // 프레임은 그대로 맨 위에 덮기
      // ctx.drawImage(frame, 0, 0, canvasWidth, canvasHeight);
    });
  }, []);

  return (
    <article style={{ paddingTop: "60px" }} className={`${layoutStyles.width}`}>
      <h1>미리보기</h1>
      <canvas ref={canvasRef} style={{ border: "1px solid #ccc" }} />
    </article>
  );
};

export default Preview;
Preview.title = pageMeta.pose.title;

// 도우미 함수: 이미지 로딩을 Promise로 처리
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // 외부 이미지 처리 시 필요
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

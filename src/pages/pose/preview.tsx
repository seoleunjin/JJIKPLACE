import React, { useEffect, useRef, useState } from "react";
import layoutStyles from "@/styles/layout.module.css";
import posecss from "@/styles/pose.module.css";
import { pageMeta } from "@/constants/pageMeta";
import { useRouter } from "next/router";
// import poseCss from "@/styles/pose.module.css";

const Preview = () => {
  const router = useRouter();
  const poseIds = (router.query.pose as string)?.split(",").map(Number) || [];
  const frameId = parseInt(router.query.frame as string, 10);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 쿼리에서 포즈/프레임 정보 받아오기
  const poseImages = poseIds.map(
    (id) => `/images/pose/pose/pose${String(id).padStart(2, "0")}.png`,
  );
  const frameImage = `/images/pose/realframe/realframe${String(frameId).padStart(2, "0")}.png`;

  useEffect(() => {
    if (!router.isReady) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    type FrameLayout = {
      frameImage: string;
      layout: { x: number; y: number; width: number; height: number }[];
    };
    const frameLayouts: Record<number, FrameLayout> = {
      1: {
        frameImage: "/images/pose/realframe/realframe01.png",
        layout: [
          { x: 0.108, y: 0.02, width: 0.382, height: 0.382 },
          { x: 0.51, y: 0.02, width: 0.382, height: 0.382 },
          { x: 0.108, y: 0.412, width: 0.382, height: 0.382 },
          { x: 0.51, y: 0.412, width: 0.382, height: 0.382 },
        ],
      },
      2: {
        frameImage: "/images/pose/realframe/realframe02.png",
        layout: [
          { x: 0.375, y: 0.0, width: 0.25, height: 0.25 },
          { x: 0.375, y: 0.25, width: 0.25, height: 0.25 },
          { x: 0.375, y: 0.5, width: 0.25, height: 0.25 },
          { x: 0.375, y: 0.75, width: 0.25, height: 0.25 },
        ],
      },
      3: {
        frameImage: "/images/pose/realframe/realframe03.png",
        layout: [
          { x: 0.108, y: 0.156, width: 0.382, height: 0.382 },
          { x: 0.51, y: 0.06, width: 0.382, height: 0.382 },
          { x: 0.108, y: 0.558, width: 0.382, height: 0.382 },
          { x: 0.51, y: 0.462, width: 0.382, height: 0.382 },
        ],
      },
      4: {
        frameImage: "/images/pose/realframe/realframe04.png",
        layout: [
          { x: 0.17, y: 0.0, width: 0.33, height: 0.33 },
          { x: 0.5, y: 0.0, width: 0.33, height: 0.33 },
          { x: 0.17, y: 0.335, width: 0.33, height: 0.33 },
          { x: 0.5, y: 0.335, width: 0.33, height: 0.33 },
          { x: 0.17, y: 0.67, width: 0.33, height: 0.33 },
          { x: 0.5, y: 0.67, width: 0.33, height: 0.33 },
        ],
      },
      // 프레임 2~4도 여기에 추가로 정의
    };

    const canvasWidth = container.clientWidth;
    const canvasHeight = container.clientWidth;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // 이미지를 모두 불러오고 그리기
    const images = [
      ...poseImages.map((src) => loadImage(src)),
      loadImage(frameImage),
    ];

    Promise.all(images).then((loadedImages) => {
      const layoutData = frameLayouts[frameId] || frameLayouts[1];
      const poses = loadedImages.slice(0, layoutData.layout.length);
      const frame = loadedImages[layoutData.layout.length];

      layoutData.layout.forEach((pos, i) => {
        const img = poses[i];
        if (!img) return;
        ctx.drawImage(
          img,
          pos.x * canvasWidth,
          pos.y * canvasHeight,
          pos.width * canvasWidth,
          pos.height * canvasHeight,
        );
      });
      if (frame) {
        ctx.drawImage(frame, 0, 0, canvasWidth, canvasHeight);
      }
    });
  }, [router.isReady, frameId, frameImage, poseImages]);

  const [filter, setFilter] = useState("");

  return (
    <article style={{ paddingTop: "60px" }} className={`${layoutStyles.width}`}>
      <div className={posecss.frame_wrapper} ref={containerRef}>
        <canvas
          className={`${posecss.frame_canvas}
          ${filter === "bright" ? posecss.warm_filter : filter === "bw" ? posecss.bw_filter : filter === "dream" ? posecss.dreamy_filter : ""}`}
          ref={canvasRef}
        />
      </div>

      <div className={posecss.preview_filter}>
        <p className={posecss.filter_title}>필터 선택</p>
        <ul className={posecss.filter_list}>
          <li onClick={() => setFilter("original")}>
            <div
              style={{ backgroundColor: "#f0f0f0" }}
              className={posecss.filter_btn}
            ></div>
            원본
          </li>
          <li onClick={() => setFilter("bright")}>
            <div
              style={{ backgroundColor: "#fff8e1" }}
              className={posecss.filter_btn}
            ></div>
            화사한
          </li>
          <li onClick={() => setFilter("dream")}>
            <div
              style={{ backgroundColor: "#e1bee7" }}
              className={posecss.filter_btn}
            ></div>
            몽환
          </li>
          <li onClick={() => setFilter("bw")}>
            <div
              style={{ backgroundColor: "#cfd8dc" }}
              className={posecss.filter_btn}
            ></div>
            흑백
          </li>
        </ul>
      </div>
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

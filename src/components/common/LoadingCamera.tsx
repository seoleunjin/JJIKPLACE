/* eslint-disable @next/next/no-img-element */
import React from "react";

function LoadingCamera() {
  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="/images/common/LoadingCamera.gif"
        width={150}
        height={150}
        alt="loading"
      ></img>
      <p
        style={{
          fontFamily: "var(--font-family-SUITE-Bold)",
          fontSize: "1.8rem",
          letterSpacing: "-0.34px",
          marginTop: "24px",
        }}
      >
        이미지 생성 중입니다.
      </p>
    </div>
  );
}

export default LoadingCamera;

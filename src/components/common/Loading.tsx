/* eslint-disable @next/next/no-img-element */
import React from "react";

function Loading() {
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
        src="/images/common/Loading.gif"
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
        잠시만 기다려주세요
      </p>
    </div>
  );
}

export default Loading;

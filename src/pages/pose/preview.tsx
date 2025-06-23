import React from "react";
import layoutStyles from "@/styles/layout.module.css";
import { pageMeta } from "@/constants/pageMeta";
// import poseCss from "@/styles/pose.module.css";

const preview = () => {
  return (
    <article style={{ paddingTop: "60px" }} className={`${layoutStyles.width}`}>
      pose
      <p>버튼</p>
      <p>버튼</p>
      <p>버튼</p>
      <p>버튼</p>
    </article>
  );
};

export default preview;
preview.title = pageMeta.pose.title;

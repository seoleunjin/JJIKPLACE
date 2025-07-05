import React from "react";
import layoutStyles from "@/styles/layout.module.css";
import { pageMeta } from "@/constants/pageMeta";
import { useRouter } from "next/router";

const WriteReview = () => {
  const router = useRouter();
  const write = () => {
    router.push("/write-review/form");
  };

  return (
    <article style={{ paddingTop: "60px" }} className={`${layoutStyles.width}`}>
      <p onClick={write}>검색</p>
    </article>
  );
};

export default WriteReview;
WriteReview.title = pageMeta.writeReview.title;

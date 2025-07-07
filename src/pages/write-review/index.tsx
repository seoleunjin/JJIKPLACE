import React from "react";
import layoutStyles from "@/styles/layout.module.css";
import { pageMeta } from "@/constants/pageMeta";
import { useRouter } from "next/router";
import MapSearch from "@/components/map/Search";

const WriteReview = () => {
  const router = useRouter();
  const write = () => {
    router.push("/write-review/form");
  };

  return (
    <article style={{ paddingTop: "60px" }} className={`${layoutStyles.width}`}>
      <p onClick={write}>검색</p>
      <MapSearch />
    </article>
  );
};

export default WriteReview;
WriteReview.title = pageMeta.writeReview.title;

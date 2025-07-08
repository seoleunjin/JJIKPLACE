import React, { useEffect } from "react";
import { pageMeta } from "@/constants/pageMeta";
import SearchStore from "@/components/map/SearchStore";
import { useRouter } from "next/router";

const WriteReview = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      router.push("/auth/login");
    }
  }, []);

  return (
    <article style={{ paddingTop: "60px" }}>
      <SearchStore />
    </article>
  );
};

export default WriteReview;
WriteReview.title = pageMeta.writeReview.title;

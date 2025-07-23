import React, { useEffect, useState } from "react";
import { pageMeta } from "@/constants/pageMeta";
import SearchStore from "@/components/map/SearchStore";
import { useRouter } from "next/router";

const WriteReview = () => {
  const router = useRouter();
  // SearchStore 들렀다가 router.replace 이동 방지
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      router.replace("/auth/login");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) return null;

  return (
    <article>
      <SearchStore />
    </article>
  );
};

export default WriteReview;
WriteReview.title = pageMeta.writeReview.title;

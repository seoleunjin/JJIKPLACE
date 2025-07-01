import { fetchReviewDetail } from "@/api/user";
import { pageMeta } from "@/constants/pageMeta";
import layoutStyles from "@/styles/layout.module.css";
import { useState } from "react";

function writeReview() {
  const [reviewItem, setReviewItem] = useState();
  const myReviewDetail = async () => {
    const { data } = await fetchReviewDetail();
    setReviewItem(data.item);
    console.log("마이데이터 성공", data);
  };
  myReviewDetail();
  return (
    <div>
      <div className={layoutStyles.py_space}></div>
    </div>
  );
}

export default writeReview;

writeReview.title = pageMeta.writeDetail.title;

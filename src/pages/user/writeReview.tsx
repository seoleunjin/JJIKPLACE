import { fetchReviewDetail } from "@/api/user";
import { pageMeta } from "@/constants/pageMeta";
import layoutStyles from "@/styles/layout.module.css";

function writeReview() {
  const myReviewDetail = async () => {
    const data = await fetchReviewDetail();

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

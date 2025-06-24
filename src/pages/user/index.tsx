import MyPage from "@/components/user/MyPage";
import { pageMeta } from "@/constants/pageMeta";
import layoutStyles from "@/styles/layout.module.css";

function UserPage() {
  return (
    <div className={`${layoutStyles.width} ${layoutStyles.py_space}`}>
      <MyPage></MyPage>
    </div>
  );
}

export default UserPage;

UserPage.title = pageMeta.myPage.title;

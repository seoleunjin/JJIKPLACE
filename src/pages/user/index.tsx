import MyPage from "@/components/user/MyPage";
import { pageMeta } from "@/constants/pageMeta";
import layoutStyles from "@/styles/layout.module.css";
import { useEffect } from "react";
import { fetchProfile } from "@/api/user";

function UserPage() {
  useEffect(() => {
    const fetchUserProfile = async () => {
      const data = await fetchProfile();
      console.log("프로필", data);
    };
    fetchUserProfile();
  }, []);
  return (
    <div className={`${layoutStyles.width} ${layoutStyles.py_space}`}>
      <MyPage></MyPage>
    </div>
  );
}

export default UserPage;

UserPage.title = pageMeta.myPage.title;

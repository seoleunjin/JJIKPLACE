import MyPage from "@/components/user/MyPage";
import { pageMeta } from "@/constants/pageMeta";
import layoutStyles from "@/styles/layout.module.css";
import { useEffect, useState } from "react";
import { fetchProfile } from "@/api/user";
import { profileType } from "@/types/user";

function UserPage() {
  const [profile, setProfile] = useState<profileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetchProfile();
        const user = res.data.user;
        setProfile(user);
      } catch {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, []);
  return (
    <div className={layoutStyles.py_space}>
      <MyPage profile={profile} isLoading={isLoading}></MyPage>
    </div>
  );
}

export default UserPage;

UserPage.title = pageMeta.myPage.title;

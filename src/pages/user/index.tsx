import MyPage from "@/components/user/MyPage";
import { pageMeta } from "@/constants/pageMeta";
import layoutStyles from "@/styles/layout.module.css";
import { useEffect, useState } from "react";
import { fetchProfile } from "@/api/user";
import { profileType } from "@/types/user";
import { useRouter } from "next/router";

function UserPage() {
  const [profile, setProfile] = useState<profileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetchProfile();
        const user = res.data.user;
        setProfile(user);

        if (Response.status === 401) {
          router.replace("/auth/login");
        }
      } catch (error: any) {
        setIsLoading(false);
        if (error.response?.status === 401) {
          router.replace("/auth/login");
        }
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

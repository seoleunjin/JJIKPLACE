import MyPage from "@/components/user/MyPage";
import { pageMeta } from "@/constants/pageMeta";
import layoutStyles from "@/styles/layout.module.css";
import { useEffect, useState } from "react";
import { fetchProfile } from "@/api/user";
interface profileType {
  email: string;
  nickname: string;
  profile_image: string | null;
}
function UserPage() {
  const [profile, setProfile] = useState<profileType | null>(null);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetchProfile();
        console.log("epdljx", res);
        const user = res.data.user;
        setProfile(user);
      } catch {
        setLoad(false);
      }
    };
    fetchUserProfile();
  }, []);
  return (
    <div className={`${layoutStyles.width} ${layoutStyles.py_space}`}>
      <MyPage profile={profile} load={load}></MyPage>
    </div>
  );
}

export default UserPage;

UserPage.title = pageMeta.myPage.title;

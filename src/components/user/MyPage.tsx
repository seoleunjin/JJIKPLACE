import { MyPageProps, profileType } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import layoutStyles from "@/styles/layout.module.css";
import styles from "@/styles/myPage.module.css";
import { SplitArrowIcon } from "@/assets/icons";
import MyPageReview from "./MyPageReview";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { patchProfileImage } from "@/api/user";
import FavoriteList from "./FavoriteList";
import Loading from "../common/Loading";
import { AxiosError } from "axios";

function MyPage({ profile, isLoading }: MyPageProps) {
  const router = useRouter();
  const flieInput = useRef<HTMLInputElement>(null);
  const [localProfile, setLocalProfile] = useState<profileType | null>(profile);

  // 이미지 인풋과 연동
  const onclickImage = () => {
    if (flieInput.current) {
      flieInput.current.click();
    }
  };

  // 프로필 바뀌면 새로 바뀌게
  useEffect(() => {
    setLocalProfile(profile);
  }, [profile]);

  // 프로필 체인지
  const handleEditProfile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image_file = e.target.files?.[0];
    if (!image_file) return;
    // console.log("전송할 파일", image_file);

    try {
      const { data } = await patchProfileImage(image_file);
      const newImage = data.profile_image;
      setLocalProfile((prev) => ({
        ...prev!,
        profile_image: newImage,
      }));
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error("오류", axiosError.response?.data || axiosError.message);

      if (axiosError.response?.status === 401) {
        alert("로그인 후 이용해주세요");
        router.replace("/auth/login");
      }
    }
  };
  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.replace("/");
  };

  if (!isLoading) {
    return (
      <div className={styles.profileBox}>
        <div>
          <Image
            src="/images/user/UserProfile.png"
            width={120}
            height={120}
            alt="프로필"
            priority
          />
        </div>
        <p className={styles.NonMember}>로그인 후 이용해주세요</p>
        <Link className={styles.LoginLink} href="/auth/login">
          로그인
        </Link>
      </div>
    );
  }

  if (!profile) {
    return <Loading />;
  }

  return (
    <div>
      {/* 프로필 상단 시작 */}
      <div className={layoutStyles.width}>
        {/* 프로필 */}
        <div className={styles.profileBox}>
          <div className={styles.boxWrap}>
            <div className={styles.imageBox}>
              <Image
                src={
                  localProfile?.profile_image || "/images/user/UserProfile.png"
                }
                width={120}
                height={120}
                alt="프로필"
                onClick={onclickImage}
                priority
              />
            </div>
            <div className={styles.editProfile}>
              <label htmlFor="profile-upload">
                <Image
                  src={"/images/user/EditUserProfile.png"}
                  width={35}
                  height={35}
                  alt="프로필 수정"
                />
              </label>
              <input
                type="file"
                id="profile-upload"
                onChange={handleEditProfile}
                accept="image/jpg,image/png,image/jpeg"
                ref={flieInput}
              />
            </div>
          </div>
        </div>
        {/* 닉네임 */}
        <div className={styles.nickNameBox}>
          <div className={styles.boxWrap}>
            <h2>{profile.nickname}</h2>

            {/* 링크로 바껴야 함 */}
            <Link href="/user/nickname">
              <div className={styles.editNick}>
                <Image
                  src="/images/user/EditUserNick.png"
                  width={19}
                  height={18}
                  alt="닉네임 수정"
                />
              </div>
            </Link>
          </div>
        </div>
        {/* 프로필 상단 끝*/}
      </div>

      {/* 회원정보 */}
      <div className={styles.infoBox}>
        <div className={`${layoutStyles.width} ${styles.py_space}`}>
          <div className={styles.title}>
            <h2>회원정보</h2>
          </div>
          <ul className={styles.infoList}>
            <li>
              <h6>이메일</h6>
              <p>{profile.email}</p>
            </li>
            <li>
              <h6>비밀번호</h6>
              <div className={styles.linkWrap}>
                <p>*********</p>
                <Link href="/user/password/verify">
                  <SplitArrowIcon className={styles.LinkBtn} />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* 리뷰 컴포넌트 */}
      <div className={styles.reviewBox}>
        <div className={styles.py_space}>
          <MyPageReview />
        </div>
      </div>

      {/* 찜 목록 */}
      <div className={styles.reviewBox}>
        <div className={styles.py_space}>
          <FavoriteList />
        </div>
      </div>

      {/* 로그아웃 */}
      <div className={`${layoutStyles.width} ${styles.MyPageFooter}`}>
        <button type="button" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default MyPage;

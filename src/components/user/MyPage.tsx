import { MyPageProps } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import layoutStyles from "@/styles/layout.module.css";
import styles from "@/styles/myPage.module.css";
import { SplitArrowIcon } from "@/assets/icons";
import MyPageReview from "./MyPageReview";
import React, { ChangeEvent, useRef } from "react";
import { useRouter } from "next/router";

function MyPage({ profile, isLoading }: MyPageProps) {
  const router = useRouter();
  const flieInput = useRef<HTMLInputElement>(null);
  // 이미지 인풋과 연동
  const onclickImage = () => {
    if (flieInput.current) {
      flieInput.current.click();
    }
  };
  // 프로필 체인지
  // const handleEditProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const imageFile = e.target.files;
  //   console.log("파일 링크", imageFile);
  // };
  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.replace("/auth/login");
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
    return <div>잠시만 기다려주세요</div>;
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
                src={profile.profile_image || "/images/user/UserProfile.png"}
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
                // onChange={handleEditProfile}
                accept="image/jpg,impge/png,image/jpeg"
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
            <div className={styles.editNick}>
              <Image
                src={"/images/user/EditUserNick.png"}
                width={19}
                height={18}
                alt="닉네임 수정"
              />
            </div>
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
                <button type="button">
                  <SplitArrowIcon className={styles.LinkBtn} />
                </button>
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

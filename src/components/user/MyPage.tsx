import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const data = {
  email: "test@example.com",
  nickname: "발로뛰는 토끼",
  profileImage: "/images/user/UserProfile.png",
};
const reviews = [
  {
    id: 1,
    storeName: "맑은뷰티",
    photo: "/images/reviews/review1.jpg",
    rating: 5,
    content: "정말 만족스러운 제품이에요! 강력 추천합니다.",
  },
  {
    id: 2,
    storeName: "뷰티플러스",
    photo: "/images/reviews/review2.jpg",
    rating: 4,
    content: "제품 퀄리티가 좋아서 재구매 의사 있습니다.",
  },
  {
    id: 3,
    storeName: "글로우샵",
    photo: "/images/reviews/review3.jpg",
    rating: 3,
    content: "무난한 제품이지만 가격 대비 괜찮아요.",
  },
];
interface profile {
  email: string;
  nickname: string;
  profileImage: string;
}
function MyPage() {
  const [profile, setProfile] = useState<profile | null>(null);
  useEffect(() => {
    setProfile(data);
  }, []);

  return profile ? (
    <div>
      <div>
        {/* 프로필 */}
        <div>
          <div>
            <Image
              src={data.profileImage || "/images/user/UserProfile.png"}
              width="120"
              height="120"
              alt="로고"
              priority
            />
            <button></button>
          </div>
          <div>
            <div>{data.nickname}</div>
            <div>
              <input type="text" />
            </div>
          </div>
        </div>
        {/* 회원정보 */}
        <div>
          <h2>회원정보</h2>
          <table>
            <thead>
              <tr>
                <th>이메일</th>
                <th>비밀번호</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.email}</td>
                <td>*********</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* 리뷰 */}
        <div>
          <h2>리뷰</h2>
          <p>관리</p>
        </div>
        <ul>
          {[...reviews]
            .reverse()
            .slice(0, 7)
            .map((review, index) => (
              <li key={index}>
                <div>
                  <Image
                    src={review.photo || "/images/review/NoImage.png"}
                    width="200"
                    height="200"
                    alt="리뷰 이미지"
                  />
                </div>
                <div>
                  <h6>{review.storeName}</h6>
                  <div>별 컴포넌트로 하기</div>
                  <p>{review.content}</p>
                </div>
              </li>
            ))}
          <li>더보기</li>
        </ul>
      </div>
      {/* 탈퇴 */}
      <div>로그아웃 | 회원탈퇴</div>
    </div>
  ) : (
    <div>
      <Image
        src="/images/user/UserProfile.png"
        width="120"
        height="120"
        alt="로고"
        priority
      />
      <p>로그인 후 이용해주세요</p>
      <Link href="/auth/Login">로그인</Link>
    </div>
  );
}

export default MyPage;

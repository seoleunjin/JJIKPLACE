import Image from "next/image";
import Link from "next/link";

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

interface ProfileType {
  email: string;
  nickname: string;
  profile_image: string | null;
}

interface MyPageProps {
  profile: ProfileType | null;
  load: boolean;
}

function MyPage({ profile, load }: MyPageProps) {
  // 로딩이 끝나고 프로필이 없으면 로그인 유도
  if (!load) {
    return (
      <div>
        <Image
          src="/images/user/UserProfile.png"
          width={120}
          height={120}
          alt="로고"
          priority
        />
        <p>로그인 후 이용해주세요</p>
        <Link href="/auth/Login">로그인</Link>
      </div>
    );
  }

  // 로딩 중이거나 profile이 null인 상태 처리 (비정상 상태일 수 있음)
  if (!profile) {
    return <p>프로필 정보를 불러오는 중입니다...</p>;
  }

  // profile이 존재할 때 렌더링
  return (
    <div>
      <div>
        {/* 프로필 */}
        <div>
          <div>
            <Image
              src={profile.profile_image || "/images/user/UserProfile.png"}
              width={120}
              height={120}
              alt="로고"
              priority
            />
            <button>프로필 수정</button>
          </div>
          <div>
            <div>{profile.nickname}</div>
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
                <td>{profile.email}</td>
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
                    width={200}
                    height={200}
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

      {/* 탈퇴 및 로그아웃 */}
      <div>로그아웃 | 회원탈퇴</div>
    </div>
  );
}

export default MyPage;

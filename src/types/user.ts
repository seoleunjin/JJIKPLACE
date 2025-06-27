// 마이페이지 프로필 타입
interface profileType {
  email: string;
  nickname: string;
  profile_image: string | null;
}

interface MyPageProps {
  profile: profileType | null;
  isLoading: boolean;
}

// 마이페이지 리뷰 타입
interface MyReviewType {
  review_id: number;
  rating: number;
  content: string;
  image_url: string;
  created_at: number | string;
  updated_at: number;
  ps_id: number;
  name: string;
}
export type { profileType, MyPageProps, MyReviewType };

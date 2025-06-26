interface profileType {
  email: string;
  nickname: string;
  profile_image: string | null;
}

interface MyPageProps {
  profile: profileType | null;
  load: boolean;
}

export type { profileType, MyPageProps };

//지도 좌표값 타입
interface MapBounds {
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
}

// 회원가입 타입
interface SignUpType {
  email: string;
  password: string;
  nick_name: string;
}

//로그인 타입

interface LoginType {
  email: string;
  password: string;
}

export type { MapBounds, SignUpType, LoginType };

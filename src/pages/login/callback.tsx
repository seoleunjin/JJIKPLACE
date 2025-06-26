import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SocialLoginCallback() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { token } = router.query;

    if (typeof token === "string") {
      localStorage.setItem("accessToken", token);
      router.replace("/");
    } else {
      console.warn("토큰이 존재하지 않음", router.query);
    }
  }, [router]);

  return <div>로그인 처리 중입니다...</div>;
}

"use client";

import { LoginApi } from "@/api/login";

const handleOnClick = async () => {
  const body = {
    email: "test96@naver.com",
    password: "test96!",
  };

  try {
    const res = await LoginApi(body);
    console.log("성공", res);
  } catch (error) {
    console.error("실패", error);
  }
};

function LoginForm() {
  return (
    <div>
      <form>
        {/* 로고 */}
        <div></div>
        {/* 로그인 */}
        <div>
          <div></div>
          <div></div>
        </div>
        {/* 소셜로그인 */}
        <div></div>
      </form>
      <button onClick={handleOnClick}>로그인</button>
    </div>
  );
}

export default LoginForm;

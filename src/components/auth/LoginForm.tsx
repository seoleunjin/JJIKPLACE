"use client";

import styles from "@/styles/loginForm.module.css";
import { LoginApi } from "@/api/login";
import { LoginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { email } from "zod/v4-mini";

function LoginForm() {
  const router = useRouter();
  // 인풋 상태변환하나
  const [saveEmail, setSaveEmail] = useState(false);
  const [getEmail, setGetEmail] = useState("");

  type LoginFormData = z.infer<typeof LoginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const getSaveEmail = localStorage.getItem("saveEmail");
    if (getSaveEmail) {
      setGetEmail(getSaveEmail);
      setSaveEmail(true);
      setValue("email", getSaveEmail);
    }
  }, [setValue]);

  const handleSaveEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSaveEmail(checked);

    if (!checked) {
      localStorage.removeItem("saveEmail");
    } else {
      const currentEmail = watch("email");
      if (currentEmail) {
        localStorage.setItem("saveEmail", currentEmail);
      }
    }
  };

  useEffect(() => {
    const emailInputChange = watch((value, { name }) => {
      if (name === "email") {
        const currentEmail = value.email;
        const savedEmail = localStorage.getItem("saveEmail");

        if (savedEmail && savedEmail !== currentEmail) {
          setSaveEmail(false);
          localStorage.removeItem("saveEmail");
        }
      }
    });

    return () => emailInputChange.unsubscribe();
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await LoginApi(data);
      console.log("성공", res.data);

      const token = res.data.access_token;
      if (token) {
        localStorage.setItem("accessToken", token);
        router.replace("/");
      }
    } catch (error) {
      console.error("실패", error);
    }
  };

  // 소셜 로그인 URL
  const kakaoLoginUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/kakao/login`;
  const googleLoginUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`;

  const kakaoLogin = () => {
    window.location.href = kakaoLoginUrl;
  };

  const googleLogin = () => {
    window.location.href = googleLoginUrl;
  };

  return (
    <div className={styles.LoginForm}>
      <div className={styles.FormWrap}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 로고 */}
          <div className={styles.LogoBox}>
            <Image
              src="/images/login/LoginLogo.png"
              width="80"
              height="29"
              alt="로고"
              priority
            />
          </div>
          {/* 로그인 */}
          <div className={styles.Login_box}>
            <div className={styles.LoginFields}>
              <div className={styles.box}>
                <label>이메일</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="이메일를 입력하세요"
                />
                {errors.email && (
                  <p className={styles.err}>* {errors.email.message}</p>
                )}
              </div>
              <div className={styles.box}>
                <label>비밀번호</label>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                />
                {errors.password && (
                  <p className={styles.err}>* {errors.password.message}</p>
                )}
              </div>
            </div>
            <div className={styles.LoginOptions}>
              <div className={styles.SaveBox}>
                <label>
                  <input
                    type="checkbox"
                    onChange={handleSaveEmail}
                    checked={saveEmail}
                  />
                  <span className="custom-checkbox" />
                  이메일 저장
                </label>
              </div>
              <div className={styles.LinkBox}>
                <Link href="/auth/SignUp">회원가입</Link>
              </div>
            </div>
            <button
              className={`${styles.SubmitBox}  ${isValid ? styles.SubmitBoxActive : styles.SubmitBox}`}
              type="submit"
              disabled={!isValid}
            >
              로그인
            </button>
          </div>
        </form>
        {/* 소셜로그인 */}
        <div className={styles.SnsBox}>
          <button onClick={kakaoLogin}>
            <Image
              src="/images/login/kakaoLogo.png"
              width={0}
              height={0}
              sizes="100vw"
              alt="카카오로그인"
              priority
            />
          </button>
          <button onClick={googleLogin} className={styles.gsi_material_button}>
            <div className={styles.gsi_material_button_state}></div>
            <div className={styles.gsi_material_button_content_wrapper}>
              <div className={styles.gsi_material_button_icon}>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{ display: "block" }}
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                  <path fill="none" d="M0 0h48v48H0z" />
                </svg>
              </div>
              <span className={styles.gsi_material_button_contents}>
                Sign in with Google
              </span>
              <span style={{ display: "none" }}>Sign in with Google</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

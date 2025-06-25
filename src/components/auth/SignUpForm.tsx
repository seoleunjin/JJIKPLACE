"use client";
import { checkEmailAPI, SignUpAPI } from "@/api/signUp";
import styles from "@/styles/signUpForm.module.css";
import layoutStyles from "@/styles/layout.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/schemas/auth";
import { z } from "zod";
import FormSubmitBtn from "@/components/common/FormSubmitBtn";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function SignUpForm() {
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    null,
  );
  const router = useRouter();

  type FormData = z.infer<typeof SignUpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    getValues,
    clearErrors,
    trigger,
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      nick_name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === "email") {
        setIsEmailAvailable(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: FormData) => {
    if (isEmailAvailable === null) {
      setError("email", { message: "이메일 중복 확인을 해주세요." });
      return;
    }

    if (isEmailAvailable === false) {
      setError("email", { message: "이미 사용 중인 이메일입니다." });
      return;
    }
    try {
      const res = await SignUpAPI(data);
      console.log("성공", res.data);
      alert("회원가입이 완료되었습니다.");
      reset();
      router.replace("/auth/Login");
    } catch (err) {
      console.error("실패", err);
    }
  };

  const handleCheckEmail = async () => {
    const email = getValues("email").trim();

    const isValid = await trigger("email");
    if (!isValid) return;

    try {
      const res = await checkEmailAPI(email);

      if (res.status === 200) {
        if (res.data.available) {
          clearErrors("email");
          setIsEmailAvailable(true);
        } else {
          clearErrors("email");
          setIsEmailAvailable(false);
        }
      }
    } catch {
      setError("email", { message: "오류가 발생했습니다." });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.signUpForm}>
      <div className={`${layoutStyles.width} ${styles.signUpFormWrap}`}>
        <div className={styles.box}>
          <label>
            이메일<span>*</span>
          </label>
          <div className={styles.in_box}>
            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="예: example@gmail.com"
              />
              <div className={styles.message_box}>
                {errors.email && (
                  <p className={styles.errText}>* {errors.email.message}</p>
                )}
                {isEmailAvailable === true && (
                  <p className={styles.successText}>
                    * 사용 가능한 이메일입니다.
                  </p>
                )}
                {isEmailAvailable === false && (
                  <p className={styles.errText}>
                    * 이미 사용 중인 이메일입니다.
                  </p>
                )}
              </div>
            </div>
            {/* 이후에 인증확인으로 바뀔예정 */}
            <button
              type="button"
              onClick={handleCheckEmail}
              className={styles.btn_check}
            >
              중복확인
            </button>
          </div>
        </div>

        <div className={styles.box}>
          <label>
            비밀번호<span>*</span>
          </label>
          <div className={styles.in_box}>
            <div>
              <input
                {...register("password")}
                type="password"
                placeholder="비밀번호를 입력하세요"
              />
              <div className={styles.message_box}>
                {errors.password && (
                  <p className={styles.errText}>* {errors.password.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.box}>
          <label>
            비밀번호 확인<span>*</span>
          </label>
          <div className={styles.in_box}>
            <div>
              <input
                {...register("passwordConfirm")}
                type="password"
                placeholder="다시 비밀번호를 입력하세요"
              />
              <div className={styles.message_box}>
                {errors.passwordConfirm && (
                  <p className={styles.errText}>
                    * {errors.passwordConfirm.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.box}>
          <label>
            닉네임<span>*</span>
          </label>
          <div className={styles.in_box}>
            <div>
              <input
                {...register("nick_name")}
                type="text"
                placeholder="닉네임을 입력하세요"
              />
              <div className={styles.message_box}>
                {errors.nick_name && (
                  <p className={styles.errText}>* {errors.nick_name.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.consent_box}>
          <p className={styles.title}>약관동의</p>
          <div className={styles.check_box}>
            <div>
              <label>
                <input type="checkbox" {...register("agreeTerms")} />
                <div>
                  <span>[필수]이용약관에 동의합니다.</span>
                  <div className={styles.message_box}>
                    {errors.agreeTerms && (
                      <p className={styles.errText}>
                        * {errors.agreeTerms.message}
                      </p>
                    )}
                  </div>
                </div>
              </label>
            </div>

            <div>
              <label>
                <input type="checkbox" {...register("agreePrivacy")} />
                <div>
                  <span>[필수]개인정보 수집 및 이용에 동의합니다.</span>
                  <div className={styles.message_box}>
                    {errors.agreePrivacy && (
                      <p className={styles.errText}>
                        * {errors.agreePrivacy.message}
                      </p>
                    )}
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <FormSubmitBtn
        title="회원가입"
        disabled={!isValid || isEmailAvailable !== true}
      />
    </form>
  );
}

export default SignUpForm;

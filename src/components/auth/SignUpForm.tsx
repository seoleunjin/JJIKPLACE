"use client";
import { SignUpAPI } from "@/api/signUp";
import styles from "@/styles/signUpForm.module.css";
import layoutStyles from "@/styles/layout.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/schemas/auth";
import { z } from "zod";
import FormSubmitBtn from "@/components/common/FormSubmitBtn";
import { Router, useRouter } from "next/router";

function SignUpForm() {
  const router = useRouter();

  type FormData = z.infer<typeof SignUpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
    defaultValues: {
      nick_name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await SignUpAPI(data);
      console.log("성공", res.data);
      alert("회원가입이 완료되었습니다.");
      reset();
      router.push("/");
    } catch (err) {
      console.error("실패", err);
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
              {errors.email && (
                <p className={styles.errText}>* {errors.email.message}</p>
              )}
            </div>
            {/* 이후에 인증확인으로 바뀔예정 */}
            {/* <button className={styles.btn_check}>중복확인</button> */}
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
              {errors.password && (
                <p className={styles.errText}>* {errors.password.message}</p>
              )}
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
              {errors.passwordConfirm && (
                <p className={styles.errText}>
                  * {errors.passwordConfirm.message}
                </p>
              )}
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
              {errors.nick_name && (
                <p className={styles.errText}>* {errors.nick_name.message}</p>
              )}
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
                  {errors.agreeTerms && (
                    <p className={styles.errText}>
                      * {errors.agreeTerms.message}
                    </p>
                  )}
                </div>
              </label>
            </div>

            <div>
              <label>
                <input type="checkbox" {...register("agreePrivacy")} />
                <div>
                  <span>[필수]개인정보 수집 및 이용에 동의합니다.</span>
                  {errors.agreePrivacy && (
                    <p className={styles.errText}>
                      * {errors.agreePrivacy.message}
                    </p>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <FormSubmitBtn title="회원가입" disabled={!isValid} />
    </form>
  );
}

export default SignUpForm;

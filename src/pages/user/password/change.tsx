import React, { useState } from "react";
import layoutStyles from "@/styles/layout.module.css";
import SettingsForm from "@/components/common/SettingsForm";
import FormSubmitBtn from "@/components/common/FormSubmitBtn";
import { pageMeta } from "@/constants/pageMeta";
import { passwordChangeAPI } from "@/api/user";
import { useRouter } from "next/router";
import mypageCss from "@/styles/myPage.module.css";

function Change() {
  const router = useRouter();
  const [form, setForm] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const validate = () => {
    const newErrors: { password?: string; confirmPassword?: string } = {};
    // ① 비밀번호 길이
    if (form.password.length < 6) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
    } else if (
      !/[a-zA-Z]/.test(form.password) ||
      !/\d/.test(form.password) ||
      !/[!@#$%^&*()\-_=+{};:,<.>]/.test(form.password)
    ) {
      newErrors.password = "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.";
    }
    // ③ 일치 여부
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  // 등록하기
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      const body = {
        new_password: form.password,
        new_password_check: form.confirmPassword,
      };
      const res = await passwordChangeAPI(body);
      console.log(res);
      alert("비밀번호 수정이 완료되었습니다.");
      router.push("/user");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article className={layoutStyles.py_space}>
      <h2 className={mypageCss.user_update_title}>
        새로운 비밀번호를 입력해주세요.
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={layoutStyles.width} style={{ marginBottom: "50px" }}>
          <SettingsForm
            fields={[
              {
                name: "password",
                label: "새로운 비밀번호",
                type: "password",
                value: form.password,
                onChange: handleChange,
                error: errors.password,
              },
              {
                name: "confirmPassword",
                label: "한번 더 입력해주세요",
                type: "password",
                value: form.confirmPassword,
                onChange: handleChange,
                error: errors.confirmPassword,
              },
            ]}
          />
        </div>
        <FormSubmitBtn
          title="저장"
          disabled={!form.password || !form.confirmPassword}
        />
      </form>
    </article>
  );
}

export default Change;
Change.title = pageMeta.myPageUpdate.title;

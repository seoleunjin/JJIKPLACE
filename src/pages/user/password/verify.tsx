import React, { useState } from "react";
import layoutStyles from "@/styles/layout.module.css";
import SettingsForm from "@/components/common/SettingsForm";
import FormSubmitBtn from "@/components/common/FormSubmitBtn";
import { passwordVerifyAPI } from "@/api/user";
import { useRouter } from "next/router";
import { pageMeta } from "@/constants/pageMeta";
import mypageCss from "@/styles/myPage.module.css";

function Verify() {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // 값 변경
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  // 등록하기
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await passwordVerifyAPI(password);
      // console.log(res);
      // alert("비밀번호가 확인 되었습니다.");
      router.push("/user/password/change");
    } catch (err) {
      console.error(err);
      alert("비밀번호 확인 후 다시 시도해 주세요.");
    }
  };

  return (
    <article className={layoutStyles.py_space}>
      <h2 className={mypageCss.user_update_title}>
        현재 비밀번호를 입력해주세요
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={layoutStyles.width} style={{ marginBottom: "50px" }}>
          <SettingsForm
            fields={[
              {
                name: "password",
                label: "현재 비밀번호",
                type: "password",
                value: password,
                onChange: handleChange,
                error,
              },
            ]}
          />
        </div>
        <FormSubmitBtn title={"저장"} disabled={!password} />
      </form>
    </article>
  );
}

export default Verify;
Verify.title = pageMeta.myPageUpdate.title;

import React, { useState } from "react";
import layoutStyles from "@/styles/layout.module.css";
import mypageCss from "@/styles/myPage.module.css";
import FormSubmitBtn from "@/components/common/FormSubmitBtn";
import SettingsForm from "@/components/common/SettingsForm";
import { nicknameUpdateAPI } from "@/api/user";
import { useRouter } from "next/router";
import { pageMeta } from "@/constants/pageMeta";
import axios from "axios";

function NickName() {
  const router = useRouter();
  const [nickname, setNickname] = useState<string>("");
  const [error, setError] = useState<string>("");

  // 값 변경
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input.length > 10) {
      setError("닉네임은 최대 10글자까지 가능합니다.");
      return;
    }
    setNickname(input);
    setError("");
  };

  // 등록하기
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nickname.length === 1) {
      setError("닉네임은 최소 2글자부터 가능합니다.");
      return;
    }
    if (nickname.length > 10) {
      setError("닉네임은 최대 10글자까지 가능합니다.");
      return;
    }

    try {
      const body = {
        nickname: nickname,
      };
      await nicknameUpdateAPI(body);
      //   console.log(res);
      alert("닉네임이 변경 되었습니다.");
      router.push("/user");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 409) {
          alert("이미 사용 중인 닉네임입니다.");
        } else {
          alert("알 수 없는 오류로 닉네임 변경에 실패했습니다.");
        }
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <article className={layoutStyles.py_space}>
      <h2 className={mypageCss.user_update_title}>닉네임을 입력해주세요.</h2>
      <form onSubmit={handleSubmit}>
        <SettingsForm
          fields={[
            {
              name: "nickname",
              label: "닉네임",
              type: "text",
              value: nickname,
              onChange: handleChange,
              error: error,
            },
          ]}
        />
        <FormSubmitBtn title={"저장"} disabled={!nickname} />
      </form>
    </article>
  );
}

export default NickName;
NickName.title = pageMeta.myPageUpdate.title;

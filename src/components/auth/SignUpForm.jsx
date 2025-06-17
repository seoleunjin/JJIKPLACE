import { SignUpAPI } from "@/api/signUp";
import { useState } from "react";
import styles from "@/styles/signUpForm.module.css";

function SignUpForm() {
  const [body, setBody] = useState({
    email: "",
    password: "",
    nick_name: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBody((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (body.password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await SignUpAPI(body);
      console.log("성공", res);
    } catch (err) {
      console.error("실패", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.singUpForm}>
      <div className={styles.box}>
        <label>
          이메일<span>*</span>
        </label>
        <div className={styles.in_box}>
          <div>
            <input
              name="email"
              type="email"
              placeholder="예: example@gmail.com"
              value={body.email}
              onChange={handleChange}
            />
            <p className={styles.errText}>에러</p>
          </div>
          {/* 이후에 인증확인 으로 바뀔예정 */}
          <button className={styles.btn_check}>중복확인</button>
        </div>
      </div>

      <div className={styles.box}>
        <label>
          비밀번호<span>*</span>
        </label>
        <div className={styles.in_box}>
          <div>
            <input
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={body.password}
              onChange={handleChange}
            />
            <p className={styles.errText}>에러</p>
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
              name="passwordConfirm"
              type="password"
              placeholder="다시 비밀번호를 입력하세요"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <p className={styles.errText}>에러</p>
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
              name="nick_name"
              type="text"
              placeholder="닉네임을 입력하세요"
              value={body.nick_name}
              onChange={handleChange}
            />
            <p className={styles.errText}>에러</p>
          </div>
        </div>
      </div>
      <div>
        <p>약관동의</p>
        <div>
          <div>
            <label>
              <input type="checkbox" id="agreeCheckbox" />
              <span>[필수]이용약관에 동의합니다.</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" id="agreeCheckbox" />
              <span>[필수]개인정보 수집 및 이용에 동의합니다.</span>
            </label>
          </div>
        </div>
      </div>
      <div>
        <button type="submit">가입</button>
      </div>
    </form>
  );
}

export default SignUpForm;

import SignUpForm from "@/components/auth/SignUpForm";
import { pageMeta } from "@/constants/pageMeta";
import layoutStyles from "@/styles/layout.module.css"; // 경로는 프로젝트 구조에 따라 조정

function SignUpPage() {
  return (
    <div className={layoutStyles.layout_wrapper}>
      <div className={`${layoutStyles.width} ${layoutStyles.py_space}`}>
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUpPage;

SignUpPage.title = pageMeta.signUp.title;

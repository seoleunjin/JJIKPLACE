import SignUpForm from "@/components/auth/SignUpForm";
import { pageMeta } from "@/constants/pageMeta";
import layoutStyles from "@/styles/layout.module.css";

function SignUpPage() {
  return (
    <div className={layoutStyles.layout_wrapper}>
      <div className={layoutStyles.pt_space}>
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUpPage;

SignUpPage.title = pageMeta.signUp.title;

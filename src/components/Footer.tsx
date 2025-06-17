import styles from "@/styles/footer.module.css";
import layoutStyles from "@/styles/layout.module.css";
import Image from "next/image";

function Footer() {
  return (
    <div className={`${styles.footer} ${layoutStyles.layout_wrapper}`}>
      <div className={`${styles.footerWrap} ${layoutStyles.width}`}>
        <Image src="/flogo.png" width="82" height="31" alt="로고" />
        <p>© 2025 JJIKPLACE. ALL RIGHTS RESERVE</p>
      </div>
    </div>
  );
}

export default Footer;

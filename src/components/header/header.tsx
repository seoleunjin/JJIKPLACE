import layoutStyles from "@/styles/layout.module.css";
import Image from "next/image";
import React from "react";
import styles from "./header.module.css";
// import { MenuIcon } from "@/assets/icons";

function Header() {
  return (
    <div className={styles.header}>
      <div className={layoutStyles.layout_wrapper}>
        <div className={styles.headerWrap}>
          <div>
            <Image src="/Hlogo.png" width="82" height="31" alt="로고" />
          </div>
          {/* <div>
            <MenuIcon />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Header;

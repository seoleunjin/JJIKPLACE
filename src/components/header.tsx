import layoutStyles from "@/styles/layout.module.css";
import Image from "next/image";
import React from "react";
import styles from "@/styles/header.module.css";
import { MenuIcon } from "@/assets/icons";

// props 타입지정
interface HeaderProps {
  onMenuClick: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
  return (
    <div className={`${styles.header} ${layoutStyles.layout_wrapper}`}>
      <div className={styles.headerWrap}>
        <div>
          <Image src="/Hlogo.png" width="82" height="31" alt="로고" priority />
        </div>
        <button onClick={onMenuClick}>
          <MenuIcon />
        </button>
      </div>
    </div>
  );
}

export default Header;

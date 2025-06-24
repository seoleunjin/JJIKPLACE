"use client";
import layoutStyles from "@/styles/layout.module.css";
import Image from "next/image";
import React from "react";
import styles from "@/styles/header.module.css";
import { BackIcon, MenuIcon } from "@/assets/icons";
import { usePathname } from "next/navigation";
import { HeaderProps } from "@/types/layout";
import { useRouter } from "next/router";
import Link from "next/link";

function Header({ onMenuClick, title }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className={styles.header}>
      <div className={`${styles.headerWrap} ${layoutStyles.width}`}>
        <div>
          {isHome ? (
            <Link href="/">
              <Image
                src="/images/common/Hlogo.png"
                width="82"
                height="31"
                alt="로고"
                priority
              />
            </Link>
          ) : (
            <button className={styles.backBtn} onClick={() => router.back()}>
              <BackIcon />
            </button>
          )}
        </div>
        <div className={styles.titleWrap}>
          <p>{title || "\u00A0"}</p>
        </div>
        <button className={styles.menuOpenBtn} onClick={onMenuClick}>
          <MenuIcon />
        </button>
      </div>
    </div>
  );
}

export default Header;

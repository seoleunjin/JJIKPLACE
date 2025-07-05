"use client";

import Link from "next/link";
import React from "react";
import styles from "@/styles/openMenu.module.css";
import layoutStyles from "@/styles/layout.module.css";
import Image from "next/image";
import { MenuClose } from "@/assets/icons";
import { useRouter } from "next/router";
import { MenuProps } from "@/types/layout";

const Menu = ({ onClose }: MenuProps) => {
  const router = useRouter();
  const menuData = [
    { id: "menu01", title: "지도", path: "/map" },
    { id: "menu02", title: "포즈추천", path: "/pose" },
    { id: "menu03", title: "리뷰등록", path: "/write-review" },
    { id: "menu04", title: "마이페이지", path: "/user" },
  ];

  return (
    <section className={`${styles.menu} ${layoutStyles.layout_full_wrapper}`}>
      <div className={`${styles.menuWrap}`}>
        <div className={styles.menuHeader}>
          <div>
            <Link href="/" onClick={onClose}>
              <Image
                src="/images/common/MenuLogo.png"
                width="82"
                height="31"
                alt="로고"
              />
            </Link>
          </div>
          <button onClick={onClose} className={styles.menuClose}>
            <MenuClose />
          </button>
        </div>
        <div className={styles.menuLinks}>
          {menuData.map((menuItem) => (
            <Link
              key={menuItem.id}
              href={menuItem.path}
              onClick={onClose}
              className={`${styles.menuLink} ${
                menuItem.path === router.pathname
                  ? styles.active
                  : styles.menuLink
              }`}
            >
              {menuItem.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;

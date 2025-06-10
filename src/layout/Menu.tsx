import Link from "next/link";
import React from "react";
import styles from "@/styles/openMenu.module.css";
import layoutStyles from "@/styles/layout.module.css";
import Image from "next/image";
import { MenuClose } from "@/assets/icons";
import { useRouter } from "next/router";

// props 타입지정
interface MenuProps {
  onClose: () => void;
}

const Menu = ({ onClose }: MenuProps) => {
  const router = useRouter();
  const menuData = [
    { id: "menu01", title: "홈", path: "/" },
    { id: "menu02", title: "지도", path: "/map" },
    { id: "menu03", title: "포즈추천", path: "/pose" },
    { id: "menu04", title: "리뷰등록", path: "/reviewWrite" },
    { id: "menu05", title: "마이페이지", path: "/user" },
  ];

  return (
    <section className={`${styles.menu} ${layoutStyles.layout_full_wrapper}`}>
      <div className={`${styles.menuWrap}`}>
        <div className={styles.menuHeader}>
          <div>
            <Image src="/MenuLogo.png" width="82" height="31" alt="로고" />
          </div>
          <button onClick={onClose}>
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

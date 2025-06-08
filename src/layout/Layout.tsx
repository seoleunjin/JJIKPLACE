import React, { FC, ReactNode } from "react";
import Menu from "./Menu";
import layoutStyles from "@/styles/layout.module.css";

interface LayoutProps {
  children: ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    // ↓ 이 부분의 style을 잡아서 전체적인 레이아웃 구성하기
    <div className={layoutStyles.layout_wrapper}>
      <nav>
        <Menu />
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default Layout;

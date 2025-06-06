import React, { FC, ReactNode } from "react";
import Menu from "./Menu";

interface LayoutProps {
  children: ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    // ↓ 이 부분의 style을 잡아서 전체적인 레이아웃 구성하기
    <div>
      <nav>
        <Menu />
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default Layout;

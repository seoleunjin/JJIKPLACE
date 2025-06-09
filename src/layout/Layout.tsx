import React, { FC, ReactNode } from "react";
import Menu from "./Menu";
import Header from "@/components/header/header";

interface LayoutProps {
  children: ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <nav>
        <Menu />
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default Layout;

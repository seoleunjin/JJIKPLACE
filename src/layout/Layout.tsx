import React, { FC, useState } from "react";
import Menu from "./Menu";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { LayoutProps } from "@/types/layout";
import layoutStyles from "@/styles/layout.module.css";
const Layout: FC<LayoutProps> = ({ children, title }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className={layoutStyles.layout_wrapper}>
      <Header onMenuClick={toggleMenu} title={title} />
      {isMenuOpen && (
        <nav>
          <Menu onClose={closeMenu} />
        </nav>
      )}
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

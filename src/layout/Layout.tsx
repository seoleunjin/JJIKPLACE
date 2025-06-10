import React, { FC, ReactNode, useState } from "react";
import Menu from "./Menu";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface LayoutProps {
  children: ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div>
      <Header onMenuClick={toggleMenu} />
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

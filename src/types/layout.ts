import { ReactNode } from "react";

// Layout.tsx Type
interface LayoutProps {
  title: string;
  children: ReactNode;
}
interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

interface MenuProps {
  onClose: () => void;
}

export type { LayoutProps, HeaderProps, MenuProps };

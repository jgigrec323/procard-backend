import React, { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <div className="p-6">{children}</div>;
};

export default MainLayout;

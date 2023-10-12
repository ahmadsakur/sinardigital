import React from "react";
import { Open_Sans } from "next/font/google";

const open_sans = Open_Sans({ subsets: ["latin"] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className={open_sans.className}>{children}</main>;
};

export default Layout;

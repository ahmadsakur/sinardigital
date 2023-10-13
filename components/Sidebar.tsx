import Image from "next/image";
import React from "react";
import { SlOptionsVertical } from "react-icons/sl";
import {
  PiArticle,
  PiLockSimple,
  PiTagSimple,
  PiUser,
  PiUserBold,
} from "react-icons/pi";
import { useRouter } from "next/router";
import Link from "next/link";

type TNavItem = {
  name: string;
  icon: React.ReactNode;
  href: string;
  isActive: boolean;
};

const NavItem = ({ name, icon, href, isActive }: TNavItem) => {
  return (
    <div className="w-full flex justify-between items-center">
      <Link
        href={href}
        className={`flex items-center gap-4 p-2 rounded-md cursor-pointer w-fit ${
          isActive ? "text-white" : "text-neutral-500"
        }`}
      >
        <div>{icon}</div>
        <p className="text-sm font-semibold">{name}</p>
      </Link>
      {isActive && <div className="w-1 bg-white h-6 rounded-xl"></div>}
    </div>
  );
};
const Sidebar = () => {
  const router = useRouter();
  const navItems: TNavItem[] = [
    {
      name: "Users",
      icon: <PiUser />,
      href: "/dashboard",
      isActive: router.pathname === "/dashboard",
    },
    {
      name: "Articles",
      icon: <PiArticle />,
      href: "#",
      isActive: router.pathname === "/dashboard/articles",
    },
    {
      name: "Category",
      icon: <PiTagSimple />,
      href: "#",
      isActive: router.pathname === "/dashboard/category",
    },
    {
      name: "Roles",
      icon: <PiLockSimple />,
      href: "#",
      isActive: router.pathname === "/dashboard/roles",
    },
  ];

  return (
    <div className="px-4 min-h-screen sticky top-8 border-r border-neutral-900">
      <div className="flex flex-col items-start justify-between px-4 py-8 min-h-screen">
        <div className="w-full">
        <div className="mb-8">
          <Image src={"/logo.png"} width={150} height={40} alt="company-logo" />
        </div>

        <div className="flex flex-col gap-y-4 w-full">
          {navItems.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </div>
        </div>
        <div className="p-2 flex justify-between w-full items-center bg-neutral-700 rounded-md my-8">
          <div className="flex items-center gap-2">
            <Image
              src="https://ui-avatars.com/api/?name=elon&background=random"
              alt="Profile"
              width={35}
              height={35}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold">Elon Musk</h3>
              <p className="text-xs text-neutral-300">Administrator</p>
            </div>
          </div>
          <div className="cursor-pointer">
            <SlOptionsVertical />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

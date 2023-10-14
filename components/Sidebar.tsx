import Image from "next/image";
import React, { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import {
  PiArticle,
  PiEqualsBold,
  PiLockSimple,
  PiTagSimple,
  PiUser,
  PiUserBold,
  PiXBold,
} from "react-icons/pi";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "./ui/button";

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
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="px-4 sticky top-4 border-r border-neutral-900">
      <div className="flex flex-col items-start justify-between md:px-4 py-4 md:py-8 h-full">
        <div className="w-full flex flex-row md:flex-col justify-between md:justify-start items-center">
          <div className="md:mb-8">
            <Image
              src={"/logo.png"}
              width={150}
              height={40}
              alt="company-logo"
            />
          </div>

          <div className="hidden md:flex flex-col gap-y-4 w-full">
            {navItems.map((item, index) => (
              <NavItem key={index} {...item} />
            ))}
          </div>
          <Button className="flex md:hidden" size={"icon"} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <PiXBold /> : <PiEqualsBold />}
          </Button>
        </div>
        <div className="hidden p-2 md:flex justify-between w-full items-center bg-neutral-700 rounded-md my-8">
          <div className="flex items-center gap-2">
            <img
              src="https://api.dicebear.com/7.x/thumbs/svg?seed=Felix"
              alt="Profile"
              
              className="rounded-full w-8 h-8"
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
      {isOpen && <div className="block md:hiden">Hi</div>}
    </div>
  );
};

export default Sidebar;

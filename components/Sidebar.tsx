import Image from "next/image";
import React, { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import {
  PiArticle,
  PiEqualsBold,
  PiLockSimple,
  PiTagSimple,
  PiUser,
  PiXBold,
} from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/router";
import Link from "next/link";
import { User } from "@/types/user";
import { useAuth } from "@/store/AuthContext";

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
const Sidebar = ({ user }: { user: User }) => {
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

  const { changeIsLoggedIn, changeToken } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    changeIsLoggedIn(false);
    changeToken("");
    router.push("/auth/signin");
  }

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
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 h-8 w-8 flex items-center justify-center rounded-sm"
            >
              {isOpen ? <PiXBold /> : <PiEqualsBold />}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {navItems.map((item, index) => (
                <DropdownMenuItem key={index}>
                  <div
                    className={`flex gap-2 items-center ${
                      item.isActive ? "text-white" : "text-neutral-400"
                    }`}
                  >
                    <div>{item.icon}</div>
                    <p className="text-sm">{item.name}</p>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-neutral-700" />
              <DropdownMenuItem className="flex items-center gap-2">
                <PiXBold />
                <p className="text-red-500">Logout</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="hidden px-4 py-2 md:flex justify-between w-full items-center bg-neutral-900 rounded-md my-8">
          <div className="flex items-center gap-2">
            <img
              src={user?.avatar}
              alt="Profile"
              className="rounded-full w-8 h-8"
            />
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold">{user?.name || "Ahmad"}</h3>
              <p className="text-xs text-neutral-300">
                {user?.role?.name || "Admin"}
              </p>
            </div>
          </div>
          <div className="cursor-pointer">
            <DropdownMenu >
              <DropdownMenuTrigger>
                <SlOptionsVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="flex items-center gap-2" onClick={handleLogout}>
                  <PiXBold />
                  <p className="text-red-500">Logout</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

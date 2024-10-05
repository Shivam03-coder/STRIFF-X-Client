"use client";
import { useAppSelector } from "@/redux/store";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

export interface sidebarLinkspropTypes {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLinks = ({ href, icon: Icon, label }: sidebarLinkspropTypes) => {
  const pathName = usePathname();
  const isActive =
    pathName === href || (pathName === "/" && href === "/dashboard");
  if (typeof window !== "undefined") {
    const screenWidth = window.innerWidth;
  }

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-4 px-6 py-3 transition-colors hover:bg-secondary-100 dark:hover:bg-primary-400 ${isActive ? "bg-secondary-100 dark:bg-primary-300" : ""} `}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[3px] bg-blue-400" />
        )}
        <Icon className="size-6 text-primary-700 dark:text-tertiary-500" />
        <h3 className="text-lg font-medium text-primary-700 opacity-70 dark:text-tertiary-500">
          {label}
        </h3>
      </div>
    </Link>
  );
};

export default SidebarLinks;

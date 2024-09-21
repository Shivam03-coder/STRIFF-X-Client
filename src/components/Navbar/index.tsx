import {
  AlignJustify,
  Fingerprint,
  Moon,
  Search,
  SlidersHorizontal,
  Sun,
} from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setisdarkMode, setisSidebarOpen } from "@/redux/states";
const Navbar = () => {
  const { isSidebarOpen, isdarkMode } = useAppSelector((state) => state.global);
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between bg-secondary-300 px-4 py-3 dark:bg-dark-primary">
      {/* SEARCH BAR */}
      <div className="flex items-center gap-8">
        {!isSidebarOpen ? null : (
          <button
            className="rounded-xl p-2 hover:bg-secondary-100 dark:hover:bg-primary-400"
            onClick={() => dispatch(setisSidebarOpen(!isSidebarOpen))}
          >
            <AlignJustify className="size-7 dark:text-dark-secondary" />
          </button>
        )}
        <div className="relative flex h-min w-[230px]">
          <Search className="absolute top-[50%] ml-2 size-6 -translate-y-1/2 cursor-pointer dark:text-primary-600" />
          <Input />
        </div>
      </div>
      {/* ICONS */}
      <div className="flex items-center">
        <button
          className={`${isdarkMode ? "rounded-xl p-2 text-dark-secondary dark:hover:bg-primary-400" : "rounded p-2 hover:bg-secondary-100"} mr-2`}
          onClick={() => dispatch(setisdarkMode(!isdarkMode))}
        >
          {isdarkMode ? (
            <Sun className="size-7 cursor-pointer" />
          ) : (
            <Moon className="size-7 cursor-pointer" />
          )}
        </button>
        <Link
          href="/app-settings"
          className="size-min rounded-xl p-2 dark:text-dark-secondary dark:hover:bg-primary-400"
        >
          <SlidersHorizontal className="size-7 cursor-pointer" />
        </Link>
        {/* <Link
          href="/authentication"
          className="size-min rounded p-2 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-100 dark:hover:text-primary-700"
        >
          <Fingerprint className="size-7 cursor-pointer" />
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;

import { Fingerprint, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="dark:bg-dark-primary flex items-center justify-between bg-secondary-300 px-4 py-3">
      {/* SEARCH BAR */}
      <div className="flex items-center gap-8">
        <div className="relative flex h-min w-[230px]">
          <Search className="absolute top-[50%] ml-2 size-6 -translate-y-1/2 cursor-pointer dark:text-secondary-300" />
          <Input />
        </div>
      </div>
      {/* ICONS */}
      <div className="flex items-center">
        <Link
          href="/app-settings"
          className="size-min rounded p-2 hover:bg-secondary-100"
        >
          <SlidersHorizontal className="size-7 cursor-pointer dark:bg-secondary-300" />
        </Link>
        <div className="ml-4 mr-5  min-h-[2rem] w-[0.1rem] bg-secondary-100 md:inline-block"></div>
        <Link
          href="/authentication"
          className="size-min rounded p-2 hover:bg-secondary-100"
        >
          <Fingerprint className="size-7 cursor-pointer dark:bg-secondary-300" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

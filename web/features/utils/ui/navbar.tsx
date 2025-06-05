import { MenuIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import NavbarSearch from "./navbar/search";
import NavbarUser from "./navbar/user";

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-sm px-4 sm:px-8 h-[64px] flex items-center">
      <div className="navbar-start flex items-center gap-2 px-2">
        <Link href="/">
          <h2 className="font-bold text-lg select-none">Textify</h2>
        </Link>
      </div>
      <div className="navbar-end flex items-center gap-8 justify-end">
        <div className="hidden sm:flex items-center gap-4 flex-shrink-0 w-full justify-end">
          <NavbarSearch />
          <NavbarUser />
        </div>
        <div className="sm:hidden flex items-center gap-2">
          <Link href="/search" className="btn btn-ghost btn-square">
            <SearchIcon className="w-6 h-6" />
          </Link>
          <Link href="/menu" className="btn btn-ghost btn-square">
            <MenuIcon className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

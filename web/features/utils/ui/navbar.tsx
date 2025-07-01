import { MenuIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import NavbarSearch from "./navbar/search";
import NavbarUser from "./navbar/user";

const Navbar = () => {
  return (
    <nav className="w-full backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/30 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 shadow-sm">
      <div className="navbar px-4 sm:px-8 h-16 flex items-center max-w-none">
        {/* Brand */}
        <div className="navbar-start flex items-center gap-2">
          <Link href="/" className="group flex items-center gap-3 select-none">
            {/* Modern logo with glassmorphic background */}
            <div className="p-2 rounded-xl bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30 group-hover:bg-indigo-500/30 transition-all duration-200">
              <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
            </div>
            <h2 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 select-none">
              Textify
            </h2>
          </Link>
        </div>

        {/* Navigation actions */}
        <div className="navbar-end flex items-center gap-4 justify-end">
          {/* Desktop navigation */}
          <div className="hidden sm:flex items-center gap-4 flex-shrink-0 w-full justify-end">
            <NavbarSearch />
            <NavbarUser />
          </div>

          {/* Mobile navigation */}
          <div className="sm:hidden flex items-center gap-2">
            <Link
              href="/search"
              className="p-2 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-200"
            >
              <SearchIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>
            <Link
              href="/menu"
              className="p-2 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-200"
            >
              <MenuIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import NavbarSearch from "./navbar/search";
import NavbarUser from "./navbar/user";

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-sm px-4 sm:px-8 h-[64px] flex items-center z-10 sticky top-0">
      <div className="navbar-start flex items-center gap-2">
        <button className="sm:hidden btn btn-square btn-ghost">
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
        <h2 className="font-bold text-lg">Textify</h2>
      </div>
      <div className="navbar-end flex items-center gap-8 justify-end">
        <NavbarSearch />
        <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
          <NavbarUser />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

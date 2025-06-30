import { User } from "@/entities/auth/lib/model";
import { verifyUser } from "@/entities/auth/lib/verify";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import { Plus, User as UserIcon } from "lucide-react";
import Link from "next/link";

const NavbarUser = async () => {
  const client = createClient();
  await verifyUser(client);

  const user = client.authStore.record as User | null;
  if (user && user.avatar) {
    const avatarURL = client.files.getURL(user, user.avatar);
    user.avatarURL = avatarURL;
  }

  if (user) {
    return (
      <>
        <Link
          href="/account"
          className="group flex items-center gap-3 px-3 py-2 rounded-2xl
                     bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30
                     hover:bg-white/70 dark:hover:bg-gray-700/70 hover:scale-[1.02]
                     transition-all duration-300 ease-in-out
                     supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-gray-800/40
                     shadow-sm hover:shadow-md"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/50 dark:ring-gray-700/50 group-hover:ring-indigo-500/50 transition-all duration-200">
              <img
                src={user?.avatarURL}
                alt={user?.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
          </div>

          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 max-w-[120px] truncate">
            {user?.name}
          </span>
        </Link>

        <Link
          href="/feeds/new"
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl
                     bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700
                     text-white font-medium shadow-lg hover:shadow-xl
                     hover:scale-[1.02] transition-all duration-300 ease-in-out
                     border border-indigo-500/20"
        >
          <div className="p-0.5 rounded-lg bg-white/20 group-hover:bg-white/30 transition-colors duration-200">
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
          </div>
          <span className="text-sm font-semibold whitespace-nowrap">
            New Feed
          </span>

          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </Link>
      </>
    );
  } else {
    return (
      <Link
        href="/join"
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl
                   bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700
                   text-white font-medium shadow-lg hover:shadow-xl
                   hover:scale-[1.02] transition-all duration-300 ease-in-out
                   border border-indigo-500/20 relative overflow-hidden"
      >
        <div className="p-0.5 rounded-lg bg-white/20 group-hover:bg-white/30 transition-colors duration-200">
          <UserIcon className="w-4 h-4" />
        </div>
        <span className="text-sm font-semibold">Join</span>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </Link>
    );
  }
};

export default NavbarUser;

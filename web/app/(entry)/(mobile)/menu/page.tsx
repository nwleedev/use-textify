import { verifyUser } from "@/entities/auth/lib/verify";
import UserProvider from "@/features/auth/lib/user/provider";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import BackLink from "@/shared/ui/link/back-button";
import MobileMenuAccount from "@/widgets/account/ui/mobile-menu";
import { Home, Layers, Plus, X } from "lucide-react";
import Link from "next/link";

const Page = async () => {
  const client = createClient();
  await verifyUser(client);
  return (
    <div className="flex flex-col w-full flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-900/20">
      <div className="w-full flex sticky top-0 z-50">
        <nav className="w-full backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/30 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 shadow-sm">
          <div className="navbar px-4 sm:px-8 h-16 flex items-center max-w-none">
            <div className="navbar-start flex items-center gap-2">
              <Link href="/" className="group flex items-center gap-3">
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
            <div className="navbar-end flex items-center gap-4 justify-end">
              <BackLink className="p-2 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-200">
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </BackLink>
            </div>
          </div>
        </nav>
      </div>
      <div className="flex-1 flex flex-col w-full gap-6 p-6">
        <Link
          href="/feeds/new"
          className="group flex items-center gap-3 px-6 py-4 rounded-2xl
                     bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700
                     text-white font-medium shadow-lg hover:shadow-xl
                     hover:scale-[1.02] transition-all duration-300 ease-in-out
                     border border-indigo-500/20 relative overflow-hidden"
        >
          <div className="p-1.5 rounded-lg bg-white/20 group-hover:bg-white/30 transition-colors duration-200">
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          </div>
          <span className="text-base font-semibold">Create New Feed</span>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </Link>
        <div className="flex flex-col w-full gap-2">
          <Link
            href="/"
            className="group flex items-center gap-4 px-6 py-4 rounded-2xl
                       bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30
                       hover:bg-white/70 dark:hover:bg-gray-700/70 hover:scale-[1.01]
                       transition-all duration-300 ease-in-out
                       supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-gray-800/40
                       shadow-sm hover:shadow-md"
          >
            <div className="p-2 rounded-xl bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors duration-200">
              <Home className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-base font-medium text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
              Home
            </span>
          </Link>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/50 dark:via-gray-600/50 to-transparent my-2" />
          <Link
            href="/categories"
            className="group flex items-center gap-4 px-6 py-4 rounded-2xl
                       bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30
                       hover:bg-white/70 dark:hover:bg-gray-700/70 hover:scale-[1.01]
                       transition-all duration-300 ease-in-out
                       supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-gray-800/40
                       shadow-sm hover:shadow-md"
          >
            <div className="p-2 rounded-xl bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors duration-200">
              <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-base font-medium text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
              Categories
            </span>
          </Link>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/50 dark:via-gray-600/50 to-transparent my-2" />
        <UserProvider user={client.authStore.record}>
          <MobileMenuAccount />
        </UserProvider>
      </div>
    </div>
  );
};

export default Page;

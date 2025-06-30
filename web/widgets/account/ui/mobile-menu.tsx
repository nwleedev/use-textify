"use client";

import UserContext from "@/entities/auth/lib/user/context";
import { useClient } from "@/shared/lib/pocketbase/hook";
import { LogIn, Settings } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

const MobileMenuAccount = () => {
  const client = useClient();
  const user = useContext(UserContext);
  if (user && user.avatar) {
    const avatarURL = client.files.getURL(user, user.avatar);
    user.avatarURL = avatarURL;
  }

  if (user) {
    return (
      <Link
        href="/account"
        className="group flex items-center gap-4 px-6 py-4 rounded-2xl
                   bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30
                   hover:bg-white/70 dark:hover:bg-gray-700/70 hover:scale-[1.01]
                   transition-all duration-300 ease-in-out
                   supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-gray-800/40
                   shadow-sm hover:shadow-md"
      >
        {/* User Avatar */}
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-white/50 dark:ring-gray-700/50 group-hover:ring-indigo-500/50 transition-all duration-200">
            <img
              src={user?.avatarURL}
              alt={user?.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
            />
          </div>
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
        </div>

        {/* User Info */}
        <div className="flex-1 flex flex-col items-start">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
            {user?.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
            {user?.email}
          </p>
        </div>

        {/* Settings Icon */}
        <div className="p-2 rounded-xl bg-gray-500/20 group-hover:bg-indigo-500/20 transition-colors duration-200">
          <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200" />
        </div>
      </Link>
    );
  } else {
    return (
      <Link
        href="/join"
        className="group flex items-center gap-4 px-6 py-4 rounded-2xl
                   bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700
                   text-white shadow-lg hover:shadow-xl
                   hover:scale-[1.01] transition-all duration-300 ease-in-out
                   border border-indigo-500/20 relative overflow-hidden"
      >
        {/* Join Icon */}
        <div className="p-2 rounded-xl bg-white/20 group-hover:bg-white/30 transition-colors duration-200">
          <LogIn className="w-5 h-5" />
        </div>

        {/* Join Text */}
        <div className="flex-1 flex flex-col items-start">
          <h3 className="text-base font-semibold">Join Textify</h3>
          <p className="text-sm text-white/80 mt-0.5">Create your account</p>
        </div>

        {/* Arrow */}
        <div className="p-1 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-200">
          <svg
            className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        {/* Subtle shine effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </Link>
    );
  }
};

export default MobileMenuAccount;

"use client";

import UserContext from "@/entities/auth/lib/user/context";
import { getPreferenceByUserQueryKey } from "@/entities/preferences/lib/query-key";
import { getPreferenceByUserQuery } from "@/features/preferences/lib/query";
import { useClient } from "@/shared/lib/pocketbase/hook";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar, Crown, Edit, Mail, User } from "lucide-react";
import { useContext } from "react";
import AccountUsernameEdit from "./username-edit";

const AccountMain = () => {
  const client = useClient();
  const { data: preference } = useSuspenseQuery({
    queryKey: getPreferenceByUserQueryKey(),
    queryFn: getPreferenceByUserQuery(client),
  });
  const user = useContext(UserContext);
  const createdAt = format(user?.created, "yyyy");
  if (user && user.avatar) {
    const avatarURL = client.files.getURL(user, user.avatar);
    user.avatarURL = avatarURL;
  }
  return (
    <div className="w-full max-w-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border border-white/20 dark:border-gray-700/30 supports-[backdrop-filter]:bg-white/90 dark:supports-[backdrop-filter]:bg-gray-900/90 shadow-2xl rounded-3xl overflow-hidden">
      {/* Modern glassmorphic profile header */}
      <div className="relative p-8 sm:p-10 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 border-b border-white/20 dark:border-gray-700/30">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-50"></div>
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-indigo-400/20 rounded-full blur-xl"></div>

        <div className="relative flex flex-col items-center gap-6">
          {/* Enhanced avatar with glassmorphic ring */}
          <div className="relative">
            <div className="w-28 h-28 rounded-3xl overflow-hidden ring-4 ring-white/50 dark:ring-gray-700/50 shadow-xl backdrop-blur-sm">
              <img
                src={user?.avatarURL}
                alt={user?.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online status indicator */}
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg flex items-center justify-center">
              <Crown className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* User info with improved typography */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {user?.name}
            </h2>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <p className="text-sm font-medium">Member since {createdAt}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile information with modern cards */}
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-indigo-500/20">
            <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Profile Information
          </h3>
        </div>

        {/* Email Field */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            <div className="p-1.5 rounded-lg bg-blue-500/20">
              <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            Email Address
          </label>
          <div className="p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
            <p className="text-gray-900 dark:text-white font-medium">
              {user?.email}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Your email is verified and secure
            </p>
          </div>
        </div>

        {/* Name Field */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            <div className="p-1.5 rounded-lg bg-green-500/20">
              <User className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            Full Name
          </label>
          <div className="p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
            <p className="text-gray-900 dark:text-white font-medium">
              {user?.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Your name is managed by your authentication provider
            </p>
          </div>
        </div>

        {/* Username Field - Interactive Client Component */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            <div className="p-1.5 rounded-lg bg-purple-500/20">
              <Edit className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            Username
          </label>
          <AccountUsernameEdit preference={preference} />
        </div>
      </div>
    </div>
  );
};

export default AccountMain;

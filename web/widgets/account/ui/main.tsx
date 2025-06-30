"use client";

import UserContext from "@/entities/auth/lib/user/context";
import { getPreferenceByUserQueryKey } from "@/entities/preferences/lib/query-key";
import { getPreferenceByUserQuery } from "@/features/preferences/lib/query";
import { useClient } from "@/shared/lib/pocketbase/hook";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { EditIcon, MailIcon, UserIcon } from "lucide-react";
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
    <div className="card bg-base-100 w-full max-w-2xl border border-base-200 shadow-lg">
      <div className="card-body p-6 sm:p-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="avatar">
            <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={user?.avatarURL}
                alt={user?.name}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-base-content">
              {user?.name}
            </h2>
            <p className="text-base-content/70 mt-1">
              Member since {createdAt}
            </p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-base-content border-b border-base-300 pb-2">
            Profile Information
          </h3>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-base-content/80 flex items-center gap-2">
              <MailIcon className="w-4 h-4" />
              Email Address
            </label>
            <div className="bg-base-200 rounded-lg p-4">
              <p className="text-base-content font-medium">{user?.email}</p>
            </div>
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-base-content/80 flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              Full Name
            </label>
            <div className="bg-base-200 rounded-lg p-4">
              <p className="text-base-content font-medium">{user?.name}</p>
              <p className="text-sm text-base-content/60 mt-1">
                Your name is managed by your authentication provider
              </p>
            </div>
          </div>

          {/* Username Field - Interactive Client Component */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-base-content/80 flex items-center gap-2">
              <EditIcon className="w-4 h-4" />
              Username
            </label>
            <AccountUsernameEdit preference={preference} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountMain;

"use client";

import UserContext from "@/entities/auth/lib/user/context";
import { useClient } from "@/shared/lib/pocketbase/hook";
import { LogInIcon } from "lucide-react";
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
        className="flex flex-col w-full items-start gap-2 px-4 py-4"
      >
        <div className="flex items-center gap-2">
          <img
            src={user?.avatarURL}
            alt={user?.name}
            className="w-8 h-8 rounded-full"
          />

          <div className="flex flex-col items-start">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-base-content/60">{user?.email}</p>
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <Link
        href="/join"
        className="flex flex-col w-full items-start gap-2 px-4 py-4"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-4">
            <LogInIcon className="w-4 h-4" />
            <p className="text-base font-medium">Join</p>
          </div>
        </div>
      </Link>
    );
  }
};

export default MobileMenuAccount;

import { User } from "@/entities/auth/lib/model";
import { verifyUser } from "@/entities/auth/lib/verify";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import { NewspaperIcon, UserIcon } from "lucide-react";
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
        <Link href="/account" className="flex items-center gap-2 flex-shrink-0">
          <div className="rounded-full flex items-center gap-2">
            <div className="flex flex-shrink-0">
              <img
                src={user?.avatarURL}
                alt={user?.name}
                className="w-8 h-8 rounded-full"
              />
            </div>
            <span className="text-sm">{user?.name}</span>
          </div>
        </Link>

        <Link href="/feeds/new" className="btn btn-primary text-white gap-2">
          <NewspaperIcon className="w-4 h-4" />
          <span>New Feed</span>
        </Link>
      </>
    );
  } else {
    return (
      <Link href="/join" className="btn btn-primary text-white gap-2">
        <UserIcon className="w-4 h-4" />
        <span>Join</span>
      </Link>
    );
  }
};

export default NavbarUser;

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
        <div>
          <div className="avatar avatar-sm">
            <div className="w-8 rounded-full">
              <img src={user?.avatarURL} alt={user?.name} />
              <span>{user?.name}</span>
            </div>
          </div>
        </div>
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

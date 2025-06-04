import { User } from "@/entities/auth/lib/model";
import { verifyUser } from "@/entities/auth/lib/verify";
import { createClient } from "@/shared/lib/pocketbase/server/client";
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
        <Link
          href="/feeds/new"
          className="btn btn-success btn-sm text-base text-white"
        >
          New Feed
        </Link>
      </>
    );
  } else {
    return (
      <Link
        href="/join"
        className="btn btn-success btn-sm text-base text-white"
      >
        Join
      </Link>
    );
  }
};

export default NavbarUser;

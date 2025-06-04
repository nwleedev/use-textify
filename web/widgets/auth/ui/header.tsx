import { User } from "@/entities/auth/lib/model";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import { cookies } from "next/headers";

const HeaderUser = () => {
  const client = createClient();
  client.authStore.loadFromCookie(cookies().toString());

  const user = client.authStore.record as User | null;

  if (user) {
    return (
      <div>
        <div className="avatar avatar-sm">
          <div className="w-8 rounded-full">
            <img src={user?.avatarURL} alt={user?.name} />
            <span>{user?.name}</span>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default HeaderUser;

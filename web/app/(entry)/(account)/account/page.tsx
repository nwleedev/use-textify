import { verifyUser } from "@/entities/auth/lib/verify";
import { getPreferenceByUserQueryKey } from "@/entities/preferences/lib/query-key";
import UserProvider from "@/features/auth/lib/user/provider";
import { getPreferenceByUserQuery } from "@/features/preferences/lib/query";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import HydrationQuery from "@/shared/ui/hydration-query";
import AccountMain from "@/widgets/account/ui/main";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

const AccountPage = async () => {
  const client = createClient();
  await verifyUser(client);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Navigation Header */}
      <nav className="w-full z-10 sticky top-0 h-16 items-center flex flex-shrink-0 bg-base-100 border-b shadow-sm gap-4 px-4">
        <Link href="/" className="btn btn-ghost px-2">
          <ChevronLeftIcon className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-bold">Account Settings</h1>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-start justify-center p-4 pt-8">
        <HydrationQuery
          queryKey={getPreferenceByUserQueryKey()}
          queryFn={getPreferenceByUserQuery(client)}
        >
          <UserProvider user={client.authStore.record}>
            <AccountMain />
          </UserProvider>
        </HydrationQuery>
      </div>
    </div>
  );
};

export default AccountPage;

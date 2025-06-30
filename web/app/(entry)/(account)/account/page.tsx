import { verifyUser } from "@/entities/auth/lib/verify";
import { getPreferenceByUserQueryKey } from "@/entities/preferences/lib/query-key";
import UserProvider from "@/features/auth/lib/user/provider";
import { getPreferenceByUserQuery } from "@/features/preferences/lib/query";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import HydrationQuery from "@/shared/ui/hydration-query";
import AccountMain from "@/widgets/account/ui/main";
import { ChevronLeft, Settings } from "lucide-react";
import Link from "next/link";

const AccountPage = async () => {
  const client = createClient();
  await verifyUser(client);

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-900/20 flex flex-col">
      {/* Modern glassmorphic navigation header */}
      <nav className="w-full z-50 sticky top-0 h-16 items-center flex flex-shrink-0 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/30 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 shadow-sm gap-4 px-4">
        <Link
          href="/"
          className="p-2 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </Link>
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 rounded-xl bg-indigo-500/20 backdrop-blur-sm">
            <Settings className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            Account Settings
          </h1>
        </div>
      </nav>

      {/* Main Content with improved spacing and glassmorphic background */}
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

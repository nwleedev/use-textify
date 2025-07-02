import { verifyUser } from "@/entities/auth/lib/verify";
import { getReportsQueryKey } from "@/entities/report/lib/query-key";
import { getReportsQuery, initialPageParam } from "@/features/report/lib/query";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import HydrationInfiniteQuery from "@/shared/ui/hydration-infinite-query";
import ReportList from "@/widgets/report/ui/list";
import { redirect } from "next/navigation";

const Page = async () => {
  const client = createClient();
  const [, isValid] = await verifyUser(client);
  if (!isValid) {
    redirect("/join");
  }

  return (
    <div className="flex-1 flex flex-col w-full bg-gradient-to-br from-gray-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-900 dark:to-red-900/20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-400/20 dark:bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-400/20 dark:bg-orange-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl border border-white/20 dark:border-gray-700/30 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-500/20 dark:bg-red-400/20 backdrop-blur-sm">
                  <svg
                    className="w-6 h-6 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    Reports
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Community feedback and issue reports
                  </p>
                </div>
              </div>

              {/* New Report Button */}
              <a
                href="/reports/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="hidden sm:inline">New Report</span>
              </a>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <HydrationInfiniteQuery
          queryKey={getReportsQueryKey()}
          queryFn={getReportsQuery(client)}
          initialPageParam={initialPageParam}
        >
          <ReportList />
        </HydrationInfiniteQuery>
      </div>
    </div>
  );
};

export default Page;

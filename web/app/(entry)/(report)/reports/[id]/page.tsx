import { verifyUser } from "@/entities/auth/lib/verify";
import { getReportByIdQueryKey } from "@/entities/report/lib/query-key";
import { getReportByIdQuery } from "@/features/report/lib/query";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import HydrationQuery from "@/shared/ui/hydration-query";
import ReportDetail from "@/widgets/report/ui/detail";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
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
        {/* Back Navigation */}
        <div className="mb-6">
          <a
            href="/reports"
            className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/30 rounded-xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 shadow-lg"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">Back to Reports</span>
          </a>
        </div>

        {/* Report Detail */}
        <HydrationQuery
          queryKey={getReportByIdQueryKey(id)}
          queryFn={getReportByIdQuery(client)}
        >
          <ReportDetail id={id} />
        </HydrationQuery>
      </div>
    </div>
  );
};

export default Page;

import { verifyUser } from "@/entities/auth/lib/verify";
import UserProvider from "@/features/auth/lib/user/provider";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import ReportForm from "@/widgets/report/ui/form";
import { redirect } from "next/navigation";

const Page = async () => {
  const client = createClient();
  const [, isValid] = await verifyUser(client);
  if (!isValid) {
    redirect("/join");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-900 dark:to-red-900/20">
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

        {/* Header Section */}
        <div className="mb-8">
          <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl border border-white/20 dark:border-gray-700/30 p-6 lg:p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-red-500/20 dark:bg-red-400/20 backdrop-blur-sm">
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
              <div className="flex-1">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                  Submit New Report
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Help improve our community by reporting issues or feedback
                </p>
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-700/30">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-blue-500/20 dark:bg-blue-400/20 mt-0.5">
                  <svg
                    className="w-4 h-4 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">
                    Reporting Guidelines
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Please provide clear and detailed information about the
                    issue. This helps our team address your concerns more
                    effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Form */}
        <UserProvider user={client.authStore.record}>
          <ReportForm />
        </UserProvider>
      </div>
    </div>
  );
};

export default Page;

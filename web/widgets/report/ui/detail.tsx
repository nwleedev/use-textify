"use client";

import { getReportByIdQueryKey } from "@/entities/report/lib/query-key";
import { getReportByIdQuery } from "@/features/report/lib/query";
import { useClient } from "@/shared/lib/pocketbase/hook";
import { useSuspenseQuery } from "@tanstack/react-query";

export interface ReportDetailProps {
  id: string;
}

const ReportDetail = (props: ReportDetailProps) => {
  const { id } = props;
  const client = useClient();
  const { data } = useSuspenseQuery({
    queryKey: getReportByIdQueryKey(id),
    queryFn: getReportByIdQuery(client),
  });

  return (
    <div className="space-y-6">
      {/* Main Report Card */}
      <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 lg:p-8 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
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
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                {data.title}
              </h1>
            </div>

            {/* Report ID */}
            <div className="text-right">
              <p className="text-sm text-gray-900 dark:text-white">
                {new Date(data.created).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(data.created).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* User Info & Timestamps */}
          <div className="flex items-center justify-between">
            {/* User Info */}
            <div className="flex items-center gap-3">
              {data.expand?.user ? (
                <>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center text-white font-medium">
                    {data.expand.user.name?.charAt(0).toUpperCase() ||
                      data.expand.user.email?.charAt(0).toUpperCase() ||
                      "U"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {data.expand.user.name ||
                        data.expand.user.email ||
                        "Anonymous User"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Reported by this user
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600 flex items-center justify-center text-white">
                    ?
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Anonymous User
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      User information not available
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Report Details
              </h2>
              <div className="bg-gray-50/50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {data.text}
                </p>
              </div>
            </div>

            {/* Metadata */}
            {data.updated !== data.created && (
              <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span>
                    Last updated on{" "}
                    {new Date(data.updated).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Actions */}
      <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl border border-white/20 dark:border-gray-700/30 p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Related Actions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="/reports/new"
            className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 dark:bg-red-400/10 hover:bg-red-500/20 dark:hover:bg-red-400/20 transition-all duration-300 group"
          >
            <div className="p-2 rounded-lg bg-red-500/20 dark:bg-red-400/20 group-hover:bg-red-500/30 dark:group-hover:bg-red-400/30 transition-colors duration-300">
              <svg
                className="w-4 h-4 text-red-600 dark:text-red-400"
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
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Submit New Report
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Report another issue
              </p>
            </div>
          </a>

          <a
            href="/reports"
            className="flex items-center gap-3 p-4 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
          >
            <div className="p-2 rounded-lg bg-gray-200/50 dark:bg-gray-700/50 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors duration-300">
              <svg
                className="w-4 h-4 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                All Reports
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                View community reports
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;

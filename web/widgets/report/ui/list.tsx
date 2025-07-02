"use client";

import { getReportsQueryKey } from "@/entities/report/lib/query-key";
import {
  getNextPageParam,
  getReportsQuery,
  initialPageParam,
} from "@/features/report/lib/query";
import { useClient } from "@/shared/lib/pocketbase/hook";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";

const ReportList = () => {
  const client = useClient();
  const { data } = useSuspenseInfiniteQuery({
    queryKey: getReportsQueryKey(),
    queryFn: getReportsQuery(client),
    initialPageParam: initialPageParam,
    getNextPageParam: getNextPageParam,
  });

  const reports = data.pages.flatMap((page) => page.items);

  if (!reports.length) {
    return (
      <div className="text-center py-12">
        <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl border border-white/20 dark:border-gray-700/30 p-8 shadow-xl max-w-md mx-auto">
          <div className="p-3 rounded-full bg-red-500/20 dark:bg-red-400/20 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600 dark:text-red-400"
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No reports yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Be the first to submit a report and help improve the community
            experience.
          </p>
          <a
            href="/reports/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Submit Report
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Reports Grid */}
      <div className="grid gap-6 auto-rows-auto">
        {reports.map((report, index) => {
          // Bento grid sizing based on content length and position
          const isLarge = report.text.length > 200 || index % 7 === 0;
          const isMedium = report.text.length > 100 || index % 3 === 0;

          return (
            <Link
              key={report.id}
              href={`/reports/${report.id}`}
              className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-2xl
                ${isLarge ? "p-8" : isMedium ? "p-6" : "p-6"}
              `}
            >
              {/* Gradient Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300 line-clamp-2
                      ${isLarge ? "text-xl lg:text-2xl" : "text-lg lg:text-xl"}
                    `}
                    >
                      {report.title}
                    </h3>
                  </div>

                  {/* Status Badge */}
                  {/* <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                      Pending
                    </span>
                  </div> */}
                </div>

                {/* Report Content */}
                <div className="space-y-3">
                  <p
                    className={`text-gray-600 dark:text-gray-300 leading-relaxed
                    ${
                      isLarge
                        ? "text-base line-clamp-4"
                        : "text-sm line-clamp-3"
                    }
                  `}
                  >
                    {report.text}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                  {/* User Info */}
                  <div className="flex items-center gap-3">
                    {report.expand?.user ? (
                      <>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center text-white text-sm font-medium">
                          {report.expand.user.name?.charAt(0).toUpperCase() ||
                            report.expand.user.email?.charAt(0).toUpperCase() ||
                            "U"}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {report.expand.user.name ||
                              report.expand.user.email ||
                              "Anonymous"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(report.created).toLocaleDateString()}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-400 dark:bg-gray-600 flex items-center justify-center text-white text-sm">
                          ?
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Anonymous
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            {new Date(report.created).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* View Arrow */}
                  <div className="flex-shrink-0">
                    <div className="p-2 rounded-full bg-red-500/10 dark:bg-red-400/10 group-hover:bg-red-500/20 dark:group-hover:bg-red-400/20 transition-colors duration-300">
                      <svg
                        className="w-4 h-4 text-red-600 dark:text-red-400 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Effect Ring */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          );
        })}
      </div>

      {/* Load More Indicator */}
      {data.pages[data.pages.length - 1]?.items.length === 10 && (
        <div className="text-center py-8">
          <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl border border-white/20 dark:border-gray-700/30 p-6 shadow-xl max-w-sm mx-auto">
            <div className="animate-pulse flex items-center justify-center gap-3">
              <div
                className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              Loading more reports...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportList;

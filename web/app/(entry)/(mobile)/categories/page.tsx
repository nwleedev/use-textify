"use client";

import { CategoryIcon } from "@/entities/category/lib/icons";
import CategoriesQuery from "@/features/category/ui/query";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-900/20">
      {/* Modern glassmorphic header */}
      <div className="w-full flex sticky top-0 z-50">
        <nav className="w-full backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/30 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 shadow-sm">
          <div className="navbar px-4 sm:px-8 h-16 flex items-center max-w-none">
            {/* Brand */}
            <div className="navbar-start flex items-center gap-2">
              <Link href="/" className="group flex items-center gap-3">
                {/* Modern logo with glassmorphic background */}
                <div className="p-2 rounded-xl bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30 group-hover:bg-indigo-500/30 transition-all duration-200">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">T</span>
                  </div>
                </div>
                <h2 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 select-none">
                  Textify
                </h2>
              </Link>
            </div>

            {/* Close button */}
            <div className="navbar-end flex items-center gap-4 justify-end">
              <button
                className="p-2 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-200"
                onClick={() => router.back()}
              >
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </nav>
      </div>

      <div className="flex-1 flex flex-col w-full gap-6 p-6">
        {/* Page Title */}
        <div className="px-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Categories
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Browse feeds by category
          </p>
        </div>

        {/* Categories List */}
        <Suspense
          fallback={
            <div className="flex flex-col gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 rounded-2xl bg-white/30 dark:bg-gray-800/30 animate-pulse"
                />
              ))}
            </div>
          }
        >
          <CategoriesQuery>
            {(response) => {
              return (
                <div className="flex flex-col gap-3">
                  {response.data.map((category) => (
                    <Link
                      key={category.id}
                      href={`/feeds?category=${category.key}`}
                      className="group flex items-center gap-4 px-6 py-4 rounded-2xl
                                 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30
                                 hover:bg-white/70 dark:hover:bg-gray-700/70 hover:scale-[1.01]
                                 transition-all duration-300 ease-in-out
                                 supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-gray-800/40
                                 shadow-sm hover:shadow-md"
                    >
                      {/* Category icon with glassmorphic background */}
                      <div className="p-3 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm group-hover:bg-indigo-500/20 transition-colors duration-200">
                        <CategoryIcon
                          iconKey={category.key}
                          className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200"
                        />
                      </div>

                      {/* Category details */}
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                          Explore {category.name.toLowerCase()} feeds
                        </p>
                      </div>

                      {/* Arrow indicator */}
                      <div className="p-1 rounded-lg bg-gray-500/10 group-hover:bg-gray-500/20 transition-colors duration-200">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-all duration-200 group-hover:translate-x-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              );
            }}
          </CategoriesQuery>
        </Suspense>
      </div>
    </div>
  );
};

export default Page;

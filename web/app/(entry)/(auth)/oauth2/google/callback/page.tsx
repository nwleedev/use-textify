"use client";

import { GoogleCallback } from "@/widgets/auth/ui/callback";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="flex-1 flex-col bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-900/20 flex items-center justify-center px-4 py-8">
      <div className="relative w-full max-w-sm">
        {/* Main glassmorphic card */}
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 shadow-2xl rounded-3xl p-8 space-y-8">
          {/* Header with branding */}
          <div className="text-center space-y-4">
            {/* Logo with animation */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center animate-pulse">
                <span className="text-2xl font-bold text-white">T</span>
              </div>
            </div>

            {/* Processing indicator */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Almost there!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We&apos;re setting up your account
              </p>
            </div>
          </div>

          {/* Loading content */}
          <div className="space-y-6">
            <Suspense
              fallback={
                <div className="space-y-4">
                  {/* Animated loading spinner */}
                  <div className="flex justify-center">
                    <div className="w-12 h-12 border-4 border-indigo-200 dark:border-indigo-800 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin" />
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      Preparing your experience...
                    </span>
                  </div>
                </div>
              }
            >
              <GoogleCallback />
            </Suspense>

            {/* Security note */}
            <div className="text-center pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Your data is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

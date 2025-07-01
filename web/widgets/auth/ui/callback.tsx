"use client";

import { googleAction } from "@/features/auth/lib/action/callback";
import { useClient } from "@/shared/lib/pocketbase/hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const GoogleCallback = () => {
  const searchParams = useSearchParams();
  const client = useClient();
  const router = useRouter();

  useEffect(() => {
    async function onAuth() {
      await googleAction(searchParams.toString());
      client.authStore.loadFromCookie(document.cookie);
      await client.collection("users").authRefresh();
      router.push("/");
    }
    onAuth();
  }, [searchParams, client, router]);

  return (
    <div className="space-y-6">
      {/* Modern loading spinner */}
      <div className="flex justify-center">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-16 h-16 border-4 border-green-200 dark:border-green-800 rounded-full animate-pulse" />
          {/* Inner spinning ring */}
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-green-600 dark:border-t-green-400 rounded-full animate-spin" />
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-green-600 dark:bg-green-400 rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Status text */}
      <div className="text-center space-y-2">
        <div className="text-lg font-semibold text-gray-900 dark:text-white">
          Signing you in with Google
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Please wait while we complete the authentication...
        </div>
      </div>

      {/* Success indicator */}
      <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-green-50/50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-700/30">
        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
          <svg
            className="w-3 h-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="text-sm font-medium text-green-700 dark:text-green-300">
          Setting up your account
        </span>
      </div>
    </div>
  );
};

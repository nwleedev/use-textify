"use client";

import { GoogleCallback } from "@/widgets/auth/ui/callback";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-xs bg-white dark:bg-base-200 rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4 border border-gray-200 dark:border-gray-700">
        <Suspense>
          <GoogleCallback />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;

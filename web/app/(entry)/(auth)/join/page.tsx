import { getOAuth2MethodsQueryKey } from "@/entities/auth/lib/query-key";
import { getOAuth2MethodsQuery } from "@/features/auth/lib/query";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import HydrationQuery from "@/shared/ui/hydration-query";
import OAuth2Providers from "@/widgets/auth/ui/providers";

const Page = () => {
  const client = createClient();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <HydrationQuery
        queryKey={getOAuth2MethodsQueryKey()}
        queryFn={getOAuth2MethodsQuery(client)}
      >
        <div className="w-full max-w-md bg-white dark:bg-base-200 rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 border border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Join Use Textify
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-2">
            Sign up or log in with your favorite provider to get started.
          </p>
          <OAuth2Providers />
        </div>
      </HydrationQuery>
    </div>
  );
};

export default Page;

import { getFeedsQueryKey } from "@/entities/feed/lib/query-key";
import { getFeedsQuery, initialPageParam } from "@/features/feed/lib/query";
import FeedFetchNext from "@/features/feed/ui/fetch-next";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import HydrationInfiniteQuery from "@/shared/ui/hydration-infinite-query";
import FeedsGrid from "@/widgets/feeds/ui/grid";

export default function Page() {
  const client = createClient();
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-900/20 flex flex-col w-full flex-1">
      {/* Hero section with modern glassmorphic design */}
      <div className="relative overflow-hidden flex flex-col w-full flex-1">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]" />

        {/* Content container */}
        <div className="relative">
          {/* Main content */}
          <div className="flex flex-col w-full">
            <HydrationInfiniteQuery
              queryKey={getFeedsQueryKey()}
              queryFn={getFeedsQuery(client)}
              initialPageParam={initialPageParam}
            >
              <FeedsGrid />
            </HydrationInfiniteQuery>

            {/* Infinite scroll trigger */}
            <FeedFetchNext>
              <div className="w-full h-px bg-transparent"></div>
            </FeedFetchNext>
          </div>
        </div>
      </div>
    </div>
  );
}

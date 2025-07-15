import { getFeedsByFilterQueryKey } from "@/entities/feed/lib/query-key";
import { initialPageParam } from "@/features/feed/lib/query";
import { getFeedsByFilterQuery } from "@/features/feed/lib/query/filter";
import FeedFilterFetchNext from "@/features/feed/ui/filter-fetch-next";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import { toSearchParams } from "@/shared/lib/search-params/value";
import HydrationInfiniteQuery from "@/shared/ui/hydration-infinite-query";
import FeedsFilterGrid from "@/widgets/feeds/ui/filter-grid";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Record<string, string>;
}): Promise<Metadata> {
  const [, filter] = getFeedsByFilterQueryKey(toSearchParams(searchParams));
  let title = "Feeds - Use Textify";
  if (filter && filter.keyword) {
    title = `Search: ${filter.keyword} - Use Textify`;
  } else if (filter && filter.category) {
    title = `Category: ${filter.category} - Use Textify`;
  } else if (filter && filter.tags) {
    title = `Tags: ${filter.tags.join(", ")} - Use Textify`;
  }
  return {
    title,
    description: "Feeds",
    alternates: {
      canonical: "https://usetextify.com/feeds",
    },
  };
}

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const client = createClient();
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-900/20 flex flex-col w-full flex-1">
      {/* Background patterns for depth */}
      <div className="relative overflow-hidden flex flex-col w-full flex-1">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]" />

        {/* Content container */}
        <div className="relative flex flex-col w-full flex-1">
          {/* Main content */}
          <div className="flex flex-col w-full">
            <HydrationInfiniteQuery
              queryKey={getFeedsByFilterQueryKey(toSearchParams(searchParams))}
              queryFn={getFeedsByFilterQuery(client)}
              initialPageParam={initialPageParam}
            >
              <FeedsFilterGrid />
            </HydrationInfiniteQuery>

            {/* Infinite scroll trigger */}
            <FeedFilterFetchNext>
              <div className="w-full h-px bg-transparent"></div>
            </FeedFilterFetchNext>
          </div>
        </div>
      </div>
    </div>
  );
}

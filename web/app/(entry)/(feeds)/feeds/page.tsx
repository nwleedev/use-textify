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
  let title = "Feeds";
  if (filter && filter.keyword) {
    title = `Search: ${filter.keyword}`;
  } else if (filter && filter.category) {
    title = `Category: ${filter.category}`;
  } else if (filter && filter.tags) {
    title = `Tags: ${filter.tags.join(", ")}`;
  }
  return {
    title,
    description: "Feeds",
  };
}

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const client = createClient();
  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <HydrationInfiniteQuery
        queryKey={getFeedsByFilterQueryKey(toSearchParams(searchParams))}
        queryFn={getFeedsByFilterQuery(client)}
        initialPageParam={initialPageParam}
      >
        <FeedsFilterGrid />
      </HydrationInfiniteQuery>
      <FeedFilterFetchNext>
        <div className="w-full h-px bg-transparent"></div>
      </FeedFilterFetchNext>
    </div>
  );
}

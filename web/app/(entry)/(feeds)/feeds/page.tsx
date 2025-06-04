import { getFeedsByFilterQueryKey } from "@/entities/feed/lib/query-key";
import { initialPageParam } from "@/features/feed/lib/query";
import { getFeedsByFilterQuery } from "@/features/feed/lib/query/filter";
import FeedFilterFetchNext from "@/features/feed/ui/filter-fetch-next";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import { toSearchParams } from "@/shared/lib/search-params/value";
import HydrationInfiniteQuery from "@/shared/ui/hydration-infinite-query";
import FeedsFilterGrid from "@/widgets/feeds/ui/filter-grid";

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

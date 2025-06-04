import { getFeedsQueryKey } from "@/entities/feed/lib/query-key";
import { getFeedsQuery, initialPageParam } from "@/features/feed/lib/query";
import FeedFetchNext from "@/features/feed/ui/fetch-next";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import HydrationInfiniteQuery from "@/shared/ui/hydration-infinite-query";
import FeedsGrid from "@/widgets/feeds/ui/grid";

export default function Page() {
  const client = createClient();
  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <HydrationInfiniteQuery
        queryKey={getFeedsQueryKey()}
        queryFn={getFeedsQuery(client)}
        initialPageParam={initialPageParam}
      >
        <FeedsGrid />
      </HydrationInfiniteQuery>
      <FeedFetchNext>
        <div className="w-full h-px bg-transparent"></div>
      </FeedFetchNext>
    </div>
  );
}

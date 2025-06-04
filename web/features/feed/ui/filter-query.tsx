import { FeedGridItem } from "@/entities/feed/lib/model";
import { getFeedsByFilterQueryKey } from "@/entities/feed/lib/query-key";
import { useClient } from "@/shared/lib/pocketbase/hook";
import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryResult,
} from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ListResult } from "pocketbase";
import {
  getFeedsByFilterQuery,
  getNextPageParam,
  initialPageParam,
} from "../lib/query/filter";

export interface FeedsFilterQueryProps {
  children: (
    response: UseSuspenseInfiniteQueryResult<
      InfiniteData<ListResult<FeedGridItem>, unknown>,
      Error
    >
  ) => React.ReactNode;
}

const FeedsFilterQuery = (props: FeedsFilterQueryProps) => {
  const { children } = props;
  const client = useClient();
  const searchParams = useSearchParams();
  const query = useSuspenseInfiniteQuery({
    queryKey: getFeedsByFilterQueryKey(searchParams),
    queryFn: getFeedsByFilterQuery(client),
    getNextPageParam,
    initialPageParam,
  });
  return children(query);
};

export default FeedsFilterQuery;

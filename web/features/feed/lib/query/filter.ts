import { getFeedsByFilter } from "@/entities/feed/lib/api";
import { FeedGridItem } from "@/entities/feed/lib/model";
import { GetFeedsByFilterQueryKey } from "@/entities/feed/lib/query-key";
import { GetNextPageParamFunction } from "@tanstack/react-query";
import Client, { ListResult } from "pocketbase";

export interface GetFeedsByFilterQueryProps {
  queryKey: GetFeedsByFilterQueryKey;
  pageParam: number;
}

const pageSize = 10;

export function getFeedsByFilterQuery(client: Client) {
  return function (props: GetFeedsByFilterQueryProps) {
    const { queryKey, pageParam } = props;
    const [, filter] = queryKey;
    return getFeedsByFilter(client, pageParam, pageSize, filter);
  };
}

export const initialPageParam = 1;

export const getNextPageParam: GetNextPageParamFunction<
  number,
  ListResult<FeedGridItem>
> = (page, pages, pageParam) => {
  if (page.items.length < pageSize) {
    return null;
  }
  return pageParam + 1;
};

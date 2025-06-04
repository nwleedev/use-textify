import { getFeedById, getFeeds } from "@/entities/feed/lib/api";
import { Feed } from "@/entities/feed/lib/model";
import {
  GetFeedByIdQueryKey,
  GetFeedsQueryKey,
} from "@/entities/feed/lib/query-key";
import { GetNextPageParamFunction } from "@tanstack/react-query";
import Client, { ListResult } from "pocketbase";

export interface GetFeedsQueryProps {
  queryKey: GetFeedsQueryKey;
  pageParam: number;
}

const pageSize = 10;

export function getFeedsQuery(client: Client) {
  return function (props: GetFeedsQueryProps) {
    const { queryKey, pageParam } = props;

    return getFeeds(client, pageParam, pageSize);
  };
}

export const initialPageParam = 1;

export const getNextPageParam: GetNextPageParamFunction<
  number,
  ListResult<Feed>
> = (page, pages, pageParam) => {
  if (page.items.length < pageSize) {
    return null;
  }
  return pageParam + 1;
};

export interface GetFeedByIdQueryProps {
  queryKey: GetFeedByIdQueryKey;
}
export function getFeedByIdQuery(client: Client) {
  return (props: GetFeedByIdQueryProps) => {
    const { queryKey } = props;
    const [, id] = queryKey;
    return getFeedById(client, id);
  };
}

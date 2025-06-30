import { getCommentsByFeed } from "@/entities/comment/lib/api";
import { CommentExpanded } from "@/entities/comment/lib/model";
import { GetCommentsByFeedQueryKey } from "@/entities/comment/lib/query-key";
import { GetNextPageParamFunction } from "@tanstack/react-query";
import Client, { ListResult } from "pocketbase";

export interface GetCommentsByFeedQueryProps {
  queryKey: GetCommentsByFeedQueryKey;
  pageParam: number;
}

const pageSize = 10;

export function getCommentsByFeedQuery(client: Client) {
  return function (props: GetCommentsByFeedQueryProps) {
    const { queryKey, pageParam } = props;
    const [, feedId] = queryKey;
    return getCommentsByFeed(client, feedId, pageParam, pageSize);
  };
}

export const initialPageParam = 1;

export const getNextPageParam: GetNextPageParamFunction<
  number,
  ListResult<CommentExpanded>
> = (page, pages, pageParam) => {
  if (page.items.length < pageSize) {
    return null;
  }
  return pageParam + 1;
};

"use client";

import { CommentExpanded } from "@/entities/comment/lib/model";
import { getCommentsByFeedQueryKey } from "@/entities/comment/lib/query-key";
import { useClient } from "@/shared/lib/pocketbase/hook";
import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryResult,
} from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ListResult } from "pocketbase";
import {
  getCommentsByFeedQuery,
  getNextPageParam,
  initialPageParam,
} from "../lib/query";

export interface CommentListQueryProps {
  children: (
    response: UseSuspenseInfiniteQueryResult<
      InfiniteData<ListResult<CommentExpanded>, unknown>,
      Error
    >
  ) => React.ReactNode;
}

export const CommentListQuery = (props: CommentListQueryProps) => {
  const { children } = props;
  const client = useClient();
  const { id } = useParams<{ id: string }>();
  const query = useSuspenseInfiniteQuery({
    queryKey: getCommentsByFeedQueryKey(id),
    queryFn: getCommentsByFeedQuery(client),
    initialPageParam: initialPageParam,
    getNextPageParam: getNextPageParam,
  });

  return children(query);
};

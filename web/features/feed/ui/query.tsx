"use client";

import { FeedGridItem } from "@/entities/feed/lib/model";
import {
  getFeedByIdQueryKey,
  getFeedsQueryKey,
} from "@/entities/feed/lib/query-key";
import { useClient } from "@/shared/lib/pocketbase/hook";
import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryResult,
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ListResult } from "pocketbase";
import {
  getFeedByIdQuery,
  getFeedsQuery,
  getNextPageParam,
  initialPageParam,
} from "../lib/query";

export interface FeedsQueryProps {
  children: (
    response: UseSuspenseInfiniteQueryResult<
      InfiniteData<ListResult<FeedGridItem>, unknown>,
      Error
    >
  ) => React.ReactNode;
}

export const FeedsQuery = (props: FeedsQueryProps) => {
  const { children } = props;
  const client = useClient();
  const query = useSuspenseInfiniteQuery({
    queryKey: getFeedsQueryKey(),
    queryFn: getFeedsQuery(client),
    initialPageParam: initialPageParam,
    getNextPageParam: getNextPageParam,
  });

  return children(query);
};

export interface FeedByIdQueryProps {
  children: (
    response: UseSuspenseQueryResult<FeedGridItem, Error>
  ) => React.ReactNode;
}

export const FeedByIdQuery = (props: FeedByIdQueryProps) => {
  const { children } = props;
  const client = useClient();
  const { id } = useParams<{ id: string }>();
  const query = useSuspenseQuery({
    queryKey: getFeedByIdQueryKey(id),
    queryFn: getFeedByIdQuery(client),
  });

  return children(query);
};

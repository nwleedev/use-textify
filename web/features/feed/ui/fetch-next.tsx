"use client";

import { getFeedsQueryKey } from "@/entities/feed/lib/query-key";
import { useClient } from "@/shared/lib/pocketbase/hook";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { cloneElement, useEffect } from "react";
import {
  getFeedsQuery,
  getNextPageParam,
  initialPageParam,
} from "../lib/query";

export interface FeedFetchNextProps {
  children: JSX.Element;
}

const FeedFetchNext = (props: FeedFetchNextProps) => {
  const { children } = props;
  const client = useClient();
  const { fetchNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery({
    queryKey: getFeedsQueryKey(),
    queryFn: getFeedsQuery(client),
    initialPageParam: initialPageParam,
    getNextPageParam: getNextPageParam,
  });
  const [ref, entry] = useIntersectionObserver({
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });
  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, fetchNextPage]);

  if (isFetchingNextPage || isFetching) {
    return children;
  }
  const component = cloneElement(children, {
    ref,
  });
  return component;
};

export default FeedFetchNext;

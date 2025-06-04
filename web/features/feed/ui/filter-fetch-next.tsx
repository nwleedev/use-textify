"use client";

import { getFeedsByFilterQueryKey } from "@/entities/feed/lib/query-key";
import { useClient } from "@/shared/lib/pocketbase/hook";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useSearchParams } from "next/navigation";
import { cloneElement, useEffect } from "react";
import { getNextPageParam, initialPageParam } from "../lib/query";
import { getFeedsByFilterQuery } from "../lib/query/filter";

export interface FeedFilterFetchNextProps {
  children: JSX.Element;
}

const FeedFilterFetchNext = (props: FeedFilterFetchNextProps) => {
  const { children } = props;
  const client = useClient();
  const searchParams = useSearchParams();
  const { fetchNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery({
    queryKey: getFeedsByFilterQueryKey(searchParams),
    queryFn: getFeedsByFilterQuery(client),
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

export default FeedFilterFetchNext;

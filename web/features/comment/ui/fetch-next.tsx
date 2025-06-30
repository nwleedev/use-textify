"use client";

import { getCommentsByFeedQueryKey } from "@/entities/comment/lib/query-key";
import { useClient } from "@/shared/lib/pocketbase/hook";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useParams } from "next/navigation";
import { cloneElement, useEffect } from "react";
import {
  getCommentsByFeedQuery,
  getNextPageParam,
  initialPageParam,
} from "../lib/query";

export interface CommentFetchNextProps {
  children: JSX.Element;
}

const CommentFetchNext = (props: CommentFetchNextProps) => {
  const { children } = props;
  const client = useClient();
  const { id } = useParams<{ id: string }>();
  const { fetchNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery({
    queryKey: getCommentsByFeedQueryKey(id),
    queryFn: getCommentsByFeedQuery(client),
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

export default CommentFetchNext;

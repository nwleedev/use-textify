import {
  dehydrate,
  FetchInfiniteQueryOptions,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { headers } from "next/headers";
import { Suspense } from "react";
import { createClient } from "../lib/tanstack-query/server/client";

export type HydrationInfiniteQueryProps<
  QueryKey extends readonly unknown[],
  QueryFnData = unknown,
  QueryError = Error,
  Data = QueryFnData,
  PageParam = unknown
> = FetchInfiniteQueryOptions<
  QueryFnData,
  QueryError,
  Data,
  QueryKey,
  PageParam
> & {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  queryClient?: QueryClient;
};

const HydrationInfiniteQuery = async <
  QueryKey extends readonly unknown[],
  QueryFnData = unknown,
  QueryError = Error,
  Data = QueryFnData,
  PageParam = unknown
>(
  props: HydrationInfiniteQueryProps<
    QueryKey,
    QueryFnData,
    QueryError,
    Data,
    PageParam
  >
) => {
  /**
   * headers() is used to make dynamic page.
   */
  headers();
  const { children, fallback, ...options } = props;
  const queryClient = props.queryClient ?? createClient();
  await queryClient.prefetchInfiniteQuery(options);

  return (
    <Suspense fallback={fallback}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </Suspense>
  );
};

export default HydrationInfiniteQuery;

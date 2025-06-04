import {
  dehydrate,
  FetchQueryOptions,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { headers } from "next/headers";
import { Suspense } from "react";
import { createClient } from "../lib/tanstack-query/server/client";

export type HydrationQueryProps<
  QueryKey extends readonly unknown[],
  QueryFnData = unknown,
  QueryError = Error,
  Data = QueryFnData
> = FetchQueryOptions<QueryFnData, QueryError, Data, QueryKey> & {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  queryClient?: QueryClient;
};

const HydrationQuery = async <
  QueryKey extends readonly unknown[],
  QueryFnData = unknown,
  QueryError = Error,
  Data = QueryFnData
>(
  props: HydrationQueryProps<QueryKey, QueryFnData, QueryError, Data>
) => {
  headers();
  const { children, fallback, ...options } = props;
  const queryClient = props.queryClient ?? createClient();
  await queryClient.prefetchQuery(options);

  return (
    <Suspense fallback={fallback}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </Suspense>
  );
};

export default HydrationQuery;

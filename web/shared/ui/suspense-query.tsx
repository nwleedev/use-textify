"use client";

import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";

export type SuspenseQueryProps<
  QueryFnData,
  QueryKey extends readonly unknown[],
  QueryData = QueryFnData,
  QueryError = Error
> = UseSuspenseQueryOptions<QueryFnData, QueryError, QueryData, QueryKey> & {
  children: (
    data: UseSuspenseQueryResult<QueryData, QueryError>
  ) => React.ReactNode;
};

const SuspenseQuery = <
  QueryFnData,
  QueryKey extends readonly unknown[],
  QueryData = QueryFnData,
  QueryError = Error
>(
  props: SuspenseQueryProps<QueryFnData, QueryKey, QueryData, QueryError>
) => {
  const { children, ...options } = props;
  const query = useSuspenseQuery(options);
  return children(query);
};

export default SuspenseQuery;

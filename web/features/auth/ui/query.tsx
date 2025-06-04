"use client";

import {
  getOAuth2MethodsQueryKey,
  getUserQueryKey,
} from "@/entities/auth/lib/query-key";
import { useClient } from "@/shared/lib/pocketbase/hook";
import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { AuthMethodsList, AuthRecord } from "pocketbase";
import { getOAuth2MethodsQuery, getUserQuery } from "../lib/query";

export interface OAuth2MethodsQueryProps {
  children: (
    query: UseSuspenseQueryResult<AuthMethodsList, Error>
  ) => React.ReactNode;
}

export const OAuth2MethodsQuery = (props: OAuth2MethodsQueryProps) => {
  const { children } = props;
  const client = useClient();
  const query = useSuspenseQuery({
    queryKey: getOAuth2MethodsQueryKey(),
    queryFn: getOAuth2MethodsQuery(client),
  });
  return children(query);
};

export interface UserQueryProps {
  children: (
    query: UseSuspenseQueryResult<AuthRecord | null, Error>
  ) => React.ReactNode;
}

export const UserQuery = (props: UserQueryProps) => {
  const { children } = props;
  const client = useClient();
  const query = useSuspenseQuery({
    queryKey: getUserQueryKey(),
    queryFn: getUserQuery(client),
    retry: false,
  });
  return children(query);
};

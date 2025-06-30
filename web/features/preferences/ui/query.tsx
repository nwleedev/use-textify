"use client";

import { Preference } from "@/entities/preferences/lib/model";
import {
  getPreferenceByUserQueryKey,
  getPreferencesByIdsQueryKey,
} from "@/entities/preferences/lib/query-key";
import { useClient } from "@/shared/lib/pocketbase/hook";
import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import {
  getPreferenceByUserQuery,
  getPreferencesByIdsQuery,
} from "../lib/query";

export interface PreferenceByUserQueryProps {
  children: (
    query: UseSuspenseQueryResult<Preference, Error>
  ) => React.ReactNode;
}

export const PreferenceByUserQuery = (props: PreferenceByUserQueryProps) => {
  const { children } = props;
  const client = useClient();
  const query = useSuspenseQuery({
    queryKey: getPreferenceByUserQueryKey(),
    queryFn: getPreferenceByUserQuery(client),
  });
  return children(query);
};

export interface PreferencesByIdsQueryProps {
  userIds: string[];
  children: (
    query: UseSuspenseQueryResult<Preference[], Error>
  ) => React.ReactNode;
}

export const PreferencesByIdsQuery = (props: PreferencesByIdsQueryProps) => {
  const { userIds, children } = props;
  const client = useClient();
  const query = useSuspenseQuery({
    queryKey: getPreferencesByIdsQueryKey(userIds),
    queryFn: getPreferencesByIdsQuery(client),
  });
  return children(query);
};

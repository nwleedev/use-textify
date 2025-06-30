import {
  getPreferenceByUser,
  getPreferencesByIds,
} from "@/entities/preferences/lib/api";
import {
  GetPreferenceByUserQueryKey,
  GetPreferencesByIdsQueryKey,
} from "@/entities/preferences/lib/query-key";
import Client from "pocketbase";

export interface GetPreferenceByUserQueryProps {
  queryKey: GetPreferenceByUserQueryKey;
}

export function getPreferenceByUserQuery(client: Client) {
  return (props: GetPreferenceByUserQueryProps) => {
    const { queryKey } = props;
    const [,] = queryKey;
    return getPreferenceByUser(client);
  };
}

export interface GetPreferencesByIdsQueryProps {
  queryKey: GetPreferencesByIdsQueryKey;
}

export function getPreferencesByIdsQuery(client: Client) {
  return (props: GetPreferencesByIdsQueryProps) => {
    const { queryKey } = props;
    const [, , userIds] = queryKey;
    return getPreferencesByIds(client, userIds);
  };
}

export function getPreferenceByUserQueryKey() {
  return ["preferences", "user"] as const;
}

export function getPreferencesByIdsQueryKey(userIds: string[]) {
  return ["preferences", "users", userIds.sort()] as const;
}

export type GetPreferenceByUserQueryKey = ReturnType<
  typeof getPreferenceByUserQueryKey
>;
export type GetPreferencesByIdsQueryKey = ReturnType<
  typeof getPreferencesByIdsQueryKey
>;

export function updatePreferenceMutationKey() {
  return ["preferences", "update"] as const;
}

export type UpdatePreferenceMutationKey = ReturnType<
  typeof updatePreferenceMutationKey
>;

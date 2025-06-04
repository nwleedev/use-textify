export function createFeedMutationKey() {
  return ["feeds"];
}

export type CreateFeedMutationKey = ReturnType<typeof createFeedMutationKey>;

export function editFeedMutationKey() {
  return ["feeds", "edit"];
}

export type EditFeedMutationKey = ReturnType<typeof editFeedMutationKey>;

export function deleteFeedMutationKey() {
  return ["feeds", "delete"];
}

export type DeleteFeedMutationKey = ReturnType<typeof deleteFeedMutationKey>;

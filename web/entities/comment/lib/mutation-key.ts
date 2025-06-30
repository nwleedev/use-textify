export function createCommentMutationKey() {
  return ["comments"];
}

export type CreateCommentMutationKey = ReturnType<
  typeof createCommentMutationKey
>;

export function editCommentMutationKey() {
  return ["comments", "edit"];
}

export type EditCommentMutationKey = ReturnType<typeof editCommentMutationKey>;

export function deleteCommentMutationKey() {
  return ["comments", "delete"];
}

export type DeleteCommentMutationKey = ReturnType<
  typeof deleteCommentMutationKey
>;

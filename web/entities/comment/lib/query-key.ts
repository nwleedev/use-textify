export function getCommentsByFeedQueryKey(id: string) {
  return ["feeds", id, "comments"] as const;
}

export type GetCommentsByFeedQueryKey = ReturnType<
  typeof getCommentsByFeedQueryKey
>;

export function getTagsQueryKey(keyword?: string) {
  return ["tags", keyword] as const;
}

export type TagsQueryKey = ReturnType<typeof getTagsQueryKey>;

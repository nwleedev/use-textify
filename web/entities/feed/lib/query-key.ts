import { getString } from "@/shared/lib/search-params/value";
import { FeedFilter } from "./model";

export function getFeedsQueryKey() {
  return ["feeds"] as const;
}

export function getFeedByIdQueryKey(id: string) {
  return ["feeds", id] as const;
}

export function getFeedsByFilterQueryKey(searchParams: URLSearchParams) {
  const keyword = getString(searchParams, "keyword");
  const category = getString(searchParams, "category");
  const tags = getString(searchParams, "tags");
  const filter: FeedFilter = {
    keyword,
    category,
    tags: tags ? tags.split(",") : undefined,
  };
  return ["feeds", filter] as const;
}

export type GetFeedByIdQueryKey = ReturnType<typeof getFeedByIdQueryKey>;
export type GetFeedsQueryKey = ReturnType<typeof getFeedsQueryKey>;
export type GetFeedsByFilterQueryKey = ReturnType<
  typeof getFeedsByFilterQueryKey
>;

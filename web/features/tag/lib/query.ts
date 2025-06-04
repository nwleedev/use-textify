import { getTagsByKeyword } from "@/entities/tag/lib/api";
import { Tag } from "@/entities/tag/lib/model";
import { TagsQueryKey } from "@/entities/tag/lib/query-key";
import { GetNextPageParamFunction } from "@tanstack/react-query";
import Client, { ListResult } from "pocketbase";

export interface GetTagsQueryProps {
  queryKey: TagsQueryKey;
}

const pageSize = 40;

export function getTagsQuery(client: Client) {
  return (props: GetTagsQueryProps) => {
    const { queryKey } = props;
    const [, keyword] = queryKey;
    const pageParam = 1;
    return getTagsByKeyword(client, pageParam, pageSize, keyword);
  };
}

export const initialPageParam = 1;

export const getNextPageParam: GetNextPageParamFunction<
  number,
  ListResult<Tag>
> = (page, pages, pageParam) => {
  if (page.items.length < pageSize) {
    return null;
  }
  return pageParam + 1;
};

import { Tag } from "@/entities/tag/lib/model";
import { getTagsQueryKey } from "@/entities/tag/lib/query-key";
import { useClient } from "@/shared/lib/pocketbase/hook";
import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { ListResult } from "pocketbase";
import { ReactNode } from "react";
import { getTagsQuery } from "../lib/query";

export interface TagsQueryProps {
  children: (
    response: UseSuspenseQueryResult<ListResult<Tag>, Error>
  ) => ReactNode;
  keyword?: string;
}

const TagsQuery = (props: TagsQueryProps) => {
  const { children, keyword } = props;
  const client = useClient();
  const query = useSuspenseQuery({
    queryKey: getTagsQueryKey(keyword),
    queryFn: getTagsQuery(client),
  });

  return children(query);
};

export default TagsQuery;

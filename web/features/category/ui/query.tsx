"use client";

import { Category } from "@/entities/category/lib/model";
import { getCategoriesQueryKey } from "@/entities/category/lib/query-key";
import { useClient } from "@/shared/lib/pocketbase/hook";
import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { getCategoriesQuery } from "../lib/query";

export interface CategoriesQueryProps {
  children: (response: UseSuspenseQueryResult<Category[]>) => React.ReactNode;
}

const CategoriesQuery = (props: CategoriesQueryProps) => {
  const { children } = props;
  const client = useClient();
  const query = useSuspenseQuery({
    queryKey: getCategoriesQueryKey(),
    queryFn: getCategoriesQuery(client),
  });

  return children(query);
};

export default CategoriesQuery;

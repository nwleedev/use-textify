import { getCategories } from "@/entities/category/lib/api";
import { GetCategoriesQueryKey } from "@/entities/category/lib/query-key";
import Client from "pocketbase";

export interface GetCategoriesQueryProps {
  queryKey: GetCategoriesQueryKey;
}

export function getCategoriesQuery(client: Client) {
  return function (props: GetCategoriesQueryProps) {
    const { queryKey } = props;

    return getCategories(client);
  };
}

export function getCategoriesQueryKey() {
  return ["categories"];
}

export function getCategoryQueryKey(id: string) {
  return ["categories", id];
}

export type GetCategoryQueryKey = ReturnType<typeof getCategoryQueryKey>;
export type GetCategoriesQueryKey = ReturnType<typeof getCategoriesQueryKey>;

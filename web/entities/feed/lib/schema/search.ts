import z from "zod";

export enum Stage {
  DIALOG = "dialog",
  CATEGORY = "category",
  TAGS = "tags",
}

export const feedSearchSchema = z.object({
  keyword: z.string().optional(),
  category: z.object({
    id: z.string(),
    name: z.string(),
    key: z.string(),
  }),
  tag: z.string().optional(),
  tags: z.array(z.object({ name: z.string() })),
  stage: z.nativeEnum(Stage),
});

export const defaultValues: FeedSearchSchema = {
  tags: [],
  keyword: "",
  tag: "",
  category: {
    id: "",
    name: "",
    key: "",
  },
  stage: Stage.DIALOG,
};

export const toFeedSearchSchema = (searchParams: URLSearchParams) => {
  const schema: FeedSearchSchema = {
    keyword: searchParams.get("keyword") ?? "",
    category: {
      id: searchParams.get("category") ?? "",
      name: searchParams.get("category") ?? "",
      key: searchParams.get("category") ?? "",
    },
    tags:
      searchParams
        .get("tags")
        ?.split(",")
        .map((tag) => ({ name: tag })) ?? [],
    stage: Stage.DIALOG,
  };
  return schema;
};

export type FeedSearchSchema = z.infer<typeof feedSearchSchema>;

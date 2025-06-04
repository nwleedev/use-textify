import { z } from "zod";
import { FeedGridItem } from "./model";

export const newFeedSchema = z
  .object({
    title: z.string().min(2),
    description: z.string().min(2),
    prompt: z.string().min(2),
    category: z.object({
      id: z.string().min(1),
      key: z.string().min(1),
      name: z.string().min(1),
    }),
    tags: z.array(z.object({ name: z.string().min(2) })),
    variables: z.array(
      z.object({ name: z.string().min(2), description: z.string().optional() })
    ),
    notices: z.array(z.object({ text: z.string().min(2) })),
  })
  .refine((form) => form.category.key.length > 0, {
    message: "Category is required",
    path: ["category"],
  });

export const defaultValues: NewFeedSchema = {
  title: "",
  description: "",
  prompt: "",
  category: {
    id: "",
    key: "",
    name: "",
  },
  tags: [],
  variables: [],
  notices: [],
};

export const toFeedEditSchema = (feed: FeedGridItem) => {
  const schema: NewFeedSchema = {
    title: feed.title,
    description: feed.description,
    prompt: feed.prompt,
    category: feed.expand.category,
    tags: feed.expand.tags?.map((tag) => ({ name: tag.name })) ?? [],
    variables: feed.expand.feed_variables_via_feed.map((variable) => ({
      name: variable.name,
      description: variable.description,
    })),
    notices: feed.expand.feed_notices_via_feed.map((notice) => ({
      text: notice.text,
    })),
  };
  return schema;
};

export type NewFeedSchema = z.infer<typeof newFeedSchema>;

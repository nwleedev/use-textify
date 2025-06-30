import { z } from "zod";

export const newCommentSchema = z.object({
  content: z.string().min(2),
  user: z.string(),
  feed: z.string(),
  reference: z.string().optional(),
});

export type NewCommentSchema = z.infer<typeof newCommentSchema>;

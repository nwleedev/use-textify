import { z } from "zod";

const feedSchema = z.object({
  title: z.string(),
  description: z.string(),
  prompt: z.string(),
  tags: z.array(z.string()),
  notices: z.array(z.string()),
  variables: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
    })
  ),
});

export const responseSchema = z.object({
  items: z.array(feedSchema),
});
export type ResponseSchema = z.infer<typeof responseSchema>;

export const completionBodySchema = z.object({
  concept: z.string(),
});

export type CompletionBodySchema = z.infer<typeof completionBodySchema>;

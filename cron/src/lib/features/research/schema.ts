import { z } from "zod";

export const researchSchema = z.object({
  topic: z.string(),
});

export const researchesSchema = z.object({
  items: z.array(researchSchema),
});

export type ResearchSchema = z.infer<typeof researchSchema>;
export type ResearchesSchema = z.infer<typeof researchSchema>;

export const formSchema = z.object({
  category: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;

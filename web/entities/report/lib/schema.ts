import { z } from "zod";

export const newReportSchema = z.object({
  title: z.string().min(2).max(50),
  text: z.string().min(2).max(5000),
  user: z.string().optional(),
});

export const defaultValues: NewReportSchema = {
  title: "",
  text: "",
  user: "",
};

export type NewReportSchema = z.infer<typeof newReportSchema>;

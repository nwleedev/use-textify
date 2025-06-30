import { z } from "zod";
import { Preference } from "./model";

export const updatePreferenceSchema = z.object({
  username: z.string().min(2).max(20),
});

export const toUpdatePreferenceSchema = (preference: Preference) => {
  const schema: UpdatePreferenceSchema = {
    username: preference.username,
  };
  return schema;
};

export type UpdatePreferenceSchema = z.infer<typeof updatePreferenceSchema>;

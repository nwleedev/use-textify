import { NewFeedSchema } from "@/entities/feed/lib/schema";
import { createClient } from "@/shared/lib/pocketbase/server/client";

const feedCreateAction = (schema: NewFeedSchema) => {
  const { title, description, prompt, tags, variables, notices } = schema;
  const client = createClient();
};

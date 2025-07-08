import Anthropic from "@anthropic-ai/sdk";
import { Tool } from "@anthropic-ai/sdk/resources/messages";
import { zodToJsonSchema } from "zod-to-json-schema";
import { createSystemPrompt } from "../../../lib/features/feed/prompt/system";
import { createUserPrompt } from "../../../lib/features/feed/prompt/user";
import { responseSchema } from "../../../lib/features/feed/schema";

export async function createFeed(
  client: Anthropic,
  topic: string,
  category: string
) {
  const system = createSystemPrompt();
  const user = createUserPrompt(topic, category);
  const jsonSchema = zodToJsonSchema(responseSchema, "schema");

  const response = await client.messages.create({
    model: "claude-4-sonnet-20250514",
    messages: [
      {
        role: "user",
        content: user,
      },
    ],
    system,
    tools: [
      {
        name: "format_json",
        description:
          "Provide your response in valid JSON format following this exact schema.",
        input_schema: jsonSchema.definitions?.schema as Tool.InputSchema,
      },
    ],
    tool_choice: { type: "tool", name: "format_json" },
    max_tokens: 6000,
  });

  return response;
}

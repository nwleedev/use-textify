import Anthropic from "@anthropic-ai/sdk";
import { Tool } from "@anthropic-ai/sdk/resources/messages";
import { zodToJsonSchema } from "zod-to-json-schema";
import { createSystemPrompt } from "../../../lib/features/feed/prompt/system";
import { createUserPrompt } from "../../../lib/features/feed/prompt/user";
import { responseSchema } from "../../../lib/features/feed/schema";

export async function createFeed(
  client: Anthropic,
  topic: string,
  category: string,
  materials: string[]
) {
  const system = createSystemPrompt(materials);
  const user = createUserPrompt(topic, category);
  const jsonSchema = zodToJsonSchema(responseSchema, "schema");

  const response = await client.messages.create({
    model: "claude-3-7-sonnet-latest",
    messages: [
      {
        role: "user",
        content: user,
      },
    ],
    system: [
      {
        type: "text",
        text: system,
        cache_control: {
          type: "ephemeral",
        },
      },
    ],
    tools: [
      {
        name: "format_json",
        description:
          "Provide your response in valid JSON format following this exact schema.",
        input_schema: jsonSchema.definitions?.schema as Tool.InputSchema,
      },
    ],
    tool_choice: { type: "tool", name: "format_json" },
    max_tokens: 4096,
  });

  return response;
}

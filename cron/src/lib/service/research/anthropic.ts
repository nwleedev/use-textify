import Anthropic from "@anthropic-ai/sdk";
import { Tool } from "@anthropic-ai/sdk/resources/messages";
import { zodToJsonSchema } from "zod-to-json-schema";
import { createResearchSystemPrompt } from "../../features/research/prompt/system";
import { createResearchUserPrompt } from "../../features/research/prompt/user";
import { researchesSchema } from "../../features/research/schema";

export async function createMarketResearch(
  client: Anthropic,
  category: string
) {
  const system = createResearchSystemPrompt();
  const user = createResearchUserPrompt(category);
  const jsonSchema = zodToJsonSchema(researchesSchema, "schema");

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
        type: "web_search_20250305",
        name: "web_search",
        max_uses: 4,
      },
      {
        name: "format_json",
        description:
          "Provide your response in valid JSON format following this exact schema.",
        input_schema: jsonSchema.definitions?.schema as Tool.InputSchema,
      },
    ],
    tool_choice: { type: "tool", name: "format_json" },
    max_tokens: 8192,
  });

  return response;
}

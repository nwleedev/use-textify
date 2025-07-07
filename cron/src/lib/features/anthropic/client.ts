import Anthropic from "@anthropic-ai/sdk";

export function createClient(apiKey: string) {
  return new Anthropic({
    apiKey,
  });
}

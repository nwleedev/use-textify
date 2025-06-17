import OpenAI from "openai";

export function createClient(apiKey: string) {
  return new OpenAI({
    apiKey,
  });
}

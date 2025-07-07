import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { createFeedPrompt } from "../../lib/features/feed/prompt/legacy";
import { ResponseSchema, responseSchema } from "../../lib/features/feed/schema";

export async function getFiles(client: OpenAI) {
  const response = await client.files.list();
  return response.data;
}

export async function createFeedInput(
  concept: string,
  files: OpenAI.Files.FileObject[]
): Promise<OpenAI.Responses.ResponseInput> {
  const fileContent = files.reduce((array, file) => {
    if (file.filename.includes("voa")) {
      array.push({ type: "input_file", file_id: file.id });
    }
    return array;
  }, [] as { type: "input_file"; file_id: string }[]);

  const userPrompt = createFeedPrompt(
    concept,
    fileContent.map((file) => file.file_id)
  );
  return [
    {
      role: "user",
      content: [...fileContent, { type: "input_text", text: userPrompt }],
    },
  ];
}

export async function createFeed(
  client: OpenAI,
  input: OpenAI.Responses.ResponseInput
) {
  const response = await client.responses.create({
    model: "chatgpt-4o-latest",
    input,
    text: {
      format: zodTextFormat(responseSchema, "data"),
    },
  });

  return JSON.parse(response.output_text) as ResponseSchema;
}

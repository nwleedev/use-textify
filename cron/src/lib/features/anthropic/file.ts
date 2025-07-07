import Anthropic, { Uploadable } from "@anthropic-ai/sdk";

export async function getFiles(client: Anthropic) {
  const response = await client.beta.files.list({
    betas: ["files-api-2025-04-14"],
  });
  return response;
}

export async function createNewFile(client: Anthropic, file: Uploadable) {
  return client.beta.files.upload({
    file,
    betas: ["files-api-2025-04-14"],
  });
}

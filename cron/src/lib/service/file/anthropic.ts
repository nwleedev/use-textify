import Anthropic, { toFile } from "@anthropic-ai/sdk";
import { createNewFile } from "../../features/anthropic/file";

export async function uploadFiles(
  client: Anthropic,
  files: Express.Multer.File[]
) {
  const answers = await Promise.all(
    files.map(async (file) => {
      const uploadable = await toFile(file.buffer, file.originalname, {
        type: file.mimetype,
      });
      return createNewFile(client, uploadable);
    })
  );

  return answers;
}

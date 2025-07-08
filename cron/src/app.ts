import dotenv from "dotenv";
import express from "express";
import { readdir } from "fs/promises";
import multer from "multer";
import * as path from "path";
import zodToJsonSchema from "zod-to-json-schema";
import { createClient as createAnthropicClient } from "./lib/features/anthropic/client";
import {
  completionBodySchema,
  responseSchema,
} from "./lib/features/feed/schema";
import { createClient as createOpenAIClient } from "./lib/features/openai/client";
import { createFeed } from "./lib/service/feed/anthropic";
import { uploadFiles } from "./lib/service/file/anthropic";

dotenv.config({ path: path.join(__dirname, "../.env") });

const port = process.env.APP_PORT;
const userId = process.env.APP_USER_ID;
const client = createOpenAIClient(process.env.OPENAI_API_KEY as string);
const anthropic = createAnthropicClient(
  process.env.ANTHROPIC_API_KEY as string
);
const upload = multer();

let fileIds = [] as string[];

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.get("/test01", (req, res) => {
  res.json({
    message: "ok",
    data: zodToJsonSchema(responseSchema, "schema"),
  });
});

app.get("/test03", async (req, res) => {
  const dir = await readdir(path.join(__dirname, "../../assets"));
  res.json({ message: "ok", data: dir });
});

app.get("/test04", async (req, res) => {
  const list = await anthropic.beta.files.list({
    betas: ["files-api-2025-04-14"],
  });
  res.json({
    message: "ok",
    data: list,
  });
});

app.post("/files", upload.array("files"), async (req, res) => {
  const files = req.files;
  let message = "Failed to upload files";
  if (files && files instanceof Array && files.length > 0) {
    const answers = await uploadFiles(anthropic, files);
    const ids = answers.map((answer) => answer.id);
    message = `Files uploaded successfully: ${ids.join(", ")}`;
  }
  res.json({
    message,
  });
});

app.post("/feed_completion", async (req, res) => {
  try {
    const body = completionBodySchema.parse(req.body);
    const response = await createFeed(anthropic, body.concept, body.category);

    const item = response.content.find(
      (content) => content.type === "tool_use"
    );
    if (item) {
      const feeds = item.input as { items: unknown[] };
      res.json({
        ...feeds,
        userId,
      });
    } else {
      throw new Error("No content found");
    }
  } catch (error) {
    console.log(error);
    res.json({
      items: [],
      userId,
      message: "Error",
    });
  }
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
});

// getFiles(anthropic)
//   .then((newFiles) => {
//     fileIds = newFiles.data
//       .filter((file) => file.filename.endsWith(".txt"))
//       .map((file) => file.id);
//     console.log("Files loaded:", fileIds);
//   })
//   .catch((error) => {
//     console.error("Failed to load files:", error);
//     process.exit(1);
//   });

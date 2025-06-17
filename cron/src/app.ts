import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
import { createClient } from "./lib/client/openai";
import { completionBodySchema } from "./lib/schema/feed";
import { createFeed, createFeedInput, getFiles } from "./lib/service/openai";

dotenv.config();

const port = process.env.APP_PORT;
const client = createClient(process.env.OPENAI_API_KEY as string);
const userId = process.env.APP_USER_ID;

let files: OpenAI.Files.FileObject[] = [];

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.post("/feed_completion", async (req, res) => {
  try {
    const body = completionBodySchema.parse(req.body);
    const input = await createFeedInput(body.concept, files);
    const response = await createFeed(client, input);
    res.json({
      ...response,
      userId,
    });
  } catch (error) {
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

getFiles(client).then((newFiles) => {
  files = newFiles;
});

import Client from "pocketbase";
import { Tag } from "./model";

export function getTagsByKeyword(
  client: Client,
  page: number,
  size: number,
  keyword?: string
) {
  if (keyword && keyword.length >= 2 && keyword.length <= 16) {
    return client.collection("tags").getList<Tag>(page, size, {
      filter: `name ~ "${keyword}"`,
    });
  } else {
    return client.collection("tags").getList<Tag>(page, size);
  }
}

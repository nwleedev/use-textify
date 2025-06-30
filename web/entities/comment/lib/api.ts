import { getPreferencesByIds } from "@/entities/preferences/lib/api";
import Client from "pocketbase";
import { CommentExpanded } from "./model";
import { NewCommentSchema } from "./schema";

export async function getCommentsByFeed(
  client: Client,
  feedId: string,
  page: number,
  size: number
) {
  const response = await client
    .collection("comments")
    .getList<CommentExpanded>(page, size, {
      expand: "feed,reference",
      filter: client.filter("feed.id = {:feedId}", { feedId }),
      sort: "-created",
    });
  const idSet = response.items.reduce((acc, item) => {
    if (item.user && !acc.has(item.user)) {
      acc.add(item.user);
    }
    return acc;
  }, new Set<string>());

  const userIds = Array.from(idSet);
  const usernames = await getPreferencesByIds(client, userIds);
  const usernameMap = usernames.reduce((map, record) => {
    map[record.user] = record.username;
    return map;
  }, {} as Record<string, string>);
  for (let i = 0; i < response.items.length; i++) {
    response.items[i].expand.user = {
      name: usernameMap[response.items[i].user],
    };
  }
  return response;
}

export function createComment(client: Client, schema: NewCommentSchema) {
  return client.collection("comments").create<CommentExpanded>(schema);
}

export function updateComment(
  client: Client,
  id: string,
  schema: NewCommentSchema
) {
  return client.collection("comments").update<CommentExpanded>(id, schema);
}

export function deleteComment(client: Client, id: string) {
  return client.collection("comments").delete(id);
}

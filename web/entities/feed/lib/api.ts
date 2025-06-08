import { Tag } from "@/entities/tag/lib/model";
import Client from "pocketbase";
import { Feed, FeedFilter, FeedGridItem } from "./model";
import { NewFeedSchema } from "./schema";

export async function getFeeds(client: Client, page: number, size: number) {
  return client.collection("feeds").getList<FeedGridItem>(page, size, {
    expand: "category,tags,feed_variables_via_feed,feed_notices_via_feed",
    fields: "*,category,tags,feed_variables_via_feed,feed_notices_via_feed",
    sort: "-created",
  });
}

export async function getFeedById(client: Client, id: string) {
  return client.collection("feeds").getOne<FeedGridItem>(id, {
    expand: "feed_variables_via_feed,feed_notices_via_feed,category,tags",
    fields: "*,category,tags,feed_variables_via_feed,feed_notices_via_feed",
  });
}

export async function getFeedsByFilter(
  client: Client,
  page: number,
  size: number,
  filter: FeedFilter
) {
  const filters = [] as string[];
  const tagsCondition = filter.tags
    ?.map((tag) => `name = "${tag}"`)
    .join(" || ");
  const tags = await client.collection("tags").getFullList<Tag>({
    filter: tagsCondition,
  });
  const tagsIds = tags.map((tag) => tag.id);
  if (filter.keyword) {
    filters.push(
      `(title ~ "${filter.keyword}" || description ~ "${filter.keyword}")`
    );
  }
  if (filter.category) {
    filters.push(`(category.key = "${filter.category}")`);
  }
  if (filter.tags) {
    const tagsIdsCondition = tagsIds
      .map((id) => `tags.id ?= "${id}"`)
      .join(" || ");
    filters.push(`(${tagsIdsCondition})`);
  }
  const filterCondition = filters.join(" && ");
  return client.collection("feeds").getList<FeedGridItem>(page, size, {
    filter: filterCondition,
    expand: "category,tags,feed_variables_via_feed,feed_notices_via_feed",
    fields: "*,category,tags,feed_variables_via_feed,feed_notices_via_feed",
    sort: "-created",
  });
}

export function createFeed(client: Client, schema: NewFeedSchema) {
  return client.send<{ feed: Feed }>("/api/collections/feeds/records/new", {
    method: "POST",
    body: {
      schema,
    },
  });
}

export function editFeed(client: Client, id: string, schema: NewFeedSchema) {
  return client.send<{ feed: Feed }>(
    `/api/collections/feeds/records/${id}/edit`,
    {
      method: "PUT",
      body: {
        schema,
      },
    }
  );
}

export function deleteFeed(client: Client, id: string) {
  return client.collection("feeds").delete(id);
}

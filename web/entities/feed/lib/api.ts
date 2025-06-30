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
  const tagsFilters = [] as string[];
  const bindTagKeys = {} as Record<string, string>;
  if (filter.tags) {
    for (let i = 0; i < filter.tags.length; i++) {
      const key = `tag${i}`;
      bindTagKeys[key] = filter.tags[i];
      tagsFilters.push(`name = {:${key}}`);
    }
  }
  const tags = await client.collection("tags").getFullList<Tag>({
    filter:
      tagsFilters.length > 0
        ? client.filter(tagsFilters.join(" || "), bindTagKeys)
        : undefined,
  });
  const tagIds = tags.map((tag) => tag.id);
  const bindKeys = {} as Record<string, string>;
  if (filter.keyword) {
    filters.push(`(title ~ {:title} || description ~ {:description})`);
    bindKeys["title"] = filter.keyword;
    bindKeys["description"] = filter.keyword;
  }
  if (filter.category) {
    filters.push("(category.key = {:category})");
    bindKeys["category"] = filter.category;
  }
  if (filter.tags && filter.tags.length > 0) {
    const tagIdsFilter = [] as string[];
    for (let i = 0; i < tagIds.length; i++) {
      const key = `tag${i}`;
      const tagId = tagIds[i];
      tagIdsFilter.push(`tags.id ?= {:${key}}`);
      bindKeys[key] = tagId;
    }
    filters.push("(" + tagIdsFilter.join(" || ") + ")");
  }
  const filterCondition = client.filter(filters.join(" && "), bindKeys);
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

/// <reference path="../pb_data/types.d.ts" />
/// @ts-check

/**
 * @typedef {Object} FeedVariable
 * @property {string} name
 * @property {string} description
 */
/**
 * @typedef {Object} FeedItemSchema
 * @property {string} title
 * @property {string} description
 * @property {string} prompt
 * @property {string[]} tags
 * @property {string[]} notices
 * @property {FeedVariable[]} variables
 */
/**
 * @typedef {Object} FeedResponse
 * @property {FeedItemSchema[]} items
 * @property {string} userId
 */

cronAdd("GenerateFeedByConcept", "0 0 30 2 *", () => {
  const records = $app.findRecordsByFilter(
    "feed_concepts",
    "used = false",
    "-created",
    1,
    0
  );

  const record = records.at(0);
  if (!record) {
    return;
  }

  const text = record.getString("text");
  const categoryId = record.getString("category");

  const response = $http.send({
    url: "http://127.0.0.1:3011/feed_completion",
    method: "POST",
    body: JSON.stringify({
      concept: text,
      category: categoryId,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  /**
   * @type {FeedResponse}
   */
  const feedResponse = response.json;
  for (let i = 0; i < feedResponse.items.length; i++) {
    const item = feedResponse.items[i];

    $app.runInTransaction((tx) => {
      try {
        const date = new Date().toISOString();
        if (item.tags.length > 0) {
          /**
           * @type {string[]}
           */
          const names = [];
          /**
           * @type {Record<string, string>}
           */
          const bindArgs = {};
          for (let i = 0; i < item.tags.length; i++) {
            const nameKey = `name${i + 1}`;
            const createdKey = `created${i + 1}`;
            const updatedKey = `updated${i + 1}`;
            const key = `({:${nameKey}}, {:${createdKey}}, {:${updatedKey}})`;
            names.push(key);
            bindArgs[nameKey] = item.tags[i];
            bindArgs[createdKey] = date;
            bindArgs[updatedKey] = date;
          }

          tx.db()
            .newQuery(
              `INSERT OR IGNORE INTO tags (name, created, updated) VALUES ${names.join(
                ", "
              )}`
            )
            .bind(bindArgs)
            .all(arrayOf(new DynamicModel({ id: "", name: "", key: "" })));
        }

        const tags = arrayOf(new DynamicModel({ id: "", name: "", key: "" }));

        tx.db()
          .select("tags.id")
          .from("tags")
          .where($dbx.in("name", ...item.tags))
          .all(tags);

        /**
         * @type {string[]}
         */
        const tagIds = [];
        for (let i = 0; i < tags.length; i++) {
          const tag = tags[i];
          if ("id" in tag && typeof tag.id === "string") {
            tagIds.push(tag.id);
          }
        }

        const feedsCollection = tx.findCollectionByNameOrId("feeds");
        const feed = new Record(feedsCollection, {
          title: item.title,
          description: item.description,
          prompt: item.prompt,
          category: categoryId,
          tags: tagIds,
          user: feedResponse.userId,
          status: "pending",
        });

        tx.save(feed);

        if (item.variables.length > 0) {
          /**
           * @type {Record<string, string>}
           */
          const bindVariableArgs = {};
          /**
           * @type {string[]}
           */
          const variableNames = [];
          for (let i = 0; i < item.variables.length; i++) {
            const nameKey = `name${i + 1}`;
            const descriptionKey = `description${i + 1}`;
            const feedKey = `feed${i + 1}`;
            const createdKey = `created${i + 1}`;
            const updatedKey = `updated${i + 1}`;
            const key = `({:${nameKey}}, {:${descriptionKey}}, {:${feedKey}}, {:${createdKey}}, {:${updatedKey}})`;
            variableNames.push(key);
            bindVariableArgs[nameKey] = item.variables[i].name;
            bindVariableArgs[descriptionKey] = item.variables[i].description;
            bindVariableArgs[feedKey] = feed.id;
            bindVariableArgs[createdKey] = date;
            bindVariableArgs[updatedKey] = date;
          }
          const variables = arrayOf(
            new DynamicModel({ id: "", name: "", description: "", feed: "" })
          );
          tx.db()
            .newQuery(
              `INSERT OR IGNORE INTO feed_variables (name, description, feed, created, updated) VALUES ${variableNames.join(
                ", "
              )}`
            )
            .bind(bindVariableArgs)
            .all(variables);
        }

        if (item.notices.length > 0) {
          /**
           * @type {Record<string, string>}
           */
          const bindNoticeArgs = {};
          /**
           * @type {string[]}
           */
          const noticeNames = [];
          for (let i = 0; i < item.notices.length; i++) {
            const textKey = `text${i + 1}`;
            const feedKey = `feed${i + 1}`;
            const createdKey = `created${i + 1}`;
            const updatedKey = `updated${i + 1}`;
            const key = `({:${textKey}}, {:${feedKey}}, {:${createdKey}}, {:${updatedKey}})`;
            noticeNames.push(key);
            bindNoticeArgs[textKey] = item.notices[i];
            bindNoticeArgs[feedKey] = feed.id;
            bindNoticeArgs[createdKey] = date;
            bindNoticeArgs[updatedKey] = date;
          }
          const notices = arrayOf(
            new DynamicModel({ id: "", text: "", feed: "" })
          );
          tx.db()
            .newQuery(
              `INSERT OR IGNORE INTO feed_notices (text, feed, created, updated) VALUES ${noticeNames.join(
                ", "
              )}`
            )
            .bind(bindNoticeArgs)
            .all(notices);
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    });
  }

  record.set("used", true);
  $app.save(record);
});

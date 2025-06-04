/// <reference path="../pb_data/types.d.ts" />

/**
 * @typedef {Object} TagSchema
 * @property {string} name
 */

/**
 * @typedef {Object} CategorySchema
 * @property {string} name
 * @property {string} key
 * @property {string} id
 */

/**
 * @typedef {Object} VariableSchema
 * @property {string} name
 * @property {string} description
 */

/**
 * @typedef {Object} NoticeSchema
 * @property {string} text
 */

/**
 * @typedef {Object} FeedSchema
 * @property {string} title
 * @property {string} description
 * @property {string} prompt
 * @property {string} category
 * @property {CategorySchema} category
 * @property {TagSchema[]} tags
 * @property {VariableSchema[]} variables
 * @property {NoticeSchema[]} notices
 */

/**
 * @typedef {Object} CreateFeedBody
 * @property {FeedSchema} schema
 */

/**
 * @typedef {Object} EditFeedBody
 * @property {FeedSchema} schema
 */

routerAdd(
  "POST",
  "/api/collections/feeds/records/new",
  (event) => {
    /**
     * @type {CreateFeedBody}
     */
    const body = event.requestInfo().body;
    const tagNames = body.schema.tags.map((tag) => tag.name);

    $app.store().set("user", event.auth.id);
    $app.store().set("tagNames", tagNames);

    $app.runInTransaction((tx) => {
      const date = new Date().toISOString();
      const user = tx.store().get("user");
      /**
       * @type {string[]}
       */
      const tagNames = tx.store().get("tagNames");
      if (tagNames.length > 0) {
        /**
         * @type {string[]}
         */
        const names = [];
        /**
         * @type {Record<string, string>}
         */
        const bindArgs = {};
        for (let i = 0; i < body.schema.tags.length; i++) {
          const nameKey = `name${i + 1}`;
          const createdKey = `created${i + 1}`;
          const updatedKey = `updated${i + 1}`;
          const key = `({:${nameKey}}, {:${createdKey}}, {:${updatedKey}})`;
          names.push(key);
          bindArgs[nameKey] = body.schema.tags[i].name;
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
        .where($dbx.in("name", ...tagNames))
        .all(tags);

      const feedsCollection = tx.findCollectionByNameOrId("feeds");
      const feed = new Record(feedsCollection, {
        title: body.schema.title,
        description: body.schema.description,
        prompt: body.schema.prompt,
        category: body.schema.category.id,
        tags: tags.map((tag) => tag.id),
        user: user,
        status: "pending",
      });

      tx.save(feed);
      tx.store().set("feed", feed);

      if (body.schema.variables.length > 0) {
        /**
         * @type {Record<string, string>}
         */
        const bindVariableArgs = {};
        /**
         * @type {string[]}
         */
        const variableNames = [];
        for (let i = 0; i < body.schema.variables.length; i++) {
          const nameKey = `name${i + 1}`;
          const descriptionKey = `description${i + 1}`;
          const feedKey = `feed${i + 1}`;
          const createdKey = `created${i + 1}`;
          const updatedKey = `updated${i + 1}`;
          const key = `({:${nameKey}}, {:${descriptionKey}}, {:${feedKey}}, {:${createdKey}}, {:${updatedKey}})`;
          variableNames.push(key);
          bindVariableArgs[nameKey] = body.schema.variables[i].name;
          bindVariableArgs[descriptionKey] =
            body.schema.variables[i].description;
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

      if (body.schema.notices.length > 0) {
        /**
         * @type {Record<string, string>}
         */
        const bindNoticeArgs = {};
        /**
         * @type {string[]}
         */
        const noticeNames = [];
        for (let i = 0; i < body.schema.notices.length; i++) {
          const textKey = `text${i + 1}`;
          const feedKey = `feed${i + 1}`;
          const createdKey = `created${i + 1}`;
          const updatedKey = `updated${i + 1}`;
          const key = `({:${textKey}}, {:${feedKey}}, {:${createdKey}}, {:${updatedKey}})`;
          noticeNames.push(key);
          bindNoticeArgs[textKey] = body.schema.notices[i].text;
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
    });

    const feed = $app.store().get("feed");
    event.json(201, {
      feed: feed,
    });
  },
  $apis.requireAuth()
);

routerAdd(
  "PUT",
  "/api/collections/feeds/records/{id}/edit",
  (event) => {
    /**
     * @type {EditFeedBody}
     */
    const body = event.requestInfo().body;
    const id = event.request.pathValue("id");
    const user = event.auth.id;
    const feed = new DynamicModel({
      id: "",
      title: "",
      description: "",
      prompt: "",
      category: "",
      user: "",
    });
    $app
      .db()
      .select("id", "title", "description", "prompt", "category", "user")
      .from("feeds")
      .where($dbx.exp("feeds.id = {:id}", { id }))
      .one(feed);
    if (feed.user !== user) {
      return event.json(403, {
        message: "You are not allowed to edit this feed",
      });
    }

    $app.runInTransaction((tx) => {
      const date = new Date().toISOString();
      tx.db()
        .delete("feed_notices", $dbx.exp("feed = {:id}", { id }))
        .execute();
      tx.db()
        .delete("feed_variables", $dbx.exp("feed = {:id}", { id }))
        .execute();

      const tagNames = body.schema.tags.map((tag) => tag.name);
      if (tagNames.length > 0) {
        /**
         * @type {string[]}
         */
        const names = [];
        /**
         * @type {Record<string, string>}
         */
        const bindArgs = {};
        for (let i = 0; i < tagNames.length; i++) {
          const nameKey = `name${i + 1}`;
          const createdKey = `created${i + 1}`;
          const updatedKey = `updated${i + 1}`;
          const key = `({:${nameKey}}, {:${createdKey}}, {:${updatedKey}})`;
          names.push(key);
          bindArgs[nameKey] = tagNames[i];
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
        .where($dbx.in("name", ...tagNames))
        .all(tags);

      const feed = tx.findRecordById("feeds", id);
      feed.set("title", body.schema.title);
      feed.set("description", body.schema.description);
      feed.set("prompt", body.schema.prompt);
      feed.set("category", body.schema.category.id);
      feed.set(
        "tags",
        tags.map((tag) => tag.id)
      );
      feed.set("updated", date);

      tx.save(feed);
      if (body.schema.variables.length > 0) {
        /**
         * @type {Record<string, string>}
         */
        const bindVariableArgs = {};
        /**
         * @type {string[]}
         */
        const variableNames = [];
        for (let i = 0; i < body.schema.variables.length; i++) {
          const nameKey = `name${i + 1}`;
          const descriptionKey = `description${i + 1}`;
          const feedKey = `feed${i + 1}`;
          const createdKey = `created${i + 1}`;
          const updatedKey = `updated${i + 1}`;
          const key = `({:${nameKey}}, {:${descriptionKey}}, {:${feedKey}}, {:${createdKey}}, {:${updatedKey}})`;
          variableNames.push(key);
          bindVariableArgs[nameKey] = body.schema.variables[i].name;
          bindVariableArgs[descriptionKey] =
            body.schema.variables[i].description;
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

      if (body.schema.notices.length > 0) {
        /**
         * @type {Record<string, string>}
         */
        const bindNoticeArgs = {};
        /**
         * @type {string[]}
         */
        const noticeNames = [];
        for (let i = 0; i < body.schema.notices.length; i++) {
          const textKey = `text${i + 1}`;
          const feedKey = `feed${i + 1}`;
          const createdKey = `created${i + 1}`;
          const updatedKey = `updated${i + 1}`;
          const key = `({:${textKey}}, {:${feedKey}}, {:${createdKey}}, {:${updatedKey}})`;
          noticeNames.push(key);
          bindNoticeArgs[textKey] = body.schema.notices[i].text;
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
    });

    const editedFeed = $app.findRecordById("feeds", id);

    event.json(201, {
      feed: editedFeed,
    });
  },
  $apis.requireAuth()
);

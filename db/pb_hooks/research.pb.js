/// <reference path="../pb_data/types.d.ts" />
/// @ts-check

cronAdd("GenerateMarketResearch", "0 0 30 2 *", () => {
  const categoryRecords = $app.findAllRecords("categories");
  const N = categoryRecords.length;

  const random = Math.floor(Math.random() * 1_000_000_000);
  const index = random % N;

  const category = categoryRecords[index];
  if (!category) {
    return;
  }
  const categoryId = category.getString("id");
  const categoryName = category.getString("name");

  const response = $http.send({
    url: "http://127.0.0.1:3011/research",
    method: "POST",
    body: JSON.stringify({
      category: categoryName,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  /**
   * @typedef {Object} ResearchResponse
   * @property {string} topic
   */

  /**
   * @typedef {Object} ResearchesResponse
   * @property {ResearchResponse[]} items
   *
   */
  /** @type {ResearchesResponse} */
  const json = response.json;
  const date = new Date().toISOString();
  for (let i = 0; i < json.items.length; i++) {
    const item = json.items[i];
    const collection = $app.findCollectionByNameOrId("feed_concepts");
    const record = new Record(collection, {
      text: item.topic,
      category: categoryId,
      used: false,
      created: date,
      updated: date,
    });
    $app.save(record);
  }
});

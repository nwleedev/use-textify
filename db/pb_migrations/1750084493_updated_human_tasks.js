/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1615295231")

  // update collection data
  unmarshal({
    "name": "feed_concepts"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1615295231")

  // update collection data
  unmarshal({
    "name": "human_tasks"
  }, collection)

  return app.save(collection)
})

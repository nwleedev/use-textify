/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2208706977")

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2439990212",
    "hidden": false,
    "id": "relation591414443",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "feed",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2208706977")

  // remove field
  collection.fields.removeById("relation591414443")

  return app.save(collection)
})

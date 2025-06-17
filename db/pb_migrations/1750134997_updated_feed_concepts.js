/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1615295231")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "bool2034721560",
    "name": "used",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1615295231")

  // remove field
  collection.fields.removeById("bool2034721560")

  return app.save(collection)
})

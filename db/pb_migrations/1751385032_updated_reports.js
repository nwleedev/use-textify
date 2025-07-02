/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1615648943")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != '' && @request.auth.id = @request.body.user"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1615648943")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != '' && @request.auth.id = @request.body.user.id"
  }, collection)

  return app.save(collection)
})

/// <reference path="../pb_data/types.d.ts" />

cronAdd("PopluateCategory", "0 0 30 2 *", () => {
  // TODO: Can fill this array when more categories are needed.
  const inputs = [
    {
      key: "KEY",
      name: "NAME",
    },
  ];
  const date = new Date().toISOString();

  for (let i = 0; i < inputs.length; i++) {
    const { key, name } = inputs[i];
    const collection = $app.findCollectionByNameOrId("categories");
    const record = new Record(collection, {
      key: key,
      name: name,
      created: date,
      updated: date,
    });
    $app.save(record);
  }
});

/// <reference path="../pb_data/types.d.ts" />

onRecordAfterCreateSuccess((event) => {
  const userId = event.record.getString("id");
  const username = event.record.getString("name");
  const collection = $app.findCollectionByNameOrId("preferences");
  const record = new Record(collection, {
    user: userId,
    username,
  });
  $app.save(record);
}, "users");

cronAdd("GeneratePreferences", "0 0 30 2 *", () => {
  try {
    const users = arrayOf(
      new DynamicModel({
        id: "",
        name: "",
      })
    );

    $app
      .db()
      .select("u.id", "u.name")
      .from("users u")
      .leftJoin("preferences p", $dbx.exp("u.id = p.user"))
      .where($dbx.exp("p.user IS NULL"))
      .all(users);

    const preferencesCollection = $app.findCollectionByNameOrId("preferences");

    users.forEach((user) => {
      const preferenceRecord = new Record(preferencesCollection, {
        user: user.id,
        username: user.name,
      });
      $app.save(preferenceRecord);
    });
  } catch (error) {
    // TODO
  }
});

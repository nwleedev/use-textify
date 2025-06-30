import Client from "pocketbase";
import { Preference } from "./model";

export function getPreferencesByIds(client: Client, userIds: string[]) {
  const filters = [] as string[];
  const bindKeys = {} as Record<string, string>;
  for (let i = 0; i < userIds.length; i++) {
    const userId = userIds[i];
    const key = `user${i}`;
    filters.push(`user = {:${key}}`);
    bindKeys[key] = userId;
  }
  const filter =
    filters.length > 0
      ? client.filter("(" + filters.join(" || ") + ")", bindKeys)
      : undefined;
  return client.collection("preferences").getFullList<Preference>({
    filter,
  });
}

export function getPreferenceByUser(client: Client) {
  const userId = client.authStore.record?.id;
  return client
    .collection("preferences")
    .getFirstListItem<Preference>(
      client.filter("user = {:userId}", { userId })
    );
}

export function updatePreference(
  client: Client,
  id: string,
  data: Partial<Preference>
) {
  return client.collection("preferences").update<Preference>(id, data);
}

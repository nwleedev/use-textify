import { cookies } from "next/headers";
import Client from "pocketbase";
import { User } from "./model";

export async function verifyUser(
  client: Client
): Promise<[User | null, boolean]> {
  try {
    client.authStore.loadFromCookie(cookies().toString());
    await client.collection("users").authRefresh();
  } catch (error) {
    // TODO: handle error
  }
  return [client.authStore.record, client.authStore.isValid];
}

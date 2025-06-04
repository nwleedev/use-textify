import Client from "pocketbase";
import { User } from "./model";

export function getOAuth2Methods(client: Client) {
  return client.collection("users").listAuthMethods();
}

export function getUser(client: Client) {
  const record = client.authStore.record as User;

  return record;
}

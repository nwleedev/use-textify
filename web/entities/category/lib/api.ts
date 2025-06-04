import Client from "pocketbase";
import { Category } from "./model";

export async function getCategories(client: Client) {
  return client.collection("categories").getFullList<Category>();
}

export async function getCategoryById(client: Client, id: string) {
  return client.collection("categories").getOne<Category>(id);
}

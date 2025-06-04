import Client from "pocketbase";

export function createClient() {
  return new Client(process.env.NEXT_PUBLIC_API_URL);
}

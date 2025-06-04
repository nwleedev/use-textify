import Client from "pocketbase";

function isServer() {
  return typeof window === "undefined" || "Deno" in globalThis;
}

function createClient() {
  return new Client(process.env.NEXT_PUBLIC_API_URL);
}

let client: Client | null = null;

export function getClient() {
  if (isServer()) {
    return createClient();
  }

  if (!client) client = createClient();
  return client;
}

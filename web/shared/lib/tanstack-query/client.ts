import { isServer, QueryClient } from "@tanstack/react-query";

function createClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let queryClient: QueryClient | null = null;

export function getClient() {
  if (isServer) {
    // Server: always make a new query client
    return createClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!queryClient) queryClient = createClient();
    return queryClient;
  }
}

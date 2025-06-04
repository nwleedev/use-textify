"use client";

import { getClient } from "@/shared/lib/pocketbase/client";
import { PocketbaseContext } from "@/shared/lib/pocketbase/context";
import { useEffect } from "react";

const PocketbaseProvider = ({ children }: { children: React.ReactNode }) => {
  const client = getClient();

  useEffect(() => {
    async function authRefresh() {
      try {
        client.authStore.loadFromCookie(document.cookie);
        await client.collection("users").authRefresh();
      } catch (error) {
        if (
          error instanceof Error &&
          "statusCode" in error &&
          error.statusCode === 401
        ) {
          return;
        }
      }
    }
    authRefresh();
  }, [client]);

  return (
    <PocketbaseContext.Provider value={client}>
      {children}
    </PocketbaseContext.Provider>
  );
};

export default PocketbaseProvider;

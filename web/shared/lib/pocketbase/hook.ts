import { useContext } from "react";
import { PocketbaseContext } from "./context";

export const useClient = () => {
  const client = useContext(PocketbaseContext);

  if (!client) {
    throw new Error("useClient must be used within a PocketbaseProvider");
  }

  return client;
};

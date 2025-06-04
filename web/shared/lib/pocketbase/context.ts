import Client from "pocketbase";
import { createContext } from "react";

export const PocketbaseContext = createContext<Client | null>(null);

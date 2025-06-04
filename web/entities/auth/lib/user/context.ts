import { User } from "@/entities/auth/lib/model";
import { createContext } from "react";

const UserContext = createContext<User | null>(null);

export default UserContext;

"use client";

import { User } from "@/entities/auth/lib/model";
import UserContext from "@/entities/auth/lib/user/context";
import { PropsWithChildren } from "react";

export interface UserProviderProps extends PropsWithChildren {
  user: User | null;
}

const UserProvider = (props: UserProviderProps) => {
  const { user, children } = props;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;

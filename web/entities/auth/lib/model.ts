import { AuthRecord } from "pocketbase";

export type User = AuthRecord & {
  avatarURL?: string;
  avatar?: string;
};

export type UserWithAvatar = User & {
  avatarURL: string;
};

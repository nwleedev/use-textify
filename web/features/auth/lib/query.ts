import { getOAuth2Methods, getUser } from "@/entities/auth/lib/api";
import { User, UserWithAvatar } from "@/entities/auth/lib/model";
import {
  GetOAuth2MethodsQueryKey,
  GetUserQueryKey,
} from "@/entities/auth/lib/query-key";
import Client from "pocketbase";

export interface GetOAuth2MethodsQueryProps {
  queryKey: GetOAuth2MethodsQueryKey;
}

export function getOAuth2MethodsQuery(client: Client) {
  return (props: GetOAuth2MethodsQueryProps) => {
    const { queryKey } = props;
    return getOAuth2Methods(client);
  };
}

export interface GetUserQueryProps {
  queryKey: GetUserQueryKey;
}

export function getUserQuery(client: Client) {
  return (props: GetUserQueryProps) => {
    const { queryKey } = props;
    try {
      const user = getUser(client);
      if (user && user.avatar) {
        const avatarURL = client.files.getURL(user, user.avatar);
        user.avatarURL = avatarURL;
        return user as UserWithAvatar;
      } else {
        return user as User;
      }
    } catch (error) {
      return null;
    }
  };
}
